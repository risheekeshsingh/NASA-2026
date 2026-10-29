import React from "react";
import Link from "next/link";
import {
  Flame,
  Orbit,
  Users,
  Target,
  Shield,
  Heart,
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Logo } from "@/components/Logo";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { TeamSection } from "@/components/team/TeamSection";
import { env } from "@/lib/env";

export default function AboutPage() {
  const aiModel = env.ANTHROPIC_MODEL;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="ember">NASA Space Apps Challenge</Badge>
          <Badge variant="cyan">Flame in Freefall</Badge>
        </div>

        <div className="flex justify-center py-2">
          <Logo size={56} />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          FlameLens: Physical Science Intelligence
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          &quot;AI-Powered Fire Safety Insights from Microgravity Combustion Data for Human Space Exploration&quot;
        </p>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Problem */}
        <Card className="border-red-900/40 bg-space-900/80 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <h2 className="text-lg font-bold font-display uppercase tracking-wider">
              The Challenge &amp; Problem
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            For decades, NASA, ESA, JAXA, Roscosmos, and CNSA have studied how flames ignite and burn in orbital microgravity. However, critical findings remain trapped inside dense PDF technical memoranda, specialized laboratory spreadsheets, and raw telemetry archives.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Engineers designing habitats for the Moon and Mars struggle to rapidly find, compare, and translate these physical science discoveries into actionable spacecraft safety standards. Crucial hazards—such as the counter-intuitive low-velocity flammability peak and invisible cool flames—are easily overlooked.
          </p>
        </Card>

        {/* The Solution */}
        <Card glow="cyan" className="border-space-800 bg-space-900/80 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-astro-cyan">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold font-display uppercase tracking-wider">
              The FlameLens Solution
            </h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            FlameLens bridges physical science research and mission engineering. It standardizes disparate flight datasets into a unified, interactive platform featuring:
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-astro-cyan shrink-0 mt-0.5" />
              <span><strong>Searchable Flight Catalog:</strong> {EXPERIMENTS.length} standardized flight experiments with conditions, materials, and findings.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-astro-cyan shrink-0 mt-0.5" />
              <span><strong>Explainable Multi-Criteria Ranking:</strong> Live user-tunable weights for risk severity, exploration relevance, and evidence strength.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-astro-cyan shrink-0 mt-0.5" />
              <span><strong>AI Assistant (English &amp; Hindi):</strong> Grounded strictly in flight records with zero hallucination and experiment citations (powered by {aiModel}).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-astro-cyan shrink-0 mt-0.5" />
              <span><strong>Interactive 2D Flame Simulator:</strong> Visualizing spherical halos vs buoyant plumes across 0g, Lunar, Mars, and Earth.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Measurable Outcomes & Quantitative Impact */}
      <section className="bg-space-900/90 border border-space-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Measurable Outcomes &amp; Impact Metrics
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-space-950 p-5 rounded-xl border border-space-850 space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold font-mono text-emerald-400 block">
              95%
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Search Time Reduction
            </span>
            <p className="text-[11px] text-slate-500 pt-1">
              Find flammability limits in seconds vs hours across NTRS repositories.
            </p>
          </div>

          <div className="bg-space-950 p-5 rounded-xl border border-space-850 space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold font-mono text-astro-cyan block">
              {EXPERIMENTS.length}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Flight Experiments
            </span>
            <p className="text-[11px] text-slate-500 pt-1">
              Systematically harmonized across Saffire, FLEX, BASS, and SoFIE.
            </p>
          </div>

          <div className="bg-space-950 p-5 rounded-xl border border-space-850 space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold font-mono text-ember-400 block">
              6
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Civil Space Agencies
            </span>
            <p className="text-[11px] text-slate-500 pt-1">
              Cross-agency standards compared with unified safety philosophies.
            </p>
          </div>

          <div className="bg-space-950 p-5 rounded-xl border border-space-850 space-y-1">
            <span className="text-2xl sm:text-4xl font-extrabold font-mono text-purple-400 block">
              4
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Gravity Environments
            </span>
            <p className="text-[11px] text-slate-500 pt-1">
              Interactive 2D simulation covering 0g, Lunar (0.16g), Mars, and 1g.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences & Impact Story: Who Benefits */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3">
          <Users className="w-5 h-5 text-astro-cyan" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Who Benefits: Impact Across User Communities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-2.5">
            <span className="text-xs font-mono uppercase text-ember-400 font-bold block">
              01 &bull; Mission Planners
            </span>
            <h3 className="font-bold text-white text-base">Artemis Architects</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating habitat pressure and oxygen enrichment trade-offs (34% O2 at 8.2 psia) for lunar surface base camps and Mars transit vehicles.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-2.5">
            <span className="text-xs font-mono uppercase text-astro-cyan font-bold block">
              02 &bull; Engineers
            </span>
            <h3 className="font-bold text-white text-base">Spacecraft Designers</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Selecting qualified non-metallic polymers, electrical wire coatings (ETFE/PTFE), and designing return-duct smoke detection layouts.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-2.5">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
              03 &bull; Astronauts
            </span>
            <h3 className="font-bold text-white text-base">Flight Crews</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Understanding emergency suppression doctrines: why fine water mist is favored over CO2 and why thermal imaging is vital to spot invisible cool flames.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-space-800 bg-space-900/60 space-y-2.5">
            <span className="text-xs font-mono uppercase text-purple-400 font-bold block">
              04 &bull; Students
            </span>
            <h3 className="font-bold text-white text-base">STEM Learners</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Exploring physical combustion principles through the interactive 2D canvas simulator, testing their knowledge in Learn Mode, and earning a completion certificate.
            </p>
          </div>
        </div>
      </section>

      {/* Compact Team Section */}
      <TeamSection compact showHeaderNote={false} />

      {/* Navigation Links */}
      <div className="pt-4 border-t border-space-850 flex flex-wrap items-center justify-between gap-4">
        <Link href="/team" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
          <span>Meet the Hackathon Team &rarr;</span>
        </Link>
        <Link href="/roadmap" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5">
          <span>Project Roadmap & Future Work &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
