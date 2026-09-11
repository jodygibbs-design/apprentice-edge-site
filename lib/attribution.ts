/**
 * First-touch attribution: where a visitor actually came from.
 *
 * Written after the 6 Sep 2026 sale, the first real one, turned out to be unattributable
 * from anything we store. /api/subscribe kept the email and nothing else, the Stripe
 * session's metadata was empty, and MailerLite's "source: api" only means the REST
 * endpoint was used. Answering "was that sale organic?" took an hour of reading
 * hour-by-hour Google Ads click data against the Stripe timestamp. It should be one
 * field on the subscriber record.
 *
 * FIRST TOUCH, NEVER OVERWRITTEN. The capture runs on every page load but only writes
 * when nothing is stored. That matters more than it looks: by the time someone submits
 * an email form they have usually navigated internally at least once, so document.referrer
 * on that page is apprenticeedge.co.uk. Reading the referrer at submit time would file
 * almost every visitor as having come from us.
 *
 * The gclid is the only signal that settles paid against organic on its own. Google
 * appends it to every ad click and nothing else produces one, so a stored gclid is proof
 * of a paid click, and its absence on a first touch we did record is good evidence
 * against one.
 */

const STORAGE_KEY = "ae_attribution";

// MailerLite and Stripe both cap custom field values, and a referrer or landing path can
// be arbitrarily long if someone builds one that way. Nothing here needs the room.
const MAX = 200;

export type Attribution = {
  /** "google-ads", "google-organic", "direct", a utm_source, or the bare referring host. */
  source: string;
  /** Path of the first page seen, so we know which page earned the signup. */
  landing: string;
  /** Google Ads click id. Present only on a paid click. */
  gclid: string;
  /** ISO timestamp of the first touch. */
  first_seen: string;
};

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function deriveSource(params: URLSearchParams, referrer: string): string {
  // Decisive. Only an ad click carries this.
  if (params.get("gclid")) return "google-ads";

  // Anything we tag ourselves wins over the referrer, which is what tagging is for.
  const utmSource = params.get("utm_source");
  if (utmSource) {
    const utmMedium = params.get("utm_medium");
    return (utmMedium ? `${utmSource}/${utmMedium}` : utmSource).slice(0, MAX);
  }

  const host = hostOf(referrer);
  if (!host) return "direct";
  // Our own pages are not a traffic source. A first touch should never see this, but it
  // would if storage were cleared mid-visit, and "direct" is the honest answer then.
  if (host === "apprenticeedge.co.uk" || host.endsWith(".apprenticeedge.co.uk")) return "direct";
  // Search engines get a stable label rather than whichever country domain they used, so
  // google.co.uk and google.ie do not read as two different sources.
  if (/(^|\.)google\./.test(host)) return "google-organic";
  if (/(^|\.)bing\./.test(host)) return "bing-organic";
  if (/(^|\.)duckduckgo\./.test(host)) return "duckduckgo-organic";
  if (/(^|\.)yahoo\./.test(host)) return "yahoo-organic";
  return host.slice(0, MAX);
}

/** Records the first touch. Safe to call on every page load: it no-ops once set. */
export function captureAttribution(): void {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      source: deriveSource(params, document.referrer),
      landing: window.location.pathname.slice(0, MAX),
      gclid: (params.get("gclid") ?? "").slice(0, MAX),
      first_seen: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Private browsing and blocked site data both throw on localStorage. Attribution is
    // reporting, not function: it must never break a page or a form submit.
  }
}

/** Reads the stored first touch back, for sending with a signup or a checkout. */
export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    if (!parsed || typeof parsed.source !== "string") return null;
    return {
      source: parsed.source,
      landing: parsed.landing ?? "",
      gclid: parsed.gclid ?? "",
      first_seen: parsed.first_seen ?? "",
    };
  } catch {
    return null;
  }
}

/**
 * Narrows a client-supplied attribution blob to the three fields worth storing, prefixed
 * to match the MailerLite custom fields and readable as Stripe metadata keys.
 *
 * Anything arriving in a request body is untrusted and both services cap what they accept,
 * so take only the keys we expect, keep only non-empty strings, and cap the length.
 * first_seen is deliberately dropped: MailerLite and Stripe both timestamp the record
 * themselves, and the gap between first touch and signup has not been worth a field.
 */
export function sanitiseAttribution(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== "object") return out;
  const raw = input as Record<string, unknown>;
  for (const key of ["source", "landing", "gclid"] as const) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) {
      out[`ae_${key}`] = value.trim().slice(0, MAX);
    }
  }
  return out;
}
