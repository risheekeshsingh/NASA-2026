import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "danger" | "ember";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-2.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-ember-600 via-ember-500 to-amber-500 text-white font-semibold shadow-ember-glow hover:brightness-110 focus-visible:ring-ember-500",
      ember:
        "bg-gradient-to-r from-ember-600 via-ember-500 to-amber-500 text-white font-semibold shadow-ember-glow hover:brightness-110 focus-visible:ring-ember-500",
      secondary:
        "bg-space-800 text-slate-200 border border-space-700 hover:bg-space-700 hover:text-white focus-visible:ring-slate-400",
      outline:
        "border border-ember-500/50 text-ember-400 hover:bg-ember-500/10 hover:border-ember-400 focus-visible:ring-ember-500",
      cyan:
        "bg-gradient-to-r from-cyan-600 to-astro-cyan text-space-950 font-semibold shadow-cyan-glow hover:brightness-110 focus-visible:ring-astro-cyan",
      ghost:
        "text-slate-300 hover:bg-space-800 hover:text-white focus-visible:ring-space-700",
      danger:
        "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
