import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPackBySlug, getPackContent } from "@/lib/packs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const paid = cookieStore.get("ae_access")?.value === "paid";

  if (!paid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await request.json();
  const pack = getPackBySlug(slug);

  if (!pack || pack.free) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const content = await getPackContent(pack.filename);
  return NextResponse.json({ content });
}
