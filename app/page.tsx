import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Flame,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  ThermometerSnowflake,
  Wind,
  Orbit,
  Compass,
  Rocket,
  Building,
  UserCheck,
  GraduationCap,
  Scale,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { FlameComparisonVisual } from "@/components/FlameComparisonVisual";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LivePlanetaryDistances } from "@/components/LivePlanetaryDistances";
import { HeroFlameIssWrapper } from "@/components/flame3d/HeroFlameIssWrapper";

export default function HomePage() {
  // Dynamically compute stats from dataset
  const totalExperiments = EXPERIMENTS.length;
  const distinctAgencies = new Set(EXPERIMENTS.map((e) => e.agency)).size;
  const distinctPlatforms = new Set(EXPERIMENTS.map((e) => e.platform)).size;

  const minYear = Math.min(...EXPERIMENTS.map((e) => e.yearStart));
  const maxYear = Math.max(...EXPERIMENTS.map((e) => e.yearEnd || e.yearStart));
  const yearsCovered = maxYear - minYear + 1;

  // Top 3 featured insights from rankings (e.g. Artemis 34% O2, FLEX cool flames, Saffire-IV exploration atmosphere)
  const topInsights = [
    {
      acronym: "SoFIE-GEL",
      title: "Artemis 34% O₂ Flammability Acceleration",
      finding:
        "The proposed Artemis lunar habitat atmosphere (34% O₂ at 8.2 psia) accelerates flame propagation across thick polymers by up to 62% despite hypobaric conditions.",
      hazard: "Elevated oxygen drastically lowers ignition delays and mass-loss resistance.",
      href: "/experiments",
      badge: "Artemis Baseline",
    },
    {
      acronym: "FLEX-2",
      title: "Invisible Cool Flame Reignitions",
      finding:
        "Isolated fuel droplets maintain silent chemical reactions at 600 K after apparent visual flame extinction, completely invisible to the human crew.",
      hazard: "Dual-band thermal LWIR sensors are mandatory to avoid premature ventilation restarts.",
      href: "/experiments",
      badge: "Cool Flames",
    },
    {
      acronym: "BASS-II",
      title: "The Low-Speed Airflow Smoldering Peak",
      finding:
        "Materials rated non-flammable in terrestrial 1-g tests sustain steady combustion when subjected to faint cabin HVAC airflows between 1.0 and 5.0 cm/s.",
      hazard: "Habitat HVAC fan dampening must occur immediately to halt convective oxygen feeding.",
      href: "/experiments",
      badge: "HVAC Velocity",
    },
  ];

  const missionStrips = [
    {
      name: "International Space Station",
      tagline: "Low Earth Orbit (0-g Baseline)",
      detail:
        "Host to the Combustion Integrated Rack (CIR) and Microgravity Science Glovebox (MSG), generating foundational zero-g data from ACME, FLEX, and BASS.",
      color: "border-astro-cyan/40 bg-space-900/60",
      accent: "text-astro-cyan",
    },
    {
      name: "Artemis & Moon Base Camp",
      tagline: "Lunar Surface (0.16-g Partial Gravity)",
      detail:
        "8.2 psia cabin with 34% O₂ designed for rapid EVA spacewalks. SoFIE experiments model the heightened flammability of habitats in partial lunar gravity.",
      color: "border-ember-500/40 bg-space-900/60",
      accent: "text-ember-400",
    },
    {
      name: "Mars Transit & Surface",
      tagline: "Deep Space 0-g & 0.38-g Martian Gravity",
      detail:
        "Multi-month transit vehicles evaluated through Saffire uncrewed spacecraft fires. Martian gravity creates hybrid chimney updrafts in electronics conduits.",
      color: "border-red-500/40 bg-space-900/60",
      accent: "text-red-400",
    },
    {
      name: "Lunar Gateway",
      tagline: "Near-Rectilinear Halo Orbit (NRHO)",
      detail:
        "Uncrewed for extended intervals between crew deployments; requires autonomous fire detection, automated nitrogen flooding, and post-fire toxic scrubbing.",
      color: "border-amber-500/40 bg-space-900/60",
      accent: "text-amber-400",
    },
    {
      name: "Tiangong Space Station",
      tagline: "Mengtian Module Combustion Cabinet (CEC)",
      detail:
        "Orbital laboratory supporting multi-national spherical droplet combustion, laser diagnostic absorption spectroscopy, and low-speed soot radiation studies.",
      color: "border-purple-500/40 bg-space-900/60",
      accent: "text-purple-400",
    },
  ];

  const userPersonas = [
    {
      role: "Mission Planners",
      icon: Compass,
      description: "Define atmospheric composition (O₂ percentage, pressure), size nitrogen reservoirs, and calculate astronaut egress time margins.",
      actionLabel: "Assess Habitat Atmosphere",
      href: "/advisor",
    },
    {
      role: "Habitat & Spacecraft Designers",
      icon: Building,
      description: "Screen cabin materials against NASA-STD-6001, configure ventilation duct baffling, and position dual-spectrum thermal sensors.",
      actionLabel: "Check Material Rankings",
      href: "/rankings",
    },
    {
      role: "Astronauts & Flight Crews",
      icon: UserCheck,
      description: "Understand non-intuitive zero-g fire behaviors—such as spherical smoke dissemination and invisible cool flames—before orbital missions.",
      actionLabel: "Read Safety Protocols",
      href: "/safety-guide",
    },
    {
      role: "Students & Researchers",
      icon: GraduationCap,
      description: "Inspect open-access normalized data from 20+ flight experiments and test gravity-dependent combustion in the 3D chamber simulator.",
      actionLabel: "Launch 3D Simulator",
      href: "/simulator",
    },
  ];

  return (
    <div className="w-full space-y-16 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-space-800 bg-gradient-to-b from-space-950 via-space-900 to-space-950 pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Ambient atmospheric glow */}
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-ember-600/15 via-flame-glow/20 to-astro-cyan/15 blur-3xl pointer-events-none rounded-full"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1]">
                Fire behaves differently in space. <br />
                <span className="text-ember-400">
                  Understand it.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                In freefall, hot air doesn&apos;t rise. Buoyancy vanishes, flames burn as quiet, invisible spheres, and faint air currents sustain hidden smoldering.
                FlameLens translates decades of orbital combustion research into predictive fire safety intelligence for Moon and Mars exploration.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/experiments" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <Flame className="w-5 h-5" />
                    Explore Experiments
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/rankings" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                    <ShieldAlert className="w-5 h-5 text-ember-400" />
                    See Fire-Risk Rankings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Scene */}
            <div className="lg:col-span-5 h-[380px] sm:h-[440px] w-full shadow-2xl">
              <HeroFlameIssWrapper />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Animated Stat Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedCounter
            value={totalExperiments}
            label="Flight Experiments"
            description="Normalized microgravity combustion datasets"
          />
          <AnimatedCounter
            value={distinctAgencies}
            label="Space Agencies"
            description="International civilian programs contributing data"
          />
          <AnimatedCounter
            value={distinctPlatforms}
            label="Research Platforms"
            description="ISS, Cygnus, Tiangong, Drop Towers, Parabolic"
          />
          <AnimatedCounter
            value={yearsCovered}
            suffix="+"
            label="Years of Data"
            description={`Flight campaigns from ${minYear} through ${maxYear}`}
          />
        </div>
      </section>

      {/* Live Planetary Distance From Earth Right Now (NASA JPL Ephemeris) */}
      <LivePlanetaryDistances />

      {/* 3. Why flames are different in microgravity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="cyan">Zero-G Combustion Physics</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Why Flames are Radically Different in Microgravity
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Terrestrial intuition fails in orbit. Without gravitational buoyancy, convective currents cease to feed the flame base, fundamentally transforming flame chemistry and hazard profiles.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card glow="cyan" className="border-space-800 bg-space-900/80 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-astro-cyan">01 / GEOMETRY</span>
            <h3 className="text-base font-bold font-display text-white">Spherical Diffusion Flames</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Without gravity, hot air has no buoyancy to rise. Flames expand as perfectly round, calm glowing spheres fed solely by molecular diffusion.
            </p>
          </Card>

          <Card className="border-space-800 bg-space-900/80 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400">02 / FLUID DYNAMICS</span>
            <h3 className="text-base font-bold font-display text-white">Zero Buoyant Convection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Smoke does not drift upward toward ceiling detectors. Particulates stay suspended or follow cabin air conditioning currents, delaying optical detection.
            </p>
          </Card>

          <Card glow="ember" className="border-space-800 bg-space-900/80 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-ember-400">03 / VELOCITY RISK</span>
            <h3 className="text-base font-bold font-display text-white">Low-Speed Flammability Peak</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              BASS-II proved that faint drafts (1 to 5 cm/s) provide the worst-case burning condition: sufficient oxygen to feed the fire without cooling the smolder zone.
            </p>
          </Card>

          <Card glow="ember" className="border-space-800 bg-space-900/80 p-5 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400">04 / INVISIBLE THREAT</span>
            <h3 className="text-base font-bold font-display text-white">Silent &apos;Cool Flames&apos;</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              FLEX discovered quasi-steady reactions continuing at ~600 K after apparent visible extinction, creating severe flash reignition risks if air is restarted.
            </p>
          </Card>
        </div>

        {/* Side-by-Side SVG Illustration */}
        <div className="pt-4">
          <FlameComparisonVisual />
        </div>
      </section>

      {/* 4. Mission Relevance Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-mono text-astro-cyan uppercase tracking-wider block">
            Space Exploration Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Mission Relevance Across Modern Space Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {missionStrips.map((mission) => (
            <div
              key={mission.name}
              className={`p-5 rounded-xl border ${mission.color} space-y-2 flex flex-col justify-between`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${mission.accent}`}>
                  {mission.tagline}
                </span>
                <h3 className="text-base font-bold font-display text-white">{mission.name}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                {mission.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Findings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            Featured Findings
          </h2>
        </div>

        {/* Top 3 Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topInsights.map((insight) => (
            <Card
              key={insight.acronym}
              glow="ember"
              className="border-space-800 bg-space-900/80 p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-ember-400">{insight.acronym}</span>
                  <Badge variant="ember" size="sm">
                    {insight.badge}
                  </Badge>
                </div>
                <h3 className="text-base font-bold font-display text-white leading-snug">
                  {insight.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-space-950/60 p-3 rounded-lg border border-space-850">
                  {insight.finding}
                </p>
              </div>

              <div className="pt-2 border-t border-space-850 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] font-mono">Safety Countermeasure Ready</span>
                <Link
                  href={insight.href}
                  className="text-ember-400 hover:text-ember-300 inline-flex items-center gap-1 font-semibold"
                >
                  Inspect <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Quick-Start for Each User Type */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="cyan">Tailored Operational Workflows</Badge>
          <h2 className="text-3xl font-bold font-display text-white">
            Quick-Start Guidance by Role
          </h2>
          <p className="text-sm text-slate-400">
            Engineered specifically for engineers, astronauts, mission directors, and university researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userPersonas.map((persona) => {
            const Icon = persona.icon;
            return (
              <Card
                key={persona.role}
                className="border-space-800 bg-space-900/80 p-6 flex flex-col justify-between space-y-4 hover:border-space-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-space-800 border border-space-700 flex items-center justify-center text-ember-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-display text-white">{persona.role}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {persona.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-space-850">
                  <Link href={persona.href}>
                    <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs py-1.5">
                      <span>{persona.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
