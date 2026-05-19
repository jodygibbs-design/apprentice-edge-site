import Link from "next/link";
import { PACKS } from "@/lib/packs";

export default function HomePage() {
  const freePack = PACKS.find((p) => p.free)!;
  const paidPacks = PACKS.filter((p) => !p.free);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Get into the UK&apos;s most competitive<br />apprenticeships.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Prep packs written for school leavers applying to PwC, Deloitte, Goldman Sachs, Google,
          Amazon, the Civil Service, and more. No tutor. No expensive course. Just what you actually need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/packs/${freePack.slug}`}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Read the free PwC pack →
          </Link>
          <Link
            href="/checkout"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors"
          >
            Get all 10 packs — £29
          </Link>
        </div>
      </div>

      {/* What's in a pack */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Every pack includes:</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
          {[
            "The exact application stages — what to expect at each round",
            "Company-specific competencies and what they really mean",
            "Interview questions they actually ask",
            "Commercial awareness — the numbers and context that matter",
            "Why this company over competitors — a model answer",
            "Pre-submission checklist",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pack list */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">All 10 programmes</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        <Link
          href={`/packs/${freePack.slug}`}
          className="border-2 border-blue-500 rounded-xl p-5 hover:bg-blue-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900">{freePack.title}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Free</span>
          </div>
          <p className="text-sm text-gray-500">Read now — no sign-up required</p>
        </Link>

        {paidPacks.map((pack) => (
          <Link
            key={pack.slug}
            href="/checkout"
            className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-900">{pack.title}</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium">Season Pass</span>
            </div>
            <p className="text-sm text-gray-500">Included in the £29 Season Pass</p>
          </Link>
        ))}
      </div>

      {/* Season Pass CTA */}
      <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Season Pass — £29</h2>
        <p className="text-gray-400 mb-6">
          All 10 prep packs. One payment. Instant access. Updated before every application season.
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Buy now — £29
        </Link>
      </div>
    </div>
  );
}
