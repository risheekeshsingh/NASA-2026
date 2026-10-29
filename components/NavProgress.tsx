"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function NavProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  // Complete and fade out progress bar when pathname changes
  useEffect(() => {
    setProgress(100);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 200);
    timerRef.current.push(hideTimer);
    return () => clearTimers();
  }, [pathname]);

  // Intercept internal link clicks for immediate top-bar visual feedback
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      // Ignore right clicks or clicks with modifier keys
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target || !target.href) return;

      // Ignore external links or target="_blank"
      if (target.target === "_blank" || target.rel?.includes("external")) return;

      const url = new URL(target.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      // Ignore download links or hash-only links
      if (target.hasAttribute("download") || target.getAttribute("href")?.startsWith("#")) {
        return;
      }

      // Ignore repeat clicks to the exact same route
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      // Start instant navigation progress
      clearTimers();
      setVisible(true);
      setProgress(25);

      const t1 = setTimeout(() => setProgress(55), 80);
      const t2 = setTimeout(() => setProgress(80), 220);
      const t3 = setTimeout(() => setProgress(92), 600);
      timerRef.current.push(t1, t2, t3);
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      clearTimers();
    };
  }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-ember-500 via-amber-400 to-astro-cyan transition-all duration-200 ease-out shadow-[0_0_8px_rgba(249,115,22,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
