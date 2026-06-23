import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { getPackBySlug } from "@/lib/packs";

const VALID_SLUGS = [
  "pwc", "deloitte", "kpmg", "ey", "goldman-sachs",
  "google", "amazon", "civil-service", "bbc", "nhs",
];

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailHtml(companyName: string, messages: { role: string; content: string }[]): string {
  const exchanges = messages.reduce<{ question: string; answer: string; feedback: string }[]>((acc, msg, i) => {
    if (msg.role === "assistant" && i === 0) {
      acc.push({ question: msg.content, answer: "", feedback: "" });
    } else if (msg.role === "user") {
      const prev = messages[i - 1];
      acc.push({ question: prev?.content ?? "", answer: msg.content, feedback: "" });
    } else if (msg.role === "assistant" && i > 0) {
      const last = acc[acc.length - 1];
      if (last) last.feedback = msg.content;
    }
    return acc;
  }, []);

  const rows = exchanges
    .filter((e) => e.answer)
    .map(
      (e, i) => `
      <div style="margin-bottom:28px; border-bottom:1px solid #e2e8f0; padding-bottom:24px;">
        <p style="font-size:13px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin:0 0 6px;">Question ${i + 1}</p>
        <p style="font-size:15px; color:#1e293b; font-weight:600; margin:0 0 12px; line-height:1.5;">${e.question.replace(/</g, "&lt;")}</p>
        <p style="font-size:13px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin:0 0 6px;">Your answer</p>
        <p style="font-size:14px; color:#334155; margin:0 0 12px; line-height:1.6; background:#f8fafc; border-left:3px solid #e2e8f0; padding:10px 14px; border-radius:0 8px 8px 0;">${e.answer.replace(/\n/g, "<br>").replace(/</g, "&lt;")}</p>
        ${e.feedback ? `
        <p style="font-size:13px; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin:0 0 6px;">Coach feedback</p>
        <div style="background:#f0f4ff; border-left:3px solid #6366f1; padding:10px 14px; border-radius:0 8px 8px 0; font-size:14px; color:#1e293b; line-height:1.6;">${e.feedback.replace(/\n/g, "<br>").replace(/</g, "&lt;")}</div>
        ` : ""}
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px; margin:0 auto; padding:32px 16px;">
    <div style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.06);">
      <div style="background:#4f46e5; padding:28px 32px;">
        <p style="margin:0; color:#c7d2fe; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em;">ApprenticeEdge</p>
        <h1 style="margin:6px 0 0; color:#fff; font-size:22px; font-weight:700;">${companyName} Mock Interview</h1>
        <p style="margin:4px 0 0; color:#a5b4fc; font-size:14px;">Your practice session transcript</p>
      </div>
      <div style="padding:32px;">
        ${rows}
        <p style="font-size:12px; color:#94a3b8; margin:24px 0 0; border-top:1px solid #f1f5f9; padding-top:16px;">
          This was a practice session only. ApprenticeEdge is not affiliated with, endorsed by, or partnered with ${companyName}.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (cookieStore.get("ae_access")?.value !== "paid") {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = await request.json();
  const { email, employer, messages } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!VALID_SLUGS.includes(employer)) {
    return NextResponse.json({ error: "Invalid employer" }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No messages to send" }, { status: 400 });
  }

  const pack = getPackBySlug(employer);
  if (!pack) {
    return NextResponse.json({ error: "Pack not found" }, { status: 404 });
  }

  const html = buildEmailHtml(pack.company, messages);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@apprenticeedge.co.uk",
    to: email,
    subject: `Your ${pack.company} mock interview — ApprenticeEdge`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
