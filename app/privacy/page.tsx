import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ApprenticeEdge",
  description: "How ApprenticeEdge (Deep Cut Industries Limited) collects, uses, and protects your personal data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: May 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Who we are</h2>
          <p>
            ApprenticeEdge is a product of Deep Cut Industries Limited, a company registered in England and Wales
            (company number 17231642). We are the data controller for personal information collected through this website.
          </p>
          <p className="mt-2">
            Contact: <a href="mailto:admin@deepcutindustries.com" className="text-blue-600 hover:underline">admin@deepcutindustries.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">What data we collect and why</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-800">Email address (free pack gate)</p>
              <p>
                When you unlock the free PwC pack, we ask for your email address. We use this to send you
                access confirmation and to identify you as having unlocked the free pack. The legal basis
                for this processing is the performance of a service you have requested (UK GDPR Article 6(1)(b)).
              </p>
              <p className="mt-1">
                If you separately opt in to marketing, we may also send you updates about new packs and offers.
                The legal basis for marketing is consent (UK GDPR Article 6(1)(a)), which you can withdraw at any time.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Payment information (Season Pass purchase)</p>
              <p>
                Payments are processed by Stripe, Inc. We do not store your card number, sort code, or bank details.
                Stripe acts as a data processor on our behalf. When you purchase, Stripe collects your name,
                email address, card details, and billing address. Stripe&apos;s privacy policy is available at
                stripe.com/gb/privacy.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Usage data</p>
              <p>
                We use Vercel to host this site. Vercel may collect basic request logs (IP address, browser type,
                pages visited) for security and performance purposes. We do not use analytics cookies or tracking pixels.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Third-party services</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>MailerLite</strong> — email delivery. Your email address is stored on MailerLite&apos;s servers (EU-based). MailerLite&apos;s privacy policy: mailerlite.com/legal/privacy-policy.</li>
            <li><strong>Stripe</strong> — payment processing. Stripe&apos;s privacy policy: stripe.com/gb/privacy.</li>
            <li><strong>Vercel</strong> — website hosting. Vercel&apos;s privacy policy: vercel.com/legal/privacy-policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">How long we keep your data</h2>
          <p>
            We retain your email address until you unsubscribe or request deletion. Payment records are retained
            by Stripe in accordance with their data retention policy and applicable financial regulations.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Your rights</h2>
          <p>
            Under UK GDPR you have the right to access the data we hold about you, request corrections,
            request deletion, withdraw marketing consent at any time, and lodge a complaint with the ICO
            at <a href="https://ico.org.uk" className="text-blue-600 hover:underline">ico.org.uk</a>.
          </p>
          <p className="mt-2">
            To exercise any of these rights, email{" "}
            <a href="mailto:admin@deepcutindustries.com" className="text-blue-600 hover:underline">admin@deepcutindustries.com</a>.
            We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Cookies and local storage</h2>
          <p>
            This site does not use tracking or advertising cookies. To remember that you have unlocked the
            free pack, we store a flag in your browser&apos;s localStorage (a key called <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">ae_unlocked</code>).
            This stays on your device and is never sent to our servers. You can clear it at any time by
            clearing your browser&apos;s site data.
          </p>
          <p className="mt-2">
            For paid Season Pass access, your purchase is verified via Stripe. No payment data is stored locally.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Changes to this policy</h2>
          <p>
            We may update this policy occasionally. The date at the top of this page shows when it was last revised.
            Continued use of the site after a policy update constitutes acceptance of the revised policy.
          </p>
        </section>

      </div>
    </div>
  );
}
