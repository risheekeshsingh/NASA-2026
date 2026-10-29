"use client";

import React, { useState, useMemo } from "react";
import { ShieldAlert, Flame, Sliders, BarChart3, Layers, Trophy } from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { EXPERIMENTS } from "@/lib/data/experiments";
import {
  RankingWeights,
  DEFAULT_RANKING_WEIGHTS,
  rankExperiments,
  RankedExperiment,
} from "@/lib/ranking";
import dynamic from "next/dynamic";
import { RankingsWeightsSliders } from "@/components/rankings/RankingsWeightsSliders";
import { CalculationExplanationPanel } from "@/components/rankings/CalculationExplanationPanel";
import { RankingsLeaderboard } from "@/components/rankings/RankingsLeaderboard";
import { KeyTakeawaysBox } from "@/components/KeyTakeawaysBox";

const RankingsRadarChart = dynamic(
  () => import("@/components/rankings/RankingsRadarChart").then((mod) => mod.RankingsRadarChart),
  {
    ssr: false,
    loading: () => <div className="h-64 rounded-xl border border-white/10 bg-white/5 animate-pulse" />,
  }
);

const RankingsScatterPlot = dynamic(
  () => import("@/components/rankings/RankingsScatterPlot").then((mod) => mod.RankingsScatterPlot),
  {
    ssr: false,
    loading: () => <div className="h-64 rounded-xl border border-white/10 bg-white/5 animate-pulse" />,
  }
);

const MaterialRiskHeatmap = dynamic(
  () => import("@/components/rankings/MaterialRiskHeatmap").then((mod) => mod.MaterialRiskHeatmap),
  {
    ssr: false,
    loading: () => <div className="h-48 rounded-xl border border-white/10 bg-white/5 animate-pulse" />,
  }
);

export default function RankingsPage() {
  const [weights, setWeights] = useState<RankingWeights>(DEFAULT_RANKING_WEIGHTS);
  const [selectedId, setSelectedId] = useState<string>(EXPERIMENTS[0].id);

  // Compute live ranking whenever weights change
  const rankedList: RankedExperiment[] = useMemo(() => {
    return rankExperiments(EXPERIMENTS, weights);
  }, [weights]);

  // Selected experiment for the radar chart & inspector
  const selectedItem: RankedExperiment = useMemo(() => {
    return (
      rankedList.find((item) => item.experiment.id === selectedId) ??
      rankedList[0]
    );
  }, [rankedList, selectedId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <ShieldAlert className="w-3.5 h-3.5" />
              Decision-Support Model
            </Badge>
            <SampleDataBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Exploration Fire-Risk Rankings
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl">
            A transparent, explainable 4-dimensional scoring heuristic evaluating microgravity combustion
            investigations across fire-risk severity, exploration mission fidelity, empirical evidence strength,
            and suppression insight.
          </p>
        </div>
      </div>

      {/* Auto-Summary: Executive Key Takeaways */}
      <KeyTakeawaysBox pageContext="rankings" />

      {/* Dynamic Weight Sliders */}
      <RankingsWeightsSliders weights={weights} onChange={setWeights} />

      {/* How This Score Is Calculated & Disclaimer */}
      <CalculationExplanationPanel />

      {/* Visual Analytics Grid: Radar Chart + Scatter Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart (5 cols) */}
        <div className="lg:col-span-5">
          <RankingsRadarChart selected={selectedItem} />
        </div>

        {/* Scatter Plot (7 cols) */}
        <div className="lg:col-span-7">
          <RankingsScatterPlot
            rankedExperiments={rankedList}
            onSelectExperiment={(item) => setSelectedId(item.experiment.id)}
          />
        </div>
      </div>

      {/* Material Risk Heatmap */}
      <MaterialRiskHeatmap />

      {/* Full Leaderboard Table */}
      <RankingsLeaderboard
        rankedExperiments={rankedList}
        selectedId={selectedItem.experiment.id}
        onSelect={(item) => setSelectedId(item.experiment.id)}
      />
    </div>
  );
}
