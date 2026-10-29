"use client";

import React from "react";
import { ErrorState } from "@/components/ui/ErrorState";

export default function DataSourcesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16">
      <ErrorState
        title="Data Sources Feed Failed"
        message={error.message || "Failed to load public data source references."}
        onRetry={() => reset()}
      />
    </div>
  );
}
