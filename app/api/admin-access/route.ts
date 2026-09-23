import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { grantPaidAccess } from "@/lib/access";

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
  grantPaidAccess(cookieStore);

  return NextResponse.redirect(`${getBaseUrl()}/`);
}
