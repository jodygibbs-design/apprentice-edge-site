"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  freePackSlug: string;
}

const TRUST_SIGNALS = [
  { stat: "10", label: "employer packs" },
  { stat: "£29", label: "one payment" },
  { stat: "vs £500+", label: "private tutoring" },
];

export default function HeroContent({ freePackSlug }: Props) {
  const [tab, setTab] = useState<"students" | "parents">("students");
  const isStudents = tab === "students";

  return (
    <section
      className="border-b transition-colors duration-500"
      style={{
        backgroundColor: isStudents ? "#0A1628" : "#F8F5F0",
        borderColor: isStudents ? "#1e2d42" : "#e5e0d8",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 py-14 sm:py-24 text-center">

        {/* Audience toggle */}
        <div
          className="inline-flex items-center rounded-full p-1 mb-10"
          style={{ backgroundColor: isStudents ? "rgba(255,255,255,0.08)" : "rgba(13,27,42,0.08)" }}
        >
          <button
            onClick={() => setTab("students")}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: isStudents ? "white" : "transparent",
              color: isStudents ? "#0D1B2A" : (isStudents ? "#94A3B8" : "#64748B"),
              boxShadow: isStudents ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
            }}
          >
            For students
          </button>
          <button
            onClick={() => setTab("parents")}
            className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: !isStudents ? "#0D1B2A" : "transparent",
              color: !isStudents ? "white" : (isStudents ? "#6B7F9E" : "#64748B"),
              boxShadow: !isStudents ? "0 1px 4px rgba(0,0,0,0.2)" : "none",
            }}
          >
            For parents
          </button>
        </div>

        {isStudents ? (
          <>
            {/* Student: dark, energetic, aspirational */}
            <div className="inline-flex items-center gap-2 border text-sm font-medium px-3 py-1.5 rounded-full mb-8" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#93C5FD", backgroundColor: "rgba(255,255,255,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block"></span>
              Written for UK school leavers — not graduates
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6" style={{ color: "white" }}>
              Get into the UK&apos;s most{" "}
              <br className="hidden sm:block" />
              <span style={{ color: "#F97316" }}>competitive</span>{" "}
              apprenticeships.
            </h1>
            <p className="text-base sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
              Insider prep packs, AI mock interviews, and practice tests — for PwC, Goldman Sachs,
              Google, the Civil Service, and seven more. Know exactly what they test, what they ask,
              and what a strong answer looks like.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch sm:items-center mb-4">
              <Link
                href={`/packs/${freePackSlug}`}
                className="bg-white font-semibold px-8 py-4 rounded-xl text-base hover:bg-slate-100 transition-colors shadow-lg"
                style={{ color: "#0D1B2A" }}
              >
                Read the free PwC pack
              </Link>
              <Link
                href="/checkout"
                className="group relative overflow-hidden bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl text-base shadow-lg shadow-orange-500/25 inline-flex items-center"
              >
                <span className="pr-8 transition-opacity duration-300 group-hover:opacity-0">Get all 10 packs — £29</span>
                <i className="absolute right-1 top-1 bottom-1 rounded-lg not-italic grid place-items-center w-10 transition-all duration-300 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3.5L12 9L6 14.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </i>
              </Link>
            </div>
            <p className="text-xs mt-2" style={{ color: "#475569" }}>One payment. Instant access. No subscription.</p>
          </>
        ) : (
          <>
            {/* Parent: light, warm, trustworthy, investment framing */}
            <div className="inline-flex items-center gap-2 border text-sm font-medium px-3 py-1.5 rounded-full mb-8" style={{ borderColor: "#D4C5A9", color: "#78604A", backgroundColor: "rgba(196,146,42,0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#C4922A" }}></span>
              The same preparation as privately coached candidates
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6" style={{ color: "#0D1B2A" }}>
              Give your child a real{" "}
              <span style={{ color: "#C4922A" }}>edge</span>{" "}
              on their application.
            </h1>
            <p className="text-base sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "#5C6878" }}>
              Most applicants turn up without knowing what questions to expect or how to answer them.
              ApprenticeEdge gives your child employer prep packs, AI mock interviews, and practice tests —
              the same preparation as privately coached candidates, at a fraction of the cost.
            </p>

            {/* Trust signals for parents */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
              {TRUST_SIGNALS.map(({ stat, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-extrabold" style={{ color: "#0D1B2A" }}>{stat}</div>
                  <div className="text-sm" style={{ color: "#78604A" }}>{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch sm:items-center mb-4">
              <Link
                href="/checkout"
                className="group relative overflow-hidden bg-orange-500 text-white font-semibold px-8 py-4 rounded-xl text-base shadow-lg shadow-orange-500/25 inline-flex items-center"
              >
                <span className="pr-8 transition-opacity duration-300 group-hover:opacity-0">Buy Season Pass — £29</span>
                <i className="absolute right-1 top-1 bottom-1 rounded-lg not-italic grid place-items-center w-10 transition-all duration-300 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3.5L12 9L6 14.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </i>
              </Link>
              <Link
                href={`/packs/${freePackSlug}`}
                className="font-semibold px-8 py-4 rounded-xl text-base border-2 transition-colors hover:bg-slate-50"
                style={{ color: "#0D1B2A", borderColor: "#0D1B2A" }}
              >
                Try the free PwC pack first
              </Link>
            </div>
            <p className="text-xs mt-2" style={{ color: "#9A8A7A" }}>One payment. Instant access. No subscription.</p>
          </>
        )}
      </div>
    </section>
  );
}
