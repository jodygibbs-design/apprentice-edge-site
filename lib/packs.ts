import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export interface Pack {
  slug: string;
  title: string;
  company: string;
  free: boolean;
  filename: string;
}

export const PACKS: Pack[] = [
  { slug: "pwc", title: "PwC School Leaver", company: "PwC", free: true, filename: "pwc-school-leaver.md" },
  { slug: "deloitte", title: "Deloitte BrightStart", company: "Deloitte", free: false, filename: "deloitte-school-leaver.md" },
  { slug: "kpmg", title: "KPMG 360°", company: "KPMG", free: false, filename: "kpmg-school-leaver.md" },
  { slug: "ey", title: "EY School Leaver", company: "EY", free: false, filename: "ey-school-leaver.md" },
  { slug: "goldman-sachs", title: "Goldman Sachs Higher Apprenticeship", company: "Goldman Sachs", free: false, filename: "goldman-sachs-school-leaver.md" },
  { slug: "google", title: "Google Apprenticeship", company: "Google", free: false, filename: "google-school-leaver.md" },
  { slug: "amazon", title: "Amazon Apprenticeship", company: "Amazon", free: false, filename: "amazon-school-leaver.md" },
  { slug: "civil-service", title: "Civil Service Fast Stream", company: "Civil Service", free: false, filename: "civil-service-fast-stream.md" },
  { slug: "bbc", title: "BBC Apprenticeship", company: "BBC", free: false, filename: "bbc-apprenticeship.md" },
  { slug: "nhs", title: "NHS Apprenticeship", company: "NHS", free: false, filename: "nhs-apprenticeship.md" },
];

export function getPackBySlug(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug);
}

export async function getPackContent(filename: string): Promise<string> {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

export async function getPackContentSplit(filename: string): Promise<{ preview: string; full: string }> {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  const [previewMd, ...rest] = content.split("<!--more-->");
  const fullMd = rest.join("<!--more-->");
  const [previewResult, fullResult] = await Promise.all([
    remark().use(remarkHtml).process(previewMd),
    remark().use(remarkHtml).process(fullMd),
  ]);
  return { preview: previewResult.toString(), full: fullResult.toString() };
}
