"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RestoreAccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/restore-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      localStorage.setItem("ae_paid", "true");
      router.push("/packs");
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 w-full max-w-md p-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-50 rounded-full mb-5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 4v4l3 3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Restore your access</h1>
        <p className="text-slate-500 text-sm mb-6">
          Enter the email address you used to purchase the Season Pass. We&apos;ll verify your payment and restore access on this device.
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
            {status === "loading" ? "Checking…" : "Restore access"}
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
