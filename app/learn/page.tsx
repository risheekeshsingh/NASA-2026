import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Award, BookOpen, Flame, ShieldCheck, ArrowLeft, ExternalLink } from "lucide-react";
import { FireSafetyQuiz } from "@/components/learn/FireSafetyQuiz";
import { EXPERIMENTS } from "@/lib/data/experiments";

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/safety-guide"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Safety Guide
            </Link>
            <span className="text-slate-600">&bull;</span>
            <Badge variant="cyan" className="font-mono text-xs">
              <Award className="w-3.5 h-3.5" />
              Interactive Assessment
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Microgravity Combustion Learn Mode
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Test your knowledge of orbital fire physics, low-speed flammability boundaries, cool flames, and spacecraft emergency protocols.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-space-950 p-3 rounded-lg border border-space-850">
          <div>8 Flight-Dataset Questions</div>
          <div className="text-astro-cyan font-bold">Instant Feedback &bull; Printable Certificate</div>
        </div>
      </div>

      {/* Main Interactive Quiz & Certificate Component */}
      <section>
        <FireSafetyQuiz />
      </section>

      {/* Helpful Study Resources Grid */}
      <section className="bg-space-950/60 border border-space-850 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-ember-400" />
          Related FlameLens Study Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <Link
            href="/safety-guide"
            className="p-4 rounded-lg bg-space-900/60 border border-space-800 hover:border-space-700 transition-all space-y-1.5"
          >
            <span className="text-astro-cyan font-bold font-mono block">
              Safety Guide &rarr;
            </span>
            <p className="text-slate-300">
              Review the 7 technical domains, from ignition hazards to Artemis lunar exploration atmospheres.
            </p>
          </Link>

          <Link
            href="/experiments"
            className="p-4 rounded-lg bg-space-900/60 border border-space-800 hover:border-space-700 transition-all space-y-1.5"
          >
            <span className="text-ember-400 font-bold font-mono block">
              Flight Experiments ({EXPERIMENTS.length}) &rarr;
            </span>
            <p className="text-slate-300">
              Search real flight evidence from Saffire, FLEX, BASS, and SoFIE with interactive filters.
            </p>
          </Link>

          <Link
            href="/insights"
            className="p-4 rounded-lg bg-space-900/60 border border-space-800 hover:border-space-700 transition-all space-y-1.5"
          >
            <span className="text-purple-400 font-bold font-mono block">
              AI Fire-Safety Assistant &rarr;
            </span>
            <p className="text-slate-300">
              Ask questions tailored for astronauts, engineers, or students in English or Hindi.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
