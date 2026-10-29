import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Flame,
  Orbit,
  Sparkles,
  Sliders,
  ShieldAlert,
  ArrowRight,
  Compass,
  Info,
  Scale,
  Activity,
  Layers,
} from "lucide-react";
import { FlameSim } from "@/components/sim/FlameSim";

export const metadata = {
  title: "Flame Lab 3D | Interactive Microgravity Combustion Simulation",
  description:
    "Interactive 3D simulation comparing spherical zero-g diffusion flames with lunar, martian, and terrestrial combustion plumes.",
};

export default function SimulationPage() {
  const regimes = [
    {
      name: "Orbital Microgravity (0-g)",
      gValue: "0.000001 g",
      color: "border-cyan-500/40 bg-space-900/80",
      accent: "text-astro-cyan",
      badgeVariant: "cyan" as const,
      flameShape: "Spherical, pale blue diffusion envelope with silent cool flame zone",
      physics:
        "Buoyancy is completely absent. Combustion gases do not rise; oxidizer transport occurs solely through molecular diffusion. Extinction occurs if forced draft drops to absolute zero.",
      flightExperiment: "FLEX-2 & Saffire-I",
      experimentHref: "/experiments/flex-2",
    },
    {
      name: "Lunar Surface (0.16-g)",
      gValue: "0.166 g",
      color: "border-amber-500/40 bg-space-900/80",
      accent: "text-amber-400",
      badgeVariant: "ember" as const,
      flameShape: "Broad dome with subdued thermal chimney draft",
      physics:
        "Weak buoyancy creates slow upward convective drafting. In Artemis habitat conditions (34% O2 at 56 kPa), the low draft accelerates solid polymer flame propagation by up to 62%.",
      flightExperiment: "SoFIE-GEL",
      experimentHref: "/experiments/sofie-gel",
    },
    {
      name: "Martian Surface (0.38-g)",
      gValue: "0.38 g",
      color: "border-red-500/40 bg-space-900/80",
      accent: "text-red-400",
      badgeVariant: "ember" as const,
      flameShape: "Transitional teardrop with moderate flicker and reduced soot trail",
      physics:
        "Intermediate gravity regime creates persistent chimney effects inside vertical avionic conduits while failing to disperse dense smolder particulates toward ceiling sensors.",
      flightExperiment: "Saffire-IV Exploration",
      experimentHref: "/experiments/saffire-iv",
    },
    {
      name: "Terrestrial Baseline (1.0-g)",
      gValue: "1.00 g",
      color: "border-emerald-500/40 bg-space-900/80",
      accent: "text-emerald-400",
      badgeVariant: "success" as const,
      flameShape: "Classic tall teardrop with bright yellow incandescent soot emission",
      physics:
        "Strong buoyancy causes hot gases to rise at ~2.5 m/s, continuously sucking fresh air into the flame base and producing rapid upward flickers at 10–15 Hz.",
      flightExperiment: "WSTF Ground Baseline",
      experimentHref: "/experiments/bass-ii",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="ember">
              <Flame className="w-3.5 h-3.5" />
              Flame Lab 3D
            </Badge>
            <Badge variant="cyan" className="font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Physical Science Engine
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Microgravity &amp; Planetary Gravity Simulation
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Directly manipulate and observe how vanishing gravitational buoyancy transforms tall incandescent terrestrial flames into silent, spherical cool flame halos. Orbit the model, toggle between four planetary gravitational regimes, and tap factual telemetry hotspots.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <Link href="/advisor">
            <Button variant="secondary" size="md" className="gap-2 text-xs">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Habitat Advisor
            </Button>
          </Link>
          <Link href="/experiments">
            <Button variant="primary" size="md" className="gap-2 text-xs">
              <Orbit className="w-4 h-4" />
              Flight Datasets
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Primary 3D Simulation Canvas Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-astro-cyan" />
            3D WebGL Canvas &bull; Drei OrbitControls &bull; Procedural Shaders
          </span>
          <span className="text-amber-400/90 text-[11px]">
            * Educational illustration &bull; Not a CFD numerical grid
          </span>
        </div>

        {/* 3D Component with Scroll-Hijack Fix */}
        <FlameSim />
      </section>

      {/* 3. Regime Comparison Matrix */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono text-astro-cyan uppercase tracking-wider block">
            Comparative Combustion Kinetics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Gravitational Regime Physics Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Key physical mechanisms, flame envelopes, and flight research citations across gravitational environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {regimes.map((item) => (
            <Card
              key={item.name}
              className={`p-5 rounded-2xl border ${item.color} flex flex-col justify-between space-y-4 shadow-xl`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={item.badgeVariant} size="sm">
                    {item.gValue}
                  </Badge>
                  <span className={`text-xs font-mono font-bold ${item.accent}`}>
                    Verified
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-white">
                  {item.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="bg-space-950/70 p-2.5 rounded-lg border border-space-850">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">
                      Envelope Morphology
                    </span>
                    <p className="text-[11px] leading-relaxed text-slate-200">
                      {item.flameShape}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                    {item.physics}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-space-850 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[10px] font-mono">
                  Cited: {item.flightExperiment}
                </span>
                <Link
                  href={item.experimentHref}
                  className={`${item.accent} hover:underline font-semibold inline-flex items-center gap-1`}
                >
                  Inspect <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Action Hub Banner */}
      <section className="bg-gradient-to-r from-space-900 via-space-900 to-space-850 border border-space-800 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Scale className="w-5 h-5 text-ember-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-ember-400 font-bold">
              Predictive Safety Model
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Evaluate Cabin Fire Risk in Partial Gravity
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Test candidate habitat atmospheres (e.g., Artemis 34% O2 at 8.2 psia) in our interactive Safety Advisor to calculate flame propagation acceleration and astronaut egress windows.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/advisor">
            <Button variant="primary" size="lg" className="shadow-ember-glow font-bold text-sm">
              Launch Advisor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
