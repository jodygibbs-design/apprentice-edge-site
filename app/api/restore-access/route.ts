import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const sanitized = email.toLowerCase().trim();

  const sessions = await stripe.checkout.sessions.search({
    query: `customer_email:"${sanitized}" AND payment_status:"paid"`,
    limit: 1,
  });

  if (sessions.data.length === 0) {
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
