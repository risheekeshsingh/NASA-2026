import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SafetyGuideLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" role="status">
      <Skeleton className="h-8 w-64 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
      <span className="sr-only">Loading safety guide...</span>
    </div>
  );
}
