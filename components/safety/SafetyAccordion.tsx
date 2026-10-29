"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronDown,
  Flame,
  Zap,
  Layers,
  Wind,
  Bell,
  ShieldAlert,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

interface AccordionSection {
  id: string;
  number: string;
  title: string;
  iconName: "flame" | "zap" | "layers" | "wind" | "bell" | "shield" | "alert";
  summary: string;
  badge: string;
  content: {
    keyConcepts: Array<{
      title: string;
      body: string;
      experimentId?: string;
      experimentAcronym?: string;
    }>;
    checklistOrRules?: string[];
  };
}

const ACCORDION_SECTIONS: AccordionSection[] = [
  {
    id: "differs-in-space",
    number: "01",
    title: "How Fire Differs in Space",
    iconName: "flame",
    summary:
      "Without gravity-induced buoyant convection, flames lose their familiar upright shape, burning as dim spherical envelopes with unexpected flammability peaks and non-luminous cool flame regimes.",
    badge: "Fundamental Physics",
    content: {
      keyConcepts: [
        {
          title: "Absence of Natural Buoyancy",
          body: "On Earth, heated gas expands and rises due to density differences (natural convection), dragging fresh oxidizer into the flame base. In orbital zero-g, buoyancy is absent; transport is governed purely by molecular diffusion and forced vehicle air ventilation.",
          experimentId: "sibal-zgf",
          experimentAcronym: "SIBAL-ZGF",
        },
        {
          title: "Spherical Diffusion Flames",
          body: "Without an upward buoyant draft, fuel vapors and oxygen diffuse isotropically in all directions. Isolated droplets and stationary ignition points form glowing spherical flame halos rather than elongated teardrops.",
          experimentId: "flex-2",
          experimentAcronym: "FLEX-2",
        },
        {
          title: "Low-Airspeed Flammability Peak",
          body: "Counter-intuitively, materials burn faster in gentle forced airflows (5–15 cm/s) than in quiescent microgravity. The slow breeze continuously replenishes oxygen to the reaction front without moving fast enough to carry away heat.",
          experimentId: "bass-ii",
          experimentAcronym: "BASS-II",
        },
        {
          title: "Non-Luminous 'Cool Flames'",
          body: "Microgravity enables liquid hydrocarbon fuels to enter a quasi-steady low-temperature (600–800 K) chemical oxidation wave after hot flame extinction. Emitting almost no visible light, these cool flames pose severe invisible reignition hazards.",
          experimentId: "flex-2",
          experimentAcronym: "FLEX-2",
        },
      ],
      checklistOrRules: [
        "Never assume an extinguished flame is cold; inspect with LWIR thermal imaging.",
        "Emergency ventilation shutdown is the primary immediate operational action upon fire confirmation.",
      ],
    },
  },
  {
    id: "ignition-sources",
    number: "02",
    title: "Ignition Sources in Spacecraft",
    iconName: "zap",
    summary:
      "Enclosed spacecraft pack dense electrical systems, pressurized oxygen generation lines, and high-energy experiments within sealed pressurized cabins.",
    badge: "Hazard Prevention",
    content: {
      keyConcepts: [
        {
          title: "Electrical Wire Harness Faults & Arcing",
          body: "Overloaded wiring harnesses or damaged ETFE insulation can produce sustained electrical arcs. Under low convective flow, heated wires ignite the polymer coating, spreading flames along wire bundles behind avionics panels.",
          experimentId: "scem-jaxa",
          experimentAcronym: "SCEM-JAXA",
        },
        {
          title: "Chemical Oxygen Generators (SFOG / 'Vika')",
          body: "Solid-fuel oxygen candles generate breathable O2 via the thermal decomposition of sodium chlorate. The 1997 Mir fire occurred when a candle ruptured and ignited an open torch flame in microgravity.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "High-Energy Experiment Furnaces",
          body: "Orbital materials science racks contain high-temperature vacuum and sealed furnaces. Loss of thermal insulation containment can expose surrounding cabin hardware to ignition temperatures.",
          experimentId: "acme-bre",
          experimentAcronym: "ACME-BRE",
        },
      ],
      checklistOrRules: [
        "De-energize affected electrical equipment racks immediately upon alarm trigger.",
        "Enforce strict thermal derating on all internal wiring and connectors per NASA-STD-4003.",
      ],
    },
  },
  {
    id: "materials-screening",
    number: "03",
    title: "Spacecraft Materials & Selection",
    iconName: "layers",
    summary:
      "All non-metallic flight hardware must pass rigorous flammability and toxic offgassing qualification under NASA-STD-6001B or partner equivalents.",
    badge: "Material Standards",
    content: {
      keyConcepts: [
        {
          title: "Solid Polymers (PMMA, Delrin, Polycarbonate)",
          body: "Polymers like polymethyl methacrylate (PMMA) burn vigorously in space under forced ventilation, generating dense sooty particulates and flammable pyrolysis gases that sustain long-duration upstream spread.",
          experimentId: "saffire-iv",
          experimentAcronym: "Saffire-IV",
        },
        {
          title: "Fabrics & Cotton-Fiberglass Blends (SIBAL)",
          body: "SIBAL fabric (75% cotton / 25% fiberglass) is the international flight benchmark material. Flight tests in Saffire showed large-scale fabric sheets (0.4 × 1.0 m) burn continuously in microgravity.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "Flame-Retardant Nomex & Silicones",
          body: "Aramid fabrics like Nomex exhibit superior self-extinguishing behavior at 21% O2 but can sustain combustion when exposed to elevated oxygen or high preheating fluxes.",
          experimentId: "saffire-ii",
          experimentAcronym: "Saffire-II",
        },
      ],
      checklistOrRules: [
        "Every polymer part must possess certified NASA-STD-6001B Test 1 qualification records.",
        "Minimize use of continuous surface combustible paths across rack interfaces.",
      ],
    },
  },
  {
    id: "atmosphere-choices",
    number: "04",
    title: "Atmosphere Choices: Moon & Mars Habitats",
    iconName: "wind",
    summary:
      "Deep space habitats balance crew physiological oxygen requirements against fire-safety limits through hypobaric, oxygen-enriched operational atmospheres.",
    badge: "Artemis Architecture",
    content: {
      keyConcepts: [
        {
          title: "Standard Sea-Level Air (ISS Baseline)",
          body: "The ISS operates at 101.3 kPa (14.7 psia) with 21% O2. While familiar, this requires lengthy 2–4 hour pre-breathe nitrogen purge protocols before astronauts can don low-pressure spacesuits (4.3 psi) for spacewalks.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "Artemis Lunar Exploration Atmosphere (56.5 kPa / 34% O₂)",
          body: "Proposed lunar surface habitats operate at 8.2 psia (56.5 kPa) with 34% O2. This maintains identical alveolar oxygen partial pressure (~21 kPa) while enabling direct EVA egress without decompression sickness.",
          experimentId: "sofie-gel",
          experimentAcronym: "SoFIE",
        },
        {
          title: "Elevated Oxygen Flammability Impact",
          body: "At 34% O2, the chemical reaction kinetics of ignition accelerate drastically. Materials certified as self-extinguishing in standard 21% air can ignite easily and burn with higher heat release rates.",
          experimentId: "saffire-iii",
          experimentAcronym: "Saffire-III",
        },
      ],
      checklistOrRules: [
        "Re-qualify all interior habitat materials at 34% O2 and 56.5 kPa prior to flight manifest.",
        "Design cabin pressure relief valves to support rapid partial depressurization extinction.",
      ],
    },
  },
  {
    id: "fire-detection",
    number: "05",
    title: "In-Flight Fire Detection Systems",
    iconName: "bell",
    summary:
      "Because zero-g smoke does not rise to ceiling detectors, detection architectures rely on forced-air return duct sampling, multi-wavelength optics, and infrared thermal imaging.",
    badge: "Early Warning",
    content: {
      keyConcepts: [
        {
          title: "Return Air Duct Particulate Sensors",
          body: "Smoke particles generated in microgravity remain localized until swept into cabin ventilation loops. Optical obscuration and ionization sensors placed inside air return ducts detect early smoldering aerosols.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "Thermal Infrared Cameras for Cool Flames",
          body: "Cool flames emit almost no visible wavelength light. Long-wave infrared (LWIR) sensors scanning behind equipment panels identify localized 600–800 K thermal hotspots before visible ignition occurs.",
          experimentId: "flex-2",
          experimentAcronym: "FLEX-2",
        },
        {
          title: "Chemical Gas Sniffers (CO and Acid Gases)",
          body: "Electrochemical sensor arrays track trace concentrations of carbon monoxide (CO), hydrogen cyanide (HCN), and hydrochloric acid (HCl) to identify smoldering wire insulation prior to open flaming.",
          experimentId: "scem-jaxa",
          experimentAcronym: "SCEM-JAXA",
        },
      ],
      checklistOrRules: [
        "Pair optical smoke detectors with real-time carbon monoxide gas analysis to eliminate false alarms.",
        "Equip astronaut inspection teams with handheld thermal imaging cameras (TIC).",
      ],
    },
  },
  {
    id: "fire-suppression",
    number: "06",
    title: "Suppression Methods & Extinguishing Agents",
    iconName: "shield",
    summary:
      "Fire suppression in enclosed spacecraft must extinguish the combustion core without suffocating the crew or creating toxic, unscrubbable aerosol residues.",
    badge: "Active Mitigation",
    content: {
      keyConcepts: [
        {
          title: "Portable Fine Water Mist Extinguishers (PFE)",
          body: "NASA's primary fire extinguisher on the ISS US segment uses deionized water pressurized with nitrogen to spray a microscopic mist (30–50 µm droplets). The droplets flash-evaporate, absorbing massive thermal energy while expanding to displace oxygen without toxic residue.",
          experimentId: "sofie-mist",
          experimentAcronym: "SoFIE-MIST",
        },
        {
          title: "Carbon Dioxide (CO₂) Fixed & Portable Units",
          body: "CO2 displaces oxygen around localized avionics fires. However, in closed cabins with limited life support scrubbing capacity, discharging CO2 risks raising cabin CO2 to asphyxiation thresholds, requiring emergency mask use.",
          experimentId: "acme-cld",
          experimentAcronym: "ACME-CLD",
        },
        {
          title: "Russian Segment Aqueous Potassium Foam (OKR-1)",
          body: "The Russian Orbital Segment deploys specialized water-potassium foam extinguishers engineered to adhere to zero-g surfaces, cooling molten metal without splattering conductive liquid droplets throughout the module.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "Depressurization to Extinction",
          body: "In uncrewed cargo vehicles or isolated compartments, venting cabin pressure below 5 kPa rapidly quenches flames by removing oxygen mass flux, as validated in Saffire depressurization experiments.",
          experimentId: "saffire-v",
          experimentAcronym: "Saffire-V",
        },
      ],
      checklistOrRules: [
        "Never discharge chemical Halon in an unvented spacecraft cabin.",
        "Ensure fine water mist is directed directly into equipment rack access ports.",
      ],
    },
  },
  {
    id: "emergency-response",
    number: "07",
    title: "Emergency Response Doctrine & Protocol",
    iconName: "alert",
    summary:
      "Space station fire emergencies follow a strict, standardized three-phase doctrine: Verify Alarm, Isolate & Protect, and Attack & Scrub.",
    badge: "Crew Protocols",
    content: {
      keyConcepts: [
        {
          title: "Phase 1: Alarm Verification & Immediate Mask Donning",
          body: "Upon fire klaxon, all crew members immediately don emergency Personal Breathing Apparatus (PBA) or Russian IP-50 masks to protect against rapid hydrogen cyanide (HCN) and carbon monoxide (CO) inhalation.",
          experimentId: "saffire-i",
          experimentAcronym: "Saffire-I",
        },
        {
          title: "Phase 2: HVAC Isolation & Power Cutoff",
          body: "The station flight computer or crew immediately closes module inter-module ventilation (IMV) dampers and cuts electrical power to the affected rack to eliminate forced convective airflow and ignition energy.",
          experimentId: "bass-ii",
          experimentAcronym: "BASS-II",
        },
        {
          title: "Phase 3: Suppression Attack & Atmospheric Decontamination",
          body: "Crew deploys PFE water mist nozzles into rack fire ports. After extinction, portable emergency scrubbers (CDRA / trace contaminant units) operate for hours to scrub particulate soot and toxic offgases before crew unmask.",
          experimentId: "sofie-mist",
          experimentAcronym: "SoFIE-MIST",
        },
      ],
      checklistOrRules: [
        "Maintain clear translation paths to Soyuz / Crew Dragon emergency return vehicles at all times.",
        "Do not declare cabin safe until atmospheric sample tubes confirm CO < 10 ppm and HCN is zero.",
      ],
    },
  },
];

export function SafetyAccordion() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "differs-in-space": true,
    "atmosphere-choices": true,
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4">
      {ACCORDION_SECTIONS.map((sec) => {
        const isOpen = !!openSections[sec.id];

        return (
          <div
            key={sec.id}
            className={`border rounded-xl transition-all shadow-md overflow-hidden ${
              isOpen
                ? "bg-space-900/90 border-space-700"
                : "bg-space-900/50 border-space-850 hover:border-space-800"
            }`}
          >
            {/* Accordion Header Button */}
            <button
              type="button"
              onClick={() => toggleSection(sec.id)}
              className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-base sm:text-lg font-mono font-bold text-ember-400 bg-ember-500/10 border border-ember-500/30 px-2.5 py-1 rounded-lg shrink-0">
                  {sec.number}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                      {sec.title}
                    </h3>
                    <Badge variant="cyan" className="text-[10px] font-mono">
                      {sec.badge}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {sec.summary}
                  </p>
                </div>
              </div>

              <div
                className={`p-2 rounded-lg bg-space-950 border border-space-800 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-white" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Expanded Accordion Body */}
            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-space-850 space-y-6">
                {/* Key Concepts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sec.content.keyConcepts.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-space-950/80 border border-space-850 rounded-lg p-4 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-ember-400" />
                            {item.title}
                          </h4>
                          {item.experimentId && (
                            <Link
                              href={`/experiments/${item.experimentId}`}
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-astro-cyan hover:underline shrink-0 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded"
                            >
                              <span>[{item.experimentAcronym}]</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checklist / Action Rules */}
                {sec.content.checklistOrRules && (
                  <div className="bg-space-950/90 border-l-2 border-emerald-500 rounded-r-lg p-4 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Operational Action Rules:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {sec.content.checklistOrRules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
