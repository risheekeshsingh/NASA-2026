import React from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  showText?: boolean;
}

export function Logo({ size = 36, showText = true, className = "", ...props }: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FlameLens logo: a microgravity flame inside an orbital ring"
        {...props}
      >
        <defs>
          {/* Flame Core Gradient */}
          <radialGradient
            id="flame-core"
            cx="50%"
            cy="52%"
            r="48%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
          </radialGradient>

          {/* Microgravity Spherical Glow */}
          <radialGradient
            id="micro-glow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>

          {/* Orbit Ring Gradient */}
          <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>

          {/* Flame Glow Filter */}
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Spherical Microgravity Flame Halo (Outer Cyan Cool Zone) */}
        <circle cx="50" cy="50" r="38" fill="url(#micro-glow)" />

        {/* Orbit Ring Background Arc */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-26 50 50)"
          stroke="url(#orbit-grad)"
          strokeWidth="2.4"
          strokeDasharray="4 2"
          opacity="0.45"
        />

        {/* Spherical Microgravity Combustion Core */}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="url(#flame-core)"
          filter="url(#glow-filter)"
        />

        {/* Microgravity Hot Center */}
        <circle cx="50" cy="49" r="10" fill="#ffffff" opacity="0.9" filter="url(#glow-filter)" />

        {/* Orbit Ring Foreground Arc with Orbiting Particle */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="15"
          transform="rotate(-26 50 50)"
          stroke="url(#orbit-grad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Orbit Satellite Particle */}
        <circle cx="86" cy="32" r="3.5" fill="#00e5ff" filter="url(#glow-filter)" />
        <circle cx="14" cy="68" r="2" fill="#fb923c" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
            Flame<span className="text-ember-500">Lens</span>
          </span>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
            Microgravity Fire Safety
          </span>
        </div>
      )}
    </div>
  );
}
