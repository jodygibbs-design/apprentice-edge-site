import { PACKS } from "@/lib/packs";
import type { Metadata } from "next";
import BuyButton from "@/app/components/BuyButton";

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

      <BuyButton />

      <p className="text-xs text-gray-400 text-center mt-3">
        Secure payment via Stripe. Instant access after purchase.
      </p>
    </div>
  );
}
