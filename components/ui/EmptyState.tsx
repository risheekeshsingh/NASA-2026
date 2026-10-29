import React from "react";
import { Compass } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "No Experiment Records Found",
  message = "No matching microgravity research data found for the current query or filter criteria.",
  actionLabel,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-10 rounded-2xl border border-space-800 bg-space-900/40 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-space-850 border border-space-700 flex items-center justify-center text-slate-400 mb-3.5">
        {icon || <Compass className="w-6 h-6 text-ember-400" />}
      </div>
      <h3 className="text-base font-bold font-display text-white mb-1.5">{title}</h3>
      <p className="text-xs text-slate-400 mb-5 leading-relaxed max-w-xs">{message}</p>
      {actionLabel && onAction && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="text-xs"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
