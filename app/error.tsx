"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send to telemetry service safely
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("Route error boundary captured:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center p-8 rounded-2xl border border-red-500/30 bg-space-900/90 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold font-display text-white mb-2">
          Telemetry Signal Disrupted
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          A processing error occurred while loading this microgravity research view. The system has logged this incident.
        </p>

        {error.message && (
          <div className="text-xs bg-space-950 border border-space-800 text-red-300 p-3 rounded-lg mb-6 text-left overflow-x-auto font-mono">
            {error.message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="md" className="w-full sm:w-auto">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Return Overview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
