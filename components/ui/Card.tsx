import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "ember" | "cyan";
}

export function Card({
  children,
  className = "",
  glow = "none",
  ...props
}: CardProps) {
  const glowStyles = {
    none: "",
    ember: "border-ember-500/40 shadow-ember-glow hover:border-ember-500/70",
    cyan: "border-astro-cyan/40 shadow-cyan-glow hover:border-astro-cyan/70",
  };

  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-slate-100 transition-all duration-200 ${glowStyles[glow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 flex flex-col space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-display text-lg font-bold tracking-tight text-white ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-slate-400 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
