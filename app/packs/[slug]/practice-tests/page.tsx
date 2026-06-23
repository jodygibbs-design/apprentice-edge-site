import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getPackBySlug, PACKS } from "@/lib/packs";
import PsychometricTest from "@/app/components/PsychometricTest";
import type { Metadata } from "next";
import path from "path";
import fs from "fs";

interface Props {
  params: Promise<{ slug: string }>;
}

// Slugs that have a psychometric question bank
const PSYCHOMETRIC_SLUGS = ["pwc", "deloitte", "goldman-sachs"];

export async function generateStaticParams() {
  return PSYCHOMETRIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) return {};
  return {
    title: `${pack.company} Practice Tests — ApprenticeEdge`,
    description: `Numerical, verbal, and situational judgement practice tests for the ${pack.company} apprenticeship application.`,
  };
}

export default async function PracticeTestsPage({ params }: Props) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const cookieStore = await cookies();
  const paid = cookieStore.get("ae_access")?.value === "paid";

  if (!paid) {
    redirect("/checkout");
  }

  // Load question bank — 404 if no bank exists for this employer
  const bankPath = path.join(process.cwd(), "content", "psychometric", `${slug}.json`);
  if (!fs.existsSync(bankPath)) {
    notFound();
  }
  const bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));

  return (
    <div>
      <section
        className="border-b border-slate-200"
        style={{
          background: `linear-gradient(160deg, ${pack.brandColorLight} 0%, #ffffff 65%)`,
          borderTopColor: pack.brandColor,
          borderTopWidth: 4,
          borderTopStyle: "solid",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <p className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">ApprenticeEdge</Link>
            <span className="mx-2">›</span>
            <Link href={`/packs/${slug}`} className="hover:text-slate-600 transition-colors">{pack.title}</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Practice Tests</span>
          </p>

          {/* Tab bar */}
          <div className="flex gap-1 bg-white/60 rounded-xl p-1 border border-slate-200 w-fit mb-4">
            <Link
              href={`/packs/${slug}`}
              className="text-sm px-4 py-2 rounded-lg text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              Pack Guide
            </Link>
            <Link
              href={`/packs/${slug}/interview`}
              className="text-sm px-4 py-2 rounded-lg text-slate-500 hover:text-slate-700 transition-colors font-medium"
            >
              Practice Interview
            </Link>
            <span className="text-sm px-4 py-2 rounded-lg bg-white shadow-sm text-indigo-700 font-semibold border border-slate-200">
              Practice Tests
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${pack.logoFile}`} alt={pack.company} className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">{pack.company} — Practice Tests</h1>
              <p className="text-slate-500 text-sm">Numerical · Verbal · Situational Judgement · Not affiliated with {pack.company}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <PsychometricTest bank={bank} companyName={pack.company} />
        </div>
      </section>
    </div>
  );
}
