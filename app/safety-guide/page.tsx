import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Flame,
  Wind,
  Bell,
  Scale,
  Sparkles,
  Award,
  ArrowRight,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { SafetyAccordion } from "@/components/safety/SafetyAccordion";
import { EarthVsSpaceTable } from "@/components/safety/EarthVsSpaceTable";
import { FlameSimulator2D } from "@/components/safety/FlameSimulator2D";

export default function SafetyGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <ShieldCheck className="w-3.5 h-3.5" />
              Standard Operating Protocols & Science
            </Badge>
            <Badge variant="cyan" className="font-mono text-xs">
              NASA-STD-6001B Aligned
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Human Spaceflight Fire Safety Guide
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-3xl leading-relaxed">
            Essential operational doctrine, combustion physics, materials screening criteria, and emergency response protocols synthesized from six decades of microgravity flight research.
          </p>
        </div>

        {/* CTA to Learn / Quiz */}
        <div className="shrink-0">
          <Link href="/learn">
            <Button variant="ember" size="md" className="font-semibold shadow-ember-glow">
              <Award className="w-4 h-4 mr-2" />
              Take Fire Safety Quiz & Certify &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Section 1: Interactive Flame Simulator */}
      <section className="space-y-4">
        <FlameSimulator2D />
      </section>

      {/* Section 2: On Earth vs In Space Comparison Table */}
      <section className="space-y-4">
        <EarthVsSpaceTable />
      </section>

      {/* Section 3: In-Depth Safety Accordion */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-850 pb-3">
          <div>
            <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-ember-400" />
              Comprehensive Fire Safety Knowledge Domains
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Detailed technical breakdowns across seven operational and physical categories. Expand any section to inspect findings and citations.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            7 Interactive Sections
          </span>
        </div>

        <SafetyAccordion />
      </section>

      {/* Section 4: Bottom Callout Banner to /learn */}
      <section className="bg-gradient-to-r from-space-900 via-space-900 to-space-850 border border-space-800 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Award className="w-5 h-5 text-ember-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-ember-400 font-bold">
              Test Your Operational Readiness
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Ready for Flight Certification?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Take our 8-question microgravity fire safety assessment generated directly from NASA, ESA, Roscosmos, and JAXA flight datasets. Earn your official printable certification.
          </p>
        </div>

        <Link href="/learn" className="shrink-0">
          <Button variant="ember" size="lg" className="shadow-ember-glow font-bold text-sm">
            <span>Launch Learn Mode</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
