"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "ae_unlocked";
const API_KEY = process.env.NEXT_PUBLIC_MAILERLITE_API_KEY!;
const GROUP_ID = process.env.NEXT_PUBLIC_MAILERLITE_GROUP_ID!;

interface Props {
  preview: string;
  full: string;
}

export default function EmailGate({ preview, full }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") setUnlocked(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          email,
          groups: [GROUP_ID],
          fields: { marketing_consent: marketingOptIn ? "yes" : "no" },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Something went wrong");
      }
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (unlocked) {
    return (
      <>
        <div className="prose" dangerouslySetInnerHTML={{ __html: preview }} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: full }} />
      </>
    );
  }

  return (
    <div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: preview }} />

      {/* Fade + gate */}
      <div className="relative">
        <div className="prose opacity-30 pointer-events-none select-none" dangerouslySetInnerHTML={{ __html: full }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        <div className="absolute inset-0 flex items-start justify-center pt-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl px-8 py-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H13.5L10 2Z" fill="#2563EB" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Get the full pack free</h2>
              <p className="text-slate-500 text-sm">Application stages, competencies, real interview questions, and commercial awareness — all of it.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs text-slate-500 leading-relaxed">
                  I&apos;d like to hear about new packs and offers from ApprenticeEdge.
                </span>
              </label>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm"
              >
                {loading ? "Unlocking…" : "Unlock the full pack →"}
              </button>
            </form>
            <p className="text-xs text-slate-400 text-center mt-3">
              We&apos;ll send your access link to this address.{" "}
              <a href="/privacy" className="underline hover:text-slate-600">Privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
