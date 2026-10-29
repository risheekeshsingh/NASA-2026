"use client";

import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { RankedExperiment } from "@/lib/ranking";
import { AlertTriangle, Info } from "lucide-react";

interface RankingsScatterPlotProps {
  rankedExperiments: RankedExperiment[];
  onSelectExperiment?: (exp: RankedExperiment) => void;
}

export function RankingsScatterPlot({
  rankedExperiments,
  onSelectExperiment,
}: RankingsScatterPlotProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-80 w-full rounded-2xl bg-space-950/80 border border-space-850 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500">Initializing Flammability Scatter Plot...</span>
      </div>
    );
  }

  // Format data for Recharts ScatterChart
  const scatterData = rankedExperiments.map((item) => {
    const flow = item.experiment.flowVelocityCmS ?? 0.5;
    const o2 = item.experiment.oxygenPercent ?? 21;
    const score = item.totalScore;

    return {
      x: flow,
      y: o2,
      z: Math.max(10, score),
      acronym: item.experiment.acronym,
      name: item.experiment.name,
      platform: item.experiment.platform,
      agency: item.experiment.agency,
      fuelType: item.experiment.fuelType,
      score,
      rawItem: item,
    };
  });

  const getColor = (score: number) => {
    if (score >= 75) return "#ef4444"; // red
    if (score >= 60) return "#f97316"; // ember orange
    if (score >= 45) return "#00e5ff"; // astro cyan
    return "#3b82f6"; // blue
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-850 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            Oxygen vs. Convective Flow Flammability Map
          </h3>
          <p className="text-xs text-slate-400">
            X = Convective Flow Velocity (cm/s), Y = Oxygen % (O₂), Bubble Radius &prop; FlameLens Risk Score.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Critical (&ge;75)
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-ember-500 inline-block" /> Elevated (60-74)
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-astro-cyan inline-block" /> Moderate (&lt;60)
          </span>
        </div>
      </div>

      {/* Peak Flammability callout strip */}
      <div className="p-3 rounded-xl bg-space-950/80 border border-space-850 flex items-center gap-3 text-xs text-slate-300">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[11px] text-slate-300">
          <strong className="text-amber-400 font-mono">CRITICAL MICROGRAVITY REGIME:</strong> Flow velocities between{" "}
          <strong className="text-white">1–10 cm/s</strong> combined with <strong className="text-white">&gt;25% O₂</strong> represent peak
          flammability in spacecraft because natural buoyant dissipation is absent while forced flow supplies oxidizer.
        </span>
      </div>

      {/* Scatter plot */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              type="number"
              dataKey="x"
              name="Flow Velocity"
              unit=" cm/s"
              stroke="#94a3b8"
              fontSize={11}
              domain={[0, 25]}
              label={{
                value: "Forced Convective Flow Velocity (cm/s)",
                position: "insideBottom",
                offset: -12,
                fill: "#64748b",
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Oxygen"
              unit="% O₂"
              stroke="#94a3b8"
              fontSize={11}
              domain={[15, 45]}
              label={{
                value: "Oxygen Concentration (% O₂)",
                angle: -90,
                position: "insideLeft",
                offset: 5,
                fill: "#64748b",
                fontSize: 11,
              }}
            />
            <ZAxis type="number" dataKey="z" range={[70, 480]} name="Score" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: "#475569" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-space-950/95 border border-space-700 shadow-2xl text-xs space-y-1.5 min-w-[200px]">
                      <div className="flex items-center justify-between border-b border-space-800 pb-1">
                        <span className="font-mono font-bold text-astro-cyan">{data.acronym}</span>
                        <span className="font-mono font-bold text-white bg-space-900 px-1.5 py-0.5 rounded border border-space-800">
                          Score: {data.score}
                        </span>
                      </div>
                      <p className="text-white font-semibold text-[11px]">{data.name}</p>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-mono">
                        <div>O₂ Concentration: <span className="text-amber-300 font-bold">{data.y}%</span></div>
                        <div>Convective Flow: <span className="text-astro-cyan font-bold">{data.x} cm/s</span></div>
                        <div>Platform: <span className="text-slate-300">{data.platform} ({data.agency})</span></div>
                        <div>Fuel: <span className="text-slate-300 capitalize">{data.fuelType}</span></div>
                      </div>
                      <span className="text-[10px] text-ember-400 block pt-1 font-mono">
                        Click bubble to inspect in Radar & Detail
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Experiments"
              data={scatterData}
              onClick={(node) => {
                if (node && node.rawItem && onSelectExperiment) {
                  onSelectExperiment(node.rawItem);
                }
              }}
              className="cursor-pointer"
            >
              {scatterData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.score)}
                  stroke="#ffffff"
                  strokeWidth={1}
                  strokeOpacity={0.6}
                  fillOpacity={0.75}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
