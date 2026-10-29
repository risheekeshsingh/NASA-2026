import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Flame,
  Shield,
  Clock,
  Gauge,
  Wind,
  ExternalLink,
  Layers,
  Sparkles,
  Bookmark,
  Share2,
} from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Experiment } from "@/types";
import { ExperimentConditionsChart } from "@/components/ExperimentConditionsChart";
import { ExperimentBookmarkButton } from "@/components/ExperimentBookmarkButton";

export function generateStaticParams() {
  return EXPERIMENTS.map((exp) => ({ id: exp.id }));
}

export default function ExperimentDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const experiment = EXPERIMENTS.find(
    (e) => e.id.toLowerCase() === id.toLowerCase() || e.acronym.toLowerCase() === id.toLowerCase()
  );

  if (!experiment) {
    notFound();
  }

  // Related experiments sharing same fuel type or agency
  const relatedExperiments = EXPERIMENTS.filter(
    (e) => e.id !== experiment.id && (e.fuelType === experiment.fuelType || e.agency === experiment.agency)
  ).slice(0, 3);

  const isCritical = (experiment.oxygenPercent ?? 21) >= 28 || experiment.tags.includes("spacecraft-scale");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Link href="/experiments" className="hover:text-ember-400 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Experiments
          </Link>
          <span>/</span>
          <span className="text-white font-bold">{experiment.acronym}</span>
        </div>

        <div className="flex items-center gap-3">
          <ExperimentBookmarkButton experimentId={experiment.id} />
          <a
            href={experiment.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-space-900 hover:bg-space-800 text-ember-400 border border-space-800 transition-colors"
          >
            <span>Official Archive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="ember">{experiment.acronym}</Badge>
          <Badge variant="cyan">{experiment.agency}</Badge>
          <Badge variant="default">{experiment.platform}</Badge>
          <Badge variant={isCritical ? "ember" : "warning"}>
            {experiment.gravityLevel}
          </Badge>
          <span className="text-xs font-mono text-slate-400">
            {experiment.yearStart} {experiment.yearEnd ? `- ${experiment.yearEnd}` : ""}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          {experiment.name}
        </h1>

        <p className="text-base text-slate-300 max-w-3xl leading-relaxed">
          {experiment.fireRiskImplication}
        </p>
      </div>

      {/* Environmental Conditions Grid & Recharts Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Conditions Matrix Table */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-space-800 bg-space-900/80 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-space-800 pb-3">
              <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-astro-cyan" />
                Physical Science Conditions
              </h2>
              <span className="text-[11px] font-mono text-slate-400 uppercase">
                Confidence: <strong className="text-astro-cyan">{experiment.confidence}</strong>
              </span>
            </div>

            <div className="divide-y divide-space-850 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Fuel Classification</span>
                <span className="font-semibold text-white capitalize">{experiment.fuelType}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Oxygen Concentration</span>
                <span className="font-bold font-mono text-ember-400">
                  {experiment.oxygenPercent ? `${experiment.oxygenPercent}% O₂` : "21% (Nominal Ambient)"}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Cabin Chamber Pressure</span>
                <span className="font-mono text-white">
                  {experiment.pressureKPa ? `${experiment.pressureKPa} kPa (${(experiment.pressureKPa * 0.145).toFixed(1)} psia)` : "101.3 kPa (1.0 atm)"}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Convective Velocity</span>
                <span className="font-mono text-astro-cyan">
                  {experiment.flowVelocityCmS ? `${experiment.flowVelocityCmS} cm/s` : "Quiescent Diffusion (0 cm/s)"}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Gravity Level</span>
                <span className="capitalize text-slate-200">{experiment.gravityLevel}</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-slate-400 font-mono">Data Access Tier</span>
                <span className="capitalize text-emerald-400">{experiment.dataAccess}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-space-950 border border-space-850 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Tested Material Substrates</span>
              <p className="text-white font-medium">{experiment.materials.join("; ")}</p>
            </div>
          </Card>
        </div>

        {/* Recharts Environmental Conditions Chart */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-space-800 bg-space-900/80 p-6 space-y-4">
            <h2 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ember-400" />
              Environmental Parameter Comparison
            </h2>
            <ExperimentConditionsChart experiment={experiment} />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Comparison of {experiment.acronym} parameters against terrestrial sea-level air and the Artemis Lunar 34% O₂ exploration baseline.
            </p>
          </Card>
        </div>
      </div>

      {/* Full Findings & Safety Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Findings */}
        <Card className="border-space-800 bg-space-900/80 p-6 space-y-4">
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-astro-cyan" />
            Comprehensive Scientific Findings
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {experiment.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-space-950/60 p-3 rounded-lg border border-space-850">
                <span className="text-astro-cyan font-bold mt-0.5">&bull;</span>
                <span className="leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Suppression & Flammability Limits */}
        <div className="space-y-6">
          <Card glow="ember" className="border-space-800 bg-space-900/80 p-6 space-y-3">
            <h3 className="text-base font-bold font-display text-ember-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Suppression Relevance &amp; Countermeasures
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-space-950/60 p-3 rounded-lg border border-space-850">
              {experiment.suppressionRelevance}
            </p>
          </Card>

          <Card className="border-space-800 bg-space-900/80 p-6 space-y-3">
            <h3 className="text-base font-bold font-display text-amber-300 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Flammability Limit Boundary
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-space-950/60 p-3 rounded-lg border border-space-850">
              {experiment.flammabilityLimitNote}
            </p>
          </Card>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-mono text-slate-400">Tagged Taxonomy:</span>
        {experiment.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md bg-space-900 text-slate-300 border border-space-800 font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Experiments */}
      {relatedExperiments.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-space-850">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display text-white">Related Flight Investigations</h3>
            <Link href="/experiments" className="text-xs text-ember-400 hover:text-ember-300 font-mono">
              View All 22 &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedExperiments.map((rel) => (
              <Card
                key={rel.id}
                className="border-space-800 bg-space-900/60 hover:border-space-700 p-4 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-ember-400">{rel.acronym}</span>
                    <Badge variant="cyan" size="sm">{rel.platform}</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{rel.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{rel.fireRiskImplication}</p>
                </div>
                <div className="pt-2">
                  <Link href={`/experiments/${rel.id}`}>
                    <Button variant="secondary" size="sm" className="w-full text-xs py-1">
                      Inspect
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
