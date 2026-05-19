import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApprenticeEdge — UK Apprenticeship Prep Packs",
  description: "Insider prep packs for UK school leavers applying to PwC, Deloitte, KPMG, EY, Goldman Sachs, Google, Amazon, Civil Service, BBC, and NHS apprenticeships.",
  openGraph: {
    title: "ApprenticeEdge — UK Apprenticeship Prep Packs",
    description: "Level the playing field. Prep packs for the UK's most competitive school leaver apprenticeships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <header className="border-b border-gray-100 py-4 px-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <a href="/" className="font-bold text-lg tracking-tight text-gray-900">
              ApprenticeEdge
            </a>
            <a
              href="/checkout"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Season Pass — £29
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-100 py-8 px-6 text-sm text-gray-500">
          <div className="max-w-4xl mx-auto">
            <p>ApprenticeEdge — helping UK school leavers compete on a level playing field.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
