"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Scale, ArrowRightLeft, Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Experiment } from "@/types";
import dynamic from "next/dynamic";
import { CompareSelector } from "@/components/compare/CompareSelector";
import { CompareTable } from "@/components/compare/CompareTable";
import { CompareRuleBasedSummary } from "@/components/compare/CompareRuleBasedSummary";

const CompareRadarOverlay = dynamic(
  () => import("@/components/compare/CompareRadarOverlay").then((mod) => mod.CompareRadarOverlay),
  {
    ssr: false,
    loading: () => <div className="h-64 rounded-xl border border-white/10 bg-white/5 animate-pulse" />,
  }
);

function CompareContent() {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>(["saffire-i", "bass-ii"]);

  // Read URL query params on initial mount
  useEffect(() => {
    const idsParam = searchParams.get("ids");
    if (idsParam) {
      const parsed = idsParam
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((id) => EXPERIMENTS.some((e) => e.id === id));

      if (parsed.length >= 2) {
        setSelectedIds(parsed.slice(0, 4));
      } else if (parsed.length === 1) {
        // If 1 provided, pair with BASS-II or Saffire-I
        const partner = parsed[0] === "saffire-i" ? "bass-ii" : "saffire-i";
        setSelectedIds([parsed[0], partner]);
      }
    }
  }, [searchParams]);

  // Update URL history shallowly when selection changes
  const handleSelectionChange = (newIds: string[]) => {
    setSelectedIds(newIds);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("ids", newIds.join(","));
      window.history.replaceState({}, "", url.toString());
    }
  };

  const selectedExperiments: Experiment[] = selectedIds
    .map((id) => EXPERIMENTS.find((e) => e.id === id))
    .filter((e): e is Experiment => e !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Scale className="w-3.5 h-3.5" />
              Side-by-Side Analysis
            </Badge>
            <SampleDataBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Comparative Combustion Matrix
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl">
            Select 2 to 4 microgravity flight experiments to cross-examine behavioral divergences in
            oxygen limits, convective flow regimes, extinction kinetics, and spacecraft-scale suppression tactics.
          </p>
        </div>
      </div>

      {/* Experiment Selector & Presets */}
      <CompareSelector
        selectedIds={selectedIds}
        onChange={handleSelectionChange}
      />

      {/* Auto-Generated Plain-Language Summary */}
      <CompareRuleBasedSummary experiments={selectedExperiments} />

      {/* 5-Axis Radar Telemetry Overlay */}
      <CompareRadarOverlay experiments={selectedExperiments} />

      {/* Side-by-Side Detailed Matrix Table */}
      <CompareTable experiments={selectedExperiments} />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-ember-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-400">Loading Comparative Matrix Engine...</p>
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
