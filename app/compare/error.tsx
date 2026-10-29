"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function CompareError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="Comparison Matrix Error"
        message={error.message || "Unable to render the side-by-side combustion comparison."}
        onRetry={() => reset()}
      />
    </div>
  );
}
