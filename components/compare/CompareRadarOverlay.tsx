"use client";

import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Experiment } from "@/types";
import { computeExperimentScore } from "@/lib/ranking";
import { Badge } from "@/components/ui/Badge";
import { Compass } from "lucide-react";

interface CompareRadarOverlayProps {
  experiments: Experiment[];
}

const COLORS = [
  { stroke: "#f97316", fill: "#f97316", name: "Ember" },
  { stroke: "#00e5ff", fill: "#00e5ff", name: "Cyan" },
  { stroke: "#10b981", fill: "#10b981", name: "Emerald" },
  { stroke: "#c084fc", fill: "#c084fc", name: "Purple" },
];

export function CompareRadarOverlay({ experiments }: CompareRadarOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-80 w-full rounded-2xl bg-space-950/80 border border-space-850 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500">Initializing Comparative Radar Overlay...</span>
      </div>
    );
  }

  // Precompute scores and normalize oxygen
  const scoredData = experiments.map((e) => {
    const computed = computeExperimentScore(e);
    const o2 = e.oxygenPercent ?? 21;
    // Normalize O2 to 0-100 (21% -> 50, 34% -> 85, 40% -> 100)
    const o2Index = Math.min(100, Math.max(10, Math.round(((o2 - 15) / 25) * 100)));

    return {
      exp: e,
      fireRisk: computed.fireRisk,
      exploration: computed.exploration,
      evidence: computed.evidence,
      suppression: computed.suppression,
      o2Index,
      totalScore: computed.totalScore,
    };
  });

  const subjects = [
    { key: "fireRisk", label: "Fire-Risk Severity" },
    { key: "exploration", label: "Exploration Relevance" },
    { key: "evidence", label: "Evidence Strength" },
    { key: "suppression", label: "Suppression Insight" },
    { key: "o2Index", label: "O₂ Hazard Index" },
  ];

  // Recharts radar data format:
  // [{ subject: 'Fire-Risk', exp1: 85, exp2: 60, ... }]
  const radarData = subjects.map((sub) => {
    const row: Record<string, string | number> = {
      subject: sub.label,
    };
    scoredData.forEach((s) => {
      row[s.exp.acronym] = s[sub.key as keyof typeof s] as number;
    });
    return row;
  });

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="cyan">
              <Compass className="w-3.5 h-3.5" />
              Multi-Axis Radar Telemetry
            </Badge>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            Superimposed 5-Axis Flammability Radar
          </h3>
          <p className="text-xs text-slate-400">
            Simultaneous multi-experiment overlay highlighting architectural trade-offs across all 5 dimensions.
          </p>
        </div>

        {/* Experiment badges with colors */}
        <div className="flex flex-wrap items-center gap-2">
          {scoredData.map((s, idx) => (
            <div
              key={s.exp.id}
              className="px-2.5 py-1 rounded-lg bg-space-950 border border-space-800 text-xs font-mono flex items-center gap-2"
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: COLORS[idx % COLORS.length].stroke }}
              />
              <span className="font-bold text-white">{s.exp.acronym}</span>
              <span className="text-slate-400 text-[10px]">
                ({s.totalScore} pts)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Overlay Chart */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis
              dataKey="subject"
              stroke="#94a3b8"
              fontSize={11}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#475569"
              fontSize={10}
              tick={{ fill: "#64748b" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const subject = payload[0].payload.subject;
                  return (
                    <div className="p-3 rounded-xl bg-space-950/95 border border-space-700 shadow-2xl text-xs space-y-1.5 min-w-[190px]">
                      <div className="font-bold text-white border-b border-space-800 pb-1">
                        {subject}
                      </div>
                      <div className="space-y-1 font-mono text-[11px]">
                        {payload.map((entry, i) => (
                          <div key={i} className="flex items-center justify-between gap-3">
                            <span style={{ color: entry.color }} className="font-bold">
                              {entry.name}:
                            </span>
                            <span className="text-white">{entry.value} / 100</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />

            {experiments.map((exp, idx) => {
              const color = COLORS[idx % COLORS.length];
              return (
                <Radar
                  key={exp.id}
                  name={exp.acronym}
                  dataKey={exp.acronym}
                  stroke={color.stroke}
                  fill={color.fill}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              );
            })}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
