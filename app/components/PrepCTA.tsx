import Link from "next/link";

/**
 * Shared conversion block for the generic (non employer-specific) Ads landing pages.
 *
 * Primary action is the free PwC pack, not the £29 checkout: that page carries the
 * EmailGate, which fires the "Lead - Email Signup" conversion and drops the visitor
 * into the nurture sequence. Cold generic traffic almost never buys on first visit,
 * so the lead is the conversion we are actually paying for here.
 */
export default function PrepCTA({ context }: { context: string }) {
  return (
    <div className="rounded-2xl p-8 my-10 text-center" style={{ background: "linear-gradient(160deg, #0A1628 0%, #0F2340 100%)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#C4922A" }}>
        Free prep pack
      </p>
      <h2 className="text-xl font-bold text-white mb-3">{context}</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
        The full PwC School Leaver pack is free: application stages, the competencies they score,
        real interview questions, commercial awareness, and a pre-submission checklist. The process
        it walks through is close enough to the other big schemes to prep you for all of them.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/packs/pwc"
          className="inline-block bg-[#C4922A] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#B07E20] transition-colors"
        >
          Read the free PwC pack
        </Link>
        <Link href="/checkout" className="text-slate-400 text-sm hover:text-white transition-colors">
          Or get all 10 employers, Season Pass £29
        </Link>
      </div>
    </div>
  );
}
