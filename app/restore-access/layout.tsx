import type { Metadata } from "next";

// page.tsx here is a client component ("use client"), and client components cannot export
// metadata. A layout is the supported way to attach it: metadata declared on a layout applies
// to the pages beneath it.
//
// noindex rather than a canonical, because this is a utility page for customers who have lost
// their access link. It has no search value and should never be a landing page.
export const metadata: Metadata = {
  title: "Restore Your Access: ApprenticeEdge",
  robots: { index: false, follow: false },
};

export default function RestoreAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
