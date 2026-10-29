import React from "react";
import Link from "next/link";
import {
  Building2,
  Globe,
  ExternalLink,
  ShieldCheck,
  Flame,
  ArrowRight,
  AlertCircle,
  FlaskConical,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { AGENCIES } from "@/lib/data/agencies";
import { ISSPartnershipDiagram } from "@/components/agencies/ISSPartnershipDiagram";
import { CombustionTimeline } from "@/components/agencies/CombustionTimeline";
import { AgencyComparisonTable } from "@/components/agencies/AgencyComparisonTable";

export default function AgenciesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Globe className="w-3.5 h-3.5" />
              Global Civil Space Agencies
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              6 Agency Profiles
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Space Agency Profiles & Fire-Safety Standards
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Operational human spaceflight roles, orbital laboratory facilities, flammability standards, and combustion research programs across partner agencies.
          </p>
        </div>

        {/* Mandatory Originality Notice */}
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-300/95 bg-amber-950/40 border border-amber-800/40 px-3.5 py-2 rounded-lg max-w-md">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            Summaries are original. Visit the official agency websites for authoritative information.
          </span>
        </div>
      </div>

      {/* Agency Profiles Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-space-850 pb-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-astro-cyan" />
            <h2 className="text-xl font-bold font-display text-white">
              Agency Directory & Combustion Research Overview
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any agency for full profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENCIES.map((agency) => (
            <Card
              key={agency.id}
              className="border-space-800 bg-space-900/80 p-6 flex flex-col justify-between space-y-5 hover:border-space-700 transition-all hover:shadow-lg"
            >
              <div className="space-y-3">
                {/* Header Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-ember-400 px-2 py-0.5 rounded bg-ember-950/50 border border-ember-800/40">
                    {agency.acronym}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Est. {agency.establishedYear}
                  </span>
                </div>

                {/* Name & Country */}
                <div>
                  <h3 className="text-lg font-bold font-display text-white leading-snug">
                    <Link
                      href={`/agencies/${agency.slug}`}
                      className="hover:text-ember-400 transition-colors"
                    >
                      {agency.fullName}
                    </Link>
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5 font-mono">
                    {agency.countryOrRegion} &bull; {agency.headquarters}
                  </span>
                </div>

                {/* Role in Human Spaceflight */}
                <p className="text-xs text-slate-300 leading-relaxed bg-space-950/60 p-3 rounded-lg border border-space-850 line-clamp-3">
                  {agency.roleInHumanSpaceflight}
                </p>

                {/* Facilities List (Top 2) */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider font-semibold">
                    Key Facilities:
                  </span>
                  <ul className="space-y-1">
                    {agency.microgravityFacilities.slice(0, 2).map((fac, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-astro-cyan shrink-0">&bull;</span>
                        <span className="line-clamp-1">{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standard Badge */}
                {agency.flammabilityTestingStandard && (
                  <div className="text-[11px] text-slate-400 pt-1 font-mono">
                    Standard: <span className="text-white font-semibold">{agency.flammabilityTestingStandard.split(" ")[0]}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-space-850 flex items-center justify-between gap-2">
                <Link
                  href={`/agencies/${agency.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-ember-400 hover:text-ember-300 hover:underline"
                >
                  View Agency Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Filter Experiments Link */}
                <Link
                  href={`/experiments?agency=${agency.acronym}`}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-space-950 hover:bg-space-850 border border-space-800 transition-colors"
                >
                  <Flame className="w-3 h-3 text-ember-400" />
                  Filter Data
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ISS International Partnership Section */}
      <section className="space-y-4">
        <ISSPartnershipDiagram />
      </section>

      {/* Cross-Agency Standards Comparison Table */}
      <section className="space-y-4">
        <AgencyComparisonTable />
      </section>

      {/* Human Spaceflight Combustion Milestones Timeline */}
      <section className="space-y-4">
        <CombustionTimeline />
      </section>

      {/* Bottom Disclaimer Notice */}
      <div className="text-center text-xs text-slate-400 border-t border-space-850 pt-6">
        <p>
          Summaries are original and compiled for the NASA Space Apps Challenge FlameLens project.
          Consult official civil space agency repositories for certified engineering standards and operational flight rules.
        </p>
      </div>
    </div>
  );
}
