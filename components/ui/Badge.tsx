import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "ember" | "cyan" | "success" | "warning" | "danger" | "outline" | "primary";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className = "",
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-sm font-medium",
  };

  const variantStyles = {
    default: "bg-space-800 text-slate-300 border border-space-700",
    ember: "bg-ember-500/15 text-ember-400 border border-ember-500/30",
    primary: "bg-ember-500/15 text-ember-400 border border-ember-500/30",
    cyan: "bg-astro-cyan/15 text-astro-cyan border border-astro-cyan/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    danger: "bg-red-500/15 text-red-400 border border-red-500/30",
    outline: "bg-transparent text-slate-300 border border-space-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function SampleDataBadge({ className = "" }: { className?: string }) {
  return (
    <Badge
      variant="warning"
      className={`bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
      Showing sample data
    </Badge>
  );
}
