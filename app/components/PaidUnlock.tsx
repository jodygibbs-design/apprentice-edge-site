"use client";

import { useEffect } from "react";

export default function PaidUnlock() {
  useEffect(() => {
    localStorage.setItem("ae_paid", "true");
  }, []);

  return null;
}
