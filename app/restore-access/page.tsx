"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RestoreAccessInner() {
  const router = useRouter();
  const params = useSearchParams();

  // Bounced back from an expired or tampered link: seed the error state at mount
  // rather than in an effect (avoids a cascading re-render).
  const cameFromBadLink = params.get("error") === "link";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    cameFromBadLink ? "error" : "idle"
  );
  const [errorMsg, setErrorMsg] = useState(
    cameFromBadLink ? "That link was invalid or had expired. Enter your email to get a fresh one." : ""
  );

  // Landing back here from a valid magic link: cookie is already set server-side.
  // Mirror the post-purchase hint and hand off to the packs.
  useEffect(() => {
    if (params.get("restored") === "1") {
      try {
        localStorage.setItem("ae_paid", "true");
      } catch {}
      router.replace("/packs");
    }
  }, [params, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    let res: Response;
    try {
      res = await fetch("/api/restore-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
      return;
    }

    if (res.ok) {
      setStatus("sent");
      return;
    }

    const data = await res.json().catch(() => ({}));
    setErrorMsg(data.error || "Something went wrong. Please try again.");
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-full mb-5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6l7 5 7-5M3 6v8a1 1 0 001 1h12a1 1 0 001-1V6M3 6l7 5 7-5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-1">Check your inbox</h1>
          <p className="text-slate-500 text-sm">
            We&apos;ve sent a sign-in link to <strong className="text-slate-700">{email}</strong>.
            Open it <strong>on the device you want to unlock</strong>. The link works for 7 days.
          </p>
          <p className="text-slate-400 text-xs mt-3">
            Bought the pass for someone else? Forward them that email: the link unlocks whichever
            device they open it on.
          </p>
          <p className="text-slate-400 text-xs mt-6">
            Nothing after a few minutes? Check spam, or{" "}
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setErrorMsg("");
              }}
              className="text-orange-500 font-semibold hover:underline"
            >
              try again
            </button>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-full mb-5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Restore your access</h1>
        <p className="text-slate-500 text-sm mb-6">
          Enter the email address you used to buy the Season Pass. We&apos;ll email you a one-time
          link that unlocks access on the device you open it from.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Email me a link"}
          </button>
        </form>
        {status === "error" && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="font-semibold mb-0.5">{errorMsg}</p>
            {errorMsg.includes("No purchase") && (
              <p className="text-red-500">
                Wrong email?{" "}
                <a
                  href="mailto:admin@deepcutindustries.com?subject=ApprenticeEdge access help"
                  className="underline hover:no-underline"
                >
                  Email us
                </a>{" "}
                with your Stripe receipt and we&apos;ll sort it.
              </p>
            )}
          </div>
        )}
        <p className="mt-6 text-center text-xs text-slate-400">
          Don&apos;t have a Season Pass yet?{" "}
          <Link href="/checkout" className="text-orange-500 font-semibold hover:underline">
            Get it for £29 →
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RestoreAccessPage() {
  return (
    <Suspense fallback={null}>
      <RestoreAccessInner />
    </Suspense>
  );
}
