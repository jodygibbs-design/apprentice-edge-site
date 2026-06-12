import type { Metadata } from "next";
import Script from "next/script";
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
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-18218897830" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-18218897830');
      `}</Script>
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 tracking-tight">
              {/* AE mark: geometric A — two strokes + gold crossbar */}
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 29L16 4L28 29" stroke="#0D1B2A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 20.5H23.5" stroke="#C4922A" strokeWidth="3.5" strokeLinecap="round"/>
              </svg>
              <span className="text-base font-semibold text-[#0D1B2A]">Apprentice<span className="font-extrabold" style={{color: "#C4922A"}}>Edge</span></span>
            </a>
            <nav className="flex items-center gap-4">
              <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                All packs
              </a>
              <a href="/guides" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
                Free guides
              </a>
              <a
                href="/checkout"
                className="text-sm bg-[#0D1B2A] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1E3A5F] transition-colors"
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
              <p className="max-w-xs mt-3 text-xs text-slate-600">
                ApprenticeEdge is not affiliated with, endorsed by, or partnered with any of the employers listed.
                Pack content is based on publicly available information and research. Application processes change —
                always verify details with the employer&apos;s official website.
              </p>
            </div>
            <div className="text-slate-500 text-xs space-y-1">
              <p>© 2026 Deep Cut Industries Limited</p>
              <p>Company No. 17231642 · Registered in England &amp; Wales</p>
              <p className="mt-2">All 10 packs · Season Pass · £29</p>
              <p className="mt-2">
                <a href="/guides" className="hover:text-slate-300 transition-colors">Free guides</a>
                {" · "}
                <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
