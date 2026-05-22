export interface CompanyData {
  slug: string;
  name: string;
  programmeName: string;
  programmeType: string;
  packSlug: string;
  salary: string;
  length: string;
  locations: string;
  acceptanceRate: string;
  applicationWindow: string;
  keyCompetencies: string[];
  interviewFormat: string;
  assessmentCentreStages: string[];
  onlineTests: string;
  videoInterviewFormat: string;
  commercialContext: string;
  whyThisCompanyHook: string;
  schoolLeaver: string;
  notableAspect: string;
}

export interface TopicMeta {
  slug: string;
  label: string;
  keywordTemplate: string; // use {{company}} and {{programme}}
  titleTemplate: string;
  descriptionTemplate: string;
  h1Template: string;
}

export const COMPANIES: CompanyData[] = [
  {
    slug: "pwc",
    name: "PwC",
    programmeName: "PwC School Leaver Programme",
    programmeType: "degree apprenticeship",
    packSlug: "pwc",
    salary: "£25,000–£28,000",
    length: "5–6 years",
    locations: "London, Birmingham, Bristol, Edinburgh, Leeds, Manchester",
    acceptanceRate: "2–4%",
    applicationWindow: "September–November for the following September start",
    keyCompetencies: ["Commercial acumen", "Collaboration", "Communication", "Leadership", "Problem solving", "Resilience"],
    interviewFormat: "Pre-recorded HireVue video interview (30 seconds prep, 2–3 minutes per answer) followed by an assessment centre",
    assessmentCentreStages: ["Group exercise", "Individual presentation", "Competency interview", "Written exercise"],
    onlineTests: "Situational Judgement Test (SJT) and Cognitive/Numerical Reasoning — both in one sitting",
    videoInterviewFormat: "HireVue pre-recorded — no live interviewer, 30 seconds to prepare each answer",
    commercialContext: "PwC's top clients include FTSE 100 companies and major financial institutions. Key revenue streams are audit, tax, and advisory. In 2024, PwC UK reported revenue of over £5.8 billion.",
    whyThisCompanyHook: "PwC is the only Big Four firm where you earn a full undergraduate degree while working — and you choose your service line at the start. That specificity is what makes a strong 'Why PwC' answer.",
    schoolLeaver: "PwC's School Leaver Programme is one of the most prestigious degree apprenticeships in the UK. You earn a full BSc while working across audit, tax, deals, consulting, or technology.",
    notableAspect: "You choose your service line on application — unlike other Big Four firms where you're assigned. This means your 'Why this service line' answer is critical.",
  },
  {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    programmeName: "Goldman Sachs Higher Apprenticeship",
    programmeType: "higher apprenticeship",
    packSlug: "goldman-sachs",
    salary: "£30,000–£35,000",
    length: "3 years",
    locations: "London",
    acceptanceRate: "1–2%",
    applicationWindow: "October–December for the following summer/autumn start",
    keyCompetencies: ["Analytical thinking", "Drive and ambition", "Collaboration", "Commercial awareness", "Resilience", "Integrity"],
    interviewFormat: "Two rounds: HireVue video interview then a Superday (multiple back-to-back interviews with senior staff)",
    assessmentCentreStages: ["Multiple one-to-one interviews", "Technical/numerical assessment", "Group discussion"],
    onlineTests: "Numerical reasoning and coding/logic tests depending on division",
    videoInterviewFormat: "HireVue pre-recorded — technical and motivational questions, 30 seconds prep per question",
    commercialContext: "Goldman Sachs is a global investment bank. Key divisions include Investment Banking, Global Markets, Asset Management, and Consumer & Wealth Management. GS UK revenue exceeds £4 billion annually.",
    whyThisCompanyHook: "Goldman Sachs interviewers expect you to know the firm's recent deals and market position. Specific division knowledge is essential — a generic answer about 'wanting to work in finance' will not pass.",
    schoolLeaver: "Goldman Sachs offers one of the most competitive and best-paid higher apprenticeships in the UK. Placements are London-based across investment banking, technology, and operations divisions.",
    notableAspect: "The Superday format means back-to-back interviews with multiple senior staff in a single day. Stamina, consistency, and the ability to repeat strong answers without sounding rehearsed is critical.",
  },
  {
    slug: "deloitte",
    name: "Deloitte",
    programmeName: "Deloitte BrightStart",
    programmeType: "degree apprenticeship",
    packSlug: "deloitte",
    salary: "£22,000–£27,000",
    length: "4–5 years",
    locations: "London, Birmingham, Bristol, Edinburgh, Leeds, Manchester, Reading",
    acceptanceRate: "3–5%",
    applicationWindow: "October–January for the following September start",
    keyCompetencies: ["Leadership", "Impact", "Innovation", "Inclusion", "Curiosity", "Resilience"],
    interviewFormat: "Online assessments followed by a Virtual Assessment Centre (VAC) with group and individual exercises",
    assessmentCentreStages: ["Group case study", "Competency interview", "Strengths-based interview", "Written exercise"],
    onlineTests: "Immersive online assessment — a scenario-based test combining numerical, verbal, and situational judgement in one integrated exercise",
    videoInterviewFormat: "Strengths-based video interview — questions are about what you enjoy and what you're good at, not just STAR examples",
    commercialContext: "Deloitte UK is the largest of the Big Four by headcount. Key revenue areas: Audit & Assurance, Consulting, Financial Advisory, Risk Advisory, and Tax & Legal. UK revenue exceeds £5.5 billion.",
    whyThisCompanyHook: "Deloitte uses strengths-based interviewing alongside competency questions. This means you need to talk about what genuinely energises you — not just rehearsed STAR stories.",
    schoolLeaver: "Deloitte BrightStart is the firm's school leaver route into a degree apprenticeship across audit, tax, consulting, and advisory service lines.",
    notableAspect: "Deloitte's immersive online assessment is different from standard psychometric tests — it puts you in a day-in-the-life scenario and assesses how you respond to realistic work situations.",
  },
  {
    slug: "kpmg",
    name: "KPMG",
    programmeName: "KPMG 360° Apprenticeship",
    programmeType: "degree apprenticeship",
    packSlug: "kpmg",
    salary: "£22,000–£26,000",
    length: "5 years",
    locations: "London, Birmingham, Bristol, Leeds, Manchester, Reading",
    acceptanceRate: "3–5%",
    applicationWindow: "October–February for the following September start",
    keyCompetencies: ["Courage", "Integrity", "Excellence", "Together", "For Better — KPMG's five values underpin all competency assessment"],
    interviewFormat: "Online assessments, job simulation exercise, then a final interview and business case presentation",
    assessmentCentreStages: ["Business case presentation", "Competency interview", "Group exercise", "Job simulation"],
    onlineTests: "Job simulation — a multi-stage online exercise simulating a day at KPMG including emails, data tasks, and situational scenarios",
    videoInterviewFormat: "No separate video interview stage — KPMG's job simulation replaces this step for most applicants",
    commercialContext: "KPMG UK revenue is approximately £2.9 billion. Core service lines are Audit, Tax & Law, Consulting, and Deal Advisory. KPMG audits major UK financial institutions and FTSE 100 companies.",
    whyThisCompanyHook: "KPMG anchors their assessment around five values. Every competency answer should map to at least one. Mentioning KPMG's values by name (and genuinely showing them) sets strong candidates apart.",
    schoolLeaver: "KPMG 360° is the firm's degree apprenticeship for school leavers, covering audit, tax, consulting, and deal advisory. You earn a full BSc while working across client engagements from year one.",
    notableAspect: "KPMG's job simulation is their differentiator — it replaces a video interview and is longer and more complex than competitors' online tests. Most candidates underestimate it.",
  },
  {
    slug: "ey",
    name: "EY",
    programmeName: "EY School Leaver Programme",
    programmeType: "degree apprenticeship",
    packSlug: "ey",
    salary: "£22,000–£26,000",
    length: "5 years",
    locations: "London, Birmingham, Bristol, Cambridge, Leeds, Manchester, Reading",
    acceptanceRate: "3–5%",
    applicationWindow: "October–January for the following September start",
    keyCompetencies: ["Integrity", "Respect", "Teaming", "Inclusiveness", "Energy", "EY's 'Exceptional EY Experience' framework"],
    interviewFormat: "Online assessments followed by an EY Assessment Centre (EYAC) with partner/senior manager interviews",
    assessmentCentreStages: ["Partner/senior manager interview", "Group exercise", "Written case study"],
    onlineTests: "Cognitive ability tests and a Situational Strength Test (SST)",
    videoInterviewFormat: "Pre-recorded video interview — competency and motivational questions before the assessment centre invite",
    commercialContext: "EY UK revenue exceeds £3.7 billion. Service lines include Assurance, Consulting, Strategy and Transactions, and Tax. EY recently dropped a planned global split (Project Everest), which is worth knowing about.",
    whyThisCompanyHook: "EY's partnership culture and global network are genuine differentiators. Strong candidates reference specific EY service lines or recent EY reports — not generic 'Big Four' talking points.",
    schoolLeaver: "EY's School Leaver Programme is a degree apprenticeship across assurance, tax, consulting, and strategy. You study for a BSc while rotating across service lines in the early years.",
    notableAspect: "The EY Assessment Centre includes a partner-level interview — the most senior stage at any Big Four firm's school leaver process. This interview is as much about cultural fit as technical ability.",
  },
  {
    slug: "google",
    name: "Google",
    programmeName: "Google Apprenticeship",
    programmeType: "higher apprenticeship",
    packSlug: "google",
    salary: "£23,000–£30,000",
    length: "18 months–2 years",
    locations: "London",
    acceptanceRate: "1–3%",
    applicationWindow: "Roles posted throughout the year — apply as soon as roles open",
    keyCompetencies: ["Googleyness", "Problem solving", "Cognitive ability", "Leadership", "Role-specific technical skills"],
    interviewFormat: "Phone/video screening followed by a panel interview day with multiple technical and behavioural interviews",
    assessmentCentreStages: ["Technical interview", "Behavioural interview", "Case or role-specific exercise"],
    onlineTests: "Online application review and role-specific screening — no standard psychometric test",
    videoInterviewFormat: "Initial screening video call with a recruiter, then structured panel interviews",
    commercialContext: "Google UK employs over 6,000 people in London. Revenue is primarily advertising, cloud (GCP), and hardware. Google's parent Alphabet reported $307 billion in global revenue in 2023.",
    whyThisCompanyHook: "Google assesses 'Googleyness' — intellectual curiosity, comfort with ambiguity, and doing the right thing even when it's hard. Examples that show you've built, created, or solved something unusual carry significant weight.",
    schoolLeaver: "Google apprenticeships are available across business, technology, and marketing functions. Placements are based in London (King's Cross). Google is one of the few tech giants offering structured apprenticeship pathways for school leavers.",
    notableAspect: "Google's behavioural interviews use the STAR format but focus heavily on your specific role in situations — the 'I' not the 'we'. Answers that rely on team success without isolating your contribution score poorly.",
  },
  {
    slug: "amazon",
    name: "Amazon",
    programmeName: "Amazon Apprenticeship",
    programmeType: "higher apprenticeship",
    packSlug: "amazon",
    salary: "£22,000–£28,000",
    length: "15 months–3 years",
    locations: "London, Manchester, Edinburgh, Milton Keynes, and fulfilment centre locations",
    acceptanceRate: "2–4%",
    applicationWindow: "Roles posted year-round — technology roles in autumn, operations roles ongoing",
    keyCompetencies: ["Amazon Leadership Principles — all 16 (Customer Obsession, Ownership, Invent and Simplify, etc.)"],
    interviewFormat: "Online assessment followed by a structured behavioural interview (STAR format mapped to Leadership Principles)",
    assessmentCentreStages: ["Behavioural interviews using Leadership Principles", "Work simulation exercises"],
    onlineTests: "Workstyle assessment and online aptitude tests",
    videoInterviewFormat: "Amazon uses HireVue for initial screening — questions are explicitly framed around Leadership Principles",
    commercialContext: "Amazon UK is one of the country's largest employers. Revenue streams: e-commerce, Amazon Web Services (AWS), Advertising, Prime, and Devices. AWS alone accounts for over 60% of Amazon's global operating profit.",
    whyThisCompanyHook: "Every Amazon interview answer must be grounded in a specific Leadership Principle. Candidates who don't know all 16 principles by name and can't give examples for at least 8 will not progress past the first interview.",
    schoolLeaver: "Amazon apprenticeships cover technology, business, and operations tracks. Tech apprenticeships lead toward software engineering roles; business and operations apprenticeships support Amazon's fulfilment and logistics network.",
    notableAspect: "Amazon interviews exclusively through Leadership Principles. There are 16 of them. Interviewers often ask: 'Tell me about a time you demonstrated Customer Obsession.' You must prepare a unique STAR story for each principle.",
  },
  {
    slug: "civil-service",
    name: "Civil Service",
    programmeName: "Civil Service Fast Stream Degree Apprenticeship",
    programmeType: "degree apprenticeship",
    packSlug: "civil-service",
    salary: "£27,000–£31,000",
    length: "4 years",
    locations: "London and regional government offices across the UK",
    acceptanceRate: "3–6%",
    applicationWindow: "Autumn (October–December) for the following September start",
    keyCompetencies: ["Making Effective Decisions", "Seeing the Big Picture", "Changing and Improving", "Working Together", "Developing Self and Others", "Managing a Quality Service", "Delivering at Pace"],
    interviewFormat: "Online tests, video interview (Success Profiles framework), and a Final Selection Board (FSB) interview",
    assessmentCentreStages: ["e-tray exercise", "Written exercise", "FSB interview panel"],
    onlineTests: "Verbal reasoning, numerical reasoning, and a situational judgement test based on the Civil Service Success Profiles framework",
    videoInterviewFormat: "Recorded video interview assessing Civil Service Behaviours from the Success Profiles framework",
    commercialContext: "The Civil Service employs over 500,000 people across the UK. Fast Streamers rotate across departments including the Treasury, Cabinet Office, Home Office, HMRC, and FCDO. Starting salaries are set by the Cabinet Office.",
    whyThisCompanyHook: "The Civil Service assesses against its Success Profiles framework — seven Behaviours, Strengths, Experience, Technical skills, and Ability. Candidates must frame every answer using the STAR format mapped to these behaviours.",
    schoolLeaver: "The Civil Service Fast Stream Degree Apprenticeship is a prestigious four-year programme combining work across multiple government departments with an undergraduate degree. It is one of the most competitive public sector schemes in the UK.",
    notableAspect: "The Final Selection Board (FSB) is a panel interview with senior civil servants. It assesses Behaviours and Strengths simultaneously. Many candidates fail here by over-preparing STAR stories and not leaving room for genuine Strengths-based responses.",
  },
  {
    slug: "bbc",
    name: "BBC",
    programmeName: "BBC Apprenticeship",
    programmeType: "higher apprenticeship",
    packSlug: "bbc",
    salary: "£20,000–£24,000",
    length: "18 months–2 years",
    locations: "London (Broadcasting House), Salford (MediaCityUK), and other BBC locations",
    acceptanceRate: "3–5%",
    applicationWindow: "Early in the year — roles typically open January–March",
    keyCompetencies: ["Creativity", "Curiosity", "Collaboration", "Inclusion", "Commercial awareness", "Adaptability"],
    interviewFormat: "Application form sift, online tests, and a structured interview or assessment day",
    assessmentCentreStages: ["Group creative exercise", "Individual interview", "Portfolio/skills task (role-dependent)"],
    onlineTests: "Situational judgement and values-based assessment — tests alignment with BBC values",
    videoInterviewFormat: "Pre-recorded video interview focused on motivation and values alignment",
    commercialContext: "The BBC is funded primarily by the licence fee (£169.50/year) and BBC Studios commercial revenues. BBC Studios generates over £1.8 billion annually from global content sales. Key strategic challenges include streaming competition (Netflix, Disney+) and licence fee sustainability.",
    whyThisCompanyHook: "BBC interviewers want to see genuine passion for media and public service broadcasting. Candidates who can articulate how the BBC's mission (to inform, educate, entertain) relates to their chosen division score significantly higher.",
    schoolLeaver: "BBC apprenticeships are available in journalism, production, technology, business, and data. The BBC is one of very few major UK media organisations with a structured apprenticeship programme for school leavers.",
    notableAspect: "BBC interviews assess values alignment heavily. The BBC's six public purposes and its commitment to impartiality are frequently tested. Candidates should be able to discuss BBC content critically — not just say they watch a lot of TV.",
  },
  {
    slug: "nhs",
    name: "NHS",
    programmeName: "NHS Graduate Management Training Scheme (Degree Apprenticeship)",
    programmeType: "degree apprenticeship",
    packSlug: "nhs",
    salary: "£27,000–£30,000",
    length: "3–4 years",
    locations: "Placements across NHS Trusts throughout England",
    acceptanceRate: "4–7%",
    applicationWindow: "Autumn — typically opens October for the following September start",
    keyCompetencies: ["Patient focus", "Leadership", "Decision making", "Team working", "Communication", "Commitment to NHS values (The NHS Constitution)"],
    interviewFormat: "Online tests, video interview, and an Assessment Centre with NHS-specific exercises",
    assessmentCentreStages: ["Group exercise", "Prioritisation exercise", "Competency interview", "Presentation"],
    onlineTests: "Verbal, numerical, and situational judgement tests — all timed",
    videoInterviewFormat: "Pre-recorded video interview focused on NHS values and leadership behaviours",
    commercialContext: "The NHS employs 1.5 million people, making it the UK's largest employer and one of the world's largest health systems. NHS England budget in 2024/25 is £165 billion. Key challenges: waiting lists, workforce retention, digital transformation, and integrated care systems.",
    whyThisCompanyHook: "NHS interviewers expect genuine understanding of NHS challenges — not just 'I want to help people.' Strong candidates reference specific NHS strategic priorities (e.g. the NHS Long Term Workforce Plan, ICS development, elective recovery targets).",
    schoolLeaver: "The NHS GMTS degree apprenticeship is the management entry route into NHS leadership. Apprentices rotate across NHS Trusts in different management functions — HR, finance, operations, digital — gaining a breadth of experience unmatched in the private sector.",
    notableAspect: "The NHS prioritisation exercise is unique — you're given a large inbox of emails and tasks and must demonstrate how you'd manage competing demands and clinical priorities simultaneously. This is the stage where most candidates underperform.",
  },
];

export const TOPICS: TopicMeta[] = [
  {
    slug: "interview-questions",
    label: "Interview Questions",
    keywordTemplate: "{{company}} apprenticeship interview questions",
    titleTemplate: "{{company}} Apprenticeship Interview Questions 2026 — ApprenticeEdge",
    descriptionTemplate: "The real interview questions {{company}} asks school leavers, with notes on what strong answers look like. STAR frameworks included.",
    h1Template: "{{company}} Apprenticeship Interview Questions 2026",
  },
  {
    slug: "application-tips",
    label: "Application Tips",
    keywordTemplate: "{{company}} apprenticeship application tips",
    titleTemplate: "{{company}} {{programme}} Application Tips 2026 — ApprenticeEdge",
    descriptionTemplate: "Practical tips for the {{company}} apprenticeship application — what they're looking for at every stage, and the mistakes that get candidates rejected.",
    h1Template: "{{company}} Apprenticeship Application Tips 2026",
  },
  {
    slug: "competencies",
    label: "Competencies",
    keywordTemplate: "{{company}} apprenticeship competencies",
    titleTemplate: "{{company}} Apprenticeship Competencies Explained — ApprenticeEdge",
    descriptionTemplate: "The exact competencies {{company}} tests school leavers on, with STAR story guidance for each one.",
    h1Template: "{{company}} Apprenticeship Competencies — What They Test and How to Prepare",
  },
  {
    slug: "assessment-centre",
    label: "Assessment Centre",
    keywordTemplate: "{{company}} apprenticeship assessment centre",
    titleTemplate: "{{company}} Apprenticeship Assessment Centre Guide 2026 — ApprenticeEdge",
    descriptionTemplate: "What to expect at the {{company}} assessment centre — every exercise, how they score you, and what sets top candidates apart.",
    h1Template: "{{company}} Apprenticeship Assessment Centre — What to Expect in 2026",
  },
  {
    slug: "video-interview",
    label: "Video Interview",
    keywordTemplate: "{{company}} apprenticeship video interview",
    titleTemplate: "{{company}} Apprenticeship Video Interview Tips 2026 — ApprenticeEdge",
    descriptionTemplate: "How the {{company}} video interview works, what questions to expect, and how to record strong answers.",
    h1Template: "{{company}} Apprenticeship Video Interview — Format, Questions and Tips",
  },
  {
    slug: "star-method",
    label: "STAR Method Examples",
    keywordTemplate: "{{company}} apprenticeship STAR method examples",
    titleTemplate: "STAR Method Examples for {{company}} Apprenticeship — ApprenticeEdge",
    descriptionTemplate: "How to use the STAR method for {{company}} apprenticeship interviews — with worked examples tailored to the competencies {{company}} actually tests.",
    h1Template: "STAR Method Examples for {{company}} Apprenticeship Interviews",
  },
  {
    slug: "online-tests",
    label: "Online Tests",
    keywordTemplate: "{{company}} apprenticeship online tests",
    titleTemplate: "{{company}} Apprenticeship Online Tests Guide 2026 — ApprenticeEdge",
    descriptionTemplate: "What the {{company}} apprenticeship online tests involve, how to prepare, and the most common mistakes candidates make.",
    h1Template: "{{company}} Apprenticeship Online Tests — What to Expect and How to Prepare",
  },
  {
    slug: "commercial-awareness",
    label: "Commercial Awareness",
    keywordTemplate: "{{company}} apprenticeship commercial awareness",
    titleTemplate: "Commercial Awareness for {{company}} Apprenticeship — ApprenticeEdge",
    descriptionTemplate: "The commercial awareness questions {{company}} asks and the key business context you need to know before applying.",
    h1Template: "Commercial Awareness for {{company}} Apprenticeship Applications",
  },
  {
    slug: "why-this-company",
    label: "Why This Company",
    keywordTemplate: "why {{company}} apprenticeship answer",
    titleTemplate: "How to Answer 'Why {{company}}?' — ApprenticeEdge",
    descriptionTemplate: "How to write a compelling 'Why {{company}}?' answer for your apprenticeship application — what interviewers want to hear, and what gets candidates rejected.",
    h1Template: "How to Answer 'Why {{company}}?' for Your Apprenticeship Application",
  },
  {
    slug: "salary",
    label: "Salary",
    keywordTemplate: "{{company}} school leaver apprenticeship salary",
    titleTemplate: "{{company}} Apprenticeship Salary 2026 — ApprenticeEdge",
    descriptionTemplate: "{{company}} apprenticeship starting salary, progression, and how it compares to other top UK schemes.",
    h1Template: "{{company}} Apprenticeship Salary 2026 — What School Leavers Earn",
  },
  {
    slug: "how-to-get-in",
    label: "How to Get In",
    keywordTemplate: "how to get into {{company}} apprenticeship",
    titleTemplate: "How to Get Into the {{company}} Apprenticeship — ApprenticeEdge",
    descriptionTemplate: "A stage-by-stage guide to getting into the {{company}} school leaver programme — from application to offer.",
    h1Template: "How to Get Into the {{company}} Apprenticeship — Stage by Stage",
  },
  {
    slug: "acceptance-rate",
    label: "Acceptance Rate",
    keywordTemplate: "{{company}} apprenticeship acceptance rate",
    titleTemplate: "{{company}} Apprenticeship Acceptance Rate 2026 — ApprenticeEdge",
    descriptionTemplate: "How competitive is the {{company}} apprenticeship? Acceptance rate, number of applicants, and what it takes to stand out.",
    h1Template: "{{company}} Apprenticeship Acceptance Rate — How Competitive Is It?",
  },
  {
    slug: "application-timeline",
    label: "Application Timeline",
    keywordTemplate: "{{company}} apprenticeship application timeline deadline",
    titleTemplate: "{{company}} Apprenticeship Application Timeline 2026 — ApprenticeEdge",
    descriptionTemplate: "When to apply to the {{company}} apprenticeship — key deadlines, how long each stage takes, and when offers are made.",
    h1Template: "{{company}} Apprenticeship Application Timeline and Deadlines 2026",
  },
  {
    slug: "group-exercise",
    label: "Group Exercise",
    keywordTemplate: "{{company}} apprenticeship group exercise",
    titleTemplate: "{{company}} Assessment Centre Group Exercise Guide — ApprenticeEdge",
    descriptionTemplate: "How to perform well in the {{company}} group exercise — what assessors are looking for, and the behaviours that score highest.",
    h1Template: "{{company}} Apprenticeship Group Exercise — What Assessors Look For",
  },
  {
    slug: "situational-judgement",
    label: "Situational Judgement Test",
    keywordTemplate: "{{company}} apprenticeship situational judgement test",
    titleTemplate: "{{company}} Apprenticeship Situational Judgement Test — ApprenticeEdge",
    descriptionTemplate: "How the {{company}} situational judgement test works, the types of scenarios it uses, and how to approach it.",
    h1Template: "{{company}} Apprenticeship Situational Judgement Test — How to Pass",
  },
  {
    slug: "stage-by-stage",
    label: "Application Stages",
    keywordTemplate: "{{company}} apprenticeship stages",
    titleTemplate: "{{company}} Apprenticeship Application Stages Explained — ApprenticeEdge",
    descriptionTemplate: "Every stage of the {{company}} apprenticeship application process — what happens, in what order, and what you need to do to pass each one.",
    h1Template: "{{company}} Apprenticeship Application Stages — Everything You Need to Know",
  },
  {
    slug: "school-leaver-vs-grad",
    label: "School Leaver vs Graduate",
    keywordTemplate: "{{company}} school leaver vs graduate scheme",
    titleTemplate: "{{company}} School Leaver vs Graduate Scheme — Which is Right for You?",
    descriptionTemplate: "Comparing the {{company}} school leaver apprenticeship to their graduate scheme — salary, progression, workload, and which one is worth it.",
    h1Template: "{{company}} School Leaver Programme vs Graduate Scheme — The Honest Comparison",
  },
  {
    slug: "top-tips",
    label: "Top Tips",
    keywordTemplate: "{{company}} apprenticeship tips",
    titleTemplate: "Top Tips for the {{company}} Apprenticeship Application 2026 — ApprenticeEdge",
    descriptionTemplate: "The most important tips for the {{company}} apprenticeship application — from someone who has analysed every stage of the process.",
    h1Template: "{{company}} Apprenticeship Application — Top Tips for 2026",
  },
  {
    slug: "what-to-expect",
    label: "What to Expect",
    keywordTemplate: "{{company}} apprenticeship what to expect",
    titleTemplate: "What to Expect from the {{company}} Apprenticeship Application — ApprenticeEdge",
    descriptionTemplate: "An honest guide to what the {{company}} apprenticeship application process actually looks like from start to finish.",
    h1Template: "What to Expect from the {{company}} Apprenticeship Application Process",
  },
  {
    slug: "competency-questions",
    label: "Competency Questions",
    keywordTemplate: "{{company}} apprenticeship competency based questions",
    titleTemplate: "{{company}} Apprenticeship Competency Questions 2026 — ApprenticeEdge",
    descriptionTemplate: "The competency-based interview questions {{company}} asks school leavers, with STAR answer guidance for each one.",
    h1Template: "{{company}} Apprenticeship Competency Questions — With Answer Guidance",
  },
];

export function fillTemplate(template: string, company: CompanyData): string {
  return template
    .replace(/{{company}}/g, company.name)
    .replace(/{{programme}}/g, company.programmeName);
}

export function getAllGuideParams(): { company: string; topic: string }[] {
  const params: { company: string; topic: string }[] = [];
  for (const company of COMPANIES) {
    for (const topic of TOPICS) {
      params.push({ company: company.slug, topic: topic.slug });
    }
  }
  return params;
}

export function getCompany(slug: string): CompanyData | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}

export function getTopic(slug: string): TopicMeta | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
