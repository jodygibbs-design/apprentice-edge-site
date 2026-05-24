import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ONE_YEAR = 60 * 60 * 24 * 365;

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || key !== adminKey) {
    return NextResponse.redirect(`${getBaseUrl()}/`);
  }

  const cookieStore = await cookies();
  cookieStore.set("ae_access", "paid", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR,
  });

  return NextResponse.redirect(`${getBaseUrl()}/`);
}
