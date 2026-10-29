"use client";

import React from "react";
import { Sliders, RotateCcw, Sparkles, ShieldAlert, Compass, FileCheck, LifeBuoy } from "lucide-react";
import { RankingWeights, DEFAULT_RANKING_WEIGHTS } from "@/lib/ranking";
import { Button } from "@/components/ui/Button";

interface RankingsWeightsSlidersProps {
  weights: RankingWeights;
  onChange: (weights: RankingWeights) => void;
}

export function RankingsWeightsSliders({ weights, onChange }: RankingsWeightsSlidersProps) {
  const totalRaw = weights.fireRisk + weights.exploration + weights.evidence + weights.suppression;
  const safeTotal = Math.max(1, totalRaw);

  const getPercent = (val: number) => Math.round((val / safeTotal) * 100);

  const handleSliderChange = (key: keyof RankingWeights, value: number) => {
    onChange({
      ...weights,
      [key]: value,
    });
  };

  const handleReset = () => {
    onChange(DEFAULT_RANKING_WEIGHTS);
  };

  const applyPreset = (preset: "balanced" | "artemis" | "suppression" | "worstcase") => {
    switch (preset) {
      case "artemis":
        onChange({ fireRisk: 25, exploration: 50, evidence: 15, suppression: 10 });
        break;
      case "suppression":
        onChange({ fireRisk: 20, exploration: 15, evidence: 15, suppression: 50 });
        break;
      case "worstcase":
        onChange({ fireRisk: 60, exploration: 20, evidence: 10, suppression: 10 });
        break;
      case "balanced":
      default:
        onChange(DEFAULT_RANKING_WEIGHTS);
        break;
    }
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-ember-500/10 border border-ember-500/30 flex items-center justify-center text-ember-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-display">
              Live Heuristic Weighting Model
            </h2>
            <p className="text-xs text-slate-400">
              Adjust sliders to dynamically reweight priority dimensions and recompute rankings in real time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset Defaults
          </Button>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mr-1">
          Preset Profiles:
        </span>
        <button
          type="button"
          onClick={() => applyPreset("balanced")}
          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-space-800/80 hover:bg-space-700 text-slate-300 border border-space-700/60 transition-colors"
        >
          Balanced Heuristic
        </button>
        <button
          type="button"
          onClick={() => applyPreset("artemis")}
          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-cyan-950/40 hover:bg-cyan-900/40 text-astro-cyan border border-astro-cyan/30 transition-colors"
        >
          <Compass className="w-3 h-3 inline mr-1" />
          Artemis Moon / Mars Focus
        </button>
        <button
          type="button"
          onClick={() => applyPreset("worstcase")}
          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/30 transition-colors"
        >
          <ShieldAlert className="w-3 h-3 inline mr-1" />
          Worst-Case Flammability
        </button>
        <button
          type="button"
          onClick={() => applyPreset("suppression")}
          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 transition-colors"
        >
          <LifeBuoy className="w-3 h-3 inline mr-1" />
          Suppression & Tactics
        </button>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Fire Risk */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <label htmlFor="fire-risk-slider" className="font-semibold text-white">
                Fire-Risk Severity
              </label>
            </div>
            <span className="font-mono font-bold text-red-400">
              {weights.fireRisk} pts ({getPercent(weights.fireRisk)}%)
            </span>
          </div>
          <input
            id="fire-risk-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.fireRisk}
            onChange={(e) => handleSliderChange("fireRisk", Number(e.target.value))}
            className="w-full accent-red-500 cursor-pointer h-1.5 bg-space-800 rounded-lg appearance-none"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Elevated O₂, low convective flow (1-10 cm/s flammability peak), solid polymers, and vehicle-scale fire propagation.
          </p>
        </div>

        {/* Exploration Relevance */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-astro-cyan" />
              <label htmlFor="exploration-slider" className="font-semibold text-white">
                Exploration Relevance
              </label>
            </div>
            <span className="font-mono font-bold text-astro-cyan">
              {weights.exploration} pts ({getPercent(weights.exploration)}%)
            </span>
          </div>
          <input
            id="exploration-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.exploration}
            onChange={(e) => handleSliderChange("exploration", Number(e.target.value))}
            className="w-full accent-astro-cyan cursor-pointer h-1.5 bg-space-800 rounded-lg appearance-none"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Fidelity to Moon / Mars Exploration Atmosphere (34% O₂ / 56 kPa), lunar/martian gravity, and flight-qualified materials.
          </p>
        </div>

        {/* Evidence Strength */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <label htmlFor="evidence-slider" className="font-semibold text-white">
                Evidence Strength
              </label>
            </div>
            <span className="font-mono font-bold text-amber-400">
              {weights.evidence} pts ({getPercent(weights.evidence)}%)
            </span>
          </div>
          <input
            id="evidence-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.evidence}
            onChange={(e) => handleSliderChange("evidence", Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-space-800 rounded-lg appearance-none"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Data confidence grade, open access public repository data, repeat flights, and multi-year research campaigns.
          </p>
        </div>

        {/* Suppression Insight */}
        <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-emerald-400" />
              <label htmlFor="suppression-slider" className="font-semibold text-white">
                Suppression Insight Value
              </label>
            </div>
            <span className="font-mono font-bold text-emerald-400">
              {weights.suppression} pts ({getPercent(weights.suppression)}%)
            </span>
          </div>
          <input
            id="suppression-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            value={weights.suppression}
            onChange={(e) => handleSliderChange("suppression", Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-space-800 rounded-lg appearance-none"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Actionable extinguishing data, depressurization/vacuum venting effectiveness, airflow cut-off, and cool flame quenching.
          </p>
        </div>
      </div>
    </div>
  );
}
