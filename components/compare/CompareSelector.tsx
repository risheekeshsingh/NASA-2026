"use client";

import React from "react";
import { Plus, X, Sparkles, Scale, Check } from "lucide-react";
import { Experiment } from "@/types";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface CompareSelectorProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

const PRESETS = [
  {
    name: "Vehicle Scale vs. Component",
    description: "Saffire-I (Cygnus) vs. BASS-II (ISS) vs. FLEX-2 (Droplets)",
    ids: ["saffire-i", "bass-ii", "flex-2"],
  },
  {
    name: "Solid Polymers & Fabrics",
    description: "Saffire-I vs. SIBAL vs. FLARE vs. SoFIE-GEL",
    ids: ["saffire-i", "sibal", "flare", "sofie-gel"],
  },
  {
    name: "Extinguishing & Suppression",
    description: "SoFIE-MIST vs. FLEX-2 vs. BASS-II vs. ACME-CLD",
    ids: ["sofie-mist", "flex-2", "bass-ii", "acme-cld"],
  },
  {
    name: "Elevated Oxygen Spec (Artemis)",
    description: "Saffire-IV (30% O₂) vs. Saffire-V (34% O₂) vs. BASS-II (21% O₂)",
    ids: ["saffire-iv", "saffire-v", "bass-ii"],
  },
];

export function CompareSelector({ selectedIds, onChange }: CompareSelectorProps) {
  const selectedExperiments = selectedIds
    .map((id) => EXPERIMENTS.find((e) => e.id === id))
    .filter((e): e is Experiment => e !== undefined);

  const availableExperiments = EXPERIMENTS.filter(
    (e) => !selectedIds.includes(e.id)
  );

  const handleRemove = (id: string) => {
    if (selectedIds.length <= 2) {
      alert("At least 2 experiments must remain selected for comparative analysis.");
      return;
    }
    onChange(selectedIds.filter((item) => item !== id));
  };

  const handleAdd = (id: string) => {
    if (selectedIds.length >= 4) {
      alert("Maximum 4 experiments can be compared simultaneously in side-by-side mode.");
      return;
    }
    if (!selectedIds.includes(id)) {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">
              <Scale className="w-3.5 h-3.5" />
              Active Comparison Set ({selectedIds.length}/4)
            </Badge>
          </div>
          <h2 className="text-base font-bold text-white font-display">
            Select 2 to 4 Experiments to Cross-Reference
          </h2>
          <p className="text-xs text-slate-400">
            Side-by-side matrix, radar telemetry overlay, and rule-based behavioral synthesis.
          </p>
        </div>

        {/* Selected chips */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedExperiments.map((exp, idx) => {
            const colors = [
              "border-ember-500/50 bg-ember-950/40 text-ember-300",
              "border-astro-cyan/50 bg-cyan-950/40 text-astro-cyan",
              "border-emerald-500/50 bg-emerald-950/40 text-emerald-300",
              "border-purple-500/50 bg-purple-950/40 text-purple-300",
            ];
            const badgeColor = colors[idx % colors.length];

            return (
              <div
                key={exp.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono ${badgeColor}`}
              >
                <span className="font-bold">{exp.acronym}</span>
                {selectedIds.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(exp.id)}
                    className="hover:text-white transition-colors ml-1"
                    title={`Remove ${exp.acronym}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Preset Profiles */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
          Curated Mission Profiles:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {PRESETS.map((p) => {
            const isActive =
              p.ids.length === selectedIds.length &&
              p.ids.every((id) => selectedIds.includes(id));

            return (
              <button
                key={p.name}
                type="button"
                onClick={() => onChange(p.ids)}
                className={`p-3 rounded-xl text-left border transition-all text-xs space-y-1 ${
                  isActive
                    ? "bg-space-800 border-astro-cyan text-white ring-1 ring-astro-cyan/40"
                    : "bg-space-950/60 border-space-850 hover:bg-space-850/60 text-slate-300"
                }`}
              >
                <div className="font-bold flex items-center justify-between text-white text-xs">
                  <span>{p.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-astro-cyan" />}
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1">{p.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Dropdown if under 4 */}
      {selectedIds.length < 4 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2 border-t border-space-850 text-xs">
          <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <Plus className="w-3.5 h-3.5 text-astro-cyan" /> Add Experiment to Comparison:
          </span>
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleAdd(e.target.value);
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="px-3 py-1.5 rounded-lg bg-space-950 border border-space-800 text-xs text-white focus:outline-none focus:border-astro-cyan w-full sm:w-80"
          >
            <option value="" disabled>
              Select an experiment to add...
            </option>
            {availableExperiments.map((e) => (
              <option key={e.id} value={e.id}>
                {e.acronym} - {e.name} ({e.platform})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
