"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  freePackSlug: string;
}

export default function HeroActions({ freePackSlug }: Props) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    setPaid(localStorage.getItem("ae_paid") === "true");
  }, []);

  if (paid) {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="#packs"
          className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
        >
          Go to your packs ↓
        </a>
        <Link
          href={`/packs/${freePackSlug}`}
          className="text-slate-500 px-8 py-3.5 rounded-xl font-semibold text-base hover:text-slate-700 transition-colors"
        >
          Read the free PwC pack
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href={`/packs/${freePackSlug}`}
        className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
      >
        Read the free PwC pack
      </Link>
      <Link
        href="/checkout"
        className="bg-orange-500 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-orange-600 transition-colors shadow-sm"
      >
        Get all 10 packs — £29
      </Link>
    </div>
  );
}
