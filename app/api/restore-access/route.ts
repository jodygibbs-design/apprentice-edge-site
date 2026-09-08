import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const ONE_YEAR = 60 * 60 * 24 * 365;

// Safety bound on the fallback scan so a large account can't hang the request.
// ApprenticeEdge does single-digit sales a month, so this covers many years.
const MAX_SESSIONS_SCANNED = 1000;

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

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const sanitized = email.toLowerCase().trim();

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

  const cookieStore = await cookies();
  cookieStore.set("ae_access", "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR,
  });

  return NextResponse.json({ ok: true });
}
