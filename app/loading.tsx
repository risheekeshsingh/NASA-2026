import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8"
      role="status"
      aria-live="polite"
      aria-label="Loading microgravity dashboard"
    >
      <div className="space-y-3">
        <Skeleton className="h-6 w-36 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-3/4 max-w-xl rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-1/2 max-w-md rounded-lg bg-space-850" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-3">
            <Skeleton className="h-4 w-24 bg-space-800" />
            <Skeleton className="h-8 w-32 bg-space-800" />
            <Skeleton className="h-3 w-40 bg-space-850" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl border border-space-800 bg-space-900/60 space-y-4">
          <Skeleton className="h-6 w-48 bg-space-800" />
          <Skeleton className="h-64 w-full rounded-lg bg-space-850" />
        </div>
        <div className="p-6 rounded-xl border border-space-800 bg-space-900/60 space-y-4">
          <Skeleton className="h-6 w-36 bg-space-800" />
          <Skeleton className="h-40 w-full rounded-lg bg-space-850" />
          <Skeleton className="h-12 w-full rounded-lg bg-space-800" />
        </div>
      </div>
      <span className="sr-only">Loading microgravity fire safety intelligence...</span>
    </div>
  );
}
