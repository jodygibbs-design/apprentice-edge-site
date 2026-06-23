"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  slug: string;
  paid: boolean;
  hasPsychometric: boolean;
  companyName: string;
  activeTab: "guide" | "interview" | "tests";
}

export default function PackTabBar({ slug, paid, hasPsychometric, companyName, activeTab }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleLockedTab(e: React.MouseEvent) {
    if (!paid) {
      e.preventDefault();
      setModalOpen(true);
    }
  }

  const tabBase = "text-sm px-4 py-2 rounded-lg font-medium transition-colors";
  const tabActive = "bg-white shadow-sm text-indigo-700 font-semibold border border-slate-200";
  const tabInactive = "text-slate-500 hover:text-slate-700";

  return (
    <>
      <div className="flex gap-1 bg-white/60 rounded-xl p-1 border border-slate-200 w-fit mb-5">
        {activeTab === "guide" ? (
          <span className={`${tabBase} ${tabActive}`}>Pack Guide</span>
        ) : (
          <Link href={`/packs/${slug}`} className={`${tabBase} ${tabInactive}`}>Pack Guide</Link>
        )}

        {activeTab === "interview" ? (
          <span className={`${tabBase} ${tabActive}`}>Practice Interview</span>
        ) : paid ? (
          <Link href={`/packs/${slug}/interview`} className={`${tabBase} ${tabInactive}`}>Practice Interview</Link>
        ) : (
          <a href={`/packs/${slug}/interview`} onClick={handleLockedTab} className={`${tabBase} ${tabInactive} cursor-pointer`}>
            Practice Interview
            <span className="ml-1.5 text-xs opacity-50">🔒</span>
          </a>
        )}

        {hasPsychometric && (
          activeTab === "tests" ? (
            <span className={`${tabBase} ${tabActive}`}>Practice Tests</span>
          ) : paid ? (
            <Link href={`/packs/${slug}/practice-tests`} className={`${tabBase} ${tabInactive}`}>Practice Tests</Link>
          ) : (
            <a href={`/packs/${slug}/practice-tests`} onClick={handleLockedTab} className={`${tabBase} ${tabInactive} cursor-pointer`}>
              Practice Tests
              <span className="ml-1.5 text-xs opacity-50">🔒</span>
            </a>
          )
        )}
      </div>

      {/* Paywall modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="text-3xl mb-4">🎤</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Season Pass feature</h2>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              The AI mock interview and practice tests are included in the Season Pass.
              Unlike generic AI tools, these are built specifically for {companyName} —
              the interview coach is trained on the {companyName} pack content and only
              asks questions relevant to that company&apos;s actual application process.
            </p>

            <ul className="space-y-2.5 mb-6">
              {[
                `AI interview coach grounded on the ${companyName} prep pack — not generic advice`,
                "Structured feedback after every answer: what worked + what to improve",
                "Practice tests in the style of employer assessments — timed, scored, explained",
                "All 10 employers included. One payment.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/checkout"
              className="block w-full text-center bg-orange-500 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20 mb-3"
            >
              Get Season Pass — £29
            </Link>
            <p className="text-xs text-center text-slate-400">One payment. Instant access. No subscription.</p>
          </div>
        </div>
      )}
    </>
  );
}
