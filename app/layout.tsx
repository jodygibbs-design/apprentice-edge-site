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
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
              <span className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">AE</span>
              ApprenticeEdge
            </a>
            <nav className="flex items-center gap-4">
              <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                All packs
              </a>
              <a
                href="/checkout"
                className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Season Pass — £29
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-sm">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <p className="font-semibold text-white mb-1">ApprenticeEdge</p>
              <p className="max-w-xs">Helping UK school leavers compete on a level playing field with insider prep for the country&apos;s most competitive apprenticeships.</p>
            </div>
            <div className="text-slate-500 text-xs">
              <p>© 2026 Deep Cut Industries Ltd</p>
              <p className="mt-1">All 10 packs · Season Pass · £29</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
