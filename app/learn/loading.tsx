import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function LearnLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" role="status" aria-label="Loading learn section">
      <div className="space-y-3">
        <Skeleton className="h-6 w-36 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-72 rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-80 rounded-lg bg-space-850" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <Skeleton className="h-6 w-32 bg-space-800" />
            <Skeleton className="h-24 w-full bg-space-850" />
            <Skeleton className="h-10 w-full rounded-lg bg-space-800" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading learn modules...</span>
    </div>
  );
}
