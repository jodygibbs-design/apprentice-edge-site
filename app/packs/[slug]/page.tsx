import { notFound } from "next/navigation";
import Link from "next/link";
import { PACKS, getPackBySlug, getPackContent } from "@/lib/packs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PACKS.filter((p) => p.free).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return {};
  return {
    title: `${pack.title} Apprenticeship Prep Pack — ApprenticeEdge`,
    description: `Free prep pack for the ${pack.title} apprenticeship. Application stages, interview questions, competencies, and commercial awareness — everything a UK school leaver needs.`,
  };
}

export default async function PackPage({ params }: Props) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);

  if (!pack) notFound();

  if (!pack.free) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{pack.title}</h1>
        <p className="text-gray-600 mb-8">
          This prep pack is included in the ApprenticeEdge Season Pass.
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get the Season Pass — £29
        </Link>
        <p className="text-sm text-gray-400 mt-4">All 10 packs. One payment. Instant access.</p>
      </div>
    );
  }

  const html = await getPackContent(pack.filename);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:underline">ApprenticeEdge</Link>
        {" / "}
        <span>{pack.title}</span>
      </p>

      {/* Free badge */}
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm px-3 py-1 rounded-full mb-6">
        <span className="font-medium">Free pack</span>
      </div>

      {/* Content */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* CTA at bottom */}
      <div className="mt-16 bg-gray-900 text-white rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Want all 10 packs?</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Deloitte, KPMG, EY, Goldman Sachs, Google, Amazon, Civil Service, BBC, NHS — all included.
        </p>
        <Link
          href="/checkout"
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Get the Season Pass — £29
        </Link>
      </div>
    </div>
  );
}
