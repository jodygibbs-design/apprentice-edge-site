import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@apprenticeedge.co.uk";
// Where new-sale alerts go. Set SALES_NOTIFY_EMAIL in the environment to change it.
const SALES_NOTIFY_EMAIL = process.env.SALES_NOTIFY_EMAIL ?? "admin@deepcutindustries.com";
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.apprenticeedge.co.uk";

function buyerConfirmationHtml(email: string): string {
  const restoreUrl = `${SITE_URL}/restore-access`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:32px 16px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <div style="background:#4f46e5; padding:28px 32px;">
        <p style="margin:0; color:#c7d2fe; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">ApprenticeEdge</p>
        <h1 style="margin:6px 0 0; color:#fff; font-size:22px; font-weight:700;">Your Season Pass is active</h1>
      </div>
      <div style="padding:32px; color:#334155; font-size:15px; line-height:1.6;">
        <p style="margin:0 0 16px;">Thanks for your purchase. All 10 prep packs are unlocked, plus AI mock interviews for every employer and psychometric practice tests.</p>
        <p style="margin:0 0 8px; font-weight:600; color:#1e293b;">Using it on another device?</p>
        <p style="margin:0 0 16px;">Access is saved per browser. On any other computer or phone, go to
          <a href="${restoreUrl}" style="color:#4f46e5;">${restoreUrl}</a>
          and enter this email address (<strong>${email.replace(/</g, "&lt;")}</strong>) to unlock it there. No need to contact us.</p>
        <p style="margin:24px 0 0;">
          <a href="${SITE_URL}/packs" style="display:inline-block; background:#4f46e5; color:#fff; font-weight:600; padding:12px 24px; border-radius:10px; text-decoration:none;">Go to my packs</a>
        </p>
        <p style="font-size:12px; color:#94a3b8; margin:24px 0 0; border-top:1px solid #f1f5f9; padding-top:16px;">
          Your payment receipt is sent separately by Stripe. Questions? Reply to this email or contact
          <a href="mailto:admin@deepcutindustries.com" style="color:#94a3b8;">admin@deepcutindustries.com</a>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function saleAlertHtml(params: {
  email: string;
  amountGBP: string;
  discountGBP: string;
  sessionId: string;
  paymentIntent: string;
}): string {
  const { email, amountGBP, discountGBP, sessionId, paymentIntent } = params;
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0; color:#64748b;">${label}</td><td style="padding:4px 0; color:#1e293b; font-weight:600;">${value}</td></tr>`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px; margin:0 auto; padding:32px 16px;">
    <div style="background:#fff; border-radius:14px; padding:28px; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <h1 style="margin:0 0 4px; font-size:20px; color:#1e293b;">New ApprenticeEdge sale</h1>
      <p style="margin:0 0 20px; font-size:26px; font-weight:700; color:#16a34a;">£${amountGBP}</p>
      <table style="font-size:14px; border-collapse:collapse;">
        ${row("Customer email", email.replace(/</g, "&lt;"))}
        ${discountGBP !== "0.00" ? row("Discount applied", "£" + discountGBP) : ""}
        ${row("Checkout session", sessionId)}
        ${row("Payment intent", paymentIntent || "—")}
        ${row("Time", new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC")}
      </table>
      <p style="margin:20px 0 0;">
        <a href="https://dashboard.stripe.com/payments/${paymentIntent}" style="color:#4f46e5; font-size:14px;">Open in Stripe</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

async function sendSaleEmails(session: Stripe.Checkout.Session) {
  const buyerEmail = session.customer_details?.email ?? session.customer_email ?? null;
  const amountGBP = ((session.amount_total ?? 0) / 100).toFixed(2);
  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : (session.payment_intent?.id ?? "");
  const discountGBP = ((session.total_details?.amount_discount ?? 0) / 100).toFixed(2);

  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Always alert the shop owner, even if we somehow have no buyer email.
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: SALES_NOTIFY_EMAIL,
      subject: `ApprenticeEdge sale: £${amountGBP} (${buyerEmail ?? "unknown email"})`,
      html: saleAlertHtml({
        email: buyerEmail ?? "unknown",
        amountGBP,
        discountGBP,
        sessionId: session.id,
        paymentIntent,
      }),
    });
    if (error) console.error("AE_SALE_ALERT resend error:", error);
  } catch (err) {
    console.error("AE_SALE_ALERT threw:", err);
  }

  // 2. Confirm to the buyer and tell them how to unlock on other devices.
  if (buyerEmail) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: buyerEmail,
        subject: "Your ApprenticeEdge Season Pass is active",
        html: buyerConfirmationHtml(buyerEmail),
      });
      if (error) console.error("AE_BUYER_CONFIRM resend error:", error);
    } catch (err) {
      console.error("AE_BUYER_CONFIRM threw:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email ?? "unknown";
    const amountGBP = ((session.amount_total ?? 0) / 100).toFixed(2);
    // TODO: write to Supabase when MPC editor auth is added: migrate ApprenticeEdge at the same time
    console.log(`AE_PAID email=${email} session=${session.id} amount=£${amountGBP}`);

    // Only a genuinely paid session should trigger confirmation + fulfilment emails.
    // Email failures are logged but never fail the webhook (Stripe would retry forever).
    if (session.payment_status === "paid") {
      await sendSaleEmails(session);
    }
  }

  return NextResponse.json({ received: true });
}
