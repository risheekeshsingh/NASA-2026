"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SimulatorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center p-6 rounded-2xl border border-red-500/30 bg-space-900/80 shadow-xl">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold font-display text-white mb-2">
          Simulator Canvas Interrupted
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          A WebGL context or simulation shader issue occurred. You can reset the 3D chamber.
        </p>
        {error.message && (
          <div className="text-xs bg-space-950 p-2.5 rounded text-red-300 font-mono mb-4 text-left">
            {error.message}
          </div>
        )}
        <Button onClick={() => reset()} variant="primary" size="sm" className="gap-2 mx-auto">
          <RefreshCw className="w-4 h-4" />
          Reinitialize Simulator
        </Button>
      </div>
    </div>
  );
}
