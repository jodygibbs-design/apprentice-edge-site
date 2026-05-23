import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    const email = session.customer_email ?? session.customer_details?.email ?? "unknown";
    const amountGBP = ((session.amount_total ?? 0) / 100).toFixed(2);
    // TODO: write to Supabase when MPC editor auth is added — migrate ApprenticeEdge at the same time
    console.log(`AE_PAID email=${email} session=${session.id} amount=£${amountGBP}`);
  }

  return NextResponse.json({ received: true });
}
