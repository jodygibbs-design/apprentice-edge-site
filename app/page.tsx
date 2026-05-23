import Link from "next/link";
import { PACKS } from "@/lib/packs";
import HeroActions from "@/app/components/HeroActions";
import PacksSection from "@/app/components/PacksSection";

const FEATURES = [
  { icon: "→", label: "Exact application stages", desc: "What to expect at every round, from online form to final interview" },
  { icon: "✓", label: "Company-specific competencies", desc: "What each employer actually tests for — and what they don't" },
  { icon: "✓", label: "Real interview questions", desc: "Questions they actually ask, with notes on what a strong answer looks like" },
  { icon: "✓", label: "Commercial awareness", desc: "The numbers and context that impress interviewers, not generic business chat" },
  { icon: "✓", label: "Why this company — model answer", desc: "A framework for the hardest question that catches most candidates off guard" },
  { icon: "✓", label: "Pre-submission checklist", desc: "A final-pass checklist so nothing gets submitted half-prepared" },
];

const COMPANIES = ["PwC", "Deloitte", "KPMG", "EY", "Goldman Sachs", "Google", "Amazon", "Civil Service", "BBC", "NHS"];

export default function HomePage() {
  const freePack = PACKS.find((p) => p.free)!;
  const paidPacks = PACKS.filter((p) => !p.free);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Written for UK school leavers — not graduates
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Get into the UK&apos;s most<br className="hidden sm:block" />
            competitive apprenticeships.
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Insider prep packs for PwC, Goldman Sachs, Google, the Civil Service, and seven more.
            Know exactly what they test, what they ask, and what a strong answer looks like.
          </p>
          <HeroActions freePackSlug={freePack.slug} />
          <p className="text-xs text-slate-400 mt-4">One payment. Instant access. No subscription.</p>
        </div>
      </section>

      {/* Company logos bar */}
      <section className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-4">
            Packs available for
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {COMPANIES.map((c) => (
              <span key={c} className="text-slate-500 font-semibold text-sm">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Most applicants turn up underprepared.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            The kids who get offered PwC or Goldman Sachs places didn&apos;t get lucky.
            They knew the application process inside-out — the exact competencies, the situational judgement format,
            the commercial context. ApprenticeEdge gives you that same knowledge,
            without the £500 tutoring sessions.
          </p>
        </div>
      </section>

      {/* What's in every pack */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">What&apos;s in every pack</h2>
          <p className="text-slate-500 text-center mb-10">Six sections, all written specifically for the company it covers.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.label} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-slate-900 text-sm mb-1">{f.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pack grid */}
      <PacksSection freePack={freePack} paidPacks={paidPacks} />

      {/* Season Pass pricing card */}
      <section className="bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">Season Pass</p>
          <div className="text-5xl font-extrabold text-white mb-2">£29</div>
          <p className="text-slate-400 mb-8 text-lg">One payment. All 10 packs. No subscription.</p>
          <ul className="flex flex-col sm:flex-row justify-center gap-x-8 gap-y-2 text-sm text-slate-300 mb-10">
            {["All 10 prep packs", "Instant access", "Updated each application season", "PwC, Goldman, Google + 7 more"].map((item) => (
              <li key={item} className="flex items-center gap-2 justify-center sm:justify-start">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-semibold px-10 py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg shadow-lg shadow-orange-500/20"
          >
            Buy Season Pass — £29
          </Link>
          <p className="text-slate-500 text-xs mt-4">Less than the cost of one hour of careers tutoring.</p>
        </div>
      </section>
    </div>
  );
}
