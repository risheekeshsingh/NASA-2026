import React from "react";
import { Skeleton } from "./Skeleton";

export interface SkeletonCardProps {
  className?: string;
  hasMetrics?: boolean;
}

export function SkeletonCard({ className = "", hasMetrics = true }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-3.5 w-1/2 rounded" />
      </div>

      {hasMetrics && (
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-space-950/60 border border-space-850">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-14 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-4/5 rounded" />
      </div>

      <div className="pt-3 border-t border-space-850 flex items-center justify-between">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>
    </div>
  );
}
