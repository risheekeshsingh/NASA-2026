"use client";

import React, { useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { RankedExperiment } from "@/lib/ranking";
import { Badge } from "@/components/ui/Badge";
import { Shield, Sparkles } from "lucide-react";

interface RankingsRadarChartProps {
  selected: RankedExperiment;
}

export function RankingsRadarChart({ selected }: RankingsRadarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-80 w-full rounded-2xl bg-space-950/80 border border-space-850 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500">Loading Radar Telemetry...</span>
      </div>
    );
  }

  const { experiment, breakdown, totalScore, rank } = selected;

  const data = [
    {
      subject: "Fire-Risk Severity",
      score: breakdown.fireRisk,
      fullMark: 100,
      note: breakdown.notes.fireRisk,
    },
    {
      subject: "Exploration Relevance",
      score: breakdown.exploration,
      fullMark: 100,
      note: breakdown.notes.exploration,
    },
    {
      subject: "Evidence Strength",
      score: breakdown.evidence,
      fullMark: 100,
      note: breakdown.notes.evidence,
    },
    {
      subject: "Suppression Insight",
      score: breakdown.suppression,
      fullMark: 100,
      note: breakdown.notes.suppression,
    },
  ];

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-ember-400">
              Rank #{rank}
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs font-mono text-astro-cyan font-bold">
              {experiment.acronym}
            </span>
            <Badge variant="cyan" size="sm">
              {experiment.platform}
            </Badge>
          </div>
          <h3 className="text-base font-bold text-white font-display mt-0.5">
            {experiment.name}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">
              Composite Score
            </span>
            <span
              className={`text-2xl font-mono font-extrabold ${
                totalScore >= 75
                  ? "text-red-400"
                  : totalScore >= 60
                  ? "text-amber-400"
                  : "text-astro-cyan"
              }`}
            >
              {totalScore}
              <span className="text-xs text-slate-500 font-normal"> / 100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
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
                  const item = payload[0].payload;
                  return (
                    <div className="p-3 rounded-lg bg-space-950/95 border border-space-700 shadow-xl max-w-xs text-xs space-y-1">
                      <div className="font-bold text-white flex justify-between gap-4">
                        <span>{item.subject}</span>
                        <span className="font-mono text-ember-400">{item.score} / 100</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name={experiment.acronym}
              dataKey="score"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanatory notes list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-space-850 text-[11px]">
        <div className="p-2.5 rounded-lg bg-space-950/60 border border-space-850">
          <span className="font-semibold text-red-400 block mb-0.5">Fire-Risk Severity: {breakdown.fireRisk}/100</span>
          <p className="text-slate-400 text-[10px] leading-snug">{breakdown.notes.fireRisk}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-space-950/60 border border-space-850">
          <span className="font-semibold text-astro-cyan block mb-0.5">Exploration Relevance: {breakdown.exploration}/100</span>
          <p className="text-slate-400 text-[10px] leading-snug">{breakdown.notes.exploration}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-space-950/60 border border-space-850">
          <span className="font-semibold text-amber-400 block mb-0.5">Evidence Strength: {breakdown.evidence}/100</span>
          <p className="text-slate-400 text-[10px] leading-snug">{breakdown.notes.evidence}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-space-950/60 border border-space-850">
          <span className="font-semibold text-emerald-400 block mb-0.5">Suppression Insight: {breakdown.suppression}/100</span>
          <p className="text-slate-400 text-[10px] leading-snug">{breakdown.notes.suppression}</p>
        </div>
      </div>
    </div>
  );
}
