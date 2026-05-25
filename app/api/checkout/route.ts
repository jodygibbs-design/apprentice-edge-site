import { NextResponse } from "next/server";
import Stripe from "stripe";

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
      success_url: `${base}/api/grant-access?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/checkout`,
      automatic_tax: { enabled: true },
    };

    if (promoCode) {
      sessionParams.discounts = [{ coupon: promoCode }];
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
