"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function SafetyGuideError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="Safety Guide Stream Interrupted"
        message={error.message || "Failed to load fire safety engineering standards."}
        onRetry={() => reset()}
      />
    </div>
  );
}
