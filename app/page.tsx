import Link from "next/link";
import { PACKS } from "@/lib/packs";
import HeroContent from "@/app/components/HeroContent";
import PacksSection from "@/app/components/PacksSection";

const COMPANY_LOGOS = [
  { name: "PwC", file: "pwc.svg", lg: true },
  { name: "Deloitte", file: "deloitte.svg" },
  { name: "KPMG", file: "kpmg.svg" },
  { name: "EY", file: "ey.svg", lg: true },
  { name: "Goldman Sachs", file: "goldman-sachs.svg", lg: true },
  { name: "Google", file: "google.svg" },
  { name: "Amazon", file: "amazon.svg" },
  { name: "Civil Service", file: "civil-service.svg", lg: true },
  { name: "BBC", file: "bbc.svg" },
  { name: "NHS", file: "nhs.svg" },
];

const FEATURES = [
  { label: "Exact application stages", desc: "What to expect at every round, from online form to final interview" },
  { label: "Company-specific competencies", desc: "What each employer actually tests for — and what they don't" },
  { label: "Real interview questions", desc: "Questions they actually ask, with notes on what a strong answer looks like" },
  { label: "Commercial awareness", desc: "The numbers and context that impress interviewers, not generic business chat" },
  { label: "Why this company — model answer", desc: "A framework for the hardest question that catches most candidates off guard" },
  { label: "Pre-submission checklist", desc: "A final-pass checklist so nothing gets submitted half-prepared" },
];

export default function HomePage() {
  const freePack = PACKS.find((p) => p.free)!;
  const paidPacks = PACKS.filter((p) => !p.free);

  return (
    <div>
      {/* Hero — self-contained with dark/light toggle */}
      <HeroContent freePackSlug={freePack.slug} />

      {/* Company logos bar */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">
            Packs available for
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-5">
            {COMPANY_LOGOS.map(({ name, file, lg }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={file}
                src={`/logos/${file}`}
                alt={name}
                className={`${lg ? "logo-bar-img-lg" : "logo-bar-img"} grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-200`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Problem statement — dark impact band */}
      <section style={{ backgroundColor: "#0A1628" }}>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#F97316" }}>
            The reality
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: "white" }}>
            Most applicants turn up underprepared
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#94A3B8" }}>
            Apprentices who are offered PwC or Goldman Sachs places didn&apos;t get lucky.
            They knew the application process inside-out — the exact competencies, the situational judgement format,
            the commercial context. ApprenticeEdge gives you that same knowledge,
            without the £500 tutoring sessions.
          </p>
        </div>
      </section>

      {/* What's in every pack */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C4922A" }}>
              What you get
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              What&apos;s in every pack
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">Six sections, written specifically for the company it covers. No generic advice.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                style={{ borderLeftWidth: 3, borderLeftColor: "#2563EB" }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#EEF2FF" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-bold text-slate-900 mb-2">{f.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pack grid */}
      <PacksSection freePack={freePack} paidPacks={paidPacks} />

      {/* Season Pass pricing — bold dark section */}
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #0F2340 100%)" }}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#C4922A" }}>
            Season Pass
          </p>
          <div className="text-6xl font-extrabold mb-3" style={{ color: "white" }}>£29</div>
          <p className="text-xl mb-10" style={{ color: "#94A3B8" }}>One payment. All 10 packs. No subscription.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-xl mx-auto">
            {[
              { val: "10", lbl: "prep packs" },
              { val: "∞", lbl: "re-reads" },
              { val: "£29", lbl: "total cost" },
              { val: "vs £500+", lbl: "tutoring" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="rounded-xl py-4 px-3" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-xl font-extrabold" style={{ color: "white" }}>{val}</div>
                <div className="text-xs mt-1" style={{ color: "#64748B" }}>{lbl}</div>
              </div>
            ))}
          </div>
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-bold px-12 py-5 rounded-xl hover:bg-orange-400 transition-colors text-lg"
            style={{ boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}
          >
            Buy Season Pass — £29
          </Link>
          <p className="text-xs mt-5" style={{ color: "#475569" }}>Less than the cost of one hour of careers tutoring.</p>
        </div>
      </section>
    </div>
  );
}
