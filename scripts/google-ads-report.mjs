#!/usr/bin/env node
// Reads .env.google-ads (gitignored) and prints campaign performance + budget status.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.google-ads");

function loadEnv(path) {
  const lines = readFileSync(path, "utf8").split("\n");
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return env;
}

const env = loadEnv(envPath);
const required = [
  "GOOGLE_ADS_DEVELOPER_TOKEN",
  "GOOGLE_ADS_CLIENT_ID",
  "GOOGLE_ADS_CLIENT_SECRET",
  "GOOGLE_ADS_REFRESH_TOKEN",
  "GOOGLE_ADS_CUSTOMER_ID",
];
for (const key of required) {
  if (!env[key]) {
    console.error(`Missing ${key} in .env.google-ads`);
    process.exit(1);
  }
}

const API_VERSION = "v18";

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_ADS_CLIENT_ID,
      client_secret: env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function gaqlSearch(accessToken, customerId, query) {
  const url = `https://googleads.googleapis.com/${API_VERSION}/customers/${customerId}/googleAds:search`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": env.GOOGLE_ADS_DEVELOPER_TOKEN,
    "Content-Type": "application/json",
  };
  if (env.GOOGLE_ADS_LOGIN_CUSTOMER_ID) {
    headers["login-customer-id"] = env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;
  }
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`GAQL search failed: ${JSON.stringify(data, null, 2)}`);
  }
  return data.results ?? [];
}

function micros(v) {
  return v ? (Number(v) / 1_000_000).toFixed(2) : "0.00";
}

async function main() {
  const accessToken = await getAccessToken();
  const customerId = env.GOOGLE_ADS_CUSTOMER_ID;

  const campaignRows = await gaqlSearch(
    accessToken,
    customerId,
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
            campaign_budget.amount_micros,
            metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value
     FROM campaign
     WHERE segments.date DURING LAST_30_DAYS
     ORDER BY metrics.cost_micros DESC`
  );

  console.log("=== Campaigns (last 30 days) ===");
  for (const row of campaignRows) {
    const c = row.campaign;
    const b = row.campaignBudget;
    const m = row.metrics;
    console.log(`\n${c.name} [${c.status}] (${c.advertisingChannelType})`);
    console.log(`  Daily budget: £${micros(b?.amountMicros)}`);
    console.log(`  Spend: £${micros(m?.costMicros)}  Impressions: ${m?.impressions ?? 0}  Clicks: ${m?.clicks ?? 0}`);
    console.log(`  Conversions: ${m?.conversions ?? 0}  Conversion value: £${Number(m?.conversionsValue ?? 0).toFixed(2)}`);
  }

  const totalRows = await gaqlSearch(
    accessToken,
    customerId,
    `SELECT metrics.cost_micros, metrics.conversions, metrics.conversions_value
     FROM customer
     WHERE segments.date DURING ALL_TIME`
  );
  const total = totalRows[0]?.metrics;
  console.log("\n=== Account totals (all time) ===");
  console.log(`  Total spend: £${micros(total?.costMicros)}`);
  console.log(`  Total conversions: ${total?.conversions ?? 0}`);
  console.log(`  Total conversion value: £${Number(total?.conversionsValue ?? 0).toFixed(2)}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
