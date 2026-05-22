import { notFound } from "next/navigation";
import Link from "next/link";
import { PACKS, getPackBySlug, getPackContent, getPackContentSplit } from "@/lib/packs";
import EmailGate from "@/app/components/EmailGate";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PACKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return {};
  return {
    title: `${pack.title} Apprenticeship Prep Pack — ApprenticeEdge`,
    description: `Prep pack for the ${pack.title} apprenticeship. Application stages, interview questions, competencies, and commercial awareness — everything a UK school leaver needs.`,
  };
}

const INCLUDED = [
  "Application stages — what to expect at every round",
  "Company-specific competencies and what they really test",
  "Real interview questions with answer guidance",
  "Commercial awareness — key numbers and context",
  "Why this company — a model answer framework",
  "Pre-submission checklist",
];

export default async function PackPage({ params }: Props) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);

  if (!pack) notFound();

  if (!pack.free) {
    return (
      <div>
        {/* Gate hero */}
        <section className="bg-white border-b border-slate-100">
          <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Season Pass
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {pack.title} Apprenticeship<br />Prep Pack
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

        {/* What's included */}
        <section className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-xl mx-auto px-6 py-12">
            <h2 className="text-lg font-bold text-slate-900 mb-5">This pack includes:</h2>
            <ul className="space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Try free pack nudge */}
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

  const { preview, full } = await getPackContentSplit(pack.filename);

  return (
    <div>
      {/* Pack header */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">ApprenticeEdge</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">{pack.title}</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Free pack
            </span>
            <span className="text-slate-400 text-xs">Enter your email to unlock</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{pack.title} Apprenticeship</h1>
          <p className="text-slate-500">Insider prep pack — application stages, competencies, interview questions, and commercial context.</p>
        </div>
      </section>

      {/* Content with email gate */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <EmailGate preview={preview} full={full} />
        </div>
      </section>

      {/* Season Pass CTA */}
      <section className="bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">Want all 10 packs?</p>
          <h2 className="text-2xl font-bold text-white mb-3">Season Pass — £29</h2>
          <p className="text-slate-400 mb-6 text-sm max-w-md mx-auto">
            Deloitte, KPMG, EY, Goldman Sachs, Google, Amazon, Civil Service, BBC, NHS — all included.
            One payment. Instant access.
          </p>
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Get the Season Pass — £29
          </Link>
        </div>
      </section>
    </div>
  );
}
