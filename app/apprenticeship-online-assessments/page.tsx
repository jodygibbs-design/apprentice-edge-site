import type { Metadata } from "next";
import Link from "next/link";
import PrepCapture from "@/app/components/PrepCapture";

export const metadata: Metadata = {
  title: "Apprenticeship Online Assessments and Psychometric Tests · Free Guide",
  description:
    "How UK apprenticeship online assessments work: situational judgement, numerical reasoning and cognitive tests. Worked example questions, how each one is scored, and how to practise for free.",
  alternates: { canonical: "https://www.apprenticeedge.co.uk/apprenticeship-online-assessments" },
  openGraph: {
    title: "Apprenticeship Online Assessments and Psychometric Tests",
    description:
      "Worked examples for situational judgement, numerical reasoning and cognitive tests, plus how each one is actually scored.",
    type: "article",
  },
};

const WORKED = [
  {
    kind: "Numerical reasoning",
    question:
      "A firm's advisory division billed £4.2m in Q1 and £5.04m in Q2. If Q3 grows by the same percentage again, what will Q3 billings be?",
    options: ["£5.88m", "£6.05m", "£6.30m", "£5.44m"],
    answer: "£6.05m",
    working:
      "Q1 to Q2 is 5.04 ÷ 4.2 = 1.20, so 20% growth. Applying 20% again: 5.04 × 1.2 = £6.048m, which rounds to £6.05m. The trap answer is £5.88m, which is 5.04 plus the same absolute increase of £0.84m rather than the same percentage.",
  },
  {
    kind: "Numerical reasoning",
    question:
      "A team of 6 completes an audit in 10 working days. Assuming everyone works at the same rate, how long would 4 people take?",
    options: ["12 days", "13 days", "15 days", "16 days"],
    answer: "15 days",
    working:
      "Total work is 6 × 10 = 60 person-days. With 4 people, 60 ÷ 4 = 15 days. These questions are almost always about finding the constant, in this case total person-days, before dividing.",
  },
  {
    kind: "Verbal reasoning",
    question:
      "Passage: \"The firm has committed to net zero across its own operations by 2030, and expects its largest suppliers to publish transition plans by 2027.\" Statement: \"The firm requires all of its suppliers to reach net zero by 2027.\"",
    options: ["True", "False", "Cannot say"],
    answer: "False",
    working:
      "The passage says largest suppliers, not all suppliers, and says publish transition plans, not reach net zero. The statement contradicts the passage on both counts, so it is False rather than Cannot say. Cannot say is only correct when the passage is silent on the point.",
  },
  {
    kind: "Situational judgement",
    question:
      "You are two days from a client deadline and you notice an error in a spreadsheet a senior colleague prepared. What is the most effective response?",
    options: [
      "Fix it quietly and say nothing, to avoid embarrassing them",
      "Raise it with the colleague directly, showing them what you found",
      "Mention it to your manager rather than the colleague",
      "Leave it, as a senior colleague is more likely to be right than you are",
    ],
    answer: "Raise it with the colleague directly, showing them what you found",
    working:
      "Situational judgement tests reward the response that is direct, timely and proportionate. Going straight to the manager escalates unnecessarily. Fixing it silently hides a problem someone else needs to know about. Saying nothing because of seniority is the lowest-scoring option in nearly every bank.",
  },
];

export default function ApprenticeshipOnlineAssessmentsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-slate-600 transition-colors">ApprenticeEdge</Link>
            <span className="mx-2">›</span>
            <Link href="/apprenticeship-interview-preparation" className="hover:text-slate-600 transition-colors">
              Interview preparation
            </Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">Online assessments</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Apprenticeship Online Assessments and Psychometric Tests
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            The online tests are the stage that removes the largest number of applicants, and the
            stage where preparation makes the most difference, because the formats are published and
            practisable. Here is what each test is, how it is scored, and worked examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/packs/pwc"
              className="inline-block bg-[#0D1B2A] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1E3A5F] transition-colors text-sm text-center"
            >
              Get the free PwC prep pack
            </Link>
            <a
              href="#worked-examples"
              className="inline-block border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm text-center"
            >
              Jump to worked examples
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
            What you will be asked to sit
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Exact combinations vary by employer, and some run all of these in a single sitting. Most
            school leaver schemes use some mix of the following, delivered by an external provider
            such as SHL, Korn Ferry, Cubiks or Talent Q rather than built in-house.
          </p>
          <div className="space-y-4">
            {[
              {
                title: "Situational judgement test (SJT)",
                body: "Workplace scenarios with several possible responses. You either rate how effective each one is, or pick the most and least effective. It is scored against the employer's own competency framework, so the 'right' answer is the one that best matches how they say they work.",
              },
              {
                title: "Numerical reasoning",
                body: "Data interpretation under time pressure: percentages, ratios, rates and reading figures out of a table or chart. The maths itself rarely goes beyond GCSE. The difficulty is the clock and the deliberately similar answer options.",
              },
              {
                title: "Verbal reasoning",
                body: "A short passage and a set of statements to mark True, False or Cannot say. The single most common error is bringing in outside knowledge. You are only ever judging the statement against the passage in front of you.",
              },
              {
                title: "Cognitive or logical reasoning",
                body: "Pattern and sequence questions, often adaptive: get one right and the next gets harder. Because it adapts, accuracy early on matters more than finishing every question.",
              },
              {
                title: "Gamified assessments",
                body: "Some employers now use short game-style tasks measuring risk appetite, attention and processing speed. There is little you can revise, but doing a practice run so the interface is familiar removes most of the disadvantage.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>

          <h2 id="worked-examples" className="scroll-mt-20 text-2xl font-extrabold text-slate-900 tracking-tight mt-12 mb-4">
            Worked examples
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Four questions in the style you will actually see, with the reasoning written out. The
            working matters more than the answer: nearly every one of these has a trap option that
            catches people who guess the method.
          </p>
          <div className="space-y-5">
            {WORKED.map(({ kind, question, options, answer, working }, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{kind}</span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-slate-800 mb-3">{question}</p>
                  <ul className="space-y-1.5 mb-4">
                    {options.map((o) => (
                      <li
                        key={o}
                        className={`text-sm rounded-lg px-3 py-2 border ${
                          o === answer
                            ? "border-green-300 bg-green-50 text-green-900 font-semibold"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {o}
                        {o === answer && <span className="ml-2 text-xs font-normal">correct</span>}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Working</p>
                    <p className="text-sm text-slate-700">{working}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PrepCapture context="Practising is the whole game here" />

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-12 mb-4">
            How to prepare, in order
          </h2>
          <div className="space-y-4">
            {[
              {
                n: "1",
                title: "Find out which provider your employer uses",
                body: "It is usually named in the invitation email, and often on the employer's careers site. Provider matters more than employer: an SHL numerical test looks the same whichever company sent it.",
              },
              {
                n: "2",
                title: "Sit the provider's own free sample first",
                body: "SHL, Korn Ferry, Cubiks and Talent Q all publish free practice tests. Doing the real interface once is worth more than doing ten generic aptitude quizzes on an app.",
              },
              {
                n: "3",
                title: "Do one full run under real time pressure",
                body: "Untimed practice tells you whether you can do the maths. It does not tell you whether you can do it in 75 seconds a question, which is the actual test.",
              },
              {
                n: "4",
                title: "Review the ones you got wrong, not the ones you got right",
                body: "For numerical, work out whether you picked a trap option or made an arithmetic slip, because they need different fixes. For SJTs, work out why the highest-scoring answer beat your choice. That is how you build the intuition the test is measuring.",
              },
              {
                n: "5",
                title: "Set the day up properly",
                body: "Laptop rather than phone, strong connection, quiet room, and sit it when you are alert. Technical problems part way through rarely result in a resit.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 border border-slate-200 rounded-xl p-5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  {n}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
                  <p className="text-sm text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mt-8">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">On situational judgement tests specifically</h3>
            <p className="text-sm text-slate-700">
              There are no trick options and no hidden personality trap. Answer as a competent
              professional would: raise things directly and early, escalate only when it is genuinely
              beyond you, and never hide a problem to avoid an awkward conversation. Your instinct as a
              student is often to handle things privately or ask a friend, and that instinct is what
              scores badly.
            </p>
          </div>

          <PrepCapture
            context="Before you pay for anything, take the free pack"
            body={
              <>
                The tests are one stage of five, and candidates who fail rarely fail on the maths. The
                full PwC School Leaver pack is free and walks through the whole process the assessments
                sit inside: the application stages, what each one scores, real interview questions,
                commercial awareness and a pre-submission checklist. The timed practice tests themselves
                are the Season Pass below, not the free pack.
              </>
            }
          />

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-12 mb-4">
            Timed practice for a specific employer
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Season Pass includes timed numerical, verbal and situational judgement practice tests
            written in each employer&apos;s style, with worked explanations for every question, plus an
            AI mock interview coach for each of the ten schemes. That part is paid. Everything on this
            page and the guide below is not.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/checkout"
              className="inline-block bg-[#C4922A] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#B07E20] transition-colors text-sm text-center"
            >
              Season Pass, £29
            </Link>
            <Link
              href="/apprenticeship-interview-preparation"
              className="inline-block border border-slate-200 text-slate-700 font-semibold px-7 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm text-center"
            >
              Read the free interview preparation guide
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
