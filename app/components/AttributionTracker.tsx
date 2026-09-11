"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records first-touch attribution. Mounted once in the root layout so it runs whichever
 * page the visitor happens to land on, which for this site is usually a guide or an SEO
 * page rather than the homepage. Renders nothing.
 *
 * Reads window.location rather than useSearchParams() on purpose. useSearchParams() opts
 * the nearest Suspense boundary out of static rendering, and from the root layout that
 * boundary is every page on the site, including the 258 prerendered SEO pages. The query
 * string is on window either way once this runs.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
