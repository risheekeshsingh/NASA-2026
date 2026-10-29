import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function ErrorState({
  title = "Telemetry Unavailable",
  message = "An error occurred while loading this microgravity research stream.",
  onRetry,
  className = "",
  isCompact = false,
}: ErrorStateProps) {
  if (isCompact) {
    return (
      <div
        role="alert"
        className={`p-3.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-200 flex items-center justify-between gap-3 text-xs ${className}`}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{message}</span>
        </div>
        {onRetry && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="py-1 px-2.5 text-xs border-red-500/40 text-red-300 hover:bg-red-500/10 shrink-0"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={`p-8 rounded-2xl border border-red-500/30 bg-space-950/80 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6 shadow-xl ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-3.5">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold font-display text-white mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 mb-5 max-w-sm leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 border-red-500/40 text-red-300 hover:bg-red-500/10"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </Button>
      )}
    </div>
  );
}
