"use client";

import React, { useState } from "react";
import { COMBUSTION_MILESTONES, CombustionMilestone } from "@/lib/data/agencies";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, AlertTriangle, Calendar, Flame, ShieldAlert, Sparkles } from "lucide-react";

export function CombustionTimeline() {
  const [filterAgency, setFilterAgency] = useState<string>("ALL");

  const filteredMilestones = COMBUSTION_MILESTONES.filter((m) => {
    if (filterAgency === "ALL") return true;
    return m.agency === filterAgency;
  });

  return (
    <div className="bg-space-900/90 border border-space-800 rounded-xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-ember-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-ember-400 font-semibold">
              Historical Verification Record
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Human Spaceflight Combustion & Fire-Safety Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Key historical turning points, flight discoveries, and safety doctrine overhauls across six decades.
          </p>
        </div>

        {/* Agency Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {["ALL", "NASA", "Roscosmos", "JAXA", "CNSA", "Global"].map((ag) => (
            <button
              key={ag}
              onClick={() => setFilterAgency(ag)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md border transition-all ${
                filterAgency === ag
                  ? "bg-ember-500/20 border-ember-500/60 text-ember-400 font-bold"
                  : "bg-space-950 border-space-800 text-slate-400 hover:text-white"
              }`}
            >
              {ag}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l border-space-800 space-y-8 my-4">
        {filteredMilestones.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-space-950 border-2 border-ember-500 group-hover:scale-125 transition-transform shadow-ember-glow" />

            <div className="bg-space-950/70 border border-space-850 hover:border-space-750 rounded-xl p-5 transition-all shadow-md space-y-3">
              {/* Card Meta & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold font-mono text-ember-400">
                    {item.year}
                  </span>
                  {item.dateStr && (
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.dateStr}
                    </span>
                  )}
                  <Badge variant="cyan" className="text-[11px] font-mono">
                    {item.agency}
                  </Badge>
                </div>

                {/* Verification Status Badge */}
                {item.verified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified Flight Record
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Verify Against Mission Archives
                  </span>
                )}
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-ember-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Impact on Fire Safety Callout */}
              <div className="bg-space-900/90 border-l-2 border-astro-cyan p-3 rounded-r-lg text-xs text-slate-300 space-y-1">
                <span className="text-astro-cyan font-bold font-mono uppercase tracking-wider block text-[10px]">
                  Safety Impact & Doctrine Overhaul
                </span>
                <p>{item.impactOnFireSafety}</p>
              </div>

              {/* Verify Note if unverified */}
              {item.verifyNote && (
                <div className="text-[11px] text-amber-400/90 font-mono italic bg-amber-950/20 px-3 py-1.5 rounded border border-amber-900/30">
                  Note: {item.verifyNote}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
