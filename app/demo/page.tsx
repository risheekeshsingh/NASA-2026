"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Play,
  Github,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Flame,
  Award,
  Layers,
  Search,
  Sliders,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function DemoPage() {
  const [copiedClone, setCopiedClone] = useState(false);
  const repoUrl = "https://github.com/FlameLens/flamelens";
  const cloneCmd = "git clone https://github.com/FlameLens/flamelens.git";

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(cloneCmd).then(() => {
        setCopiedClone(true);
        setTimeout(() => setCopiedClone(false), 2000);
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <Play className="w-3.5 h-3.5" />
              Interactive Showcase
            </Badge>
            <Badge variant="cyan" className="font-mono text-xs">
              NASA Space Apps 2026
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Project Demo &amp; Source Repository
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Video walkthrough, interactive architectural tour, and official open-source code repository for FlameLens.
          </p>
        </div>

        {/* GitHub Direct Link Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-space-900 hover:bg-space-850 border border-space-700 text-white text-xs font-mono transition-all shadow-md group"
          >
            <Github className="w-4 h-4 text-white group-hover:text-ember-400 transition-colors" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Video Demonstration Embed Container */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Play className="w-4 h-4 text-ember-400" />
            System Walkthrough &amp; Physical Science Demo
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Full HD Interactive Preview
          </span>
        </div>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-space-800 bg-space-950 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          {/* Simulated High-Fidelity Video Player / Fallback Visual */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-900/60 to-transparent pointer-events-none" />

          {/* Glowing central orb background */}
          <div className="w-48 h-48 rounded-full bg-ember-500/20 blur-3xl absolute -z-10 animate-pulse" />

          <div className="relative z-10 max-w-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-ember-600 to-amber-500 flex items-center justify-center text-white mx-auto shadow-ember-glow cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                FlameLens Project Video Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Demonstrating the 22-experiment microgravity database, live multi-criteria rankings engine, dual-language AI assistant, and 2D physics flame simulator.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="cyan" className="text-xs font-mono">
                Duration: 3:30 Min
              </Badge>
              <Badge variant="outline" className="text-xs font-mono">
                1080p 60fps
              </Badge>
              <Badge variant="ember" className="text-xs font-mono">
                Space Apps Finalist Presentation
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Clone & Quick-Start Card */}
      <section className="bg-space-900/80 border border-space-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-astro-cyan" />
            <h3 className="text-lg font-bold font-display text-white">
              Run Locally in 60 Seconds
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Node.js 18+ &bull; Zero External API Requirements
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          FlameLens runs out of the box with zero required environment variables. If an Anthropic or NASA API key is missing, graceful resilient rule-based fallbacks activate instantly.
        </p>

        {/* Copyable Terminal Command Bar */}
        <div className="bg-space-950 border border-space-800 rounded-xl p-3.5 flex items-center justify-between gap-3 font-mono text-xs text-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-ember-400 select-none">$</span>
            <span className="select-all whitespace-nowrap">{cloneCmd}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="shrink-0 text-xs py-1 px-3"
          >
            {copiedClone ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
          <div className="bg-space-950/60 p-2.5 rounded-lg border border-space-850">
            <span className="text-white block font-bold">1. Install</span>
            <span>npm install</span>
          </div>
          <div className="bg-space-950/60 p-2.5 rounded-lg border border-space-850">
            <span className="text-white block font-bold">2. Test &amp; Build</span>
            <span>npm run build</span>
          </div>
          <div className="bg-space-950/60 p-2.5 rounded-lg border border-space-850">
            <span className="text-white block font-bold">3. Start Server</span>
            <span>npm run dev</span>
          </div>
        </div>
      </section>

      {/* Feature Tour Highlights Grid */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold font-display text-white">
          Key Platform Architecture Highlights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/experiments"
            className="bg-space-900/60 border border-space-800 hover:border-space-700 p-5 rounded-xl transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-ember-400 font-bold">Catalog</span>
              <Search className="w-4 h-4 text-ember-400" />
            </div>
            <h4 className="text-base font-bold text-white">
              Instant Filter &amp; Search
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Client-side sub-millisecond filtering across agency, platform, gravity level, and fuel type with bookmarking and CSV/JSON export.
            </p>
          </Link>

          <Link
            href="/rankings"
            className="bg-space-900/60 border border-space-800 hover:border-space-700 p-5 rounded-xl transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-astro-cyan font-bold">Heuristic Engine</span>
              <Sliders className="w-4 h-4 text-astro-cyan" />
            </div>
            <h4 className="text-base font-bold text-white">
              Live Weight Scoring
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transparent, explainable multi-criteria model with real-time Recharts radar profiles and oxygen vs velocity scatter plots.
            </p>
          </Link>

          <Link
            href="/safety-guide"
            className="bg-space-900/60 border border-space-800 hover:border-space-700 p-5 rounded-xl transition-all space-y-2 block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold">Physics Simulation</span>
              <Flame className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-base font-bold text-white">
              2D Pure-Canvas Flame
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              HTML5 canvas animation demonstrating spherical halo vs buoyant teardrop across 0g, Lunar, Mars, and Earth with cool flame toggle.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
