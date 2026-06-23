import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Anthropic from "@anthropic-ai/sdk";
import { getPackBySlug, getPackRawContent } from "@/lib/packs";

const client = new Anthropic();

// Must match PACKS slugs exactly
const VALID_SLUGS = [
  "pwc", "deloitte", "kpmg", "ey", "goldman-sachs",
  "google", "amazon", "civil-service", "bbc", "nhs",
];

// Simple in-memory rate limiter: 10 interview calls per IP per day
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 86_400_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  // Auth
  const cookieStore = await cookies();
  if (cookieStore.get("ae_access")?.value !== "paid") {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // Rate limit by IP
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit reached — try again tomorrow" }, { status: 429 });
  }

  const body = await request.json();
  const { employer, messages } = body;

  // Slug whitelist (prompt injection guard)
  if (!VALID_SLUGS.includes(employer)) {
    return NextResponse.json({ error: "Invalid employer" }, { status: 400 });
  }

  // Session length cap
  if (!Array.isArray(messages) || messages.length > 20) {
    return NextResponse.json({ error: "Session limit reached" }, { status: 429 });
  }

  // Message length cap
  for (const msg of messages) {
    if (typeof msg.content !== "string" || msg.content.length > 2000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }
  }

  const pack = getPackBySlug(employer);
  if (!pack) {
    return NextResponse.json({ error: "Pack not found" }, { status: 404 });
  }

  const packContent = getPackRawContent(pack.filename);

  const systemPrompt = `You are a practice interview coach helping candidates prepare for ${pack.company} apprenticeship applications.

IMPORTANT: You are NOT affiliated with ${pack.company}. You are a practice tool only — make this clear if asked.

Use ONLY the following information about the ${pack.company} programme when asking questions or giving feedback. Do not invent stages, tests, competencies, or processes not mentioned below.

---
${packContent}
---

HOW TO RUN THE SESSION:
- Ask one interview question at a time, drawing from the stages and competencies described above
- After the candidate answers, give brief structured feedback in this format:
  ✓ What worked: [1–2 specific things that were strong]
  ✗ What to improve: [1 specific, actionable improvement]
  → Try again with: [one concrete suggestion for how to sharpen the answer]
- Then ask your next question
- Vary question types: competency-based (STAR), motivational ("why ${pack.company}?"), and commercial awareness
- Keep your responses concise — 4–6 sentences maximum
- If the candidate asks something outside your scope (e.g. admin processes, salary negotiation), say you can only help with interview preparation`;

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
