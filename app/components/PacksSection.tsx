"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Pack {
  slug: string;
  title: string;
}

interface Props {
  freePack: Pack;
  paidPacks: Pack[];
}

export default function PacksSection({ freePack, paidPacks }: Props) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setPaid(localStorage.getItem("ae_paid") === "true");
  }, []);

  return (
    <section id="packs" className="bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">All 10 programmes</h2>
        <p className="text-slate-500 mb-8">
          {paid
            ? "Your Season Pass is active. All packs are unlocked."
            : "The free PwC pack is available now. All others are included in the Season Pass."}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <Link
            href={`/packs/${freePack.slug}`}
            className="lg:col-span-1 bg-blue-600 text-white rounded-xl p-5 hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{freePack.title}</span>
              <span className="text-xs bg-white text-blue-700 px-2 py-0.5 rounded font-semibold">Free</span>
            </div>
            <p className="text-blue-100 text-sm">Read now — no sign-up required</p>
          </Link>

          {paidPacks.map((pack) => (
            <Link
              key={pack.slug}
              href={`/packs/${pack.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900">{pack.title}</span>
                {paid ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-green-500 shrink-0">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400 shrink-0">
                    <rect x="3" y="6" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 6V4.5a2 2 0 014 0V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <p className="text-sm text-slate-400">
                {paid ? "Read now" : "Included in Season Pass"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
