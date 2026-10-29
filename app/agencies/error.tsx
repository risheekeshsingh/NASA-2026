"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function AgenciesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="Agency Collaboration Data Unavailable"
        message={error.message || "Failed to load research program summaries."}
        onRetry={() => reset()}
      />
    </div>
  );
}
