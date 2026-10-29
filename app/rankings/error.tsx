"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function RankingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="Rankings Telemetry Interrupted"
        message={error.message || "Failed to load microgravity flammability rankings."}
        onRetry={() => reset()}
      />
    </div>
  );
}
