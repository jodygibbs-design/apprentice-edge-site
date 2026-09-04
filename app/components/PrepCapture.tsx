"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Inline email capture for the generic Ads landing pages.
 *
 * Replaces the link-only PrepCTA. That block asked the visitor to click through to
 * /packs/pwc and only met the email form once they arrived, so a paid click was two
 * steps and a page load away from the thing we are paying to collect. 176 clicks
 * produced no signups at all.
 *
 * Capturing here removes both steps. On success we set the same localStorage key the
 * pack's EmailGate reads, so the visitor lands on /packs/pwc already unlocked rather
 * than being asked for the same address twice.
 */

// Must match EmailGate: it unlocks the pack by reading this exact key.
const STORAGE_KEY = "ae_email_captured";

// Google Ads "Lead - Email Signup" conversion action (7742297650).
const ADS_LEAD_SEND_TO = "AW-18218897830/uacECLKs6OscEKajue9D";

export default function PrepCapture({
  context,
  body,
  trackAdsConversion = true,
}: {
  context: string;
  /** Overrides the default PwC-pack pitch. Used by the organic guide pages. */
  body?: React.ReactNode;
  /**
   * Whether to fire the Google Ads conversion on success. True for the paid landing pages,
   * which is where it belongs. The guide pages pass false: their traffic is organic, so a
   * conversion fired from there has no GCLID for Google to attribute, and it would inflate
   * the conversion action's total while the paid signup rate is still being measured against
   * a 50-100 click checkpoint. Keeping organic out of that number keeps the checkpoint honest.
   */
  trackAdsConversion?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, marketingConsent: marketingOptIn }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      localStorage.setItem(STORAGE_KEY, "true");
      if (trackAdsConversion) {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtag === "function") {
          gtag("event", "conversion", { send_to: ADS_LEAD_SEND_TO });
        }
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl p-8 my-10 text-center"
      style={{ background: "linear-gradient(160deg, #0A1628 0%, #0F2340 100%)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C4922A" }}>
        Free prep pack
      </p>
      <h2 className="text-xl font-bold text-white mb-3">{context}</h2>

      {done ? (
        <>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            You&apos;re in. The pack is unlocked and we&apos;ve sent the access link to your inbox.
          </p>
          <Link
            href="/packs/pwc"
            className="inline-block bg-[#C4922A] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#B07E20] transition-colors"
          >
            Read the free PwC pack
          </Link>
        </>
      ) : (
        <>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            {body ?? (
              <>
                The full PwC School Leaver pack is free: application stages, the competencies they score,
                real interview questions, commercial awareness, and a pre-submission checklist. The process
                it walks through is close enough to the other big schemes to prep you for all of them.
              </>
            )}
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3 text-left">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your email address"
                className="flex-1 min-w-0 rounded-xl px-4 py-3 text-sm bg-white/95 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#C4922A]"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 bg-[#C4922A] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#B07E20] transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? "Sending…" : "Get it free →"}
              </button>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-500 text-[#C4922A] focus:ring-[#C4922A] cursor-pointer"
              />
              <span className="text-xs text-slate-400 leading-relaxed">
                I&apos;d like to hear about new packs and offers from ApprenticeEdge.
              </span>
            </label>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <p className="text-xs text-slate-500">
              We&apos;ll send your access link to this address.{" "}
              <a href="/privacy" className="underline hover:text-slate-300">
                Privacy policy
              </a>
              .
            </p>
          </form>

          <div className="mt-5">
            <Link href="/checkout" className="text-slate-400 text-sm hover:text-white transition-colors">
              Or get all 10 employers, Season Pass £29
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
