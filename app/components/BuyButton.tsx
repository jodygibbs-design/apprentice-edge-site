"use client";

import { useState } from "react";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: promoCode.trim() || undefined }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Promo code (optional)"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
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
