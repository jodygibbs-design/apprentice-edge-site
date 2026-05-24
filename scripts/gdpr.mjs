#!/usr/bin/env node
/**
 * GDPR admin script — handle data requests from users.
 *
 * Usage (from apprentice-edge/site/):
 *   node scripts/gdpr.mjs lookup user@email.com
 *   node scripts/gdpr.mjs delete user@email.com
 *
 * Requires NEXT_PUBLIC_MAILERLITE_API_KEY in .env.local
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, "../.env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch {
    console.error("Could not read .env.local — make sure you run this from apprentice-edge/site/");
    process.exit(1);
  }
}

loadEnv();

const API_KEY = process.env.NEXT_PUBLIC_MAILERLITE_API_KEY;
if (!API_KEY) {
  console.error("NEXT_PUBLIC_MAILERLITE_API_KEY not found in .env.local");
  process.exit(1);
}

const BASE = "https://connect.mailerlite.com/api";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function lookupSubscriber(email) {
  const res = await fetch(`${BASE}/subscribers/${encodeURIComponent(email)}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`MailerLite error: ${res.status}`);
  const { data } = await res.json();
  return data;
}

async function deleteSubscriber(id) {
  const res = await fetch(`${BASE}/subscribers/${id}`, { method: "DELETE", headers });
  return res.status === 204;
}

const [,, command, email] = process.argv;

if (!command || !email) {
  console.log("Usage:");
  console.log("  node scripts/gdpr.mjs lookup user@email.com");
  console.log("  node scripts/gdpr.mjs delete user@email.com");
  process.exit(0);
}

if (command === "lookup") {
  const sub = await lookupSubscriber(email);
  if (!sub) {
    console.log(`Not found in MailerLite: ${email}`);
  } else {
    console.log("\n--- MailerLite subscriber ---");
    console.log(`ID:               ${sub.id}`);
    console.log(`Email:            ${sub.email}`);
    console.log(`Status:           ${sub.status}`);
    console.log(`Subscribed at:    ${sub.subscribed_at ?? "—"}`);
    console.log(`Marketing consent: ${sub.fields?.marketing_consent ?? "not recorded"}`);
    console.log(`Groups:           ${sub.groups?.map(g => g.name).join(", ") || "none"}`);
    console.log("\nStripe: check stripe.com/dashboard — search by email for payment records.");
    console.log("Note: financial records cannot be deleted (legal retention obligation).\n");
  }
}

if (command === "delete") {
  const sub = await lookupSubscriber(email);
  if (!sub) {
    console.log(`Not found in MailerLite: ${email} — nothing to delete.`);
  } else {
    const ok = await deleteSubscriber(sub.id);
    if (ok) {
      console.log(`Deleted from MailerLite: ${email} (ID: ${sub.id})`);
      console.log("Stripe: payment records are retained as required by law — not deletable.");
      console.log("Reply to the user confirming deletion and noting the Stripe exception.");
    } else {
      console.log("Delete failed — check MailerLite dashboard manually.");
    }
  }
}
