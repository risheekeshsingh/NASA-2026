import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SimulationLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" role="status" aria-label="Loading simulation">
      <div className="space-y-3">
        <Skeleton className="h-6 w-36 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-80 rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-96 rounded-lg bg-space-850" />
      </div>

      <div className="w-full h-[60vh] min-h-[460px] rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <Skeleton className="w-20 h-20 rounded-full mx-auto bg-space-800" />
          <p className="text-xs font-mono text-slate-400">Initializing Flame Lab 3D...</p>
        </div>
      </div>
      <span className="sr-only">Loading simulation...</span>
    </div>
  );
}
