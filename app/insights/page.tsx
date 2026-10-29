"use client";

import React, { useState } from "react";
import { Sparkles, Flame, ShieldAlert, Lightbulb, CheckCircle, Bot } from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { InsightsChatPanel } from "@/components/insights/InsightsChatPanel";
import { useLanguage } from "@/context/LanguageContext";

interface InsightTopic {
  id: string;
  category: string;
  title: string;
  summary: string;
  aiRationale: string;
  actionItems: string[];
  impactScore: "CRITICAL" | "HIGH" | "ELEVATED";
}

const CURATED_INSIGHTS: InsightTopic[] = [
  {
    id: "insight-cool-flame",
    category: "Combustion Kinetics",
    title: "Cool Flame Persistence After Apparent Visual Extinction",
    summary:
      "Hydrocarbon droplets tested in CIR/FLEX demonstrate low-temperature (500-750 K) chemical reactions continuing silently without emitting visible radiation.",
    aiRationale:
      "Because terrestrial fire suppression procedures equate darkness with extinction, standard crew training inadvertently exposes space habitats to post-suppression flash reignition upon ventilation restart.",
    actionItems: [
      "Incorporate dual-spectrum thermal IR cameras into portable astronaut fire extinguisher kits.",
      "Mandate a minimum 15-minute inert gas soak period prior to restoring cabin airflow.",
      "Recalibrate spacecraft fire warning thresholds based on carbon monoxide/formaldehyde ratios rather than optical soot obscuration.",
    ],
    impactScore: "CRITICAL",
  },
  {
    id: "insight-artemis-o2",
    category: "Atmospheric Flammability",
    title: "Flammability Surge in 34% Oxygen Artemis Lunar Cabin Atmosphere",
    summary:
      "Artemis surface habitats plan an 8.2 psia (56.5 kPa) atmosphere with 34% O2 to minimize spacewalk pre-breathe times. Flame spread rates increase by ~62% compared to standard terrestrial air.",
    aiRationale:
      "The increased chemical oxidation potential of 34% O2 heavily dominates over the mild moderating effect of sub-atmospheric pressure, lowering the Limiting Oxygen Index (LOI) of astronaut textiles.",
    actionItems: [
      "Prohibit untreated cotton or generic Nomex weaves in crew apparel; mandate advanced fluoropolymer-treated blends.",
      "Position nitrogen-purge discharge nozzles at floor and ceiling levels to eliminate non-convective stagnant pockets.",
      "Establish automated rapid depressurization capability to 4.5 psia as a secondary fire-kill mechanism.",
    ],
    impactScore: "CRITICAL",
  },
  {
    id: "insight-convective-ducts",
    category: "HVAC & Fluid Dynamics",
    title: "Peak Smoldering Hazard at Low Airflow Velocities (1 - 5 cm/s)",
    summary:
      "BASS-II data confirms that solid fuels which self-extinguish in zero convective airflow burn vigorously when exposed to faint cabin air currents between 1 and 5 cm/s.",
    aiRationale:
      "In zero airflow, combustion products smother the reaction. In high airflow, heat is blown away. At 2-3 cm/s, fresh oxidizer is fed without cooling the smolder zone, maximizing spread rate.",
    actionItems: [
      "Interlock fire detection alarms with instantaneous HVAC fan dampeners to kill forced convective drafts.",
      "Design cable raceways with tortuous micro-baffles to prevent continuous duct airflow.",
      "Install aspirated smoke detectors with sample draw ports directly in the return plenum.",
    ],
    impactScore: "HIGH",
  },
];

export default function InsightsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filtered =
    activeCategory === "ALL"
      ? CURATED_INSIGHTS
      : CURATED_INSIGHTS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <Bot className="w-3.5 h-3.5" />
              AI Fire-Safety Assistant
            </Badge>
            <SampleDataBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            {t.insightsTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl">
            {t.insightsSubtitle}
          </p>
        </div>
      </div>

      {/* Interactive AI Chat Panel */}
      <InsightsChatPanel />

      {/* Curated Deep-Dive Rationale Section */}
      <div className="space-y-6 pt-6 border-t border-space-850">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              Curated Flight Combustion Intelligence
            </h2>
            <p className="text-xs text-slate-400">
              Structured engineering analyses derived from peer-reviewed ISS and Cygnus flight programs.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "Combustion Kinetics", "Atmospheric Flammability", "HVAC & Fluid Dynamics"].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold shadow-ember-glow"
                      : "bg-space-900 text-slate-400 hover:text-white border border-space-800"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Insights Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              glow={item.impactScore === "CRITICAL" ? "ember" : "cyan"}
              className="border-space-800 bg-space-900/80 flex flex-col justify-between p-6 space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                    {item.category}
                  </span>
                  <Badge
                    variant={item.impactScore === "CRITICAL" ? "danger" : "warning"}
                    size="sm"
                  >
                    {item.impactScore}
                  </Badge>
                </div>

                <h3 className="text-base font-bold font-display text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed bg-space-950/60 p-3 rounded-lg border border-space-850">
                  {item.summary}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-astro-cyan font-mono uppercase">
                    <Lightbulb className="w-3.5 h-3.5" />
                    AI Rationale
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.aiRationale}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-space-850 space-y-2">
                <span className="text-[10px] uppercase font-mono text-ember-400 font-semibold block">
                  Recommended Countermeasures
                </span>
                <ul className="space-y-1.5">
                  {item.actionItems.map((action, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-ember-500 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
