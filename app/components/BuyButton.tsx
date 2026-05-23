"use client";

import { useState } from "react";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
      >
        {loading ? "Loading…" : "Buy now — £29"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
