import type { Metadata } from "next";
import { PACKS } from "@/lib/packs";
import PacksSection from "@/app/components/PacksSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Apprenticeship Prep Packs — ApprenticeEdge",
  description: "Insider prep packs for PwC, Goldman Sachs, Deloitte, KPMG, EY, Google, Amazon, Civil Service, BBC, and NHS apprenticeships. Free PwC pack available now.",
};

export default function PacksPage() {
  const freePack = PACKS.find((p) => p.free)!;
  const paidPacks = PACKS.filter((p) => !p.free);

  return (
    <div>
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">ApprenticeEdge</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">All Packs</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            All 10 Apprenticeship Prep Packs
          </h1>
          <p className="text-slate-500 max-w-xl">
            PwC, Goldman Sachs, Deloitte, KPMG, EY, Google, Amazon, Civil Service, BBC, and NHS.
            Start with the free PwC pack — or get all 10 with a Season Pass.
          </p>
        </div>
      </section>

      <PacksSection freePack={freePack} paidPacks={paidPacks} />

      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0F2340 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#C4922A" }}>
            Season Pass
          </p>
          <div className="text-5xl font-extrabold mb-3" style={{ color: "white" }}>£29</div>
          <p className="text-lg mb-8" style={{ color: "#94A3B8" }}>One payment. All 10 packs. No subscription.</p>
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-bold px-10 py-4 rounded-xl hover:bg-orange-400 transition-colors text-lg"
            style={{ boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}
          >
            Buy Season Pass — £29
          </Link>
        </div>
      </section>
    </div>
  );
}
