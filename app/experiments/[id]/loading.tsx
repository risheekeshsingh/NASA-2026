import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ExperimentDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" role="status">
      <Skeleton className="h-4 w-48 rounded" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-72 w-full rounded-2xl md:col-span-2" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </div>
      <Skeleton className="h-48 w-full rounded-2xl" />
      <span className="sr-only">Loading experiment telemetry details...</span>
    </div>
  );
}
