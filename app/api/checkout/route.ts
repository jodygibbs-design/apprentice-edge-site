import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sanitiseAttribution } from "@/lib/attribution";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const promoCode = typeof body.promoCode === "string" ? body.promoCode.trim() : "";

    // Where this visitor first came from, carried through from the client. Stripe is the
    // only record of a sale that we control, so if this is not on the session there is no
    // way to tell a paid sale from an organic one after the fact.
    const attribution = sanitiseAttribution(body.attribution);

    const base = getBaseUrl();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_SEASON_PASS!,
          quantity: 1,
        },
      ],
      mode: "payment",
      // Always persist a Customer so /api/restore-access can find the purchase by
      // email on a different device. Without this, guest checkouts leave no Customer
      // object and restore-access falls back to a slower session scan.
      customer_creation: "always",
      success_url: `${base}/api/grant-access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/checkout`,
      automatic_tax: { enabled: true },
      metadata: attribution,
      // Also on the PaymentIntent, so the attribution survives onto the charge itself and
      // shows up in Stripe's payments list without having to join back to the session.
      payment_intent_data: { metadata: attribution },
    };

    if (promoCode) {
      const promoCodes = await stripe.promotionCodes.list({ code: promoCode, active: true, limit: 1 });
      if (promoCodes.data.length === 0) {
        return NextResponse.json(
          { error: "That promo code isn't valid. Please check and try again." },
          { status: 400 }
        );
      }
      sessionParams.discounts = [{ promotion_code: promoCodes.data[0].id }];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", message);
    // Surface coupon errors clearly so the user knows the code is invalid
    const isCouponError = message.toLowerCase().includes("coupon") || message.toLowerCase().includes("no such");
    return NextResponse.json(
      { error: isCouponError ? "That promo code isn't valid. Please check and try again." : message },
      { status: 500 }
    );
  }
}
