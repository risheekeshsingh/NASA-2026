"use client";

import React, { useEffect, useState } from "react";

export interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  label: string;
  description: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1200,
  label,
  description,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(value);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const increment = value / (durationMs / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value, durationMs]);

  return (
    <div className="p-5 rounded-2xl border border-space-800 bg-space-900/60 backdrop-blur-md space-y-1">
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
        {label}
      </span>
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white flex items-baseline gap-0.5">
        <span>{prefix}</span>
        <span className="text-amber-400">{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}
