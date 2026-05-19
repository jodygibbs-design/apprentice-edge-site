import { PACKS } from "@/lib/packs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApprenticeEdge Season Pass — £29",
  description: "All 10 UK apprenticeship prep packs for £29. PwC, Deloitte, KPMG, EY, Goldman Sachs, Google, Amazon, Civil Service, BBC, NHS.",
};

export default function CheckoutPage() {
  const packs = PACKS;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Season Pass</h1>
        <p className="text-5xl font-bold text-blue-600 mb-2">£29</p>
        <p className="text-gray-500">One payment. All 10 packs. Instant access.</p>
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
      </div>

      {/* Stripe payment button placeholder */}
      <div className="text-center">
        <button
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors cursor-not-allowed opacity-80"
          disabled
        >
          Buy now — £29 (coming soon)
        </button>
        <p className="text-xs text-gray-400 mt-3">
          Stripe payment coming soon. Email{" "}
          <a href="mailto:hello@apprenticeedge.co.uk" className="underline">
            hello@apprenticeedge.co.uk
          </a>{" "}
          to get early access.
        </p>
      </div>
    </div>
  );
}
