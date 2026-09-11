import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful: ApprenticeEdge",
  // A post-checkout receipt page, reached only with a Stripe session_id. It has no search
  // value and should never be a landing page, so it gets noindex rather than a canonical.
  robots: { index: false, follow: false },
};

// Stripe still appends ?session_id= to this URL. Nothing reads it any more: it existed to
// give the Google Ads purchase conversion a transaction_id, and that tag is gone. Left in the
// success_url because /api/grant-access uses it on the way here.
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
        Your Season Pass is active. All 10 prep packs are unlocked on this device, 
        plus <strong className="text-gray-700">AI mock interviews</strong> for every employer and{" "}
        <strong className="text-gray-700">psychometric practice tests</strong>, all included.
      </p>
      <p className="text-gray-500 mb-2 text-sm">
        Open any pack and use the <em>Practice Interview</em> and <em>Practice Tests</em> tabs to start.
      </p>
      <p className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-8 max-w-md mx-auto">
        Access is saved to this browser. On another device?{" "}
        <Link href="/restore-access" className="underline font-medium">
          Restore access
        </Link>{" "}
        using your purchase email: no need to email us.
      </p>
      <Link
        href="/packs"
        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Go to my packs →
      </Link>
      <p className="text-xs text-gray-400 mt-6">
        A confirmation email and a Stripe payment receipt are on their way to your inbox. Questions? Email{" "}
        <a href="mailto:admin@deepcutindustries.com" className="underline">admin@deepcutindustries.com</a>
      </p>
    </div>
  );
}
