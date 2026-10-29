"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, EyeOff } from "lucide-react";

export function FooterBackgroundToggle() {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("flamelens_reduce_bg");
      if (stored !== null) {
        setReduced(stored === "true");
      }
    } catch {
      // localStorage may fail in restricted/sandboxed mode
    }
  }, []);

  const handleToggle = () => {
    const next = !reduced;
    setReduced(next);
    try {
      localStorage.setItem("flamelens_reduce_bg", String(next));
      window.dispatchEvent(
        new CustomEvent("flamelens:reduce-bg", { detail: next })
      );
    } catch {
      // ignore storage write errors
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={reduced}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors border ${
        mounted && reduced
          ? "bg-amber-950/40 text-amber-300 border-amber-700/50 hover:bg-amber-900/50"
          : "bg-space-900/80 text-slate-300 border-space-800 hover:text-white hover:border-space-700"
      }`}
      aria-label="Reduce background visual effects and particle animations"
    >
      {mounted && reduced ? (
        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <Sparkles className="w-3.5 h-3.5 text-ember-400" />
      )}
      <span>{mounted && reduced ? "Effects: Reduced" : "Reduce background effects"}</span>
    </button>
  );
}
