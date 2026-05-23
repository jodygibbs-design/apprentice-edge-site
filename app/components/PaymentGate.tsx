"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  content: string;
  packTitle: string;
}

export default function PaymentGate({ content, packTitle }: Props) {
  const [paid, setPaid] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setPaid(localStorage.getItem("ae_paid") === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (paid) {
    return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div>
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            Season Pass
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {packTitle} Apprenticeship<br />Prep Pack
          </h1>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            This pack is included in the ApprenticeEdge Season Pass — along with nine other
            company-specific prep packs for the UK&apos;s most competitive apprenticeships.
          </p>
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-semibold px-10 py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg shadow-md shadow-orange-500/20"
          >
            Get the Season Pass — £29
          </Link>
          <p className="text-xs text-slate-400 mt-3">All 10 packs. One payment. Instant access.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-xl mx-auto px-6 py-12 text-center">
          <p className="text-slate-500 text-sm mb-3">Not ready to buy? Try the free PwC pack first.</p>
          <Link href="/packs/pwc" className="text-blue-600 font-semibold text-sm hover:underline">
            Read the free PwC pack →
          </Link>
        </div>
      </section>
    </div>
  );
}
