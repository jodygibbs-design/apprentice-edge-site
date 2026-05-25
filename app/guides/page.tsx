import { COMPANIES, TOPICS } from "@/lib/seo-guides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Apprenticeship Guides — ApprenticeEdge",
  description:
    "Free, detailed guides for every stage of the UK's most competitive school leaver apprenticeship applications — PwC, Goldman Sachs, Deloitte, KPMG, EY, Google, Amazon, Civil Service, BBC, and NHS.",
};

const FEATURED_TOPICS = [
  "interview-questions",
  "assessment-centre",
  "application-tips",
  "competencies",
  "stage-by-stage",
  "salary",
];

export default function GuidesIndexPage() {
  const featuredTopics = TOPICS.filter((t) => FEATURED_TOPICS.includes(t.slug));
  const topicOrder = FEATURED_TOPICS.map((slug) =>
    featuredTopics.find((t) => t.slug === slug)!
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
          Free Guides
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          UK Apprenticeship Application Guides
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Company-specific prep guides for every stage of the UK&apos;s most competitive
          school leaver applications — interview questions, assessment centres, competencies,
          and more. All free.
        </p>
      </div>

      {/* Company grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {COMPANIES.map((company) => (
          <div
            key={company.slug}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-lg">{company.name}</h2>
              <span className="text-xs text-slate-500 font-medium">{company.programmeType}</span>
            </div>
            <div className="px-5 py-4">
              <ul className="space-y-2">
                {topicOrder.map((topic) => (
                  <li key={topic.slug}>
                    <a
                      href={`/guides/${company.slug}/${topic.slug}/`}
                      className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors group"
                    >
                      <span className="text-slate-300 group-hover:text-blue-400">→</span>
                      {topic.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`/guides/${company.slug}/interview-questions/`}
                className="mt-4 inline-block text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                All {company.name} guides →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Topic browse section */}
      <div className="mt-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Browse by topic</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((topic) => (
            <div key={topic.slug} className="bg-white rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-900 text-sm mb-2">{topic.label}</p>
              <ul className="space-y-1">
                {COMPANIES.slice(0, 4).map((company) => (
                  <li key={company.slug}>
                    <a
                      href={`/guides/${company.slug}/${topic.slug}/`}
                      className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {company.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`/guides/${COMPANIES[4].slug}/${topic.slug}/`}
                    className="text-xs text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    + {COMPANIES.length - 4} more
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 bg-[#0D1B2A] rounded-2xl p-8 text-center">
        <p className="text-white font-bold text-xl mb-2">Want the full prep pack?</p>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Guides give you the framework. Prep packs give you the insider detail — worked STAR
          examples, mock questions, company-specific tips, and the exact things assessors mark
          you on.
        </p>
        <a
          href="/checkout"
          className="inline-block bg-[#C4922A] text-white font-bold px-8 py-3 rounded-lg text-sm hover:bg-[#B07E20] transition-colors"
        >
          Get all 10 packs — Season Pass £29
        </a>
      </div>
    </div>
  );
}
