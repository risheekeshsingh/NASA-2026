"use client";

import React from "react";
import {
  Sparkles,
  Flame,
  Wind,
  Layers,
  Maximize2,
  LifeBuoy,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { Experiment } from "@/types";
import { generateComparativeSummary, ComparisonInsight } from "@/lib/compare-rules";
import { Badge } from "@/components/ui/Badge";

interface CompareRuleBasedSummaryProps {
  experiments: Experiment[];
}

export function CompareRuleBasedSummary({ experiments }: CompareRuleBasedSummaryProps) {
  const insights = generateComparativeSummary(experiments);

  const getIcon = (category: ComparisonInsight["category"]) => {
    switch (category) {
      case "atmosphere":
        return <Flame className="w-4 h-4 text-amber-400" />;
      case "flow":
        return <Wind className="w-4 h-4 text-astro-cyan" />;
      case "fuel":
        return <Layers className="w-4 h-4 text-purple-400" />;
      case "scale":
        return <Maximize2 className="w-4 h-4 text-emerald-400" />;
      case "suppression":
        return <LifeBuoy className="w-4 h-4 text-red-400" />;
      case "synthesis":
      default:
        return <Sparkles className="w-4 h-4 text-ember-400" />;
    }
  };

  const getCategoryBadgeVariant = (category: ComparisonInsight["category"]): "danger" | "warning" | "success" | "cyan" | "ember" => {
    switch (category) {
      case "atmosphere":
        return "warning";
      case "flow":
        return "cyan";
      case "scale":
        return "success";
      case "suppression":
        return "danger";
      default:
        return "ember";
    }
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ember">
              <Sparkles className="w-3.5 h-3.5" />
              Automated Synthesis Engine
            </Badge>
            <Badge variant="cyan" size="sm">
              Rule-Based &bull; 100% Deterministic
            </Badge>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            What&apos;s Different and Why It Matters for Human Spaceflight
          </h3>
          <p className="text-xs text-slate-400">
            Translating complex microgravity combustion telemetry into clear engineering guidance for habitat designers and mission planners.
          </p>
        </div>
      </div>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-space-950/80 border border-space-850 space-y-3 hover:border-space-750 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-space-900 border border-space-800 flex items-center justify-center shrink-0">
                  {getIcon(item.category)}
                </div>
                <h4 className="text-xs font-bold text-white font-display line-clamp-1">
                  {item.title}
                </h4>
              </div>
              <Badge variant={getCategoryBadgeVariant(item.category)} size="sm">
                {item.badge}
              </Badge>
            </div>

            {/* What's Different */}
            <div className="p-3 rounded-lg bg-space-900/60 border border-space-850 text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-astro-cyan block font-semibold">
                What&apos;s Different
              </span>
              <p className="text-slate-200 leading-relaxed text-[11px]">
                {item.whatsDifferent}
              </p>
            </div>

            {/* Why It Matters */}
            <div className="p-3 rounded-lg bg-space-900/60 border border-space-850 text-xs space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ember-400 block font-semibold">
                Why It Matters for Human Spaceflight
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {item.whyItMatters}
              </p>
            </div>

            {/* Operational Recommendation */}
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-0.5">
              <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Operational Engineering Guidance
              </div>
              <p className="text-emerald-100/90 text-[11px] leading-relaxed">
                {item.operationalRecommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
