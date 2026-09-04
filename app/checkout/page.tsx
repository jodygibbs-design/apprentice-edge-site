import { PACKS } from "@/lib/packs";
import type { Metadata } from "next";
import BuyButton from "@/app/components/BuyButton";

export const metadata: Metadata = {
  title: "ApprenticeEdge Season Pass, £29",
  description: "All 10 UK apprenticeship prep packs for £29. PwC, Deloitte, KPMG, EY, Goldman Sachs, Google, Amazon, Civil Service, BBC, NHS.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  const packs = PACKS;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Season Pass</h1>
        <p className="text-5xl font-bold text-blue-600 mb-2">£29</p>
        <p className="text-gray-500">One payment. All 10 packs. Instant access.</p>
        <p className="text-sm text-gray-400 mt-1">Valid for the full 2026/27 application season: access until 31 August 2027.</p>
      </div>

      <div className="border border-gray-200 rounded-2xl p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h2>
        <ul className="space-y-2">
          {packs.map((pack) => (
            <li key={pack.slug} className="flex items-center gap-3 text-gray-700">
              <span className="text-green-500">✓</span>
              <span>{pack.title}</span>
              {pack.free && (
                <span className="text-xs text-gray-400 ml-auto">also free to read</span>
              )}
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 mt-4 pt-4">
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-green-500">✓</span>
              <span>AI mock interviews: a practice coach for every employer, unlimited sessions</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <span className="text-green-500">✓</span>
              <span>Practice tests: numerical, verbal &amp; situational judgement, timed and scored</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center mb-4">
        Not sure? <a href="/packs/pwc" className="text-blue-600 underline">Read the free PwC pack first</a>: 
        the other nine are exactly this, for their employer.
      </p>

      <BuyButton />

      <p className="text-xs text-gray-400 text-center mt-3">
        Secure payment via Stripe. Instant access after purchase.
      </p>
      <p className="text-xs text-gray-400 text-center mt-1">
        By purchasing you get immediate access and agree to waive the 14-day cancellation right for digital content.
      </p>
      <p className="text-xs text-gray-400 text-center mt-1">
        Access is saved to this device. Need it on another device?{" "}
        <a href="/restore-access" className="underline hover:text-gray-600">Restore access</a>{" "}
        using your purchase email.
      </p>
    </div>
  );
}
