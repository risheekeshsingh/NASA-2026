"use client";

import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Flame, Scale } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CalculationExplanationPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-space-900/70 border border-space-800 overflow-hidden">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-space-850/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-astro-cyan/10 border border-astro-cyan/30 flex items-center justify-center text-astro-cyan shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              How this score is calculated
              <Badge variant="cyan" size="sm">
                Transparent Heuristic
              </Badge>
            </h3>
            <p className="text-xs text-slate-400">
              Mathematical formulation, environmental weighting factors, and methodology disclaimer.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs font-mono hidden sm:inline">
            {expanded ? "Collapse Details" : "Expand Details"}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-6 pb-6 pt-2 border-t border-space-850 space-y-6 text-xs text-slate-300">
          {/* Methodology Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-amber-400 font-display text-sm">
                Decision-Support Heuristic Disclaimer
              </h4>
              <p className="text-slate-300 leading-relaxed text-xs">
                This scoring model is an educational and mission-planning decision-support heuristic
                created for <strong>FlameLens (NASA Space Apps Challenge)</strong>. It provides comparative
                guidance by synthesizing decades of microgravity combustion telemetry, but is{" "}
                <strong>not an official NASA, ESA, JAXA, or international space agency certified safety metric</strong>.
                Spacecraft flight hardware qualification requires formal test procedures per{" "}
                <span className="font-mono text-amber-300">NASA-STD-6001B (Test 1 & Test 2)</span> and mission-specific
                safety reviews.
              </p>
            </div>
          </div>

          {/* Mathematical Formulation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold font-display">
                <Scale className="w-4 h-4 text-astro-cyan" />
                Composite Score Formula
              </div>
              <div className="p-2.5 rounded bg-space-900 border border-space-800 font-mono text-[11px] text-astro-cyan">
                Total Score = &Sigma;(S_i &times; W_i) / &Sigma;(W_i) &isin; [0, 100]
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Where <code className="text-slate-200">S_i</code> represents each normalized sub-score (0 to 100) and{" "}
                <code className="text-slate-200">W_i</code> is the user-configured weight slider value. The composite
                score reflects the relative risk and mission priority of the experiment under chosen assumptions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold font-display">
                <Flame className="w-4 h-4 text-ember-400" />
                Physical Principles Evaluated
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                <li>
                  <strong className="text-slate-200">Peak Flammability Velocity:</strong> In 0-g, low flows (1–10 cm/s)
                  maximize flame spread because oxygen diffuses inwards while convection is too weak to quench.
                </li>
                <li>
                  <strong className="text-slate-200">Hyper-Elevated O₂ (Artemis 34%):</strong> Higher oxygen percentage
                  significantly lowers ignition energy and increases flame temperature.
                </li>
                <li>
                  <strong className="text-slate-200">Hypobaric Regimes:</strong> Lower total pressure modifies
                  flame thickness and quench distances.
                </li>
              </ul>
            </div>
          </div>

          {/* Sub-Score Rules Table */}
          <div className="rounded-xl border border-space-850 overflow-hidden">
            <div className="bg-space-950 px-4 py-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Scoring Dimension Heuristics
            </div>
            <div className="divide-y divide-space-850 text-[11px]">
              <div className="p-3 bg-space-900/60 grid grid-cols-1 sm:grid-cols-4 gap-2">
                <span className="font-bold text-red-400 sm:col-span-1">Fire-Risk Severity</span>
                <span className="text-slate-300 sm:col-span-3">
                  Awards up to +30 for O₂ &ge; 34% (Artemis spec), +18 for flow velocities in the critical 1–12 cm/s
                  regime, +10 for solid polymers, and +12 for vehicle-scale (Cygnus) validations.
                </span>
              </div>
              <div className="p-3 bg-space-900/60 grid grid-cols-1 sm:grid-cols-4 gap-2">
                <span className="font-bold text-astro-cyan sm:col-span-1">Exploration Relevance</span>
                <span className="text-slate-300 sm:col-span-3">
                  Scores up to +25 for testing Exploration Atmosphere (34% O₂ / hypobaric &lt; 80 kPa), +20 for Lunar or
                  Martian partial gravity, and +18 for realistic mission materials (PMMA, Nomex, Kapton, SIBAL fabrics).
                </span>
              </div>
              <div className="p-3 bg-space-900/60 grid grid-cols-1 sm:grid-cols-4 gap-2">
                <span className="font-bold text-amber-400 sm:col-span-1">Evidence Strength</span>
                <span className="text-slate-300 sm:col-span-3">
                  Grades +35 for peer-reviewed high-confidence observational data, +20 for open public data access
                  (NASA PSI), and +15 for multi-year repeat test campaigns.
                </span>
              </div>
              <div className="p-3 bg-space-900/60 grid grid-cols-1 sm:grid-cols-4 gap-2">
                <span className="font-bold text-emerald-400 sm:col-span-1">Suppression Insight</span>
                <span className="text-slate-300 sm:col-span-3">
                  Evaluates active fire suppression (+25), depressurization/vacuum cabin venting (+15), stealth cool flame
                  or smoldering reignition discovery (+18), and ventilation shut-off tactics (+12).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
