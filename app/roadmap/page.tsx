import React from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Database,
  Calculator,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface RoadmapPhase {
  phase: string;
  title: string;
  status: "Completed" | "In Development" | "Planned" | "Research Concept";
  timeframe: string;
  badgeVariant: "success" | "cyan" | "ember" | "outline";
  features: Array<{
    title: string;
    description: string;
  }>;
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Phase 01",
    title: "FlameLens Core Intelligence Foundation",
    status: "Completed",
    timeframe: "NASA Space Apps Challenge 2026",
    badgeVariant: "success",
    features: [
      {
        title: "22 Standardized Flight Experiments",
        description: "Harmonized microgravity combustion data across Saffire, FLEX, BASS, and SoFIE with materials, pressures, and flow velocities.",
      },
      {
        title: "Transparent Multi-Criteria Ranking Engine",
        description: "Live user-tunable weight sliders with instant leaderboard updates and explainability breakdown.",
      },
      {
        title: "Grounded AI Fire Safety Assistant",
        description: "POST /api/explain route with Anthropic Claude, citation requirements, zero-hallucination guardrails, and English/Hindi dictionary.",
      },
      {
        title: "Interactive 2D Canvas Flame Simulator",
        description: "Pure canvas animation demonstrating spherical halo vs buoyant teardrop across 0g, Lunar, Mars, and Earth.",
      },
    ],
  },
  {
    phase: "Phase 02",
    title: "Expanded Datasets & Uncertainty Quantification (UQ)",
    status: "In Development",
    timeframe: "Q1 - Q2 2027",
    badgeVariant: "cyan",
    features: [
      {
        title: "High-Frequency Telemetry Ingestion",
        description: "Ingesting raw 10 Hz thermocouple logs and high-speed Schlieren video sequences from the NASA PSI database.",
      },
      {
        title: "Bayesian Uncertainty Quantification (UQ)",
        description: "Incorporating Bayesian confidence intervals and error bars on flame spread rates to account for micro-g jitter (g-jitter) on the ISS.",
      },
      {
        title: "JAXA Kibo & ESA Parabolic Data Expansion",
        description: "Expanding dataset to 50+ experiments including full SCEM cable insulation runs and Novespace A310 zero-g porous matrix smoldering archives.",
      },
    ],
  },
  {
    phase: "Phase 03",
    title: "Direct CFD & Physics Solver Integration",
    status: "Planned",
    timeframe: "Q3 - Q4 2027",
    badgeVariant: "ember",
    features: [
      {
        title: "OpenFOAM & NIST FDS Mesh Exports",
        description: "Exporting normalized experiment boundary conditions directly into OpenFOAM and NIST Fire Dynamics Simulator (FDS) input grids.",
      },
      {
        title: "Surrogate Neural Physics Emulators",
        description: "Training physics-informed neural networks (PINNs) on Saffire flight runs to predict 3D flame spread in custom spacecraft CAD geometries in seconds.",
      },
      {
        title: "Multi-Species Pyrolysis Modeling",
        description: "Modeling offgassing kinetics for composite spacecraft honeycomb panels under elevated oxygen concentrations.",
      },
    ],
  },
  {
    phase: "Phase 04",
    title: "Mission-Specific Autonomous Flight Modules",
    status: "Research Concept",
    timeframe: "2028 - Artemis Base Camp & Gateway",
    badgeVariant: "outline",
    features: [
      {
        title: "Artemis Lunar Habitat Depressurization Module",
        description: "Simulating emergency partial depressurization scenarios (8.2 psia to 3.0 psia) to quantify flame extinction without damaging life support valves.",
      },
      {
        title: "Lunar Gateway Autonomous Fire Scrubber Interlock",
        description: "Developing telemetry interfaces for uncrewed periods on the Lunar Gateway to trigger automated smoke scrubbing without crew intervention.",
      },
      {
        title: "Mars Transit Vehicle Multi-Zone Fire Tracking",
        description: "Simulating long-duration deep space radiation shielding degradation and wiring fire risks for 1000-day crewed Mars missions.",
      },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Compass className="w-3.5 h-3.5" />
              Strategic Development Plan
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              4 Development Horizons
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Project Roadmap &amp; Future Horizons
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
            From hackathon foundation to autonomous flight-integrated spacecraft fire safety and numerical CFD physical science simulations.
          </p>
        </div>

        <Link
          href="/data-sources"
          className="text-xs font-mono text-ember-400 hover:underline flex items-center gap-1 self-start md:self-auto"
        >
          <span>Explore Current Datasets &rarr;</span>
        </Link>
      </div>

      {/* Roadmap Phase Timeline */}
      <div className="space-y-8">
        {ROADMAP_PHASES.map((phase) => (
          <div
            key={phase.phase}
            className="bg-space-900/80 border border-space-800 rounded-2xl p-6 sm:p-8 space-y-5 hover:border-space-700 transition-all shadow-xl"
          >
            {/* Phase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold uppercase text-ember-400 bg-ember-500/10 border border-ember-500/30 px-2 py-0.5 rounded">
                    {phase.phase}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {phase.timeframe}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {phase.title}
                </h2>
              </div>

              <Badge variant={phase.badgeVariant} className="text-xs font-mono uppercase self-start sm:self-auto">
                {phase.status}
              </Badge>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {phase.features.map((feat) => (
                <div
                  key={feat.title}
                  className="bg-space-950/70 border border-space-850 rounded-xl p-4 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-astro-cyan shrink-0" />
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Callout */}
      <div className="bg-gradient-to-r from-space-900 via-space-900 to-space-850 border border-space-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 max-w-xl text-center sm:text-left">
          <h3 className="text-lg font-bold font-display text-white">
            Interested in Collaborating on Future Phases?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We welcome contributions from combustion scientists, CFD developers, and mission operations architects.
          </p>
        </div>

        <Link href="/contact" className="shrink-0">
          <Button variant="ember" size="md" className="font-semibold shadow-ember-glow">
            <span>Get in Touch with Team</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
