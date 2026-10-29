"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="About Overview Unavailable"
        message={error.message || "Failed to load project description."}
        onRetry={() => reset()}
      />
    </div>
  );
}
