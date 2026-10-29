"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  ExternalLink,
  ArrowRightLeft,
  Search,
  Filter,
  CheckCircle,
  Flame,
  ShieldAlert,
} from "lucide-react";
import { RankedExperiment } from "@/lib/ranking";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RankingsLeaderboardProps {
  rankedExperiments: RankedExperiment[];
  selectedId: string;
  onSelect: (exp: RankedExperiment) => void;
}

export function RankingsLeaderboard({
  rankedExperiments,
  selectedId,
  onSelect,
}: RankingsLeaderboardProps) {
  const [search, setSearch] = useState("");
  const [filterAgency, setFilterAgency] = useState<string>("ALL");

  const filtered = rankedExperiments.filter((item) => {
    const matchesSearch =
      search.trim() === "" ||
      item.experiment.name.toLowerCase().includes(search.toLowerCase()) ||
      item.experiment.acronym.toLowerCase().includes(search.toLowerCase()) ||
      item.experiment.materials.some((m) => m.toLowerCase().includes(search.toLowerCase()));

    const matchesAgency =
      filterAgency === "ALL" || item.experiment.agency === filterAgency;

    return matchesSearch && matchesAgency;
  });

  const getScoreColor = (score: number) => {
    if (score >= 75) return "from-red-500 to-amber-500 text-red-400";
    if (score >= 60) return "from-amber-500 to-ember-500 text-amber-400";
    if (score >= 45) return "from-astro-cyan to-blue-500 text-astro-cyan";
    return "from-slate-500 to-slate-400 text-slate-300";
  };

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return "bg-red-500/20 text-red-400 border-red-500/40 ring-1 ring-red-500/30";
    if (rank === 2) return "bg-amber-500/20 text-amber-400 border-amber-500/40";
    if (rank === 3) return "bg-ember-500/20 text-ember-400 border-ember-500/40";
    return "bg-space-800 text-slate-400 border-space-700";
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ember">
              <Trophy className="w-3.5 h-3.5" />
              Live Leaderboard
            </Badge>
            <span className="text-xs text-slate-400 font-mono">
              ({filtered.length} of {rankedExperiments.length} experiments)
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            Composite Flammability Ranking
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter leaderboard..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-space-950 border border-space-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-ember-500 w-44 sm:w-56"
            />
          </div>

          {/* Agency Filter */}
          <select
            value={filterAgency}
            onChange={(e) => setFilterAgency(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-space-950 border border-space-800 text-xs text-slate-300 focus:outline-none focus:border-ember-500 font-mono"
          >
            <option value="ALL">All Agencies</option>
            <option value="NASA">NASA</option>
            <option value="ESA">ESA</option>
            <option value="JAXA">JAXA</option>
            <option value="CNSA">CNSA</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b border-space-850 text-slate-400 font-mono text-[11px] uppercase tracking-wider text-left">
              <th className="py-2.5 px-3 w-16 text-center">Rank</th>
              <th className="py-2.5 px-3">Experiment & Mission</th>
              <th className="py-2.5 px-3">Atmosphere & Flow</th>
              <th className="py-2.5 px-3 min-w-[180px]">Score Breakdown</th>
              <th className="py-2.5 px-3 text-right">Composite Score</th>
              <th className="py-2.5 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-space-850/60">
            {filtered.map((item) => {
              const { experiment: exp, rank, totalScore, breakdown } = item;
              const isSelected = exp.id === selectedId;
              const o2 = exp.oxygenPercent ?? 21;
              const isCritical = totalScore >= 75 || o2 >= 30;

              return (
                <tr
                  key={exp.id}
                  onClick={() => onSelect(item)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-space-850/80 border-l-2 border-ember-500"
                      : "hover:bg-space-850/40"
                  }`}
                >
                  {/* Rank Badge */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-mono font-bold text-xs border ${getRankBadgeStyle(
                        rank
                      )}`}
                    >
                      #{rank}
                    </span>
                  </td>

                  {/* Experiment & Details */}
                  <td className="py-3 px-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-xs">
                          {exp.acronym}
                        </span>
                        <Badge variant="cyan" size="sm">
                          {exp.platform}
                        </Badge>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {exp.agency}
                        </span>
                      </div>
                      <div className="text-slate-300 text-[11px] line-clamp-1 max-w-sm">
                        {exp.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        Materials: {exp.materials.slice(0, 2).join(", ")} &bull; {exp.fuelType}
                      </div>
                    </div>
                  </td>

                  {/* Atmosphere & Flow */}
                  <td className="py-3 px-3">
                    <div className="space-y-0.5 font-mono text-[11px]">
                      <div className={o2 >= 30 ? "text-amber-400 font-bold" : "text-slate-300"}>
                        {o2}% O₂
                      </div>
                      <div className="text-slate-400 text-[10px]">
                        Flow: {exp.flowVelocityCmS !== undefined ? `${exp.flowVelocityCmS} cm/s` : "0-g Quiescent"}
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        {exp.pressureKPa ? `${exp.pressureKPa} kPa` : "101.3 kPa"}
                      </div>
                    </div>
                  </td>

                  {/* Score Breakdown Bar */}
                  <td className="py-3 px-3">
                    <div className="space-y-1.5 max-w-[220px]">
                      {/* Composite progress bar */}
                      <div className="w-full bg-space-950 rounded-full h-2 overflow-hidden border border-space-800">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(totalScore)}`}
                          style={{ width: `${Math.min(100, totalScore)}%` }}
                        />
                      </div>

                      {/* Sub-score mini pills */}
                      <div className="flex items-center gap-1.5 text-[9px] font-mono">
                        <span title={`Fire Risk: ${breakdown.fireRisk}`} className="text-red-400">
                          FR:{breakdown.fireRisk}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span title={`Exploration: ${breakdown.exploration}`} className="text-astro-cyan">
                          EX:{breakdown.exploration}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span title={`Evidence: ${breakdown.evidence}`} className="text-amber-400">
                          EV:{breakdown.evidence}
                        </span>
                        <span className="text-slate-600">|</span>
                        <span title={`Suppression: ${breakdown.suppression}`} className="text-emerald-400">
                          SU:{breakdown.suppression}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Composite Score Number */}
                  <td className="py-3 px-3 text-right">
                    <span
                      className={`font-mono font-extrabold text-base ${
                        totalScore >= 75
                          ? "text-red-400"
                          : totalScore >= 60
                          ? "text-amber-400"
                          : "text-astro-cyan"
                      }`}
                    >
                      {totalScore}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">/ 100</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/experiments/${exp.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-slate-300 hover:text-white transition-colors"
                        title="View Full Experiment Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/compare?ids=${exp.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-astro-cyan hover:text-white transition-colors"
                        title="Send to Compare Matrix"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
