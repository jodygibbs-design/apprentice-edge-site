import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

const GLOSSARY: Record<string, string> = {
  "STAR": "Situation, Task, Action, Result — a structured format for answering competency interview questions",
  "AAT": "Association of Accounting Technicians — a professional accounting qualification, typically the first step toward chartered status",
  "ACCA": "Association of Chartered Certified Accountants — a globally recognised professional accounting qualification",
  "ACA": "Associate Chartered Accountant — awarded by ICAEW, one of the most respected accounting qualifications in the UK",
  "CIMA": "Chartered Institute of Management Accountants — a professional qualification focused on management and strategic finance",
  "ICAEW": "Institute of Chartered Accountants in England and Wales — the body that awards the ACA qualification",
  "ATT": "Association of Taxation Technicians — a professional qualification for tax practitioners",
  "CTA": "Chartered Tax Adviser — the senior tax qualification in the UK, awarded by CIOT",
  "CFA": "Chartered Financial Analyst — a globally recognised investment and finance qualification",
  "CISI": "Chartered Institute for Securities &amp; Investment — professional body for the financial services industry",
  "SJT": "Situational Judgement Test — an assessment presenting realistic work scenarios to evaluate professional judgement",
  "FTSE": "Financial Times Stock Exchange — refers to indices (e.g. FTSE 100) tracking the largest companies on the London Stock Exchange",
  "IPO": "Initial Public Offering — when a private company offers shares to the public for the first time, listing on a stock exchange",
  "ESG": "Environmental, Social and Governance — criteria used to evaluate a company's ethical and sustainability practices",
  "GenAI": "Generative AI — artificial intelligence systems that can create text, images, code, and other content from prompts",
  "AWS": "Amazon Web Services — Amazon's cloud computing platform; the largest cloud provider in the world",
  "APIs": "Application Programming Interfaces — tools that allow different software systems to communicate with each other",
  "API": "Application Programming Interface — a tool that allows different software systems to communicate with each other",
  "SQL": "Structured Query Language — a programming language used to query and manage databases",
  "NAV": "Net Asset Value — the value of a fund's assets minus liabilities; used to price investment funds",
  "RSUs": "Restricted Stock Units — equity compensation where employees receive company shares that vest over time",
  "ATS": "Applicant Tracking System — software employers use to manage applications and screen CVs automatically",
  "DBS": "Disclosure and Barring Service — provides criminal record checks required for roles in healthcare, education, and similar sectors",
  "DHSC": "Department of Health and Social Care — the UK government department responsible for health and adult social care policy",
  "HMRC": "His Majesty's Revenue and Customs — the UK's tax authority, responsible for collecting taxes and administering benefits",
  "DWP": "Department for Work and Pensions — the UK government department responsible for welfare, pensions, and child maintenance",
  "MOD": "Ministry of Defence — the UK government department responsible for defence and the armed forces",
  "FCDO": "Foreign, Commonwealth and Development Office — the UK government department for foreign affairs and international development",
  "ICBs": "Integrated Care Boards — NHS organisations responsible for planning and funding health services across a local region",
  "ICB": "Integrated Care Board — an NHS organisation responsible for planning and funding health services across a local region",
  "CAMHS": "Child and Adolescent Mental Health Services — NHS services that support young people experiencing mental health difficulties",
  "EPR": "Electronic Patient Records — digital systems that store and share patient health information across NHS services",
  "AfC": "Agenda for Change — the NHS pay framework that sets standardised, transparent salary bands for most NHS staff",
  "DDaT": "Digital, Data and Technology — the cross-government profession covering technology, data science, and digital service roles",
  "FRC": "Financial Reporting Council — the UK's independent regulator for audit, accounting, and corporate governance",
  "KPMG": "Klynveld Peat Marwick Goerdeler — one of the Big Four professional services firms",
  "EY": "Ernst &amp; Young — one of the Big Four professional services and accounting firms",
  "PwC": "PricewaterhouseCoopers — one of the Big Four professional services firms",
  "SHL": "Saville and Holdsworth Limited — a leading provider of psychometric assessments used in graduate and school leaver recruitment",
  "GCP": "Google Cloud Platform — Google's cloud computing services, competing with AWS and Microsoft Azure",
  "LPs": "Leadership Principles — Amazon's 16 core values that guide decisions, hiring, and day-to-day behaviour at the company",
  "LP": "Leadership Principle — one of Amazon's 16 core values that guide decisions, hiring, and behaviour at the company",
  "IPOs": "Initial Public Offerings — when private companies list shares publicly for the first time; plural of IPO",
  "IBD": "Investment Banking Division — Goldman Sachs's core advisory division for mergers, acquisitions, and capital markets",
  "CV": "Curriculum Vitae — a document summarising your education, experience, and achievements, used when applying for jobs",
  "HR": "Human Resources — the department responsible for recruitment, people management, and employee relations",
  "IT": "Information Technology — the use of computers and software to store, process, and communicate information",
  "AI": "Artificial Intelligence — computer systems that perform tasks typically requiring human intelligence, such as language understanding and pattern recognition",
  "UK": "United Kingdom — England, Scotland, Wales, and Northern Ireland",
  "EU": "European Union — a political and economic union of 27 European member states",
  "GCSE": "General Certificate of Secondary Education — qualifications taken by students aged 14–16 in England, Wales, and Northern Ireland",
  "GDPR": "General Data Protection Regulation — UK and EU law governing how organisations collect, store, and use personal data",
  "GP": "General Practitioner — an NHS family doctor who provides primary healthcare and refers patients to specialists",
  "ICS": "Integrated Care System — a regional NHS structure bringing together health and care organisations to plan and deliver services",
  "CCGs": "Clinical Commissioning Groups — the NHS commissioning bodies replaced by Integrated Care Boards in July 2022",
  "ITV": "Independent Television — the UK's main commercial free-to-air broadcaster",
  "TV": "Television",
  "DCMS": "Department for Culture, Media and Sport — the UK government department covering arts, broadcasting, sport, and digital economy",
  "SDE": "Software Development Engineer — Amazon's standard job title for software engineers",
  "AC": "Assessment Centre — a structured recruitment event where candidates complete group exercises, interviews, and practical tasks",
  "VAT": "Value Added Tax — a consumption tax applied to most goods and services in the UK, currently 20%",
  "MD": "Managing Director — a senior executive responsible for running a company or major business division",
  "HM": "His Majesty's — the prefix used by UK government departments and public bodies",
  "IQ": "Intelligence Quotient — a measure of cognitive ability; used informally to mean analytical intelligence",
  "HQ": "Headquarters — the main office or central base of an organisation",
};

function wrapSectionsAsCards(html: string): string {
  // Strip the markdown h1 — the pack page header already has its own h1
  let processed = html.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\s*/m, "");

  // Split at h2 boundaries, keeping the h2 tag with each section
  const parts = processed.split(/(?=<h2[^>]*>)/);
  let cardIndex = 0;

  return parts
    .map((section) => {
      const h2Match = section.match(/^(<h2[^>]*>[\s\S]*?<\/h2>)([\s\S]*)$/);
      if (!h2Match) return section; // intro content before first h2

      cardIndex++;
      const [, heading, body] = h2Match;
      const num = String(cardIndex).padStart(2, "0");
      return `<div class="pack-card"><div class="pack-card-header"><span class="pack-card-num">${num}</span>${heading}</div><div class="pack-card-body">${body.trim()}</div></div>`;
    })
    .join("");
}

function applyGlossaryTooltips(html: string): string {
  let result = html;
  for (const [abbr, definition] of Object.entries(GLOSSARY)) {
    const escaped = abbr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(<[^>]*>)|(\\b${escaped}\\b)`, "g");
    let applied = false;
    result = result.replace(pattern, (match, tag) => {
      if (tag) return tag;
      if (applied) return match;
      applied = true;
      return `<abbr title="${definition}">${match}</abbr>`;
    });
  }
  return result;
}

export interface Pack {
  slug: string;
  title: string;
  company: string;
  free: boolean;
  filename: string;
  logoFile: string;
  brandColor: string;
  brandColorLight: string;
}

export const PACKS: Pack[] = [
  { slug: "pwc", title: "PwC School Leaver", company: "PwC", free: true, filename: "pwc-school-leaver.md", logoFile: "pwc.svg", brandColor: "#D93025", brandColorLight: "#FDE8E8" },
  { slug: "deloitte", title: "Deloitte BrightStart", company: "Deloitte", free: false, filename: "deloitte-school-leaver.md", logoFile: "deloitte.svg", brandColor: "#86BC25", brandColorLight: "#F0F8E6" },
  { slug: "kpmg", title: "KPMG 360°", company: "KPMG", free: false, filename: "kpmg-school-leaver.md", logoFile: "kpmg.svg", brandColor: "#00338D", brandColorLight: "#E8EFF8" },
  { slug: "ey", title: "EY School Leaver", company: "EY", free: false, filename: "ey-school-leaver.md", logoFile: "ey.svg", brandColor: "#FFE600", brandColorLight: "#FFFDE6" },
  { slug: "goldman-sachs", title: "Goldman Sachs Higher Apprenticeship", company: "Goldman Sachs", free: false, filename: "goldman-sachs-school-leaver.md", logoFile: "goldman-sachs.svg", brandColor: "#003B5C", brandColorLight: "#E0EBF5" },
  { slug: "google", title: "Google Apprenticeship", company: "Google", free: false, filename: "google-school-leaver.md", logoFile: "google.svg", brandColor: "#4285F4", brandColorLight: "#EEF3FF" },
  { slug: "amazon", title: "Amazon Apprenticeship", company: "Amazon", free: false, filename: "amazon-school-leaver.md", logoFile: "amazon.svg", brandColor: "#FF9900", brandColorLight: "#FFF3E0" },
  { slug: "civil-service", title: "Civil Service Fast Stream", company: "Civil Service", free: false, filename: "civil-service-fast-stream.md", logoFile: "civil-service.svg", brandColor: "#1D2E6A", brandColorLight: "#E8ECFA" },
  { slug: "bbc", title: "BBC Apprenticeship", company: "BBC", free: false, filename: "bbc-apprenticeship.md", logoFile: "bbc.svg", brandColor: "#BB1919", brandColorLight: "#FDEAEA" },
  { slug: "nhs", title: "NHS Apprenticeship", company: "NHS", free: false, filename: "nhs-apprenticeship.md", logoFile: "nhs.svg", brandColor: "#005EB8", brandColorLight: "#E6F2FC" },
];

export function getPackBySlug(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug);
}

export async function getPackContent(filename: string): Promise<string> {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return wrapSectionsAsCards(applyGlossaryTooltips(result.toString()));
}

export function getPackRawContent(filename: string): string {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  return content;
}

export async function getPackContentSplit(filename: string): Promise<{ preview: string; full: string }> {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  const [previewMd, ...rest] = content.split("<!--more-->");
  const fullMd = rest.join("<!--more-->");
  const [previewResult, fullResult] = await Promise.all([
    remark().use(remarkGfm).use(remarkHtml).process(previewMd),
    remark().use(remarkGfm).use(remarkHtml).process(fullMd),
  ]);
  return {
    preview: wrapSectionsAsCards(applyGlossaryTooltips(previewResult.toString())),
    full: wrapSectionsAsCards(applyGlossaryTooltips(fullResult.toString())),
  };
}
