import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Flame, Scale, ExternalLink } from "lucide-react";

interface ComparisonRow {
  characteristic: string;
  onEarth: string;
  inSpace: string;
  flightHazard: string;
  experimentId: string;
  experimentAcronym: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    characteristic: "Flame Geometry",
    onEarth: "Elongated, flickering teardrop plume driven by strong natural buoyant updraft.",
    inSpace: "Stationary, spherical diffusion envelope halo with radial symmetry around fuel.",
    flightHazard: "Burns in all directions equally; lack of upward draft prevents natural self-stretching.",
    experimentId: "flex-2",
    experimentAcronym: "FLEX-2",
  },
  {
    characteristic: "Convective Buoyancy",
    onEarth: "Dominates transport (Grashof number Gr ~ 10⁵); pulls cool air into base, expels hot exhaust upwards.",
    inSpace: "Effectively zero (Gr ≈ 0); transport is governed purely by slow molecular diffusion and forced ventilation fans.",
    flightHazard: "Stagnant combustion products linger around the flame, potentially masking fire growth until air flows.",
    experimentId: "sibal-zgf",
    experimentAcronym: "SIBAL-ZGF",
  },
  {
    characteristic: "Low-Airspeed Spread Peak",
    onEarth: "Natural convection creates ~30–50 cm/s buoyant draft; quiescent air cannot sustain open burning easily.",
    inSpace: "Flammability exhibits a peak at gentle forced airspeeds (5–15 cm/s), spreading faster than in still air.",
    flightHazard: "Cabin HVAC circulation fans create the exact airflow velocities that maximize solid flame spread.",
    experimentId: "bass-ii",
    experimentAcronym: "BASS-II",
  },
  {
    characteristic: "Secondary Cool Flames",
    onEarth: "Rapidly quenched by buoyant air entrainment and high convective cooling; rarely sustained at 1-g.",
    inSpace: "Isolated fuel droplets sustain steady low-temperature (600–800 K) non-luminous oxidation after visible flame extinction.",
    flightHazard: "Invisible burning continues undetected without thermal infrared cameras, posing severe reignition risks.",
    experimentId: "flex-2",
    experimentAcronym: "FLEX-2",
  },
  {
    characteristic: "Smoke Dispersion",
    onEarth: "Hot smoke rises immediately to ceiling, creating a distinct stratified ceiling gas layer.",
    inSpace: "Smoke stays suspended at point of generation, spreading spherically until entrained into HVAC duct intakes.",
    flightHazard: "Ceiling smoke detectors fail; sensors must be installed in air return ducts and avionics exhausts.",
    experimentId: "saffire-i",
    experimentAcronym: "Saffire-I",
  },
  {
    characteristic: "Large-Scale Fabric Burning",
    onEarth: "Flame spreads upwards rapidly but is constrained horizontally by buoyant entrainment drafts.",
    inSpace: "Upstream flame propagation across large surfaces (0.4 × 1.0 m) spreads steadily against forced airflow.",
    flightHazard: "Proves spacecraft fires can reach large vehicle-threatening dimensions inside cargo and habitat modules.",
    experimentId: "saffire-i",
    experimentAcronym: "Saffire-I",
  },
  {
    characteristic: "Hypobaric Oxygen Regimes",
    onEarth: "Materials certified at 101.3 kPa, 21% O₂; rarely tested in low-pressure oxygen-enriched environments.",
    inSpace: "Moon/Mars exploration architectures specify 56.5 kPa (8.2 psia) with 34% O₂, altering ignition energy thresholds.",
    flightHazard: "Materials considered non-flammable on Earth ignite and burn vigorously in Artemis exploration atmospheres.",
    experimentId: "sofie-gel",
    experimentAcronym: "SoFIE",
  },
];

export function EarthVsSpaceTable() {
  return (
    <div className="bg-space-900/90 border border-space-800 rounded-xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-astro-cyan" />
            <span className="text-xs font-mono uppercase tracking-wider text-astro-cyan font-semibold">
              Comparative Combustion Physics
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            On Earth vs In Space Combustion Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Key physical differences between terrestrial 1-g fires and orbital microgravity combustion.
          </p>
        </div>

        <Badge variant="cyan" className="self-start sm:self-auto font-mono text-xs">
          7 Core Metrics
        </Badge>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-space-800 bg-space-950/80">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-space-800 bg-space-900/70 text-xs font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4 font-semibold w-40">Characteristic</th>
              <th className="py-3 px-4 font-semibold w-56 text-slate-300">On Earth (1-g)</th>
              <th className="py-3 px-4 font-semibold w-56 text-ember-400">In Space (0-g)</th>
              <th className="py-3 px-4 font-semibold">Flight Hazard Implication</th>
              <th className="py-3 px-4 font-semibold text-right w-28">Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-space-850 text-xs">
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.characteristic} className="hover:bg-space-900/40 transition-colors">
                {/* Metric */}
                <td className="py-3.5 px-4 font-bold text-white font-display">
                  {row.characteristic}
                </td>

                {/* Earth */}
                <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                  {row.onEarth}
                </td>

                {/* Space */}
                <td className="py-3.5 px-4 text-amber-300/90 leading-relaxed bg-amber-950/10">
                  {row.inSpace}
                </td>

                {/* Hazard */}
                <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                  {row.flightHazard}
                </td>

                {/* Experiment Link */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <Link
                    href={`/experiments/${row.experimentId}`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-astro-cyan hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded transition-colors"
                  >
                    <span>[{row.experimentAcronym}]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
