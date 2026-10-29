"use client";

import React from "react";
import Link from "next/link";
import { Users, Mail } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { TeamCard } from "./TeamCard";

interface TeamSectionProps {
  compact?: boolean;
  showHeaderNote?: boolean;
}

export function TeamSection({
  compact = false,
  showHeaderNote = true,
}: TeamSectionProps) {
  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Users className="w-3.5 h-3.5" />
              NASA Space Apps Challenge Team
            </Badge>
            <Badge variant="ember">Project FlameLens</Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Meet the Project Team
          </h2>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Four builders turning decades of microgravity combustion research into fire-safety insight.
          </p>
        </div>

        {/* Source of Truth Info Box (Desktop) */}
        {showHeaderNote && (
          <div className="hidden sm:block text-xs font-mono text-slate-400 bg-space-950/80 p-3 rounded-xl border border-white/10 max-w-xs shadow-lg">
            <span>Edit team info in a single data file: </span>
            <code className="text-astro-cyan block font-bold mt-0.5">lib/data/team.ts</code>
          </div>
        )}
      </div>

      {/* Team Cards Grid (2x2 on desktop, 1 column on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamCard
            key={member.id}
            member={member}
            index={index}
            compact={compact}
          />
        ))}
      </div>

      {/* Built for NASA Space Apps Challenge Note & Contact Action */}
      <div className="bg-space-950/70 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400 shadow-xl">
        <div className="space-y-1">
          <span className="font-bold text-slate-200 text-sm block">
            Built for NASA Space Apps Challenge
          </span>
          <p className="text-xs text-slate-400 font-sans">
            Team contributions reflect our roles in this project. Not affiliated with or endorsed by NASA.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/contact">
            <Button variant="secondary" size="sm" className="gap-2 text-xs py-2 px-3.5">
              <Mail className="w-3.5 h-3.5 text-astro-cyan" />
              <span>Contact the team</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
