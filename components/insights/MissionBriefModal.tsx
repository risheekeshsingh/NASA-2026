"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  X,
  ShieldAlert,
  Flame,
  CheckCircle2,
  ExternalLink,
  LifeBuoy,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

export type MissionScenario = "ISS" | "Lunar habitat" | "Mars transit";

interface ScenarioDetails {
  name: string;
  tagline: string;
  o2Percent: number;
  pressureKPa: number;
  gravity: string;
  nominalAirflow: string;
  criticalMaterials: { name: string; risk: "Critical" | "High" | "Moderate"; notes: string }[];
  primaryHazards: string[];
  suppressionProtocol: string[];
  citedExperiments: { id: string; acronym: string; name: string }[];
}

const SCENARIOS: Record<MissionScenario, ScenarioDetails> = {
  ISS: {
    name: "International Space Station (LEO Pressurized Module)",
    tagline: "Earth-like normoxic atmosphere operating in continuous microgravity (0-g).",
    o2Percent: 21.0,
    pressureKPa: 101.3,
    gravity: "Microgravity (0-g)",
    nominalAirflow: "10 – 20 cm/s forced circulation",
    criticalMaterials: [
      { name: "PMMA / Cast Acrylic", risk: "Moderate", notes: "Passes NASA-STD-6001 Test 1 in 1-g; burns with hemispherical flame in 0-g draft." },
      { name: "Polyethylene Wire Jackets", risk: "High", notes: "Surface melt beads without gravity dripping; fire creeps along wire harnesses." },
      { name: "Untreated Cotton Fabrics", risk: "High", notes: "Sustains smoldering combustion that resists visual detection." },
    ],
    primaryHazards: [
      "Absence of buoyant smoke plume: Smoke fails to rise, dispersing randomly into HVAC return ducts.",
      "Ventilation-driven flame feeding: Airflow between 2–8 cm/s provides continuous oxidizer replenishment without convective cooling.",
      "Cool flame persistence: Hydrocarbon fuels can continue low-temperature (500–750 K) reactions invisibly after apparent optical flameout.",
    ],
    suppressionProtocol: [
      "Immediate automated shutdown of module inter-module ventilation (IMV) fans within 5 seconds of smoke alarm.",
      "Deploy portable fine water mist / nitrogen fire extinguisher directly to ignition source.",
      "Isolate module hatch and maintain minimum 20-minute inert gas soak before crew re-entry inspection.",
    ],
    citedExperiments: [
      { id: "bass-ii", acronym: "BASS-II", name: "Burning and Suppression of Solids - II" },
      { id: "flex-2", acronym: "FLEX-2", name: "Flame Extinguishment Experiment - 2" },
      { id: "acme-bre", acronym: "ACME-BRE", name: "Burning Rate Emulator" },
    ],
  },
  "Lunar habitat": {
    name: "Artemis Lunar Base Camp Surface Habitat",
    tagline: "Hypobaric elevated oxygen exploration atmosphere in lunar partial gravity (0.16-g).",
    o2Percent: 34.0,
    pressureKPa: 56.5,
    gravity: "Lunar Surface (0.16-g)",
    nominalAirflow: "5 – 12 cm/s habitat environmental control",
    criticalMaterials: [
      { name: "Nomex IIIA Flight Textiles", risk: "High", notes: "34% O2 exceeds Nomex LOI threshold (~29%); standard space suits can burn." },
      { name: "Delrin / Polyoxymethylene", risk: "Critical", notes: "Rapid decomposition releasing toxic formaldehyde gas; violent flame spread." },
      { name: "Cast Acrylic Windows / Hatches", risk: "Critical", notes: "Burns 3.2x faster than Earth baseline; rapid dripping melt formation." },
    ],
    primaryHazards: [
      "Elevated oxygen chemical acceleration: 34% O2 drastically lowers ignition energy and elevates peak flame temperature by ~400 K.",
      "Tilted lunar flame plumes: 0.16-g gravity tilts flame envelopes, preheating unburned material ahead of the fire front.",
      "Lunar regolith dust catalytic interaction: Highly abrasive surface dust degrades fire retardant polymer coatings.",
    ],
    suppressionProtocol: [
      "Immediate donning of emergency crew oxygen masks (independent of habitat atmosphere).",
      "Automated compartment depressurization to 28 kPa (4.0 psi) vacuum dump to starve open flaming.",
      "Secondary nitrogen deluge flood to extinguish deep smoldering pockets in habitat lockers.",
    ],
    citedExperiments: [
      { id: "saffire-iv", acronym: "SAFFIRE-IV", name: "Spacecraft Fire Experiment IV" },
      { id: "saffire-v", acronym: "SAFFIRE-V", name: "Spacecraft Fire Experiment V" },
      { id: "sofie-gel", acronym: "SoFIE-GEL", name: "Growth and Extinction Limit" },
    ],
  },
  "Mars transit": {
    name: "Deep Space Mars Transit Vehicle (Deep Space Habitat)",
    tagline: "Long-duration hypobaric transit atmosphere with zero external replenishment capability.",
    o2Percent: 28.0,
    pressureKPa: 70.3,
    gravity: "Microgravity Transit (0-g) / Mars Surface (0.38-g)",
    nominalAirflow: "3 – 8 cm/s transit cabin velocity",
    criticalMaterials: [
      { name: "SIBAL Cotton / Fiberglass Fabrics", risk: "High", notes: "Sustains steady creeping flame across large partition panels." },
      { name: "Silicone Gaskets & Potting", risk: "Moderate", notes: "Silica ash crust formation provides partial self-limiting barrier." },
      { name: "Polyimide / Kapton Wire Wraps", risk: "Moderate", notes: "Stable up to 400°C; hazardous under sustained high-power arc tracking." },
    ],
    primaryHazards: [
      "Irreplaceable cabin atmosphere: Vacuum venting causes permanent loss of life-support gas that cannot be resupplied.",
      "Long-duration smolder migration: Smoldering combustion can migrate through avionic wire bundles for hours undetected.",
      "Post-fire air revitalization load: Atmospheric scrubbers can be poisoned by hydrogen cyanide and carbon monoxide byproducts.",
    ],
    suppressionProtocol: [
      "Aspirated carbon monoxide sensor triggers automatic zonal airflow isolation.",
      "Localized nitrogen-carbon dioxide inert gas discharge into sealed avionics bays.",
      "Post-suppression scrub cycle utilizing dedicated catalytic smoke recovery filter cartridges.",
    ],
    citedExperiments: [
      { id: "saffire-i", acronym: "SAFFIRE-I", name: "Spacecraft Fire Experiment I" },
      { id: "sofie-mist", acronym: "SoFIE-MIST", name: "Material Ignition and Suppression Test" },
      { id: "flare", acronym: "FLARE", name: "Flammability Limit At Reduced-g Experiment" },
    ],
  },
};

interface MissionBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MissionBriefModal({ isOpen, onClose }: MissionBriefModalProps) {
  const { t, language } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState<MissionScenario>("Lunar habitat");

  if (!isOpen) return null;

  const data = SCENARIOS[selectedScenario];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="relative w-full max-w-4xl bg-space-950 border border-space-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Badge variant="ember">
              <ShieldAlert className="w-3.5 h-3.5" />
              Mission-Planning Document
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              FlameLens Decision-Support Brief
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ember" size="sm" onClick={handlePrint} className="text-xs">
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              {t.briefPrintButton}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xs text-slate-400 hover:text-white">
              <X className="w-4 h-4 mr-1" />
              {t.briefCloseButton}
            </Button>
          </div>
        </div>

        {/* Scenario Selection Tabs (Hidden when printing) */}
        <div className="space-y-1.5 print:hidden">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
            {t.briefScenarioLabel}:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(["Lunar habitat", "ISS", "Mars transit"] as MissionScenario[]).map((scen) => (
              <button
                key={scen}
                type="button"
                onClick={() => setSelectedScenario(scen)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                  selectedScenario === scen
                    ? "bg-space-800 border-ember-500 text-white ring-1 ring-ember-500/40"
                    : "bg-space-900/60 border-space-850 text-slate-300 hover:bg-space-850"
                }`}
              >
                <div className="font-bold font-display text-white text-xs">{scen}</div>
                <div className="text-[10px] text-slate-400 truncate">{SCENARIOS[scen].gravity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* PRINTABLE ONE-PAGE DOCUMENT SECTION */}
        <div className="space-y-5 print:space-y-4 print:text-black">
          {/* Document Header */}
          <div className="border-b border-space-800 print:border-black pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-ember-400 print:text-black font-bold">
                  FLAMELENS FIRE SAFETY INTELLIGENCE BRIEF
                </span>
                <span className="print:hidden text-slate-600">&bull;</span>
                <span className="text-[10px] font-mono text-slate-500 print:text-slate-700">
                  REF: FL-MSB-{selectedScenario.toUpperCase().replace(/\s+/g, "-")}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white print:text-black mt-1">
                {data.name}
              </h2>
              <p className="text-xs text-slate-300 print:text-slate-800 mt-0.5">
                {data.tagline}
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-400 print:text-slate-800 shrink-0">
              <div>STATUS: <strong className="text-emerald-400 print:text-black">VERIFIED HEURISTIC</strong></div>
              <div>DATE: {new Date().toISOString().split("T")[0]}</div>
            </div>
          </div>

          {/* Operational Atmosphere Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-space-900/80 print:bg-slate-100 border border-space-850 print:border-slate-300 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 print:text-slate-600 block">
                Oxygen Level
              </span>
              <span className="text-sm font-bold font-mono text-amber-400 print:text-black">
                {data.o2Percent}% O₂
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 print:text-slate-600 block">
                Total Pressure
              </span>
              <span className="text-sm font-bold font-mono text-astro-cyan print:text-black">
                {data.pressureKPa} kPa
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 print:text-slate-600 block">
                Gravity Environment
              </span>
              <span className="text-sm font-bold font-mono text-white print:text-black">
                {data.gravity}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 print:text-slate-600 block">
                Airflow Velocity
              </span>
              <span className="text-sm font-bold font-mono text-emerald-400 print:text-black">
                {data.nominalAirflow}
              </span>
            </div>
          </div>

          {/* Critical Materials Assessment */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ember-400 print:text-black flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> 1. Critical Materials Hazard Assessment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {data.criticalMaterials.map((mat) => (
                <div
                  key={mat.name}
                  className="p-3 rounded-lg bg-space-900/50 print:bg-slate-50 border border-space-850 print:border-slate-200 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white print:text-black text-xs">{mat.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        mat.risk === "Critical"
                          ? "bg-red-500/20 text-red-400 print:text-red-700"
                          : "bg-amber-500/20 text-amber-400 print:text-amber-700"
                      }`}
                    >
                      {mat.risk}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 print:text-slate-800 leading-snug">
                    {mat.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Hazards and Suppression Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Hazards */}
            <div className="space-y-1.5 p-3 rounded-xl bg-space-900/40 print:bg-slate-50 border border-space-850 print:border-slate-200">
              <h4 className="font-mono text-xs font-bold uppercase text-red-400 print:text-black flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> 2. Primary Combustion Hazards
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300 print:text-slate-800">
                {data.primaryHazards.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 print:text-black font-bold">&bull;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suppression Protocol */}
            <div className="space-y-1.5 p-3 rounded-xl bg-space-900/40 print:bg-slate-50 border border-space-850 print:border-slate-200">
              <h4 className="font-mono text-xs font-bold uppercase text-emerald-400 print:text-black flex items-center gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5" /> 3. Emergency Tactical Protocol
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-300 print:text-slate-800">
                {data.suppressionProtocol.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-black shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cited Evidence Experiments */}
          <div className="p-3 rounded-xl bg-space-950 print:bg-slate-100 border border-space-850 print:border-slate-300 text-xs space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 print:text-slate-700 block font-bold">
              Flight Telemetry References & Ground-Truth Experiments:
            </span>
            <div className="flex flex-wrap gap-2">
              {data.citedExperiments.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experiments/${exp.id}`}
                  className="px-2.5 py-1 rounded-lg bg-space-900 print:bg-white border border-space-800 print:border-slate-400 text-astro-cyan print:text-blue-800 text-xs font-mono flex items-center gap-1 hover:border-astro-cyan transition-colors"
                >
                  <span>[{exp.acronym}] {exp.name}</span>
                  <ExternalLink className="w-3 h-3 print:hidden" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mandatory Verification Disclaimer */}
          <div className="border-t border-space-800 print:border-black pt-3 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 print:text-slate-700 font-mono gap-1">
            <span>Decision-support heuristic produced for NASA Space Apps Challenge.</span>
            <span className="font-bold text-amber-400 print:text-black">
              Verify against the original source.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
