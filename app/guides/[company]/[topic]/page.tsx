import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  COMPANIES,
  TOPICS,
  getCompany,
  getTopic,
  fillTemplate,
  getAllGuideParams,
  type CompanyData,
  type TopicMeta,
} from "@/lib/seo-guides";

interface Props {
  params: Promise<{ company: string; topic: string }>;
}

export async function generateStaticParams() {
  return getAllGuideParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company: companySlug, topic: topicSlug } = await params;
  const company = getCompany(companySlug);
  const topic = getTopic(topicSlug);
  if (!company || !topic) return {};
  return {
    title: fillTemplate(topic.titleTemplate, company),
    description: fillTemplate(topic.descriptionTemplate, company),
  };
}

function StarBox() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
      <h3 className="font-bold text-slate-900 mb-3 text-sm">The STAR Framework</h3>
      <div className="space-y-2 text-sm text-slate-700">
        <p><span className="font-semibold text-blue-700">S — Situation:</span> Set the scene briefly (1–2 sentences). Enough context, no more.</p>
        <p><span className="font-semibold text-blue-700">T — Task:</span> What was your specific responsibility? What was expected of you?</p>
        <p><span className="font-semibold text-blue-700">A — Action:</span> What YOU did — not "we". Be specific. This is 60% of the answer.</p>
        <p><span className="font-semibold text-blue-700">R — Result:</span> Quantify if possible. What changed? What did you learn?</p>
      </div>
    </div>
  );
}

function PackCTA({ company }: { company: CompanyData }) {
  const isFree = company.packSlug === "pwc";
  return (
    <div className="bg-slate-900 rounded-2xl p-8 my-10 text-center">
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Want the full prep pack?</p>
      <h3 className="text-xl font-bold text-white mb-2">{company.name} Apprenticeship Prep Pack</h3>
      <p className="text-slate-400 text-sm mb-5">
        Application stages, competencies, real interview questions, commercial awareness, and a pre-submission checklist — in one complete pack.
      </p>
      {isFree ? (
        <Link
          href={`/packs/${company.packSlug}`}
          className="inline-block bg-blue-600 text-white font-semibold px-7 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Read the free {company.name} pack →
        </Link>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/checkout"
            className="inline-block bg-orange-500 text-white font-semibold px-7 py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Get the Season Pass — £29
          </Link>
          <Link href="/packs/pwc" className="text-slate-400 text-sm hover:text-white transition-colors">
            Try the free PwC pack first →
          </Link>
        </div>
      )}
    </div>
  );
}

function renderContent(company: CompanyData, topic: TopicMeta): React.ReactNode {
  switch (topic.slug) {
    case "interview-questions":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name}&apos;s interview process for school leavers follows a structured format: {company.interviewFormat.toLowerCase()}.
            Below are the types of questions you should prepare for, based on the competencies they actually test.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Questions {company.name} Asks</h2>
          <p className="text-slate-600 mb-4">Every question maps to one of {company.name}&apos;s core competencies. Prepare at least one strong STAR story per competency.</p>
          <div className="space-y-4">
            {company.keyCompetencies.map((comp) => (
              <div key={comp} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{comp}</h3>
                <p className="text-sm text-slate-600 italic">
                  &ldquo;Tell me about a time you demonstrated {comp.toLowerCase()}.&rdquo;
                </p>
                <p className="text-sm text-slate-500 mt-2">Use the STAR framework. Focus on what YOU specifically did, not what the team did.</p>
              </div>
            ))}
          </div>

          <StarBox />

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Motivational Questions</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="border-l-4 border-blue-200 pl-4 py-1">Why {company.name} specifically — not just the sector?</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">Why an apprenticeship over university?</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">Where do you see yourself in five years?</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">What do you know about the challenges {company.name} faces right now?</p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">What gets candidates rejected</h3>
            <p className="text-sm text-slate-700">
              Vague answers like &ldquo;I worked in a team and we all helped each other.&rdquo; Interviewers want to hear what YOU specifically did.
              If you can&apos;t isolate your individual contribution, the answer won&apos;t land.
            </p>
          </div>
        </>
      );

    case "application-tips":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.programmeName} receives thousands of applications each cycle.
            Here&apos;s what separates candidates who progress from those who don&apos;t — at every stage.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Before You Apply</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">1.</span>
              <span>Research {company.name}&apos;s current business priorities — not just what they do. Candidates who cite recent news, reports, or strategic announcements stand out.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">2.</span>
              <span>Prepare a genuine answer to &ldquo;Why {company.name}?&rdquo; — not just &ldquo;because it&apos;s a great company.&rdquo; {company.whyThisCompanyHook}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">3.</span>
              <span>Gather 5–7 strong STAR stories covering {company.keyCompetencies.slice(0, 3).join(", ")}, and more. Real examples beat generic ones every time.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Application Window</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">When to apply:</span> {company.applicationWindow}.
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Apply early. {company.name} fills roles on a rolling basis — waiting until the deadline closes means competing against a much smaller pool of remaining spots.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Online Assessment Tips</h2>
          <p className="text-slate-600 text-sm mb-3">{company.onlineTests}</p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Complete the tests in one sitting when you&apos;re alert — not late at night.</li>
            <li>Use a fast, stable internet connection and a quiet space.</li>
            <li>Do practice versions first (SHL, Korn Ferry, and Cubiks publish free samples).</li>
            <li>Read each question fully before answering — rushing is the most common error.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Most Common Rejection Reasons</h2>
          <div className="space-y-3">
            {[
              "Generic motivational answers — not specific to " + company.name,
              "STAR stories that describe what 'we' did, not what you did",
              "No commercial awareness — can't explain what " + company.name + " does in simple terms",
              "Failing the online tests without any preparation",
            ].map((reason) => (
              <div key={reason} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-red-400 font-bold mt-0.5 shrink-0">✕</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </>
      );

    case "competencies":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name} tests school leavers against a specific set of competencies at every stage — from the online assessment through to the final interview.
            Here&apos;s exactly what they test and how to prepare for each one.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">{company.name}&apos;s Core Competencies</h2>
          <div className="space-y-5">
            {company.keyCompetencies.map((comp, i) => (
              <div key={comp} className="border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{i + 1}</span>
                  <h3 className="font-bold text-slate-900">{comp}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Assessed at: online assessments, video interview, and assessment centre.
                </p>
                <p className="text-sm text-slate-700 font-medium mb-1">What strong looks like:</p>
                <p className="text-sm text-slate-600">
                  A STAR story with a clear individual contribution, a specific outcome, and a genuine reflection on what you learned or would do differently.
                </p>
              </div>
            ))}
          </div>

          <StarBox />

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Where to Find Your Examples</h2>
          <p className="text-slate-600 text-sm mb-4">
            You don&apos;t need impressive examples — you need specific ones. Strong STAR stories come from:
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Part-time jobs (customer complaints, covering a shift, managing a task alone)</li>
            <li>School projects or coursework (disagreements, tight deadlines, leading a presentation)</li>
            <li>Sport, volunteering, Duke of Edinburgh, clubs, or societies</li>
            <li>Any situation where something went wrong and you fixed it or learned from it</li>
          </ul>
        </>
      );

    case "assessment-centre":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.name} assessment centre is the final stage of the application process — and the most intensive.
            Here&apos;s exactly what happens, how you&apos;re scored, and what the best candidates do differently.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What&apos;s Included</h2>
          <div className="space-y-4">
            {company.assessmentCentreStages.map((stage, i) => (
              <div key={stage} className="flex items-start gap-4 border border-slate-200 rounded-xl p-4">
                <span className="text-sm font-bold text-slate-400 mt-0.5 shrink-0">0{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{stage}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What Assessors Score You On</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {company.keyCompetencies.slice(0, 6).map((comp) => (
              <div key={comp} className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 font-medium">
                {comp}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Group Exercise — What to Know</h2>
          <p className="text-slate-600 text-sm mb-4">
            In the group exercise, assessors are watching how you behave in a team — not whether you &apos;win&apos; the discussion.
            They&apos;re looking for contribution without domination, listening, building on others&apos; ideas, and keeping the group on track.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">The biggest mistake</h3>
            <p className="text-sm text-slate-700">
              Staying quiet to avoid saying something wrong. Assessors need to see you in action — silence is a fail.
              Say something early, even if it&apos;s just to summarise where the group has got to.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Practical Preparation</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Prepare 5–7 STAR stories before the day — you&apos;ll draw on them across multiple exercises</li>
            <li>Read {company.name}&apos;s latest news and annual report — commercial awareness comes up in case studies</li>
            <li>Practice speaking clearly under time pressure — most exercises have tight deadlines</li>
            <li>Dress professionally and arrive 15 minutes early — the assessment starts the moment you walk in</li>
          </ul>
        </>
      );

    case "video-interview":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.videoInterviewFormat}. Here&apos;s how to prepare and what strong answers look like.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Format</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700">{company.videoInterviewFormat}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Types of Questions</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="border-l-4 border-blue-200 pl-4 py-1">Competency-based: &ldquo;Tell me about a time you showed {company.keyCompetencies[0]?.toLowerCase()}.&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">Motivational: &ldquo;Why {company.name}? Why this programme?&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">Situational: &ldquo;What would you do if you disagreed with a decision your manager made?&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">Commercial: &ldquo;What challenges do you think {company.name} faces in the next 12 months?&rdquo;</p>
          </div>

          <StarBox />

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Recording Tips</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Record a practice answer on your phone and watch it back — fix filler words and posture</li>
            <li>Look at the camera lens, not your own face on screen — it reads as eye contact</li>
            <li>Use your prep time to structure your answer (Situation → Task → Action → Result), not to write it word for word</li>
            <li>Speak slightly slower than feels natural — the recording will sound more measured</li>
            <li>Quiet room, good lighting, plain background — technical setup matters more than you think</li>
          </ul>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">What gets candidates rejected at this stage</h3>
            <p className="text-sm text-slate-700">
              Answers that describe what &ldquo;the team&rdquo; did. Vague outcomes (&ldquo;it went well&rdquo;).
              No genuine reflection on what you learned. Generic &ldquo;Why {company.name}&rdquo; answers that could apply to any employer in the sector.
            </p>
          </div>
        </>
      );

    case "star-method":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name} uses competency-based interviewing throughout its school leaver application process.
            Every stage — from the video interview to the assessment centre — requires you to give structured examples using the STAR method.
          </p>

          <StarBox />

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">STAR Examples for {company.name} Competencies</h2>
          <div className="space-y-6">
            {company.keyCompetencies.slice(0, 4).map((comp) => (
              <div key={comp} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-3">{comp}</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p><span className="font-semibold text-blue-700">S:</span> Describe a specific context where {comp.toLowerCase()} was required.</p>
                  <p><span className="font-semibold text-blue-700">T:</span> What was your specific role or responsibility in this situation?</p>
                  <p><span className="font-semibold text-blue-700">A:</span> List the specific steps you took — use &ldquo;I&rdquo; throughout. What did you decide? What did you do first?</p>
                  <p><span className="font-semibold text-blue-700">R:</span> What was the outcome? Quantify if possible. What would you do differently?</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Where to Find Strong Examples</h2>
          <p className="text-slate-600 text-sm mb-4">
            You don&apos;t need dramatic stories. {company.name} interviewers know you&apos;re a school leaver.
            They&apos;re looking for genuine reflection, not corporate experience.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Part-time or Saturday jobs — customer complaints, working under pressure, managing a task independently</li>
            <li>School — group projects, leading a presentation, a difficult deadline</li>
            <li>Extracurricular — captaining a team, organising an event, resolving a conflict</li>
            <li>Volunteering, DofE, prefect or leadership roles</li>
          </ul>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">STAR mistakes to avoid</h3>
            <ul className="space-y-1 text-sm text-slate-700 list-disc pl-4">
              <li>Using &ldquo;we&rdquo; — always say &ldquo;I&rdquo;</li>
              <li>Spending too long on S and T, rushing A and R</li>
              <li>Vague results: &ldquo;it went well&rdquo; — be specific</li>
              <li>No reflection — the R should always include what you learned</li>
            </ul>
          </div>
        </>
      );

    case "online-tests":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.name} online tests are: {company.onlineTests}.
            This stage filters out a significant proportion of applicants — preparation makes a real difference.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What the Tests Involve</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700">{company.onlineTests}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to Prepare</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">1.</span>
              <span><span className="font-semibold">Practice with real test providers.</span> SHL, Korn Ferry, Cubiks, and Talent Q all publish free sample tests. The interface and question format varies by provider — know what to expect.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">2.</span>
              <span><span className="font-semibold">Do a full timed practice run.</span> Sitting the test for the first time under actual time pressure is the wrong time to discover you&apos;re slower than you thought.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">3.</span>
              <span><span className="font-semibold">Optimise your setup.</span> Fast internet, quiet room, laptop (not phone), and attempt it when you&apos;re alert. Technical issues mid-test are unlikely to result in a resit.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold shrink-0">4.</span>
              <span><span className="font-semibold">For SJTs: think like a professional.</span> Situational judgement tests have no trick answers — but they reward considered, measured responses over impulsive ones. Read each scenario fully before selecting.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Common Mistakes</h2>
          <div className="space-y-3">
            {[
              "Attempting without any preparation — practice tests exist for a reason",
              "Taking the test on a mobile or slow connection",
              "Rushing through to finish quickly — accuracy matters more than speed in most sections",
              "For SJTs: choosing the answer you personally prefer rather than the most professionally appropriate one",
            ].map((mistake) => (
              <div key={mistake} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-red-400 font-bold mt-0.5 shrink-0">✕</span>
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        </>
      );

    case "commercial-awareness":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            Commercial awareness is tested at every stage of the {company.name} application — from motivational questions on the form through to
            case studies and interviews at the assessment centre. Here&apos;s what you need to know.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Business Context</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700 leading-relaxed">{company.commercialContext}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key Facts to Know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Starting salary", value: company.salary },
              { label: "Programme length", value: company.length },
              { label: "Acceptance rate", value: company.acceptanceRate },
              { label: "Application window", value: company.applicationWindow },
            ].map(({ label, value }) => (
              <div key={label} className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Commercial Awareness Questions to Prepare For</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p className="border-l-4 border-blue-200 pl-4 py-1">&ldquo;What do you think are the biggest challenges facing {company.name} in the next year?&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">&ldquo;Tell me something recent in the news that you think is relevant to what we do.&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">&ldquo;What trends are affecting our industry right now?&rdquo;</p>
            <p className="border-l-4 border-blue-200 pl-4 py-1">&ldquo;Can you explain what {company.name} does in a couple of sentences?&rdquo;</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">How to build commercial awareness fast</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
              <li>Read {company.name}&apos;s latest annual report introduction (10 minutes — just the CEO letter)</li>
              <li>Set a Google Alert for &ldquo;{company.name}&rdquo; and read one article per week</li>
              <li>Read the FT, BBC Business, or The Economist for 10 minutes each morning in the 4 weeks before your assessment</li>
              <li>Be able to explain what {company.name} does in two sentences without using industry jargon</li>
            </ul>
          </div>
        </>
      );

    case "why-this-company":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            &ldquo;Why {company.name}?&rdquo; is one of the most important questions in any apprenticeship interview — and one of the most commonly answered poorly.
            Here&apos;s what interviewers want to hear, and how to build an answer that actually lands.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What {company.name} Interviewers Are Looking For</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700 leading-relaxed">{company.whyThisCompanyHook}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Answer Framework</h2>
          <p className="text-slate-600 text-sm mb-4">A strong &ldquo;Why {company.name}?&rdquo; answer has three parts:</p>
          <div className="space-y-4">
            {[
              {
                n: "1",
                title: "Something specific about " + company.name,
                body: "Not 'because you're a great company.' Cite something you found on their website, in a recent news article, or from speaking to someone who works there. Specificity signals genuine interest.",
              },
              {
                n: "2",
                title: "The programme itself",
                body: `Why the ${company.programmeName} specifically? What about the structure, service lines, or training model fits how you want to develop? Be honest — this is where candidates who've done real research stand out.`,
              },
              {
                n: "3",
                title: "Your long-term direction",
                body: "How does this apprenticeship fit where you want to be in 5–10 years? You don't need a precise plan — you need to show you've thought about it seriously.",
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

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What to Avoid</h2>
          <div className="space-y-3">
            {[
              `"I've always wanted to work in ${company.name}'s sector" — too generic`,
              `"You're one of the best companies to work for" — flattery, not substance`,
              `"I applied to several companies and this seemed like a good fit" — honest, but fatal`,
              "Anything that could apply equally to a competitor",
            ].map((avoid) => (
              <div key={avoid} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-red-400 font-bold mt-0.5 shrink-0">✕</span>
                <span>{avoid}</span>
              </div>
            ))}
          </div>
        </>
      );

    case "salary":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name}&apos;s {company.programmeName} pays {company.salary} as a starting salary.
            Here&apos;s how that compares to other top UK apprenticeship schemes and what progression looks like.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">{company.name} Apprenticeship Salary</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-3xl font-extrabold text-slate-900 mb-1">{company.salary}</p>
            <p className="text-sm text-slate-500">Starting salary · Year 1</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key Salary Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Programme length", value: company.length },
              { label: "Locations", value: company.locations.split(",")[0] + " and more" },
              { label: "Programme type", value: company.programmeType },
              { label: "Application window", value: company.applicationWindow },
            ].map(({ label, value }) => (
              <div key={label} className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How It Compares</h2>
          <p className="text-slate-600 text-sm mb-4">
            Top UK apprenticeship salaries (school leaver, year 1):
          </p>
          <div className="space-y-2">
            {COMPANIES.map((c) => (
              <div
                key={c.slug}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 text-sm ${c.slug === company.slug ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}
              >
                <span className={`font-medium ${c.slug === company.slug ? "text-blue-900" : "text-slate-700"}`}>
                  {c.name} — {c.programmeName}
                </span>
                <span className={`font-semibold ${c.slug === company.slug ? "text-blue-700" : "text-slate-500"}`}>{c.salary}</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">Salary isn&apos;t everything</h3>
            <p className="text-sm text-slate-700">
              The best school leaver apprenticeships offer qualifications, training, mentorship, and career progression that can be worth far more than a starting salary difference of a few thousand pounds.
              Consider the full package — not just year-one pay.
            </p>
          </div>
        </>
      );

    case "how-to-get-in":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.programmeName} has an acceptance rate of around {company.acceptanceRate}.
            Here&apos;s exactly how to go from application to offer — stage by stage.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Process, In Order</h2>
          <div className="space-y-4">
            {[
              { stage: "Online Application", detail: `Complete the application form — personal details, grades, and motivational questions. Application window: ${company.applicationWindow}.` },
              { stage: "Online Assessments", detail: company.onlineTests },
              { stage: "Video Interview", detail: company.videoInterviewFormat },
              ...company.assessmentCentreStages.map((s) => ({ stage: "Assessment Centre", detail: s })),
            ].reduce((acc: { stage: string; detail: string }[], curr) => {
              const last = acc[acc.length - 1];
              if (last && last.stage === curr.stage && curr.stage === "Assessment Centre") {
                return acc;
              }
              return [...acc, curr];
            }, []).map(({ stage, detail }, i) => (
              <div key={i} className="flex items-start gap-4 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-0.5">{stage}</p>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What the Top Candidates Do Differently</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <span>Apply in the first two weeks of the window opening — roles fill on a rolling basis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <span>Prepare 5–7 STAR stories before starting the application — you&apos;ll need them at multiple stages</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <span>Know {company.name}&apos;s business in detail — not just the sector. {company.whyThisCompanyHook}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <span>Practice the online tests with the actual provider formats — not generic aptitude apps</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-0.5 shrink-0">✓</span>
              <span>Record a video interview practice session and watch it back before the real thing</span>
            </li>
          </ul>
        </>
      );

    case "acceptance-rate":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.programmeName} has an estimated acceptance rate of {company.acceptanceRate}.
            Here&apos;s what those numbers actually mean — and what it takes to be in the cohort that gets an offer.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How Competitive Is It?</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
            <p className="text-4xl font-extrabold text-slate-900 mb-1">{company.acceptanceRate}</p>
            <p className="text-sm text-slate-500">Estimated acceptance rate</p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Note on acceptance rates:</span> These figures are estimates based on publicly available information and apprenticeship sector data. {company.name} does not publicly disclose exact figures. The actual rate can vary by service line, location, and year.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Comparative Acceptance Rates</h2>
          <div className="space-y-2">
            {COMPANIES.map((c) => (
              <div
                key={c.slug}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 text-sm ${c.slug === company.slug ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}
              >
                <span className={`font-medium ${c.slug === company.slug ? "text-blue-900" : "text-slate-700"}`}>{c.name}</span>
                <span className={`font-semibold ${c.slug === company.slug ? "text-blue-700" : "text-slate-500"}`}>{c.acceptanceRate}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What Actually Gets You In</h2>
          <p className="text-slate-600 text-sm mb-4">
            Acceptance rate is a measure of competition, not a measure of how qualified you need to be.
            Most rejected candidates don&apos;t fail on ability — they fail on preparation.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Passing the online tests (most candidates don&apos;t practice enough)</li>
            <li>A specific, credible answer to &ldquo;Why {company.name}?&rdquo;</li>
            <li>STAR answers that isolate your individual contribution</li>
            <li>Commercial awareness that goes beyond surface-level knowledge</li>
          </ul>
        </>
      );

    case "application-timeline":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The {company.programmeName} application window is: {company.applicationWindow}.
            Here&apos;s how to plan your timeline so you&apos;re prepared at every stage — not scrambling.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">When to Apply</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-slate-900 mb-1">Application window</p>
            <p className="text-sm text-slate-700">{company.applicationWindow}</p>
            <p className="text-sm text-slate-500 mt-3">
              Apply in the first two weeks of the window opening. {company.name} makes rolling offers — seats fill before the official deadline closes.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Typical Timeline from Application to Offer</h2>
          <div className="space-y-3">
            {[
              { week: "Week 0", event: "Application form submitted" },
              { week: "Week 1–2", event: "Online assessments — SJT, numerical, and cognitive tests" },
              { week: "Week 3–4", event: "Video interview invitation sent" },
              { week: "Week 4–6", event: "Assessment centre invitation (if passed video stage)" },
              { week: "Week 6–10", event: "Offer or rejection" },
            ].map(({ week, event }) => (
              <div key={week} className="flex items-start gap-4 text-sm">
                <span className="font-semibold text-slate-400 shrink-0 w-20">{week}</span>
                <span className="text-slate-700">{event}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">Timeline is approximate. Actual timings vary by cohort and service line.</p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Preparation Timeline — Work Backwards</h2>
          <div className="space-y-3">
            {[
              { time: "4 weeks before applying", task: "Research " + company.name + " — annual report, recent news, service lines" },
              { time: "3 weeks before applying", task: "Draft 5–7 STAR stories covering all key competencies" },
              { time: "2 weeks before applying", task: "Practice online tests with real providers (SHL, Korn Ferry)" },
              { time: "1 week before applying", task: "Write and refine motivational answers — Why " + company.name + "?, Why now?" },
              { time: "Before video interview", task: "Record and watch back a practice video interview" },
              { time: "Before assessment centre", task: "Read " + company.name + "'s latest news and know your STAR stories cold" },
            ].map(({ time, task }) => (
              <div key={time} className="flex items-start gap-4 border border-slate-200 rounded-xl p-4 text-sm">
                <span className="font-semibold text-blue-600 shrink-0 w-32">{time}</span>
                <span className="text-slate-700">{task}</span>
              </div>
            ))}
          </div>
        </>
      );

    case "group-exercise":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            The group exercise is one of the most misunderstood parts of the {company.name} assessment centre.
            Most candidates focus on winning the argument. Assessors are watching something entirely different.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What Actually Gets Scored</h2>
          <div className="space-y-3">
            {[
              { title: "Contribution without domination", desc: "Speak early and regularly — but listen more than you talk. Assessors need to see you engage. Silence is not being safe; it's a fail." },
              { title: "Building on others", desc: "Reference what others have said: 'Building on what Alex said...' or 'That's a good point — and I'd add...' This shows collaboration, not just performance." },
              { title: "Moving the group forward", desc: "If the discussion stalls or goes in circles, step in to summarise or refocus. This is often the highest-scoring single behaviour in a group exercise." },
              { title: "Clarity under pressure", desc: "When asked to present or summarise, speak clearly and avoid jargon. The group exercise is also a communication test." },
            ].map(({ title, desc }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Scenario Format</h2>
          <p className="text-slate-600 text-sm mb-4">
            Group exercises typically involve a business case — a client situation, a strategic decision, or a resource allocation problem.
            You&apos;ll be given materials to read before the discussion starts (usually 10–15 minutes).
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Read the brief properly — candidates who miss key details in the brief score poorly</li>
            <li>Identify the 2–3 most important issues before the discussion starts</li>
            <li>Have a position ready — but be open to changing it based on the group discussion</li>
          </ul>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 my-6">
            <h3 className="font-bold text-slate-900 mb-2 text-sm">The most common group exercise failures</h3>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-4">
              <li>Talking over others — being the loudest is not the same as being the best</li>
              <li>Staying quiet to avoid saying something wrong</li>
              <li>Focusing on being right rather than helping the group reach a good outcome</li>
              <li>Not listening — giving an answer that ignores what was just said</li>
            </ul>
          </div>
        </>
      );

    case "situational-judgement":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name}&apos;s situational judgement test (SJT) assesses how you respond to workplace scenarios.
            It&apos;s not a personality test — it&apos;s a judgement test, and preparation makes a real difference.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How It Works</h2>
          <p className="text-slate-600 text-sm mb-4">
            You&apos;re presented with a series of workplace scenarios and asked to rate the effectiveness of several possible responses — or choose the most and least effective option.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700">{company.onlineTests}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to Approach SJT Questions</h2>
          <div className="space-y-4">
            {[
              {
                title: "Think like a professional, not a person",
                body: "Your instinct might be to go to a friend for advice or handle something privately. The SJT rewards professional, measured responses — escalating appropriately, communicating clearly, and maintaining integrity.",
              },
              {
                title: "There are no trick answers",
                body: "SJTs don't have deliberately misleading options. The answer that seems most sensible and professional is usually correct. Trust your judgment.",
              },
              {
                title: "Read each option fully",
                body: "The difference between the 'best' and 'second best' option is often subtle. Read all options before rating any of them.",
              },
              {
                title: "Align with " + company.name + "'s values",
                body: `${company.name} tests for ${company.keyCompetencies.slice(0, 3).join(", ")}, and more. Answers that reflect these values score highest.`,
              },
            ].map(({ title, body }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">How to Practice</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>SHL and Korn Ferry publish free SJT sample questions — use them</li>
            <li>Practice on a laptop, not a phone — the interface is designed for desktop</li>
            <li>Time yourself — even if the test isn&apos;t strictly timed, slow responses can affect your result on some platforms</li>
            <li>After each practice question, check why the &apos;best&apos; answer was scored highest — this builds intuition</li>
          </ul>
        </>
      );

    case "stage-by-stage":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            Here is every stage of the {company.programmeName} application process — what happens, in what order, and what you need to do to pass each one.
          </p>

          <div className="space-y-6 mt-8">
            {[
              {
                n: 1,
                title: "Online Application Form",
                content: `Complete your personal details, academic grades, and motivational questions. This is where you answer why ${company.name} and why this programme. Application window: ${company.applicationWindow}.`,
                tip: "Answer motivational questions specifically — not generically. A specific reason for choosing " + company.name + " over a generic 'I want to work in the sector' answer makes an immediate difference.",
              },
              {
                n: 2,
                title: "Online Assessments",
                content: company.onlineTests,
                tip: "Practice with real providers (SHL, Korn Ferry, Cubiks) before the test date. Don't attempt on a mobile or slow connection.",
              },
              {
                n: 3,
                title: "Video Interview",
                content: company.videoInterviewFormat,
                tip: "Record yourself answering a practice question and watch it back. Fix filler words, posture, and pacing before the real thing.",
              },
              {
                n: 4,
                title: "Assessment Centre",
                content: `Held at a ${company.name} office. Typically includes: ${company.assessmentCentreStages.join(", ")}.`,
                tip: "Prepare STAR stories for all competencies before the day. The assessment starts when you walk in — be professional with everyone you meet.",
              },
            ].map(({ n, title, content, tip }) => (
              <div key={n} className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 bg-slate-50 px-5 py-4 border-b border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">{n}</span>
                  <h2 className="font-bold text-slate-900">{title}</h2>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-slate-700 mb-4">{content}</p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Prep tip</p>
                    <p className="text-sm text-slate-700">{tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "school-leaver-vs-grad":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.schoolLeaver} Here&apos;s an honest comparison of the school leaver route versus the graduate scheme — what each offers, who each suits, and how to decide.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 pr-6 text-slate-500 font-semibold">Factor</th>
                  <th className="text-left py-3 pr-6 text-blue-700 font-semibold">School Leaver Route</th>
                  <th className="text-left py-3 text-slate-700 font-semibold">Graduate Scheme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { factor: "Entry point", leaver: "After A-levels / Year 13", grad: "After university (3–4 years later)" },
                  { factor: "Degree", leaver: "Funded by " + company.name + " while you work", grad: "Already completed — self-funded" },
                  { factor: "Earnings by age 22", leaver: "3+ years of salary + no debt", grad: "Graduating with student loans" },
                  { factor: "Career start", leaver: company.length + " programme", grad: "Typically 2–3 year grad scheme" },
                  { factor: "Programme", leaver: company.programmeName, grad: company.name + " Graduate Programme" },
                  { factor: "Salary start", leaver: company.salary, grad: "Typically higher (£28–40k+)" },
                ].map(({ factor, leaver, grad }) => (
                  <tr key={factor}>
                    <td className="py-3 pr-6 font-medium text-slate-600">{factor}</td>
                    <td className="py-3 pr-6 text-blue-700">{leaver}</td>
                    <td className="py-3 text-slate-600">{grad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Case for the School Leaver Route</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>No tuition fees — the degree is funded by {company.name}</li>
            <li>Earning from 18 instead of 21–22: typically £80–120k more by age 25 when you factor in tuition debt</li>
            <li>3+ years of professional experience before peers have graduated</li>
            <li>Earlier career trajectory — reaching senior roles years ahead of graduate entry peers</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Who the Graduate Scheme Suits</h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Candidates who genuinely want the university experience first</li>
            <li>Those switching sectors after a first degree in a different field</li>
            <li>Applicants who feel they need more time to develop before entering a structured professional environment</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 my-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Bottom line:</span> {company.notableAspect}
            </p>
          </div>
        </>
      );

    case "top-tips":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            These are the most important things to know before applying to the {company.programmeName}.
            Most of these aren&apos;t obvious — they come from analysing what the top candidates do at every stage.
          </p>

          <div className="space-y-5 mt-8">
            {[
              {
                n: "01",
                tip: "Apply early",
                detail: `The window is ${company.applicationWindow}. ${company.name} makes rolling offers — candidates who apply in week one of the window are competing against hundreds. Candidates who apply in the final week are competing against tens of thousands.`,
              },
              {
                n: "02",
                tip: "Prepare your STAR stories before you start the form",
                detail: `The motivational questions and video interview both require specific examples. Have at least 5–7 stories ready — covering ${company.keyCompetencies.slice(0, 3).join(", ")} at minimum — before you open the application.`,
              },
              {
                n: "03",
                tip: 'Know ' + company.name + ' — not just the sector',
                detail: company.whyThisCompanyHook,
              },
              {
                n: "04",
                tip: "Practice the online tests",
                detail: `${company.onlineTests}. Most candidates don't practice. Those who do score noticeably higher. SHL and Korn Ferry both offer free sample tests online.`,
              },
              {
                n: "05",
                tip: "Record your video interview practice",
                detail: "Record yourself answering a practice question on your phone and watch it back. You will immediately see what to fix — filler words, pace, eye contact, posture. Do this at least twice before the real interview.",
              },
              {
                n: "06",
                tip: "The assessment centre starts when you walk in",
                detail: `Be professional from the moment you arrive — with the receptionist, other candidates, and during breaks. Assessors at ${company.name} are watching throughout the day, not just during formal exercises.`,
              },
              {
                n: "07",
                tip: "Use 'I', not 'we'",
                detail: "Every competency interview answer must isolate your specific contribution. 'We worked together as a team' tells assessors nothing. 'I specifically did X, because Y, which led to Z' is what they're scoring.",
              },
            ].map(({ n, tip, detail }) => (
              <div key={n} className="border border-slate-200 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-extrabold text-slate-200 shrink-0 leading-none">{n}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{tip}</h3>
                    <p className="text-sm text-slate-600">{detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case "what-to-expect":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            Here&apos;s an honest guide to what the {company.programmeName} application process actually looks like — the full picture, from opening the form to getting an offer.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Programme", value: company.programmeName },
              { label: "Type", value: company.programmeType },
              { label: "Length", value: company.length },
              { label: "Salary", value: company.salary },
              { label: "Locations", value: company.locations },
              { label: "Acceptance rate", value: company.acceptanceRate },
            ].map(({ label, value }) => (
              <div key={label} className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Process</h2>
          <p className="text-slate-600 text-sm mb-4">{company.interviewFormat}</p>
          <div className="space-y-3">
            {company.assessmentCentreStages.map((stage) => (
              <div key={stage} className="flex items-start gap-3 text-sm text-slate-700">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
                  <path d="M3 8L6.5 11.5L13 4.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {stage}
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">What Makes {company.name} Different</h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-700">{company.notableAspect}</p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">The Honest Reality</h2>
          <p className="text-slate-600 text-sm mb-4">
            The {company.programmeName} is genuinely competitive — {company.acceptanceRate} acceptance rate.
            But the majority of rejected candidates don&apos;t fail because they weren&apos;t capable enough.
            They fail because they didn&apos;t prepare specifically enough for {company.name}&apos;s process.
          </p>
          <p className="text-slate-600 text-sm">
            The candidates who get offers are not necessarily the smartest in the room — they&apos;re the ones who treated the application as seriously as the job itself.
          </p>
        </>
      );

    case "competency-questions":
      return (
        <>
          <p className="text-slate-600 leading-relaxed">
            {company.name} uses competency-based questions at the video interview and assessment centre stages.
            Here are the questions to expect, mapped to the competencies they test — with guidance on what strong answers look like.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Competency Questions by Area</h2>
          <div className="space-y-6">
            {company.keyCompetencies.map((comp) => (
              <div key={comp} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm">{comp}</h3>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm text-slate-600 italic border-l-4 border-blue-200 pl-3">
                    &ldquo;Tell me about a time you demonstrated {comp.toLowerCase()}.&rdquo;
                  </p>
                  <p className="text-sm text-slate-600 italic border-l-4 border-slate-200 pl-3">
                    &ldquo;Give me an example of when you had to show {comp.toLowerCase()} under pressure.&rdquo;
                  </p>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mt-3">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">What strong looks like</p>
                    <p className="text-sm text-slate-700">
                      A specific STAR answer with a clear individual role, measurable outcome, and genuine reflection.
                      Avoid: describing what &ldquo;the team&rdquo; did without isolating your contribution.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <StarBox />

          <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Preparing Your Stories</h2>
          <p className="text-slate-600 text-sm mb-4">
            Aim for 5–7 strong STAR stories before your first interview. You should be able to adapt each story to answer
            multiple different competency questions — a good teamwork story can often be reframed to show communication or resilience too.
          </p>
          <p className="text-slate-600 text-sm">
            Examples can come from school, part-time work, sport, volunteering, or any other experience where you had a genuine individual responsibility.
          </p>
        </>
      );

    default:
      return (
        <p className="text-slate-600">
          Detailed guide coming soon. In the meantime, the full {company.name} prep pack covers everything you need.
        </p>
      );
  }
}

export default async function GuidePage({ params }: Props) {
  const { company: companySlug, topic: topicSlug } = await params;
  const company = getCompany(companySlug);
  const topic = getTopic(topicSlug);

  if (!company || !topic) notFound();

  const h1 = fillTemplate(topic.h1Template, company);

  const otherTopics = TOPICS.filter((t) => t.slug !== topic.slug).slice(0, 6);
  const otherCompanies = COMPANIES.filter((c) => c.slug !== company.slug).slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">ApprenticeEdge</Link>
            <span className="mx-2">›</span>
            <Link href={`/packs/${company.packSlug}`} className="hover:text-slate-600 transition-colors">{company.name}</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-600">{topic.label}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
              {company.name}
            </span>
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
              {company.programmeType}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">{h1}</h1>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Salary: <span className="font-semibold text-slate-700">{company.salary}</span></span>
            <span>Length: <span className="font-semibold text-slate-700">{company.length}</span></span>
            <span>Acceptance: <span className="font-semibold text-slate-700">{company.acceptanceRate}</span></span>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {renderContent(company, topic)}
          <PackCTA company={company} />
        </div>
      </section>

      {/* Related guides — same company, different topics */}
      <section className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-lg font-bold text-slate-900 mb-5">More {company.name} guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/guides/${company.slug}/${t.slug}`}
                className="border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {fillTemplate(t.h1Template, company)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related guides — same topic, other companies */}
      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-lg font-bold text-slate-900 mb-5">{topic.label} guides for other companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherCompanies.map((c) => (
              <Link
                key={c.slug}
                href={`/guides/${c.slug}/${topic.slug}`}
                className="border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {fillTemplate(topic.h1Template, c)}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
