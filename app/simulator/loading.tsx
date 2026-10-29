import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SimulatorLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" role="status">
      <div className="space-y-3">
        <Skeleton className="h-6 w-36 rounded-full" />
        <Skeleton className="h-9 w-80 rounded-lg" />
        <Skeleton className="h-4 w-96 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="w-full h-[480px] rounded-2xl" />
        </div>
        <div className="p-6 rounded-2xl border border-space-800 bg-space-900/60 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
      <span className="sr-only">Loading 3D microgravity flame simulator...</span>
    </div>
  );
}
