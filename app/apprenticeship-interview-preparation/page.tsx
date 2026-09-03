import type { Metadata } from "next";
import Link from "next/link";
import { COMPANIES } from "@/lib/seo-guides";
import PrepCapture from "@/app/components/PrepCapture";

export const metadata: Metadata = {
  title: "How to Prepare for an Apprenticeship Interview (2026 Guide) · ApprenticeEdge",
  description:
    "A complete, free guide to apprenticeship interview preparation: a four week plan, the questions UK employers actually ask, how to build STAR answers, video interview technique, and the mistakes that get people rejected.",
  alternates: { canonical: "https://www.apprenticeedge.co.uk/apprenticeship-interview-preparation" },
  openGraph: {
    title: "How to Prepare for an Apprenticeship Interview",
    description:
      "A four week plan, the questions UK apprenticeship employers actually ask, and how to build answers that score. Free.",
    type: "article",
  },
};

const SECTIONS = [
  { id: "four-week-plan", label: "The four week plan" },
  { id: "questions", label: "Questions you will be asked" },
  { id: "star", label: "Building STAR answers" },
  { id: "video-interview", label: "The video interview" },
  { id: "assessments", label: "Online assessments" },
  { id: "assessment-centre", label: "The assessment centre" },
  { id: "why-this-employer", label: "The 'why us' question" },
  { id: "mistakes", label: "Why people get rejected" },
  { id: "by-employer", label: "Prep by employer" },
  { id: "faq", label: "FAQ" },
];

const FAQS = [
  {
    q: "How long should I spend preparing for an apprenticeship interview?",
    a: "Around four weeks of light, regular work beats two days of panic. Most of the time goes into writing and rehearsing five to seven STAR stories, because you will reuse the same stories across the application form, the video interview and the assessment centre. If you have less time, prioritise the stories and the 'why this employer' answer over everything else.",
  },
  {
    q: "What questions are asked in an apprenticeship interview?",
    a: "Almost all of them fall into four types: competency questions ('tell me about a time you...'), motivational questions ('why this employer, why an apprenticeship'), situational questions ('what would you do if...') and commercial awareness questions ('what challenges does this business face'). The wording changes by employer, the four types do not.",
  },
  {
    q: "Do I need work experience to pass an apprenticeship interview?",
    a: "No. Assessors know they are interviewing school leavers. They are scoring the structure of your answer and your reflection on it, not the scale of the example. A shift at a supermarket where you handled an angry customer scores as well as anything, provided you can say what you specifically did and what changed as a result.",
  },
  {
    q: "What should I wear to an apprenticeship interview?",
    a: "Business dress for professional services, finance and the Civil Service. Smart casual is usually safe for tech and media employers. If the invitation does not say, dress one level above what you expect the office to be. It is never held against you.",
  },
  {
    q: "How do I prepare for a pre-recorded video interview?",
    a: "Record yourself answering a practice question on your phone and watch it back at least twice before the real thing. You will spot the filler words, the pace and the eye contact problems immediately, and none of those are fixable in the 30 seconds of prep time the platform gives you on the day.",
  },
  {
    q: "Is it worth applying to more than one apprenticeship scheme?",
    a: "Yes. Places are heavily oversubscribed at every one of the big UK schemes, so strong candidates get rejected routinely. Applying to four or five in parallel is normal. The catch is that each employer runs a different process, so preparation does not transfer automatically between them.",
  },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mt-12 first:mt-0">
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">{title}</h2>
      {children}
    </section>
  );
}

export default function ApprenticeshipInterviewPreparationPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Free guide
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How to Prepare for an Apprenticeship Interview
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            A complete preparation guide for UK school leaver apprenticeships. What the four week
            run-up should look like, the questions employers actually ask, how to build answers that
            score, and the specific things that get otherwise good candidates rejected.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/packs/pwc"
              className="inline-block bg-[#0D1B2A] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1E3A5F] transition-colors text-sm text-center"
            >
              Get the free PwC prep pack
            </Link>
            <a
              href="#four-week-plan"
              className="inline-block border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm text-center"
            >
              Start reading
            </a>
          </div>
        </div>
      </section>

      {/* Contents */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            On this page
          </p>
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1.5 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-12">

          <Section id="four-week-plan" title="The four week plan">
            <p className="text-slate-600 leading-relaxed mb-6">
              Preparation fails when it is done in the wrong order. Most people start by reading about
              the company and leave their own examples until the night before, which is backwards: the
              examples take the longest and get reused at every stage. Work in this order instead.
            </p>
            <div className="space-y-4">
              {[
                {
                  when: "Week 1",
                  task: "Write your stories",
                  detail:
                    "Five to seven examples, drawn from part-time work, school projects, sport, volunteering or anything where you had a genuine individual responsibility. Write each one out in full. This is the single highest-value thing you will do, and you will use these same stories on the application form, in the video interview and at the assessment centre.",
                },
                {
                  when: "Week 2",
                  task: "Practise the assessments",
                  detail:
                    "Situational judgement, numerical reasoning and cognitive tests. Do at least one full timed run before the real one. Discovering you are slower than you thought is fine in practice and fatal on the day.",
                },
                {
                  when: "Week 3",
                  task: "Research the employer properly",
                  detail:
                    "Not the careers page. The most recent annual report introduction, one or two news stories from the last few months, and enough of the business model that you could explain what they do in two sentences without jargon.",
                },
                {
                  when: "Week 4",
                  task: "Rehearse out loud, on camera",
                  detail:
                    "Record yourself answering a practice question and watch it back. Then do it again. Reading your answers silently does not prepare you for saying them under time pressure.",
                },
              ].map(({ when, task, detail }) => (
                <div key={when} className="flex items-start gap-4 border border-slate-200 rounded-xl p-5">
                  <span className="text-xs font-bold text-white bg-[#0D1B2A] rounded-full px-3 py-1.5 shrink-0">
                    {when}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{task}</h3>
                    <p className="text-sm text-slate-600">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mt-6">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">If you have less than four weeks:</span> do week 1 and
                week 4 and skip the rest. Your stories and your delivery are what get scored. Everything
                else is a bonus.
              </p>
            </div>
          </Section>

          <Section id="questions" title="The questions you will actually be asked">
            <p className="text-slate-600 leading-relaxed mb-6">
              Interview questions vary in wording and almost never in type. Nearly everything you will
              be asked is one of these four, so prepare by type rather than trying to memorise a list
              of a hundred questions.
            </p>
            <div className="space-y-5">
              {[
                {
                  type: "Competency",
                  purpose: "Testing whether you have actually done the thing, and whether you can explain it clearly.",
                  examples: [
                    "Tell me about a time you worked in a team where something went wrong.",
                    "Give me an example of when you had to meet a difficult deadline.",
                    "Describe a situation where you had to persuade someone.",
                    "Tell me about a time you made a mistake and what you did about it.",
                  ],
                },
                {
                  type: "Motivational",
                  purpose: "Testing whether you actually want this, or whether you applied to twenty things and this one replied.",
                  examples: [
                    "Why an apprenticeship rather than university?",
                    "Why this employer specifically?",
                    "Why this business area or service line?",
                    "Where do you want to be in five years?",
                  ],
                },
                {
                  type: "Situational",
                  purpose: "Testing judgement when you have no direct experience to draw on.",
                  examples: [
                    "What would you do if you disagreed with a decision your manager made?",
                    "You are given a task and you do not understand the instructions. What do you do?",
                    "A colleague is not doing their share of a group task. How do you handle it?",
                  ],
                },
                {
                  type: "Commercial awareness",
                  purpose: "Testing whether you understand what the business does and what is happening to it.",
                  examples: [
                    "What do you think are the biggest challenges facing us in the next year?",
                    "Tell me something in the news recently that is relevant to what we do.",
                    "Can you explain what this company does in a couple of sentences?",
                  ],
                },
              ].map(({ type, purpose, examples }) => (
                <div key={type} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-900 text-sm">{type} questions</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{purpose}</p>
                  </div>
                  <div className="px-5 py-4 space-y-2">
                    {examples.map((e) => (
                      <p key={e} className="text-sm text-slate-600 italic border-l-4 border-blue-200 pl-3 py-0.5">
                        {e}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="star" title="Building answers that score: STAR">
            <p className="text-slate-600 leading-relaxed mb-6">
              Every competency question is scored against a structure. Employers use different names
              for it, but it is almost always STAR. Answers that skip the structure sound like
              anecdotes, and anecdotes do not score.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
              <div className="space-y-3 text-sm text-slate-700">
                <p><span className="font-bold text-blue-700">S, Situation:</span> Set the scene in one or two sentences. Enough context to follow, no more. This is the part people overrun.</p>
                <p><span className="font-bold text-blue-700">T, Task:</span> What were <em>you</em> responsible for? What was expected of you specifically?</p>
                <p><span className="font-bold text-blue-700">A, Action:</span> What you did, step by step, using &ldquo;I&rdquo; throughout. This should be roughly 60% of the answer. It is the only part being scored properly.</p>
                <p><span className="font-bold text-blue-700">R, Result:</span> What changed. Put a number on it if you can. Then say what you learned or would do differently, which is the part most candidates leave out.</p>
              </div>
            </div>
            <h3 className="font-bold text-slate-900 mb-3">Where to find your examples</h3>
            <p className="text-slate-600 text-sm mb-4">
              You do not need impressive examples. You need specific ones. Assessors are interviewing
              seventeen and eighteen year olds and calibrate accordingly.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Part-time or Saturday jobs: a complaint you handled, a shift you covered, a task you ran alone</li>
              <li>School: a group project that went wrong, leading a presentation, a deadline you nearly missed</li>
              <li>Sport, music, Duke of Edinburgh, volunteering, prefect or committee roles</li>
              <li>Any situation where something broke and you either fixed it or learned something from it</li>
            </ul>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mt-6">
              <h4 className="font-bold text-slate-900 mb-2 text-sm">The one habit to break</h4>
              <p className="text-sm text-slate-700">
                Saying &ldquo;we&rdquo;. &ldquo;We worked well as a team and we got it finished&rdquo;
                tells an assessor nothing about you and is the most common reason a competency answer
                scores low. If you cannot isolate your own contribution, pick a different example.
              </p>
            </div>
          </Section>

          <PrepCapture context="Want to see all of this applied to a real employer?" />

          <Section id="video-interview" title="The pre-recorded video interview">
            <p className="text-slate-600 leading-relaxed mb-6">
              Most large UK apprenticeship schemes now put a pre-recorded video interview between the
              application form and the assessment centre. There is no interviewer. You get a question
              on screen, a short window to prepare, usually around 30 seconds, and a fixed time to
              answer. It is the stage candidates most often underestimate, because it feels less real
              than a person and is scored just as hard.
            </p>
            <h3 className="font-bold text-slate-900 mb-3">What to do differently</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Look at the camera lens, not at your own face on the screen. It reads as eye contact.</li>
              <li>Use the prep time to structure the answer, not to write it out. Reading a script is obvious on camera.</li>
              <li>Speak slightly slower than feels natural. It sounds measured on playback rather than rushed.</li>
              <li>Quiet room, light in front of you rather than behind, plain background, laptop rather than phone.</li>
              <li>Have your STAR stories on a single sheet next to the laptop, as prompts only, not as a script.</li>
            </ul>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-6">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Practise this properly.</span> Record one answer on your
                phone and watch it back. Almost everyone finds the same three things: too many filler
                words, too fast, and looking down. All three are fixable in one session and none of
                them are fixable on the day.
              </p>
            </div>
          </Section>

          <Section id="assessments" title="Online assessments and psychometric tests">
            <p className="text-slate-600 leading-relaxed mb-4">
              Before any interview, most schemes ask you to sit online tests: a situational judgement
              test, and usually a numerical or cognitive reasoning test. This stage removes a large
              share of applicants, and it is the one where preparation makes the most measurable
              difference, because the formats are published and practisable.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5 mb-6">
              <li>Practise with the actual test providers. SHL, Korn Ferry, Cubiks and Talent Q all publish free sample tests.</li>
              <li>Do one full run under real time pressure before the real thing.</li>
              <li>Laptop, wired or strong connection, quiet room, and sit it when you are alert rather than at midnight.</li>
              <li>On situational judgement tests, answer as a professional would rather than as you personally would. There are no trick options.</li>
            </ul>
            <Link
              href="/apprenticeship-online-assessments"
              className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Full guide to apprenticeship online assessments and psychometric tests →
            </Link>
          </Section>

          <Section id="assessment-centre" title="The assessment centre">
            <p className="text-slate-600 leading-relaxed mb-6">
              The final stage is usually a half or full day at an employer office. The exact mix varies,
              but it is normally some combination of a group exercise, an individual presentation or
              written task, and a competency interview with someone senior.
            </p>
            <h3 className="font-bold text-slate-900 mb-3">The group exercise, which is the one people get wrong</h3>
            <p className="text-slate-600 text-sm mb-4">
              Assessors are not scoring whether you win the discussion. They are scoring how you behave
              in a team. The highest scoring single behaviour is usually the least dramatic one: noticing
              the group has stalled and summarising where it has got to.
            </p>
            <div className="space-y-3">
              {[
                { good: true, text: "Speak early, then listen more than you talk" },
                { good: true, text: "Reference what others said and build on it rather than restarting" },
                { good: true, text: "Watch the clock and say so when the group is running out of time" },
                { good: false, text: "Staying quiet to avoid saying something wrong. Silence scores zero, not neutral." },
                { good: false, text: "Talking over people. Being the loudest is consistently marked down." },
                { good: false, text: "Missing details in the written brief because you skimmed it" },
              ].map(({ good, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className={`font-bold mt-0.5 shrink-0 ${good ? "text-green-500" : "text-red-400"}`}>
                    {good ? "✓" : "✕"}
                  </span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mt-6">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">The day starts when you walk in.</span> Assessors take
                note of how candidates behave with reception staff, with each other and during breaks.
                It is not a formal scored exercise, but it comes up in the debrief.
              </p>
            </div>
          </Section>

          <Section id="why-this-employer" title="The &ldquo;why us&rdquo; question decides more than you think">
            <p className="text-slate-600 leading-relaxed mb-6">
              This question appears on the application form, again in the video interview, and again at
              the assessment centre. It is the single most commonly answered badly, because almost
              everyone gives an answer that would work equally well for a competitor. If your answer
              survives having the company name swapped out, it is not an answer.
            </p>
            <div className="space-y-4">
              {[
                {
                  n: "1",
                  title: "Something specific about them",
                  body: "Not that they are a great company. Cite a service line, a recent announcement, something from the annual report, or something someone who works there told you. Specificity is the entire signal here.",
                },
                {
                  n: "2",
                  title: "Something specific about the programme",
                  body: "Why this scheme rather than the one down the road? Structure, qualification, rotation model, the fact you pick your area at the start. This is where candidates who have actually read the details separate themselves.",
                },
                {
                  n: "3",
                  title: "Where it takes you",
                  body: "How this fits what you want in five or ten years. You are not expected to have a precise plan at eighteen. You are expected to have thought about it seriously.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{n}</span>
                    <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="mistakes" title="Why capable candidates get rejected">
            <p className="text-slate-600 leading-relaxed mb-6">
              Most rejections are not about ability. They are about preparation, and they repeat in a
              small number of predictable ways.
            </p>
            <div className="space-y-3">
              {[
                "Generic motivational answers that could apply to any employer in the sector",
                "Competency answers describing what the team did rather than what you did",
                "No result and no reflection: the story stops before the part that scores",
                "Sitting the online tests cold because they looked like a formality",
                "Not being able to explain what the business actually does in plain language",
                "Applying near the deadline to a scheme that recruits on a rolling basis",
              ].map((m) => (
                <div key={m} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="text-red-400 font-bold mt-0.5 shrink-0">✕</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-6">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">One thing worth knowing about timing</h3>
              <p className="text-sm text-slate-700">
                Most of the large UK schemes recruit on a rolling basis. They review applications as
                they arrive and release assessment centre places as they go, so the published closing
                date is not really the deadline. Applying early in the window is worth more than almost
                anything else on this page.
              </p>
            </div>
          </Section>

          <Section id="by-employer" title="Prep for a specific employer">
            <p className="text-slate-600 leading-relaxed mb-6">
              The framework above is the same everywhere. The process is not. Each of these employers
              runs a different combination of tests, interview format and assessment centre, and each
              scores against its own published competencies. Free guides for all ten:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/guides/${c.slug}/interview-questions`}
                  className="border border-slate-200 rounded-xl px-4 py-3 hover:border-blue-300 transition-colors group"
                >
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                    {c.name} interview questions
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.programmeName}</p>
                </Link>
              ))}
            </div>
          </Section>

          <Section id="faq" title="Common questions">
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{q}</h3>
                  <p className="text-sm text-slate-600">{a}</p>
                </div>
              ))}
            </div>
          </Section>

          <PrepCapture context="Start with the free pack, then decide" />

        </div>
      </section>
    </div>
  );
}
