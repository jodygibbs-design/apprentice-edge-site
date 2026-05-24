"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  content: string;
  packTitle: string;
  serverPaid: boolean;
}

export default function PaymentGate({ content, packTitle, serverPaid }: Props) {
  const [paid, setPaid] = useState(serverPaid);
  const [checked, setChecked] = useState(serverPaid);

  useEffect(() => {
    if (!serverPaid) {
      setPaid(localStorage.getItem("ae_paid") === "true");
      setChecked(true);
    }
  }, [serverPaid]);

  if (!checked) return null;

  if (paid) {
    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="9" width="12" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="1.5"/>
          <path d="M7 9V6.5a3 3 0 016 0V9" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Season Pass required</h2>
      <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm leading-relaxed">
        This pack is included in the ApprenticeEdge Season Pass — along with all nine other company-specific prep packs.
      </p>
      <Link
        href="/checkout"
        className="inline-block bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
      >
        Get the Season Pass — £29
      </Link>
      <p className="text-xs text-slate-400 mt-3 mb-6">All 10 packs. One payment. Instant access.</p>
      <p className="text-slate-400 text-sm">
        Not ready?{" "}
        <Link href="/packs/pwc" className="text-blue-600 font-semibold hover:underline">
          Try the free PwC pack first →
        </Link>
      </p>
    </div>
  );
}
