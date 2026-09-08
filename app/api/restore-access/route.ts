import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const ONE_YEAR = 60 * 60 * 24 * 365;

// Magic-link lifetime. This is an entitlement unlock for a one-off £29 pass
// (closer to a licence key than a login token), and the buyer is often not the
// end user - a parent forwards it to their child. A week removes any "activate
// now" pressure while still letting a leaked link go stale.
const LINK_TTL_SECONDS = 7 * 24 * 60 * 60;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@apprenticeedge.co.uk";

// HMAC key for the signed link. A dedicated RESTORE_LINK_SECRET is preferred;
// we fall back to ADMIN_KEY (already provisioned) so this works without a new
// env var. Rotating either value instantly invalidates outstanding links.
const LINK_SECRET = process.env.RESTORE_LINK_SECRET ?? process.env.ADMIN_KEY ?? "";

// Safety bound on the fallback scan so a large account can't hang the request.
// ApprenticeEdge does single-digit sales a month, so this covers many years.
const MAX_SESSIONS_SCANNED = 1000;

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// --- Best-effort rate limit -------------------------------------------------
// Per-instance, in-memory. Vercel may run several instances so this is a speed
// bump against scripted enumeration / mailbombing, not a hard guarantee.
const RL_MAX = 5;
const RL_WINDOW_MS = 15 * 60 * 1000;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RL_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RL_MAX;
}

// --- Signed token ---------------------------------------------------------
function makeToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + LINK_TTL_SECONDS;
  const raw = `${email}|${exp}`;
  const payload = Buffer.from(raw).toString("base64url");
  const sig = crypto.createHmac("sha256", LINK_SECRET).update(raw).digest("base64url");
  return `${payload}.${sig}`;
}

function verifyToken(token: string): { email: string } | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  let raw: string;
  try {
    raw = Buffer.from(payload, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = crypto.createHmac("sha256", LINK_SECRET).update(raw).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  const sep = raw.lastIndexOf("|");
  if (sep === -1) return null;
  const email = raw.slice(0, sep);
  const exp = Number(raw.slice(sep + 1));
  if (!Number.isFinite(exp) || Math.floor(Date.now() / 1000) > exp) return null;

  return { email };
}

async function hasPaidPurchase(email: string): Promise<boolean> {
  // 1. Customer path (fast, indexed). Works for checkouts made with
  //    customer_creation:"always" (see app/api/checkout/route.ts).
  const customers = await stripe.customers.list({ email, limit: 5 });
  for (const customer of customers.data) {
    const sessions = await stripe.checkout.sessions.list({ customer: customer.id, limit: 100 });
    if (sessions.data.some((s) => s.payment_status === "paid")) return true;
  }

  // 2. Fallback: scan recent Checkout Sessions and match the email captured at
  //    checkout. Covers historical buyers whose session has no Customer attached.
  let scanned = 0;
  for await (const session of stripe.checkout.sessions.list({ limit: 100 })) {
    if (++scanned > MAX_SESSIONS_SCANNED) break;
    if (session.payment_status !== "paid") continue;
    const sessionEmail = (session.customer_email ?? session.customer_details?.email ?? "")
      .toLowerCase()
      .trim();
    if (sessionEmail && sessionEmail === email) return true;
  }

  return false;
}

function grantCookie(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  cookieStore.set("ae_access", "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR,
  });
}

// --- POST: request a sign-in link --------------------------------------------
export async function POST(req: Request) {
  if (!LINK_SECRET) {
    console.error("restore-access: no RESTORE_LINK_SECRET / ADMIN_KEY configured");
    return NextResponse.json({ error: "Restore is temporarily unavailable." }, { status: 500 });
  }

  const { email } = await req.json().catch(() => ({ email: undefined }));

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const sanitized = email.toLowerCase().trim();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(`${ip}`)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let paid = false;
  try {
    paid = await hasPaidPurchase(sanitized);
  } catch (err) {
    console.error("restore-access lookup failed:", err);
    return NextResponse.json(
      { error: "Couldn't check your purchase right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  if (!paid) {
    return NextResponse.json({ error: "No purchase found for that email." }, { status: 404 });
  }

  const link = `${getBaseUrl()}/api/restore-access?token=${encodeURIComponent(makeToken(sanitized))}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: sanitized,
      subject: "Your ApprenticeEdge sign-in link",
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:32px 16px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <div style="background:#f97316; padding:28px 32px;">
        <p style="margin:0; color:#ffedd5; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">ApprenticeEdge</p>
        <h1 style="margin:6px 0 0; color:#fff; font-size:22px; font-weight:700;">Unlock your Season Pass</h1>
      </div>
      <div style="padding:32px; color:#334155; font-size:15px; line-height:1.6;">
        <p style="margin:0 0 16px;">Someone (hopefully you) asked to restore ApprenticeEdge access on a new device using this email address.</p>
        <p style="margin:0 0 24px;">Open this link <strong>on the device you want to unlock</strong>:</p>
        <p style="margin:0 0 24px;">
          <a href="${link}" style="display:inline-block; background:#f97316; color:#fff; font-weight:600; padding:12px 24px; border-radius:10px; text-decoration:none;">Unlock this device</a>
        </p>
        <p style="margin:0 0 16px; font-size:13px; color:#64748b;"><strong>Bought this for someone else?</strong> Forward them this email and have them open the link on their own device: it unlocks whichever device it's opened on.</p>
        <p style="margin:0 0 16px; font-size:13px; color:#64748b;">This link works for 7 days. If you didn't ask for this, you can ignore this email; nothing will change.</p>
        <p style="font-size:12px; color:#94a3b8; margin:24px 0 0; border-top:1px solid #f1f5f9; padding-top:16px; word-break:break-all;">
          Button not working? Paste this into your browser:<br>${link}
        </p>
      </div>
    </div>
  </div>
</body>
</html>`,
    });
    if (error) {
      console.error("restore-access resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send the link right now. Please try again in a moment." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("restore-access resend threw:", err);
    return NextResponse.json(
      { error: "Couldn't send the link right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ sent: true });
}

// --- GET: verify a link click, set the cookie, bounce to the app ------------
export async function GET(req: Request) {
  const base = getBaseUrl();
  const token = new URL(req.url).searchParams.get("token");

  if (!token || !LINK_SECRET || !verifyToken(token)) {
    return NextResponse.redirect(`${base}/restore-access?error=link`);
  }

  const cookieStore = await cookies();
  grantCookie(cookieStore);
  return NextResponse.redirect(`${base}/restore-access?restored=1`);
}
