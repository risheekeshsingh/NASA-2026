import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" role="status" aria-label="Loading contact form">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full bg-space-800" />
        <Skeleton className="h-10 w-64 rounded-lg bg-space-800" />
        <Skeleton className="h-5 w-80 rounded-lg bg-space-850" />
      </div>

      <div className="p-8 rounded-2xl border border-white/10 bg-white/5 space-y-6">
        <Skeleton className="h-10 w-full rounded-lg bg-space-850" />
        <Skeleton className="h-10 w-full rounded-lg bg-space-850" />
        <Skeleton className="h-32 w-full rounded-lg bg-space-850" />
        <Skeleton className="h-12 w-40 rounded-lg bg-space-800" />
      </div>
      <span className="sr-only">Loading contact...</span>
    </div>
  );
}
