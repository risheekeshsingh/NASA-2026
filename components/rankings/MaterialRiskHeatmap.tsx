"use client";

import React, { useState } from "react";
import { Layers, AlertTriangle, ShieldCheck, Flame, Info, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface HeatmapCell {
  material: string;
  condition: string;
  risk: "Low" | "Moderate" | "High" | "Critical";
  phenomenon: string;
  mitigation: string;
}

const CONDITIONS = [
  { id: "earth", name: "Earth (1-g / 21% O₂)", short: "Earth 1-g" },
  { id: "iss_std", name: "ISS Baseline (0-g / 21% O₂ / 101 kPa)", short: "ISS Baseline" },
  { id: "iss_stagnant", name: "ISS Quiescent (<1 cm/s flow / 0-g)", short: "ISS Quiescent" },
  { id: "peak_flow", name: "Peak Flow (2-8 cm/s flow / 0-g)", short: "0-g Peak Flow" },
  { id: "artemis", name: "Artemis Exploration (34% O₂ / 56 kPa / 0-g)", short: "Artemis 34% O₂" },
  { id: "lunar", name: "Lunar Base (34% O₂ / 56 kPa / 0.16-g)", short: "Lunar 0.16-g" },
  { id: "mars", name: "Mars Habitat (28% O₂ / 70 kPa / 0.38-g)", short: "Mars 0.38-g" },
];

const MATERIALS = [
  { id: "pmma", name: "PMMA / Cast Acrylic", category: "Structural Polymer" },
  { id: "nomex", name: "Nomex IIIA Fabric", category: "Flame-Resistant Textile" },
  { id: "kapton", name: "Kapton HN Polyimide", category: "Electrical Insulation" },
  { id: "sibal", name: "SIBAL Cotton / Fiberglass", category: "Standard Fabric Blend" },
  { id: "silicone", name: "Silicone Elastomer", category: "Seal / Potting Material" },
  { id: "delrin", name: "Delrin / Polyoxymethylene", category: "Engineering Plastic" },
  { id: "polyethylene", name: "Polyethylene Wire Jacket", category: "Wire Harness" },
];

// Curated matrix based on NASA-STD-6001, BASS, Saffire, and SoFIE empirical flight findings
const HEATMAP_DATA: Record<string, Record<string, { risk: "Low" | "Moderate" | "High" | "Critical"; phenomenon: string; mitigation: string }>> = {
  pmma: {
    earth: { risk: "High", phenomenon: "Upward flame spread driven by buoyancy; rapid drip burning.", mitigation: "Standard gaseous halon/CO2 suppression." },
    iss_std: { risk: "Moderate", phenomenon: "Reduced flame spread due to low convection; hemispherical flame zone.", mitigation: "Depressurization or portable water mist." },
    iss_stagnant: { risk: "Low", phenomenon: "Diffusion starvation; flame self-extinguishes within 45s without draft.", mitigation: "Cut off cabin ventilation fans immediately." },
    peak_flow: { risk: "High", phenomenon: "Peak flammability: forced 5 cm/s draft feeds flame without convective blow-off.", mitigation: "Stop cabin ventilation; deploy CO2 extinguisher." },
    artemis: { risk: "Critical", phenomenon: "34% O2 dramatically accelerates pyrolysis; burns 3.2x faster than 21% O2.", mitigation: "Requires non-flammable fluoropolymer coating or metallic cladding." },
    lunar: { risk: "Critical", phenomenon: "Weak buoyancy (0.16-g) fails to disperse smoke; hot soot recirculates.", mitigation: "Pre-breathing mask deployment + vacuum vent." },
    mars: { risk: "High", phenomenon: "Elevated O2 (28%) overcomes 0.38-g buoyant cooling; prolonged flaming.", mitigation: "Atmospheric purge to nitrogen-rich baseline." },
  },
  nomex: {
    earth: { risk: "Low", phenomenon: "Self-extinguishes in normal air (LOI > 28%). Meets NASA STD-6001 Test 1.", mitigation: "No active suppression required in ambient 21% O2." },
    iss_std: { risk: "Low", phenomenon: "Chars and self-extinguishes in 0-g standard atmosphere.", mitigation: "Passive containment." },
    iss_stagnant: { risk: "Low", phenomenon: "Smolder extinguishes rapidly due to oxygen starvation.", mitigation: "Ventilation isolation." },
    peak_flow: { risk: "Moderate", phenomenon: "Forced flow can sustain localized edge charring without open flame.", mitigation: "Inspect with thermal imager for residual hot spots." },
    artemis: { risk: "High", phenomenon: "34% O2 exceeds Nomex Limiting Oxygen Index (LOI 28-30%); sustains open flame!", mitigation: "Upgrade to Polybenzimidazole (PBI) or glass-fiber composites for Artemis." },
    lunar: { risk: "High", phenomenon: "Sustained smolder-to-flame transition in 34% O2 lunar habitat atmosphere.", mitigation: "Store clothing and textiles in hermetic nitrogen lockers." },
    mars: { risk: "Moderate", phenomenon: "Near flammability threshold at 28% O2; burns if preheated by external heat flux.", mitigation: "Enforce thermal standoff distances from avionics." },
  },
  kapton: {
    earth: { risk: "Low", phenomenon: "High glass transition temp (>400°C); inherently flame resistant in 1-g.", mitigation: "Passive containment." },
    iss_std: { risk: "Low", phenomenon: "Excellent microgravity stability; zero observed open flame.", mitigation: "No action required." },
    iss_stagnant: { risk: "Low", phenomenon: "Complete self-extinction in zero draft.", mitigation: "Passive containment." },
    peak_flow: { risk: "Low", phenomenon: "Maintains structural barrier without flaming at 2-10 cm/s flow.", mitigation: "Standard thermal inspection." },
    artemis: { risk: "Moderate", phenomenon: "Can ignite under high-energy electrical arcing in 34% O2; char tracking hazard.", mitigation: "Arc fault circuit interrupters (AFCI) on all 120V/28V lines." },
    lunar: { risk: "Moderate", phenomenon: "Sustained pyrolysis only under concentrated arc ignition in 34% O2.", mitigation: "Implement redundant Teflon/polyimide hybrid shielding." },
    mars: { risk: "Low", phenomenon: "Safe operating margin in 28% O2 unless direct sustained ignition source present.", mitigation: "Standard wire routing standoff." },
  },
  sibal: {
    earth: { risk: "Moderate", phenomenon: "Burns steadily upward; cotton pyrolyzes while fiberglass matrix retains shape.", mitigation: "Water-based extinguisher." },
    iss_std: { risk: "Moderate", phenomenon: "Sustains creeping flame along cotton fibers at low convective velocities.", mitigation: "Depressurization or portable water mist." },
    iss_stagnant: { risk: "Low", phenomenon: "Smothers in self-generated carbon dioxide envelope in quiescent 0-g.", mitigation: "Airflow shutdown." },
    peak_flow: { risk: "High", phenomenon: "Saffire-I validated rapid 1.5 cm/s flame spread across large SIBAL fabric sheets.", mitigation: "Immediate emergency ventilation shutdown + cabin seal." },
    artemis: { risk: "Critical", phenomenon: "Rapid flaming combustion across entire surface in 34% O2; zero self-extinction.", mitigation: "Prohibit raw cotton/fiberglass blends in exploration EVA suits and habitats." },
    lunar: { risk: "Critical", phenomenon: "Partial gravity creates tilted flame plume accelerating unburned fabric preheating.", mitigation: "Enforce ultra-low flammability textile standards." },
    mars: { risk: "High", phenomenon: "Vigorous flame propagation across fabric under 28% O2 martian pressure.", mitigation: "Automated nitrogen deluge in storage lockers." },
  },
  silicone: {
    earth: { risk: "Moderate", phenomenon: "Burns with silica white ash; slow flame spread rate.", mitigation: "CO2 extinguisher." },
    iss_std: { risk: "Low", phenomenon: "Silica ash creates protective barrier around unburned silicone in 0-g.", mitigation: "Passive ash crust containment." },
    iss_stagnant: { risk: "Low", phenomenon: "Ash crust seals oxygen out; self-extinguishes in under 30s.", mitigation: "Airflow isolation." },
    peak_flow: { risk: "Moderate", phenomenon: "High flow strips brittle silica ash, exposing fresh polymer to flame.", mitigation: "Reduce airflow velocity to allow ash barrier retention." },
    artemis: { risk: "High", phenomenon: "In 34% O2, flame penetrates silica crust, releasing volatile siloxanes.", mitigation: "Use fluorosilicone or metal-jacketed o-rings in high O2 lines." },
    lunar: { risk: "High", phenomenon: "Lunar dust contamination degrades silicone fire retardancy in 34% O2.", mitigation: "Dust-tight sealing boots and anti-dust airlocks." },
    mars: { risk: "Moderate", phenomenon: "Stable under 28% O2 unless subjected to sustained external heat flux.", mitigation: "Heat-reflective barrier tape." },
  },
  delrin: {
    earth: { risk: "High", phenomenon: "Burns cleanly with nearly invisible pale blue flame and high heat release.", mitigation: "Water deluge or copious CO2." },
    iss_std: { risk: "Moderate", phenomenon: "Produces toxic formaldehyde vapors; spherical blue flame.", mitigation: "Full face mask respirator + charcoal scrubber." },
    iss_stagnant: { risk: "Low", phenomenon: "Flame shrinks to faint cool-blue halo; low burn rate.", mitigation: "Shut off circulation." },
    peak_flow: { risk: "High", phenomenon: "Forced flow drives high-temperature decomposition and toxic outgassing.", mitigation: "Emergency exhaust scrub + fire suppression." },
    artemis: { risk: "Critical", phenomenon: "Extremely violent combustion in 34% O2; toxic formaldehyde flashover hazard.", mitigation: "Strict ban on Delrin/Acetal in pressurized exploration compartments." },
    lunar: { risk: "Critical", phenomenon: "Zero flame visibility under bright habitat LED lighting in 34% O2.", mitigation: "Mandatory UV/IR optical flame detectors in equipment bays." },
    mars: { risk: "High", phenomenon: "High flammability hazard under 28% O2; rapid structural loss.", mitigation: "Replace with PEEK or aerospace-grade aluminum 7075." },
  },
  polyethylene: {
    earth: { risk: "High", phenomenon: "Rapid melting, dripping flaming beads that ignite secondary fuels.", mitigation: "Dry chemical or Halon replacement." },
    iss_std: { risk: "Moderate", phenomenon: "Surface melt beads without gravity dripping; flame creeps along wire.", mitigation: "De-energize wire circuit immediately." },
    iss_stagnant: { risk: "Low", phenomenon: "Core self-extinguishes as smoke shell forms around wire.", mitigation: "Circuit breaker trip." },
    peak_flow: { risk: "High", phenomenon: "Ventilation draft blows away smoke shell, sustaining core wire burn.", mitigation: "Immediate circuit trip + vent shutdown." },
    artemis: { risk: "Critical", phenomenon: "34% O2 causes violent insulation flashover along wire harnesses.", mitigation: "Mandatory Tefzel (ETFE) or PTFE wire insulation on Artemis vehicles." },
    lunar: { risk: "Critical", phenomenon: "Melt pooling along wire bundle in 0.16-g creates secondary flame fronts.", mitigation: "Metal conduit encasement for all primary power trunks." },
    mars: { risk: "High", phenomenon: "High flame propagation speed along cable trays in 28% O2.", mitigation: "Fire-stop barriers every 1 meter along cable runs." },
  },
};

export function MaterialRiskHeatmap() {
  const [selectedCell, setSelectedCell] = useState<{
    material: string;
    condition: string;
  }>({
    material: "pmma",
    condition: "artemis",
  });

  const activeMat = MATERIALS.find((m) => m.id === selectedCell.material) ?? MATERIALS[0];
  const activeCond = CONDITIONS.find((c) => c.id === selectedCell.condition) ?? CONDITIONS[4];
  const cellData = HEATMAP_DATA[selectedCell.material]?.[selectedCell.condition] ?? {
    risk: "Moderate",
    phenomenon: "Standard combustion kinetics under prevailing oxidizer concentration.",
    mitigation: "Standard spacecraft fire suppression protocol.",
  };

  const getRiskColor = (risk: "Low" | "Moderate" | "High" | "Critical") => {
    switch (risk) {
      case "Critical":
        return "bg-red-500/80 text-white border-red-400 font-bold hover:bg-red-500";
      case "High":
        return "bg-ember-500/75 text-white border-ember-400 font-bold hover:bg-ember-500";
      case "Moderate":
        return "bg-amber-500/60 text-slate-100 border-amber-400 hover:bg-amber-500";
      case "Low":
        return "bg-emerald-600/50 text-emerald-100 border-emerald-500 hover:bg-emerald-600";
    }
  };

  return (
    <div className="rounded-2xl bg-space-900/90 border border-space-800 p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ember">
              <Layers className="w-3.5 h-3.5" />
              Empirical Material Heatmap
            </Badge>
          </div>
          <h3 className="text-base font-bold text-white font-display">
            Material vs. Environmental Risk Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Cross-referencing common spacecraft polymers and textiles against 7 operational spaceflight atmospheric regimes.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
          <span className="px-2 py-0.5 rounded bg-emerald-600/40 text-emerald-300 border border-emerald-500/40">
            Low
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/40 text-amber-300 border border-amber-500/40">
            Moderate
          </span>
          <span className="px-2 py-0.5 rounded bg-ember-500/60 text-ember-200 border border-ember-500/40">
            High
          </span>
          <span className="px-2 py-0.5 rounded bg-red-500/70 text-red-200 border border-red-500/50">
            Critical
          </span>
        </div>
      </div>

      {/* Heatmap Grid Table */}
      <div className="overflow-x-auto pb-2">
        <table className="w-full border-collapse text-xs min-w-[720px]">
          <thead>
            <tr>
              <th className="p-2.5 text-left font-mono text-[11px] uppercase tracking-wider text-slate-400 bg-space-950/80 rounded-tl-xl border border-space-850 w-48">
                Spacecraft Material
              </th>
              {CONDITIONS.map((cond, idx) => (
                <th
                  key={cond.id}
                  className={`p-2 text-center font-mono text-[10px] uppercase text-slate-300 bg-space-950/80 border border-space-850 ${
                    idx === CONDITIONS.length - 1 ? "rounded-tr-xl" : ""
                  } ${cond.id === "artemis" ? "text-astro-cyan font-bold" : ""}`}
                >
                  {cond.short}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATERIALS.map((mat) => (
              <tr key={mat.id} className="hover:bg-space-850/30 transition-colors">
                <td className="p-2.5 border border-space-850 bg-space-950/40">
                  <div className="font-bold text-white text-xs">{mat.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{mat.category}</div>
                </td>
                {CONDITIONS.map((cond) => {
                  const cell = HEATMAP_DATA[mat.id]?.[cond.id] ?? { risk: "Moderate" };
                  const isSelected = selectedCell.material === mat.id && selectedCell.condition === cond.id;

                  return (
                    <td key={cond.id} className="p-1 border border-space-850 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedCell({ material: mat.id, condition: cond.id })}
                        className={`w-full py-2 px-1.5 rounded text-[11px] font-mono transition-all border ${getRiskColor(
                          cell.risk
                        )} ${isSelected ? "ring-2 ring-white scale-105 z-10 shadow-lg" : "opacity-90"}`}
                        title={`${mat.name} in ${cond.name}: ${cell.risk}`}
                      >
                        {cell.risk}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Deep-Dive Card */}
      <div className="p-4 rounded-xl bg-space-950 border border-space-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-space-850 pb-2">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-ember-400" />
            <h4 className="text-sm font-bold text-white font-display">
              Selected Configuration: <span className="text-astro-cyan">{activeMat.name}</span> in{" "}
              <span className="text-amber-400">{activeCond.name}</span>
            </h4>
          </div>
          <Badge
            variant={
              cellData.risk === "Critical"
                ? "danger"
                : cellData.risk === "High"
                ? "ember"
                : cellData.risk === "Moderate"
                ? "warning"
                : "cyan"
            }
          >
            {cellData.risk} Risk Rating
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
              Microgravity Combustion Phenomenon
            </span>
            <p className="text-slate-200 leading-relaxed bg-space-900/60 p-2.5 rounded-lg border border-space-850">
              {cellData.phenomenon}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 block font-semibold">
              Mission Countermeasure / Mitigation Strategy
            </span>
            <p className="text-slate-200 leading-relaxed bg-space-900/60 p-2.5 rounded-lg border border-space-850">
              {cellData.mitigation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
