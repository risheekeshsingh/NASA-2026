"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const HeroFlameIssScene = dynamic(
  () => import("./HeroFlameIssScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl bg-gradient-to-br from-space-950 via-space-900 to-ember-950/40 border border-space-800 flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <Skeleton className="w-20 h-20 rounded-full mx-auto bg-space-800" />
          <p className="text-xs font-mono text-slate-400">Loading Microgravity Orbit Scene...</p>
        </div>
      </div>
    ),
  }
);

export function HeroFlameIssWrapper() {
  return <HeroFlameIssScene />;
}
