import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ApprenticeEdge",
  description:
    "How to reach ApprenticeEdge (Deep Cut Industries Limited) about access problems, refunds, data requests, or anything else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact</h1>
      <p className="text-slate-500 text-sm mb-10">
        A real person reads these. There is no support ticket system and no chatbot.
      </p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Email us</h2>
          <p>
            <a
              href="mailto:admin@deepcutindustries.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              admin@deepcutindustries.com
            </a>
          </p>
          <p className="mt-2">
            We aim to reply within three working days. If your message is about a purchase, send it from the address
            you bought with, or tell us which address you used, so we can find the payment.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Try this first: lost access</h2>
          <p>
            Access is saved in your browser rather than to an account, so it disappears if you clear your browser
            data or switch device. Most cases are fixed in a few seconds by{" "}
            <a href="/restore-access" className="text-blue-600 hover:underline">Restore access</a> using the email
            address you bought with.
          </p>
          <p className="mt-2">If that does not work, email us and we will restore it manually.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Refunds and billing</h2>
          <p>
            Our <a href="/refunds" className="text-blue-600 hover:underline">Refund Policy</a> sets out when we
            refund. Short version: duplicate charges, faulty content, and paid-but-no-access are all put right.
            Email the same address.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Your data</h2>
          <p>
            To see what we hold, correct it, delete it, or unsubscribe from marketing, email us and say what you
            want. Our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> explains what
            we collect and the legal basis for it.
          </p>
          <p className="mt-2">
            Every marketing email also has an unsubscribe link, which works immediately and does not affect access
            to anything you have paid for.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Errors in a pack or guide</h2>
          <p>
            If you spot something out of date or wrong, please tell us. Employers change their processes during the
            season and corrections from readers are genuinely useful. Include the page address if you can.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Company details</h2>
          <p>
            ApprenticeEdge is a product of Deep Cut Industries Limited, registered in England and Wales, company
            number 17231642.
          </p>
          <p className="mt-2">
            We are not affiliated with, endorsed by, or partnered with any of the employers named on this site. If
            you are trying to reach one of them, you will need their own careers team.
          </p>
        </section>

      </div>
    </div>
  );
}
