"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function InsightsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="AI Insights Stream Failed"
        message={error.message || "Failed to load automated fire safety intelligence."}
        onRetry={() => reset()}
      />
    </div>
  );
}
