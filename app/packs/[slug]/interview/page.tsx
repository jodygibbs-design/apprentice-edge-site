import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { getPackBySlug, PACKS } from "@/lib/packs";
import MockInterview from "@/app/components/MockInterview";
import PackTabBar from "@/app/components/PackTabBar";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

const PSYCHOMETRIC_SLUGS = ["pwc", "deloitte", "goldman-sachs"];

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
    title: `${pack.company} Practice Interview — ApprenticeEdge`,
    description: `AI mock interview coach for ${pack.company} apprenticeship applications. Grounded on the ${pack.company} prep pack.`,
  };
}

export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const pack = getPackBySlug(slug);
  if (!pack) notFound();

  const cookieStore = await cookies();
  const paid = cookieStore.get("ae_access")?.value === "paid";

  if (!paid) {
    redirect("/checkout");
  }

  const hasPsychometric = PSYCHOMETRIC_SLUGS.includes(slug) &&
    fs.existsSync(path.join(process.cwd(), "content", "psychometric", `${slug}.json`));

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
            <span className="text-slate-600">Practice Interview</span>
          </p>
          <PackTabBar slug={slug} paid={true} hasPsychometric={hasPsychometric} companyName={pack.company} activeTab="interview" />
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/${pack.logoFile}`} alt={pack.company} className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">{pack.company} — Practice Interview</h1>
              <p className="text-slate-500 text-sm">AI coach trained on the {pack.company} pack content — not a generic tool · Not affiliated with {pack.company}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <MockInterview employer={slug} companyName={pack.company} />
        </div>
      </section>
    </div>
  );
}
