import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function RoadmapLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" role="status" aria-label="Loading roadmap">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-72 rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-80 rounded-lg bg-space-850" />
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-3">
            <Skeleton className="h-6 w-44 bg-space-800" />
            <Skeleton className="h-16 w-full bg-space-850" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading roadmap...</span>
    </div>
  );
}
