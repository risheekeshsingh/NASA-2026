import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function TeamLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10" role="status" aria-label="Loading team">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-72 rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-96 rounded-lg bg-space-850" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-xl bg-space-800" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 bg-space-800" />
                <Skeleton className="h-4 w-52 bg-space-850" />
              </div>
            </div>
            <Skeleton className="h-16 w-full rounded-lg bg-space-850" />
            <Skeleton className="h-20 w-full rounded-lg bg-space-900" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading team...</span>
    </div>
  );
}
