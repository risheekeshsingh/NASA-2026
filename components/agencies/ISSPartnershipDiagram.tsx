"use client";

import React, { useState } from "react";
import { ISS_PARTNER_MODULES, ISSPartnerModule } from "@/lib/data/agencies";
import { Badge } from "@/components/ui/Badge";
import { Info, Sparkles } from "lucide-react";

export function ISSPartnershipDiagram() {
  const [selectedModule, setSelectedModule] = useState<ISSPartnerModule>(ISS_PARTNER_MODULES[0]);

  return (
    <div className="bg-space-900/90 border border-space-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-astro-cyan animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-astro-cyan font-semibold">
              International Cooperation Architecture
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            ISS International Partnership & Module Contributions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Five partner space agencies (NASA, Roscosmos, ESA, JAXA, CSA) collaboratively engineered the orbital laboratory.
          </p>
        </div>

        <Badge variant="cyan" className="self-start sm:self-auto shrink-0">
          5 Partner Coalition
        </Badge>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full bg-space-950/80 border border-space-800 rounded-xl p-4 overflow-x-auto">
        <svg
          viewBox="0 0 680 320"
          className="w-full min-w-[560px] h-auto select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Lines */}
          <defs>
            <pattern id="iss-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            {/* Gradients */}
            <linearGradient id="grad-nasa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-esa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-jaxa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-roscosmos" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="grad-csa" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <rect width="680" height="320" fill="url(#iss-grid)" />

          {/* Integrated Truss Structure (ITS) & Solar Array Wings */}
          {/* Truss Backbone */}
          <line x1="330" y1="40" x2="330" y2="300" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <line x1="340" y1="40" x2="340" y2="300" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

          {/* Solar Arrays Port & Starboard (Illustrative) */}
          <g opacity="0.35">
            <rect x="305" y="15" width="60" height="20" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <rect x="305" y="285" width="60" height="20" rx="3" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            <text x="335" y="12" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              SOLAR ARRAYS (NASA)
            </text>
          </g>

          {/* Central Structural Spine (Connectors) */}
          {/* Russian Functional Cargo Block Zarya (Connecting Zvezda and Unity) */}
          <rect
            x="260"
            y="157"
            width="55"
            height="36"
            rx="4"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text x="287" y="179" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
            Zarya
          </text>

          {/* Unity Node 1 (NASA) */}
          <rect
            x="320"
            y="155"
            width="50"
            height="40"
            rx="4"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <text x="345" y="179" fill="#fcd34d" fontSize="9" textAnchor="middle" fontFamily="monospace">
            Unity
          </text>

          {/* Harmony Node 2 (NASA) */}
          <rect
            x="475"
            y="155"
            width="50"
            height="40"
            rx="4"
            fill="#1e293b"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <text x="500" y="179" fill="#fcd34d" fontSize="9" textAnchor="middle" fontFamily="monospace">
            Harmony
          </text>

          {/* Tranquility Node 3 & Cupola (Nadir/Forward) */}
          <rect
            x="320"
            y="210"
            width="50"
            height="35"
            rx="4"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="1"
          />
          <text x="345" y="231" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
            Node 3
          </text>
          <circle cx="345" cy="265" r="14" fill="#0891b2" opacity="0.7" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="345" y="268" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">
            Cupola
          </text>

          {/* Quest Joint Airlock */}
          <rect
            x="325"
            y="110"
            width="40"
            height="30"
            rx="3"
            fill="#1e293b"
            stroke="#64748b"
            strokeWidth="1"
          />
          <text x="345" y="128" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
            Quest
          </text>

          {/* INTERACTIVE MODULES */}
          {/* 1. Zvezda Service Module (Roscosmos) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedModule(ISS_PARTNER_MODULES.find((m) => m.agency === "Roscosmos")!)}
          >
            <rect
              x="165"
              y="150"
              width="90"
              height="50"
              rx="6"
              fill={selectedModule.agency === "Roscosmos" ? "url(#grad-roscosmos)" : "#7f1d1d"}
              stroke="#ef4444"
              strokeWidth={selectedModule.agency === "Roscosmos" ? 2.5 : 1}
              className="transition-all duration-300"
            />
            <text x="210" y="174" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Zvezda
            </text>
            <text x="210" y="189" fill="#fecaca" fontSize="9" textAnchor="middle" fontFamily="monospace">
              Roscosmos
            </text>
          </g>

          {/* 2. Destiny Laboratory (NASA) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedModule(ISS_PARTNER_MODULES.find((m) => m.agency === "NASA")!)}
          >
            <rect
              x="375"
              y="150"
              width="95"
              height="50"
              rx="6"
              fill={selectedModule.agency === "NASA" ? "url(#grad-nasa)" : "#78350f"}
              stroke="#f59e0b"
              strokeWidth={selectedModule.agency === "NASA" ? 2.5 : 1}
              className="transition-all duration-300"
            />
            <text x="422" y="174" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Destiny (CIR)
            </text>
            <text x="422" y="189" fill="#fef3c7" fontSize="9" textAnchor="middle" fontFamily="monospace">
              NASA
            </text>
          </g>

          {/* 3. Columbus Laboratory (ESA) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedModule(ISS_PARTNER_MODULES.find((m) => m.agency === "ESA")!)}
          >
            <rect
              x="530"
              y="110"
              width="85"
              height="45"
              rx="6"
              fill={selectedModule.agency === "ESA" ? "url(#grad-esa)" : "#164e63"}
              stroke="#06b6d4"
              strokeWidth={selectedModule.agency === "ESA" ? 2.5 : 1}
              className="transition-all duration-300"
            />
            <text x="572" y="132" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Columbus
            </text>
            <text x="572" y="146" fill="#cffafe" fontSize="9" textAnchor="middle" fontFamily="monospace">
              ESA
            </text>
          </g>

          {/* 4. Kibo Laboratory JEM (JAXA) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedModule(ISS_PARTNER_MODULES.find((m) => m.agency === "JAXA")!)}
          >
            <rect
              x="530"
              y="195"
              width="95"
              height="48"
              rx="6"
              fill={selectedModule.agency === "JAXA" ? "url(#grad-jaxa)" : "#064e3b"}
              stroke="#10b981"
              strokeWidth={selectedModule.agency === "JAXA" ? 2.5 : 1}
              className="transition-all duration-300"
            />
            <text x="577" y="219" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Kibo (MSPR)
            </text>
            <text x="577" y="233" fill="#d1fae5" fontSize="9" textAnchor="middle" fontFamily="monospace">
              JAXA
            </text>
          </g>

          {/* 5. Canadarm2 / Mobile Servicing System (CSA) */}
          <g
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedModule(ISS_PARTNER_MODULES.find((m) => m.agency === "CSA")!)}
          >
            {/* Robotic Arm Linkage */}
            <path
              d="M 345 80 Q 380 50 430 75 T 465 65"
              fill="none"
              stroke={selectedModule.agency === "CSA" ? "#c084fc" : "#a855f7"}
              strokeWidth={selectedModule.agency === "CSA" ? 5 : 3.5}
              strokeLinecap="round"
            />
            <circle cx="345" cy="80" r="4" fill="#a855f7" />
            <circle cx="430" cy="75" r="4" fill="#a855f7" />
            <circle cx="465" cy="65" r="5" fill="#f43f5e" />

            <rect
              x="390"
              y="40"
              width="110"
              height="28"
              rx="5"
              fill={selectedModule.agency === "CSA" ? "url(#grad-csa)" : "#581c87"}
              stroke="#a855f7"
              strokeWidth={selectedModule.agency === "CSA" ? 2 : 1}
              className="transition-all duration-300"
            />
            <text x="445" y="58" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              Canadarm2 (CSA)
            </text>
          </g>

          {/* Module labels / flight axis indicator */}
          <g transform="translate(40, 270)" opacity="0.6">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="60, -3 65, 0 60, 3" fill="#94a3b8" />
            <text x="0" y="-8" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              +V FLIGHT VECTOR
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Module Detail Panel */}
      <div className="bg-space-950/90 border border-space-850 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: selectedModule.color }}
            />
            <h3 className="text-lg font-bold font-display text-white">
              {selectedModule.name}
            </h3>
            <Badge variant="outline" className="text-xs font-mono">
              Launched {selectedModule.launchYear}
            </Badge>
            <Badge variant="cyan" className="text-xs">
              {selectedModule.agency}
            </Badge>
          </div>
          <p className="text-sm text-slate-200">
            {selectedModule.role}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono">
            <span>Agency: <span className="text-white">{selectedModule.agencyName}</span></span>
            {selectedModule.pressurizedVolumeM3 && (
              <span>Volume: <span className="text-astro-cyan">{selectedModule.pressurizedVolumeM3} m³</span></span>
            )}
            <span>Function: <span className="text-ember-400">{selectedModule.primaryFunction}</span></span>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="shrink-0 flex items-center gap-2 bg-space-900 px-3.5 py-2 rounded-lg border border-space-800 text-xs text-slate-400">
          <Info className="w-4 h-4 text-astro-cyan shrink-0" />
          <span>Click any colored module in diagram to inspect contributions.</span>
        </div>
      </div>

      {/* Partner Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
        {ISS_PARTNER_MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setSelectedModule(mod)}
            className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left ${
              selectedModule.agency === mod.agency
                ? "bg-space-800 border-space-600 shadow-md ring-1 ring-white/10"
                : "bg-space-950/60 border-space-850 hover:bg-space-850"
            }`}
          >
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: mod.color }}
            />
            <div className="truncate">
              <span className="text-xs font-bold font-mono text-white block">
                {mod.agency}
              </span>
              <span className="text-[11px] text-slate-400 truncate block">
                {mod.name.split(" ")[0]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
