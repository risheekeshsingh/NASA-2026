"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  ShieldAlert,
  Flame,
  Wind,
  Gauge,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Send,
} from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { AdvisorAssessment } from "@/app/api/advisor/route";

// Strict dynamic import with ssr: false for Leaflet map component
const FacilityMap = dynamic(() => import("@/components/map/FacilityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-space-950 rounded-2xl border border-space-800">
      <div className="text-center space-y-2">
        <Skeleton className="w-16 h-16 rounded-full mx-auto" />
        <p className="text-xs font-mono text-slate-400">Loading Microgravity Facility Cartography...</p>
      </div>
    </div>
  ),
});

export default function AdvisorPage() {
  const [mission, setMission] = useState("Artemis Lunar Base");
  const [oxygen, setOxygen] = useState(34);
  const [pressure, setPressure] = useState(8.2);
  const [airflow, setAirflow] = useState(3);
  const [material, setMaterial] = useState("Nomex-Cotton");
  const [isLoading, setIsLoading] = useState(false);

  // Initial assessment state
  const [assessment, setAssessment] = useState<AdvisorAssessment>({
    riskScore: 85,
    riskLevel: "CRITICAL",
    criticalHazards: [
      "Elevated O2 concentration (34%) increases flame spread rate by up to 2.4x.",
      "Low convective velocity (3 cm/s) matches the persistent smolder regime identified in BASS-II.",
      "Absence of natural buoyancy suppresses upward plume formation; smoke will follow AC duct pathways.",
    ],
    suppressionProtocol:
      "Depressurize habitat compartment to 5.0 psi and inject inert N2 flood. Water mist is ineffective against cool flame persistence.",
    detectionRecommendation:
      "Multi-spectrum LWIR thermal sensor arrays paired with laser obscuration particle counters placed directly in duct return grills.",
    egressWindowSec: 45,
    nasaStandardCompliance:
      "NASA-STD-6001 Test 1 (Upward Flame Propagation) fails for standard terrestrial materials under these atmospheric conditions.",
    isFallback: true,
    source: "FlameLens Deterministic NASA-STD-6001 Safety Model",
  });

  async function handleEvaluate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetMission: mission,
          oxygenPercent: oxygen,
          cabinPressurePsi: pressure,
          ventilationVelocityCmS: airflow,
          primaryMaterial: material,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.assessment) {
          setAssessment(json.assessment);
        }
      }
    } catch {
      // Non-blocking fallback
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ember">
              <ShieldAlert className="w-3.5 h-3.5" />
              Mission Safety Protocol
            </Badge>
            {assessment.isFallback && <SampleDataBadge />}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            AI Habitat Fire Safety Advisor
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Simulate and assess spacecraft atmosphere parameters against NASA-STD-6001 flammability data to evaluate crew egress windows and suppression strategies.
          </p>
        </div>
      </div>

      {/* Main Grid: Parameters vs Safety Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Parameter Configuration Form */}
        <div className="lg:col-span-5">
          <Card className="border-space-800 bg-space-900/80">
            <CardHeader className="pb-4 border-b border-space-800">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Gauge className="w-5 h-5 text-ember-400" />
                Habitat Environmental Specs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleEvaluate} className="space-y-5">
                {/* Mission Selection */}
                <div>
                  <label htmlFor="mission-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Target Spacecraft / Architecture
                  </label>
                  <select
                    id="mission-select"
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    className="w-full bg-space-950 border border-space-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-ember-500"
                  >
                    <option value="Artemis Lunar Base">Artemis Lunar Base (Surface Habitat)</option>
                    <option value="Gateway Space Station">Lunar Gateway (Orbital Station)</option>
                    <option value="Mars Transit Vehicle">Mars Transit Vehicle (Deep Space 0-g)</option>
                    <option value="LEO Commercial Station">Commercial LEO Freefall Station</option>
                  </select>
                </div>

                {/* Oxygen Level */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="oxygen-input" className="font-semibold uppercase tracking-wider text-slate-300">
                      Oxygen Concentration
                    </label>
                    <span className="font-mono font-bold text-ember-400">{oxygen}% O₂</span>
                  </div>
                  <input
                    id="oxygen-input"
                    type="range"
                    min={18}
                    max={36}
                    step={1}
                    value={oxygen}
                    onChange={(e) => setOxygen(Number(e.target.value))}
                    className="w-full accent-ember-500 bg-space-950 cursor-pointer h-2 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>21% (Earth / ISS)</span>
                    <span className="text-ember-400">34% (Artemis Camp)</span>
                  </div>
                </div>

                {/* Atmospheric Pressure */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="pressure-input" className="font-semibold uppercase tracking-wider text-slate-300">
                      Cabin Pressure
                    </label>
                    <span className="font-mono font-bold text-astro-cyan">{pressure} psia</span>
                  </div>
                  <input
                    id="pressure-input"
                    type="range"
                    min={5.0}
                    max={15.0}
                    step={0.2}
                    value={pressure}
                    onChange={(e) => setPressure(Number(e.target.value))}
                    className="w-full accent-astro-cyan bg-space-950 cursor-pointer h-2 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>8.2 psia (Artemis)</span>
                    <span>14.7 psia (Standard 1 atm)</span>
                  </div>
                </div>

                {/* Airflow Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label htmlFor="airflow-input" className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5" />
                      Cabin HVAC Flow Rate
                    </label>
                    <span className="font-mono font-bold text-amber-400">{airflow} cm/s</span>
                  </div>
                  <input
                    id="airflow-input"
                    type="range"
                    min={0.5}
                    max={15.0}
                    step={0.5}
                    value={airflow}
                    onChange={(e) => setAirflow(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-space-950 cursor-pointer h-2 rounded-lg"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    BASS-II showed 1-5 cm/s is the peak smoldering combustion persistence danger zone.
                  </span>
                </div>

                {/* Primary Material */}
                <div>
                  <label htmlFor="material-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Structural / Crew Fabric Material
                  </label>
                  <select
                    id="material-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-space-950 border border-space-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-ember-500"
                  >
                    <option value="Nomex-Cotton">Nomex / Cotton Blend (Crew Garments)</option>
                    <option value="PMMA Acrylate">PMMA / Acrylic (Windows & Panels)</option>
                    <option value="Polyimide / Kapton">Kapton / Polyimide (Avionics Insulation)</option>
                    <option value="Delrin">Delrin / POM (Mechanical Hardware)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  Evaluate Mission Risk Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Safety Assessment Intelligence */}
        <div className="lg:col-span-7 space-y-6">
          <Card glow={assessment.riskScore > 75 ? "ember" : "cyan"} className="border-space-800 bg-space-900/80">
            <CardHeader className="pb-3 border-b border-space-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-slate-400">Risk Assessment Report</span>
                  <CardTitle className="text-xl text-white mt-0.5">
                    Safety Integrity Index: {assessment.riskLevel}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div
                    className={`text-4xl font-extrabold font-mono ${
                      assessment.riskScore > 75
                        ? "text-red-400"
                        : assessment.riskScore > 50
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {assessment.riskScore}
                    <span className="text-base text-slate-500 font-normal">/100</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-4">
              {/* Critical Hazards List */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  Active Microgravity Hazards
                </h4>
                <ul className="space-y-2">
                  {assessment.criticalHazards.map((hazard, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-300 bg-space-950/70 p-2.5 rounded-lg border border-space-850 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ember-500 mt-1.5 shrink-0" />
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suppression & Mitigation Strategy */}
              <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-astro-cyan font-mono flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Recommended Fire Suppression Action
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {assessment.suppressionProtocol}
                </p>
              </div>

              {/* Detection Sensor Specs */}
              <div className="p-4 rounded-xl bg-space-950/80 border border-space-850 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Sensor Placement Strategy
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {assessment.detectionRecommendation}
                </p>
              </div>

              {/* Egress Time and NASA Standard */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-space-800">
                <div className="p-2.5 rounded-lg bg-space-900 border border-space-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Astronaut Egress Window</span>
                  <span className="text-base font-bold text-white font-mono">{assessment.egressWindowSec} seconds</span>
                </div>
                <div className="p-2.5 rounded-lg bg-space-900 border border-space-800">
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Standard Verification</span>
                  <span className="text-xs text-slate-300 line-clamp-2 mt-0.5">{assessment.nasaStandardCompliance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Microgravity Facilities & Drop Towers Map (Leaflet Integration) */}
      <section className="space-y-4 pt-6 border-t border-space-850">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-astro-cyan font-mono uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Physical Validation Network
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              NASA Microgravity Drop Towers &amp; Test Facilities
            </h2>
            <p className="text-xs text-slate-400">
              Interactive Leaflet GIS mapping NASA Glenn Zero-G Facility, 2.2s Drop Tower, White Sands, and ISS MCC.
            </p>
          </div>
          <Badge variant="cyan">Zero-G Drop Chambers</Badge>
        </div>

        <FacilityMap />
      </section>
    </div>
  );
}
