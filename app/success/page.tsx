import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful — ApprenticeEdge",
};

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16L13 23L26 9" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">You&apos;re in.</h1>
      <p className="text-gray-500 mb-2">
        Your Season Pass is active. All 10 prep packs are now unlocked on this device.
      </p>
      <p className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-8 max-w-md mx-auto">
        Access is saved to this browser. If you want to read on another device, email{" "}
        <a href="mailto:admin@deepcutindustries.com" className="underline font-medium">admin@deepcutindustries.com</a>{" "}
        with your receipt and we&apos;ll sort it.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Go to my packs →
      </Link>
      <p className="text-xs text-gray-400 mt-6">
        Receipt sent to your email by Stripe. Questions? Email{" "}
        <a href="mailto:admin@deepcutindustries.com" className="underline">admin@deepcutindustries.com</a>
      </p>
    </div>
  );
}
