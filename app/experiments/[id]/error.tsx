"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";

export default function ExperimentDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16 text-center space-y-6">
      <ErrorState
        title="Experiment Record Not Accessible"
        message={error.message || "Failed to load experiment investigation telemetry."}
        onRetry={() => reset()}
      />
      <div>
        <Link href="/experiments">
          <Button variant="secondary" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Experiments Catalog
          </Button>
        </Link>
      </div>
    </div>
  );
}
