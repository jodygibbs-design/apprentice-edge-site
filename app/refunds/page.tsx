import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy: ApprenticeEdge",
  description:
    "When ApprenticeEdge refunds the £29 Season Pass, how the 14-day cancellation right works for digital content, and how to ask for a refund.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Refund Policy</h1>
      <p className="text-slate-500 text-sm mb-10">Last updated: September 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">The short version</h2>
          <p>
            The Season Pass unlocks everything the moment you pay, so it is treated as digital content delivered
            immediately. That means the usual 14-day cooling off period does not apply once you have access. If
            something is wrong with what you bought, or you were charged twice, we will put it right.
          </p>
          <p className="mt-2">
            This is why we make the PwC pack free to read first. Check the material is what you want before paying
            for the other nine.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Your cancellation right, and why it does not apply here</h2>
          <p>
            Under the Consumer Contracts Regulations 2013 you normally have 14 days to cancel something bought
            online. For digital content downloaded or streamed immediately, that right does not apply if you asked
            for immediate access and acknowledged that you would lose the right to cancel.
          </p>
          <p className="mt-2">
            That is what happens at checkout. Before paying, you are told that you get immediate access and that you
            agree to waive the 14-day cancellation right for digital content. Completing the purchase is your
            consent and acknowledgement.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">When we will refund you</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-800">The content is faulty or not as described</p>
              <p>
                Under the Consumer Rights Act 2015 digital content must be of satisfactory quality, fit for purpose,
                and as described. If it is not, you are entitled to a repair or replacement, or a price reduction
                which can be up to the full amount. This right cannot be waived and nothing above affects it.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">You were charged more than once</p>
              <p>
                If a payment went through twice for the same purchase, tell us and we will refund the duplicate in
                full. You do not need to argue the point.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">You never got access</p>
              <p>
                If you paid and could not get in, try{" "}
                <a href="/restore-access" className="text-blue-600 hover:underline">Restore access</a> first, which
                fixes most cases. If that does not work, email us. We will either restore your access or refund you
                in full. You will not be left having paid for something you could not open.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">You bought it by mistake and have not used it</p>
              <p>
                We are not obliged to refund in this situation, but if you contact us promptly and have not worked
                through the material, we will normally refund as a matter of goodwill. Ask.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">When we will not refund</h2>
          <p>
            We will not refund because an application was unsuccessful. We sell preparation material, not an outcome,
            and we say so plainly before you buy. Nor will we refund someone who has worked through the packs and
            then asks for their money back, since at that point the content has been delivered and consumed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">How to ask</h2>
          <p>
            Email{" "}
            <a href="mailto:admin@deepcutindustries.com" className="text-blue-600 hover:underline">
              admin@deepcutindustries.com
            </a>{" "}
            from the address you bought with, or tell us what address you used. Say what went wrong. You do not need
            a receipt number, though it helps if you have the Stripe confirmation email.
          </p>
          <p className="mt-2">
            We aim to reply within three working days. Approved refunds go back to the card you paid with through
            Stripe, and typically take five to ten working days to appear depending on your bank.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">Your statutory rights</h2>
          <p>
            Nothing in this policy reduces your legal rights as a consumer. If you are unhappy with how we have
            handled a refund, you can get free advice from Citizens Advice.
          </p>
        </section>

      </div>
    </div>
  );
}
