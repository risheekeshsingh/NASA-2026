import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENCIES, DetailedAgencyProfile } from "@/lib/data/agencies";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  Building2,
  Globe,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowLeft,
  Calendar,
  Layers,
  FlaskConical,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface AgencyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return AGENCIES.map((agency) => ({
    slug: agency.slug,
  }));
}

export default function AgencyDetailPage({ params }: AgencyPageProps) {
  const agency = AGENCIES.find((a) => a.slug === params.slug.toLowerCase());

  if (!agency) {
    notFound();
  }

  // Filter experiments related to this agency in our dataset
  const agencyExperiments = EXPERIMENTS.filter(
    (exp) => exp.agency.toLowerCase() === agency.acronym.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Breadcrumb & Disclaimer Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <Link
          href="/agencies"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Global Agencies Hub
        </Link>

        {/* Mandatory Original Notice */}
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Summaries are original. Visit the official agency websites for authoritative information.</span>
        </div>
      </div>

      {/* Agency Hero Banner */}
      <div className="bg-space-900/90 border border-space-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-ember-500/10 via-astro-cyan/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" className="font-mono text-xs">
                {agency.acronym}
              </Badge>
              <span className="text-xs text-slate-400 font-mono">
                Established {agency.establishedYear}
              </span>
              <span className="text-xs text-slate-500">&bull;</span>
              <span className="text-xs text-slate-400 font-mono">
                {agency.countryOrRegion}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
              {agency.fullName}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {agency.roleInHumanSpaceflight}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Headquarters: <strong className="text-slate-200">{agency.headquarters}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Standard: <strong className="text-slate-200">{agency.flammabilityTestingStandard?.split(" ")[0]}</strong></span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            {/* Official Website Link (Top-level only, new tab with rel="noopener noreferrer") */}
            <a
              href={agency.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-space-800 hover:bg-space-700 border border-space-700 text-white text-xs font-mono transition-all shadow-md group"
            >
              <Globe className="w-4 h-4 text-astro-cyan" />
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </a>

            {/* Link to Filter Experiments by Agency */}
            <Link
              href={`/experiments?agency=${agency.acronym}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-ember-600 via-ember-500 to-amber-500 hover:brightness-110 text-white text-xs font-semibold shadow-ember-glow transition-all"
            >
              <Flame className="w-4 h-4" />
              <span>Filter {agency.acronym} Experiments ({agencyExperiments.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ISS Contribution Card */}
      <div className="bg-space-900/80 border border-space-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3">
          <Layers className="w-4 h-4 text-astro-cyan" />
          <h2 className="text-lg font-bold font-display text-white">
            Human Spaceflight & Space Station Infrastructure Contribution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1 bg-space-950/80 border border-space-850 rounded-lg p-4 space-y-2">
            <span className="text-xs font-mono uppercase text-astro-cyan font-semibold block">
              Primary Architecture
            </span>
            <h3 className="text-base font-bold text-white">
              {agency.issContribution.module}
            </h3>
            {agency.issContribution.yearLaunched && (
              <Badge variant="outline" className="text-xs font-mono">
                Initial Deployment: {agency.issContribution.yearLaunched}
              </Badge>
            )}
          </div>

          <div className="md:col-span-2 text-sm text-slate-300 leading-relaxed bg-space-950/40 border border-space-850 rounded-lg p-4">
            <p>{agency.issContribution.details}</p>
          </div>
        </div>
      </div>

      {/* Relevant Microgravity Test Facilities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-space-850 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-ember-400" />
            <h2 className="text-xl font-bold font-display text-white">
              Orbital & Ground Test Facilities
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {agency.detailedFacilities.length} Documented Facilities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agency.detailedFacilities.map((fac) => (
            <Card key={fac.name} className="border-space-800 bg-space-900/80 flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <Badge
                    variant={
                      fac.type === "orbital"
                        ? "cyan"
                        : fac.type === "flight"
                        ? "ember"
                        : "outline"
                    }
                    className="text-[10px] uppercase font-mono"
                  >
                    {fac.type} facility
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    {fac.location.split("(")[0]}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-white leading-snug">
                  {fac.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {fac.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fire-Safety-Relevant Programs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-space-850 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-ember-400" />
            <h2 className="text-xl font-bold font-display text-white">
              Fire Safety & Combustion Research Programs
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {agency.detailedPrograms.length} Featured Initiatives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agency.detailedPrograms.map((prog) => (
            <div
              key={prog.name}
              className="bg-space-900/80 border border-space-800 rounded-xl p-5 space-y-3 flex flex-col justify-between hover:border-space-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-astro-cyan font-semibold">
                    {prog.focus}
                  </span>
                  <Badge
                    variant={prog.status === "active" ? "cyan" : "outline"}
                    className="text-[10px] uppercase font-mono"
                  >
                    {prog.status}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-white">
                  {prog.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {prog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fire Safety Standard & Philosophy Detail */}
      <div className="bg-space-900/80 border border-space-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-space-850 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xl font-bold font-display text-white">
            Flammability Testing Philosophy & Standards Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-space-950/70 p-4 rounded-lg border border-space-850 space-y-1.5">
            <span className="text-[10px] font-mono text-astro-cyan uppercase tracking-wider block">
              Official Standard
            </span>
            <h4 className="text-sm font-bold text-white font-mono">
              {agency.standardsApproach.standard}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Governing specification for cabin material screening and acceptance.
            </p>
          </div>

          <div className="bg-space-950/70 p-4 rounded-lg border border-space-850 space-y-1.5">
            <span className="text-[10px] font-mono text-ember-400 uppercase tracking-wider block">
              Core Philosophy
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {agency.standardsApproach.philosophy}
            </p>
          </div>

          <div className="bg-space-950/70 p-4 rounded-lg border border-space-850 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
              Primary Suppression Agent
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {agency.standardsApproach.suppressionAgent}
            </p>
          </div>

          <div className="bg-space-950/70 p-4 rounded-lg border border-space-850 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
              Exploration Atmosphere Readiness
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {agency.standardsApproach.explorationReady}
            </p>
          </div>
        </div>
      </div>

      {/* Linked Experiments in Dataset */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-850 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-ember-400" />
            <h2 className="text-xl font-bold font-display text-white">
              {agency.acronym} Flight Experiments in FlameLens ({agencyExperiments.length})
            </h2>
          </div>

          <Link
            href={`/experiments?agency=${agency.acronym}`}
            className="text-xs font-mono text-ember-400 hover:text-ember-300 hover:underline flex items-center gap-1"
          >
            Open full filtered view in Experiments Catalog &rarr;
          </Link>
        </div>

        {agencyExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agencyExperiments.map((exp) => (
              <Card
                key={exp.id}
                className="border-space-800 bg-space-900/60 hover:bg-space-900/90 hover:border-space-700 transition-all flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {exp.platform}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.yearStart}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-white">
                    <Link
                      href={`/experiments/${exp.id}`}
                      className="hover:text-ember-400 transition-colors"
                    >
                      {exp.name} ({exp.acronym})
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-xs text-slate-300 line-clamp-2">
                    {exp.fireRiskImplication}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.materials.slice(0, 3).map((mat) => (
                      <span
                        key={mat}
                        className="text-[10px] font-mono bg-space-950 px-2 py-0.5 rounded text-slate-400 border border-space-850"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-space-900/40 border border-space-800 rounded-xl p-8 text-center text-sm text-slate-400 space-y-2">
            <p>
              No standalone flight experiments in this specific dataset filter. See multinational investigations or general database.
            </p>
            <Link
              href="/experiments"
              className="text-xs font-mono text-ember-400 hover:underline inline-block"
            >
              Browse all 22 flight experiments &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
