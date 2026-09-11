import { NextRequest, NextResponse } from "next/server";
import { sanitiseAttribution } from "@/lib/attribution";

export async function POST(req: NextRequest) {
  try {
    const { email, marketingConsent, attribution } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (!apiKey || !groupId) {
      console.error("MailerLite env vars not set");
      return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
    }

    const send = (fields: Record<string, string>) =>
      fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          groups: [groupId],
          fields,
        }),
      });

    const baseFields = { marketing_consent: marketingConsent ? "yes" : "no" };
    // ae_source / ae_landing / ae_gclid.
    //
    // These three MUST exist as custom fields on the MailerLite account. MailerLite does not
    // reject a field it does not know, it drops it silently and returns 200, so a missing
    // field costs the attribution with nothing anywhere to say so. Same behaviour that lost
    // a `purchased` field in Sep 2026, documented at the top of app/api/webhook/route.ts.
    // If attribution is coming back empty on new subscribers, check the fields exist first.
    const attributionFields = sanitiseAttribution(attribution);

    let res = await send({ ...baseFields, ...attributionFields });

    // Belt and braces for the case where MailerLite does reject rather than drop, e.g. a
    // value that trips a validation rule. A subscriber is worth far more than their
    // attribution, so retry clean rather than lose the lead to a reporting nicety.
    if (!res.ok && Object.keys(attributionFields).length > 0) {
      console.error("MailerLite rejected the subscribe with attribution fields; retrying without them");
      res = await send(baseFields);
    }

    if (!res.ok) {
      const data = await res.json();
      return NextResponse.json({ error: data.message ?? "Subscription failed" }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Subscribe error:", message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
