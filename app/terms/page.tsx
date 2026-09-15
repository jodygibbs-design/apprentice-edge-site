import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service: ApprenticeEdge",
  description:
    "The terms on which ApprenticeEdge (Deep Cut Industries Limited) sells the Season Pass and provides access to prep packs, mock interviews and practice tests.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: September 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Who we are</h2>
          <p>
            ApprenticeEdge is a product of Deep Cut Industries Limited, a company registered in England and Wales
            (company number 17231642).
          </p>
          <p className="mt-2">
            Contact:{" "}
            <a href="mailto:admin@deepcutindustries.com" className="text-blue-600 hover:underline">
              admin@deepcutindustries.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">What these terms cover</h2>
          <p>
            These terms apply when you use this website or buy the Season Pass. By doing either, you accept them.
            If you do not accept them, please do not use the site.
          </p>
          <p className="mt-2">
            Separate documents cover how we handle your data (our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>) and when we refund
            (our <a href="/refunds" className="text-blue-600 hover:underline">Refund Policy</a>). Both form part
            of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">What you are buying</h2>
          <p>
            The Season Pass costs £29 as a single payment. It includes all ten employer prep packs, the AI mock
            interview practice, and the timed practice tests, for the 2026/27 application season. Access runs until
            31 August 2027.
          </p>
          <p className="mt-2">
            The PwC pack is free to read without payment. You give us an email address to unlock it. It is there so
            you can judge the quality of the material before deciding whether to buy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">How access works</h2>
          <p>
            Access is recorded in your browser, so it is tied to the device and browser you bought on rather than to
            an account with a password. If you clear your browser data, or want access on a second device, use{" "}
            <a href="/restore-access" className="text-blue-600 hover:underline">Restore access</a> with the email
            address you bought with.
          </p>
          <p className="mt-2">
            If restore does not work, email us. We will sort it out. Losing access for a technical reason is not a
            reason for us to stop you reading what you paid for.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">What you may and may not do with the content</h2>
          <p>
            The Season Pass buys you a personal licence to read and use the material for your own applications. You
            may print it and keep your own copies.
          </p>
          <p className="mt-2">
            You may not republish it, resell it, share your access with people who have not paid, or use the content
            to build a competing product. The material is our copyright.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">What we do not promise</h2>
          <p>
            We do not promise you will get an interview, an offer, or a place on any scheme. No preparation provider
            can honestly promise that, and we will not pretend otherwise. What we sell is preparation material, not
            an outcome.
          </p>
          <p className="mt-2">
            We are not affiliated with, endorsed by, or partnered with any of the employers named on this site. Pack
            and guide content is based on publicly available information and our own research. Employers change their
            application processes, sometimes mid-season, so always check the employer&apos;s official website for the
            current process and deadlines.
          </p>
          <p className="mt-2">
            The AI mock interview produces practice questions and feedback automatically. It is a rehearsal tool. It
            is not a real assessor, it does not reflect any employer&apos;s actual scoring, and it can be wrong.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Availability</h2>
          <p>
            We aim to keep the site available throughout the season, but we do not guarantee uninterrupted access.
            We may need to take it down for maintenance, and parts of it depend on third party services such as our
            payment and email providers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Our liability to you</h2>
          <p>
            Nothing in these terms limits our liability for death or personal injury caused by our negligence, for
            fraud, or for anything else that cannot be limited under English law. Your statutory rights as a consumer
            are not affected by anything written here.
          </p>
          <p className="mt-2">
            Subject to that, our total liability to you in connection with the Season Pass is limited to the amount
            you paid for it. We are not liable for indirect or consequential loss, or for the outcome of any
            application you make.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Ending access</h2>
          <p>
            We may withdraw access without a refund if you redistribute the content, attempt to break the site, or
            use it in a way that damages other users. We will tell you why.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Changes to these terms</h2>
          <p>
            We may update these terms. The version that applies to your purchase is the version published when you
            bought. We will not change the substance of what you bought after you have paid for it.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Governing law</h2>
          <p>
            These terms are governed by the law of England and Wales, and disputes may be brought in the courts of
            England and Wales. If you live elsewhere in the UK, you may also bring proceedings in your own courts.
          </p>
        </section>

      </div>
    </div>
  );
}
