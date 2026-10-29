"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Flame, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import { Experiment } from "@/types";
import { computeExperimentScore } from "@/lib/ranking";
import { Badge } from "@/components/ui/Badge";

interface CompareTableProps {
  experiments: Experiment[];
}

interface RowConfig {
  key: string;
  label: string;
  category: "Identity" | "Environment" | "Scores" | "Safety";
  getValue: (exp: Experiment) => React.ReactNode;
  getRaw: (exp: Experiment) => string | number;
}

export function CompareTable({ experiments }: CompareTableProps) {
  // Precompute scores
  const scores = experiments.map((e) => ({
    id: e.id,
    computed: computeExperimentScore(e),
  }));

  const rows: RowConfig[] = [
    // Identity
    {
      key: "agency",
      label: "Space Agency",
      category: "Identity",
      getValue: (e) => (
        <span className="font-mono font-bold text-white">{e.agency}</span>
      ),
      getRaw: (e) => e.agency,
    },
    {
      key: "platform",
      label: "Flight Platform",
      category: "Identity",
      getValue: (e) => <Badge variant="cyan" size="sm">{e.platform}</Badge>,
      getRaw: (e) => e.platform,
    },
    {
      key: "years",
      label: "Operational Timeline",
      category: "Identity",
      getValue: (e) => (
        <span className="font-mono text-slate-300">
          {e.yearStart} {e.yearEnd ? `– ${e.yearEnd}` : ""}
        </span>
      ),
      getRaw: (e) => `${e.yearStart}-${e.yearEnd ?? ""}`,
    },
    {
      key: "gravity",
      label: "Gravity Environment",
      category: "Environment",
      getValue: (e) => (
        <span className="capitalize font-mono text-astro-cyan font-semibold">
          {e.gravityLevel}
        </span>
      ),
      getRaw: (e) => e.gravityLevel,
    },
    // Environment
    {
      key: "fuelType",
      label: "Fuel Phase / Regime",
      category: "Environment",
      getValue: (e) => (
        <span className="capitalize font-mono font-bold text-white">
          {e.fuelType}
        </span>
      ),
      getRaw: (e) => e.fuelType,
    },
    {
      key: "materials",
      label: "Tested Materials",
      category: "Environment",
      getValue: (e) => (
        <span className="text-slate-300 text-xs">
          {e.materials.join(", ")}
        </span>
      ),
      getRaw: (e) => e.materials.sort().join(","),
    },
    {
      key: "o2",
      label: "Oxygen Concentration (O₂)",
      category: "Environment",
      getValue: (e) => {
        const o2 = e.oxygenPercent ?? 21;
        const isElevated = o2 > 25;
        return (
          <span
            className={`font-mono font-bold text-sm ${
              isElevated ? "text-amber-400" : "text-slate-200"
            }`}
          >
            {o2}% O₂
          </span>
        );
      },
      getRaw: (e) => e.oxygenPercent ?? 21,
    },
    {
      key: "pressure",
      label: "Cabin Pressure",
      category: "Environment",
      getValue: (e) => (
        <span className="font-mono text-slate-300">
          {e.pressureKPa ? `${e.pressureKPa} kPa` : "101.3 kPa"}
        </span>
      ),
      getRaw: (e) => e.pressureKPa ?? 101.3,
    },
    {
      key: "flow",
      label: "Convective Flow Speed",
      category: "Environment",
      getValue: (e) => (
        <span className="font-mono text-astro-cyan">
          {e.flowVelocityCmS !== undefined ? `${e.flowVelocityCmS} cm/s` : "0-g Quiescent"}
        </span>
      ),
      getRaw: (e) => e.flowVelocityCmS ?? 0,
    },
    // Scores
    {
      key: "compositeScore",
      label: "FlameLens Risk Score",
      category: "Scores",
      getValue: (e) => {
        const s = scores.find((sc) => sc.id === e.id)?.computed.totalScore ?? 0;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`font-mono font-extrabold text-base ${
                s >= 75 ? "text-red-400" : s >= 60 ? "text-amber-400" : "text-astro-cyan"
              }`}
            >
              {s} / 100
            </span>
          </div>
        );
      },
      getRaw: (e) => scores.find((sc) => sc.id === e.id)?.computed.totalScore ?? 0,
    },
    {
      key: "fireRiskScore",
      label: "Fire-Risk Severity Sub-score",
      category: "Scores",
      getValue: (e) => {
        const s = scores.find((sc) => sc.id === e.id)?.computed.fireRisk ?? 0;
        return <span className="font-mono text-red-400 font-bold">{s} / 100</span>;
      },
      getRaw: (e) => scores.find((sc) => sc.id === e.id)?.computed.fireRisk ?? 0,
    },
    {
      key: "explorationScore",
      label: "Exploration Relevance Sub-score",
      category: "Scores",
      getValue: (e) => {
        const s = scores.find((sc) => sc.id === e.id)?.computed.exploration ?? 0;
        return <span className="font-mono text-astro-cyan font-bold">{s} / 100</span>;
      },
      getRaw: (e) => scores.find((sc) => sc.id === e.id)?.computed.exploration ?? 0,
    },
    {
      key: "suppressionScore",
      label: "Suppression Insight Sub-score",
      category: "Scores",
      getValue: (e) => {
        const s = scores.find((sc) => sc.id === e.id)?.computed.suppression ?? 0;
        return <span className="font-mono text-emerald-400 font-bold">{s} / 100</span>;
      },
      getRaw: (e) => scores.find((sc) => sc.id === e.id)?.computed.suppression ?? 0,
    },
    // Safety
    {
      key: "fireRiskImplication",
      label: "Fire-Risk Implication",
      category: "Safety",
      getValue: (e) => (
        <p className="text-slate-300 text-xs leading-relaxed">
          {e.fireRiskImplication}
        </p>
      ),
      getRaw: (e) => e.fireRiskImplication,
    },
    {
      key: "suppressionRelevance",
      label: "Suppression Relevance",
      category: "Safety",
      getValue: (e) => (
        <p className="text-slate-300 text-xs leading-relaxed">
          {e.suppressionRelevance}
        </p>
      ),
      getRaw: (e) => e.suppressionRelevance,
    },
    {
      key: "flammabilityLimitNote",
      label: "Flammability Limit Note",
      category: "Safety",
      getValue: (e) => (
        <p className="text-slate-400 text-xs leading-relaxed">
          {e.flammabilityLimitNote}
        </p>
      ),
      getRaw: (e) => e.flammabilityLimitNote,
    },
    {
      key: "dataAccess",
      label: "Data Access & Quality",
      category: "Safety",
      getValue: (e) => (
        <div className="space-y-0.5 font-mono text-xs">
          <div className="capitalize text-slate-200">Access: {e.dataAccess}</div>
          <div className="capitalize text-slate-400 text-[10px]">Confidence: {e.confidence}</div>
        </div>
      ),
      getRaw: (e) => `${e.dataAccess}-${e.confidence}`,
    },
  ];

  // Helper to determine if a row has differing values
  const hasDivergence = (row: RowConfig) => {
    const rawValues = experiments.map((e) => row.getRaw(e));
    return new Set(rawValues).size > 1;
  };

  const colors = [
    "text-ember-400 border-ember-500/30",
    "text-astro-cyan border-astro-cyan/30",
    "text-emerald-400 border-emerald-500/30",
    "text-purple-400 border-purple-500/30",
  ];

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-display">
            Side-by-Side Telemetry & Combustion Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Divergent parameters between selected flight programs are automatically detected and highlighted.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertCircle className="w-3 h-3" /> Divergence Highlighted
          </span>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-space-800 text-slate-400 border border-space-700">
            <CheckCircle2 className="w-3 h-3" /> Identical
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs min-w-[700px]">
          {/* Column Header: Experiment Names */}
          <thead>
            <tr className="border-b-2 border-space-800">
              <th className="p-3 text-left font-mono text-[11px] uppercase tracking-wider text-slate-400 bg-space-950/80 w-52">
                Comparative Dimension
              </th>
              {experiments.map((exp, idx) => (
                <th
                  key={exp.id}
                  className="p-3 text-left bg-space-950/80 border-l border-space-850"
                  style={{ width: `${100 / (experiments.length + 1)}%` }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono font-bold text-sm ${colors[idx % colors.length].split(" ")[0]}`}>
                        {exp.acronym}
                      </span>
                      <Link
                        href={`/experiments/${exp.id}`}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Open Full Detail Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="text-white font-bold text-xs line-clamp-1">{exp.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-space-850">
            {rows.map((row) => {
              const divergent = hasDivergence(row);

              return (
                <tr
                  key={row.key}
                  className={`transition-colors ${
                    divergent
                      ? "bg-amber-500/[0.04] hover:bg-amber-500/[0.08]"
                      : "hover:bg-space-850/30"
                  }`}
                >
                  {/* Row Label */}
                  <td className="p-3 bg-space-950/40 border-r border-space-850 align-top">
                    <div className="space-y-1">
                      <div className="font-semibold text-white text-xs">{row.label}</div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">
                          {row.category}
                        </span>
                        {divergent ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Divergent
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-space-800 text-slate-400">
                            Identical
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Experiment Values */}
                  {experiments.map((exp) => (
                    <td
                      key={exp.id}
                      className={`p-3 border-l border-space-850 align-top ${
                        divergent ? "border-amber-500/20" : ""
                      }`}
                    >
                      {row.getValue(exp)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
