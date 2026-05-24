import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export interface Pack {
  slug: string;
  title: string;
  company: string;
  free: boolean;
  filename: string;
  brandColor: string;
  brandColorLight: string;
}

export const PACKS: Pack[] = [
  { slug: "pwc", title: "PwC School Leaver", company: "PwC", free: true, filename: "pwc-school-leaver.md", brandColor: "#D93025", brandColorLight: "#FDE8E8" },
  { slug: "deloitte", title: "Deloitte BrightStart", company: "Deloitte", free: false, filename: "deloitte-school-leaver.md", brandColor: "#86BC25", brandColorLight: "#F0F8E6" },
  { slug: "kpmg", title: "KPMG 360°", company: "KPMG", free: false, filename: "kpmg-school-leaver.md", brandColor: "#00338D", brandColorLight: "#E8EFF8" },
  { slug: "ey", title: "EY School Leaver", company: "EY", free: false, filename: "ey-school-leaver.md", brandColor: "#FFE600", brandColorLight: "#FFFDE6" },
  { slug: "goldman-sachs", title: "Goldman Sachs Higher Apprenticeship", company: "Goldman Sachs", free: false, filename: "goldman-sachs-school-leaver.md", brandColor: "#003B5C", brandColorLight: "#E0EBF5" },
  { slug: "google", title: "Google Apprenticeship", company: "Google", free: false, filename: "google-school-leaver.md", brandColor: "#4285F4", brandColorLight: "#EEF3FF" },
  { slug: "amazon", title: "Amazon Apprenticeship", company: "Amazon", free: false, filename: "amazon-school-leaver.md", brandColor: "#FF9900", brandColorLight: "#FFF3E0" },
  { slug: "civil-service", title: "Civil Service Fast Stream", company: "Civil Service", free: false, filename: "civil-service-fast-stream.md", brandColor: "#1D2E6A", brandColorLight: "#E8ECFA" },
  { slug: "bbc", title: "BBC Apprenticeship", company: "BBC", free: false, filename: "bbc-apprenticeship.md", brandColor: "#BB1919", brandColorLight: "#FDEAEA" },
  { slug: "nhs", title: "NHS Apprenticeship", company: "NHS", free: false, filename: "nhs-apprenticeship.md", brandColor: "#005EB8", brandColorLight: "#E6F2FC" },
];

export function getPackBySlug(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug);
}

export async function getPackContent(filename: string): Promise<string> {
  const fullPath = path.join(contentDir, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(raw);
  const result = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return result.toString();
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
  return { preview: previewResult.toString(), full: fullResult.toString() };
}
