import React from "react";
import { ArrowUp, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function FlameComparisonVisual() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* 1-g Earth Flame Box */}
      <div className="p-6 rounded-2xl border border-space-800 bg-space-900/70 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Terrestrial Environment (1.0-g)
          </span>
          <Badge variant="default" size="sm">
            Buoyant Convection
          </Badge>
        </div>

        {/* SVG Diagram: Earth Teardrop Flame */}
        <div className="h-60 rounded-xl bg-space-950 border border-space-850 flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 select-none"
            aria-label="Earth Flame diagram showing elongated teardrop shape with rising convection arrows"
          >
            <defs>
              <linearGradient id="earth-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                <stop offset="20%" stopColor="#3b82f6" />
                <stop offset="45%" stopColor="#f59e0b" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <filter id="flame-blur">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>

            {/* Rising buoyant airflow arrows */}
            <g stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5">
              <path d="M40 170 C40 120, 60 70, 75 30" markerEnd="url(#arrow)" />
              <path d="M160 170 C160 120, 140 70, 125 30" markerEnd="url(#arrow)" />
              <path d="M100 170 L100 150" />
            </g>

            {/* Elongated Teardrop Flame Path */}
            <path
              d="M100 25 C115 70, 132 105, 128 135 C125 155, 114 165, 100 165 C86 165, 75 155, 72 135 C68 105, 85 70, 100 25 Z"
              fill="url(#earth-flame)"
              filter="url(#flame-blur)"
            />

            {/* Hot Inner Yellow Cone */}
            <path
              d="M100 70 C108 100, 118 120, 115 142 C113 155, 107 160, 100 160 C93 160, 87 155, 85 142 C82 120, 92 100, 100 70 Z"
              fill="#fef08a"
              opacity="0.9"
            />

            {/* Burner wick base */}
            <rect x="96" y="165" width="8" height="20" rx="2" fill="#64748b" />

            {/* Upward soot trail text */}
            <text x="100" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              HOT SMOKE RISES UPWARD
            </text>
          </svg>

          {/* Quick HUD badge */}
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-500">
            Convection velocity: ~2-3 m/s
          </div>
        </div>

        <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">&bull;</span>
            <span><strong>Buoyancy stretch:</strong> Hot gases are less dense and shoot upward, creating a slender teardrop.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">&bull;</span>
            <span><strong>Continuous fresh air:</strong> The rising draft draws oxygen into the flame base automatically.</span>
          </li>
        </ul>
      </div>

      {/* 0-g Microgravity Flame Box */}
      <div className="p-6 rounded-2xl border border-ember-500/30 bg-space-900/80 backdrop-blur-md space-y-4 shadow-ember-glow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-ember-400 font-bold">
            Microgravity Orbit (0.0-g)
          </span>
          <Badge variant="ember" size="sm">
            Pure Molecular Diffusion
          </Badge>
        </div>

        {/* SVG Diagram: Zero-G Spherical Flame */}
        <div className="h-60 rounded-xl bg-space-950 border border-space-850 flex items-center justify-center relative overflow-hidden">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 select-none"
            aria-label="Microgravity spherical flame diagram showing isotropic concentric flame halo"
          >
            <defs>
              <radialGradient id="zero-flame" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fef08a" />
                <stop offset="55%" stopColor="#f97316" />
                <stop offset="78%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.4" />
              </radialGradient>
              <radialGradient id="cool-flame-glow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#00e5ff" stopOpacity="0.4" />
                <stop offset="90%" stopColor="#0369a1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Omnidirectional diffusion rays */}
            <g stroke="#00e5ff" strokeWidth="1" strokeDasharray="2 3" opacity="0.45">
              <line x1="100" y1="100" x2="100" y2="28" />
              <line x1="100" y1="100" x2="100" y2="172" />
              <line x1="100" y1="100" x2="28" y2="100" />
              <line x1="100" y1="100" x2="172" y2="100" />
              <line x1="100" y1="100" x2="48" y2="48" />
              <line x1="100" y1="100" x2="152" y2="152" />
              <line x1="100" y1="100" x2="152" y2="48" />
              <line x1="100" y1="100" x2="48" y2="152" />
            </g>

            {/* Outer Cyan Cool Flame Reaction Envelope */}
            <circle cx="100" cy="100" r="68" fill="url(#cool-flame-glow)" />

            {/* Main Spherical Diffusion Flame */}
            <circle cx="100" cy="100" r="44" fill="url(#zero-flame)" filter="url(#flame-blur)" />

            {/* High-Temperature Center Kernel */}
            <circle cx="100" cy="100" r="16" fill="#ffffff" opacity="0.95" />

            {/* Microgravity Fuel Injector / Droplet mount */}
            <circle cx="100" cy="100" r="4" fill="#64748b" />
            <line x1="100" y1="104" x2="100" y2="175" stroke="#475569" strokeWidth="2.5" />

            {/* Text Overlay */}
            <text x="100" y="24" fill="#00e5ff" fontSize="9" textAnchor="middle" fontFamily="monospace">
              OMNIDIRECTIONAL DIFFUSION
            </text>
          </svg>

          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-astro-cyan">
            Buoyancy velocity: 0.00 m/s
          </div>
        </div>

        <ul className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-astro-cyan font-bold">&bull;</span>
            <span><strong>Perfect spherical symmetry:</strong> Combustion expands uniformly in 360 degrees without upward draft.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-astro-cyan font-bold">&bull;</span>
            <span><strong>Invisible &apos;Cool Flames&apos;:</strong> Chemical reactions persist at 600 K undetected by human eyes or optical cameras.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
