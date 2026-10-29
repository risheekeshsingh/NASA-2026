"use client";

import { useEffect } from "react";

export function PWARegistration() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[FlameLens PWA] Service Worker registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[FlameLens PWA] Service Worker registration failed:", err);
        });
    }
  }, []);

  return null;
}
