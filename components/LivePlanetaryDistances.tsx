"use client";

import React, { useState, useEffect } from "react";
import {
  computeLivePlanetaryDistances,
  PlanetaryDistanceData,
} from "@/lib/ephemeris";
import { ArrowDownRight, ArrowUpRight, Radio, Sparkles } from "lucide-react";

type DistanceUnit = "km" | "au" | "mi";

// Celestial visual representations matching original simulator
function PlanetAvatar({ id }: { id: string }) {
  switch (id) {
    case "sun":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-white shadow-[0_0_12px_rgba(251,191,36,0.85)] shrink-0 ring-1 ring-yellow-300/50" />
      );
    case "mercury":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-slate-300 via-stone-500 to-slate-800 border border-slate-400/40 shrink-0 shadow-inner" />
      );
    case "venus":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-700 border border-amber-300/40 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
      );
    case "mars":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-rose-900 border border-red-500/40 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      );
    case "jupiter":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-b from-amber-200 via-amber-700 to-amber-950 border border-amber-500/40 shrink-0 overflow-hidden shadow-inner flex flex-col justify-around py-0.5">
          <div className="h-0.5 w-full bg-amber-900/60" />
          <div className="h-0.5 w-full bg-amber-100/40" />
          <div className="h-0.5 w-full bg-orange-950/70" />
        </div>
      );
    case "saturn":
      return (
        <div className="relative w-6 h-5 flex items-center justify-center shrink-0">
          <div className="absolute w-7 h-2.5 rounded-full border border-amber-300/80 rotate-[-22deg] pointer-events-none" />
          <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-700 shadow-sm" />
        </div>
      );
    case "uranus":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-cyan-200 via-cyan-400 to-teal-700 border border-cyan-400/40 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
      );
    case "neptune":
      return (
        <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-sky-300 via-blue-500 to-indigo-900 border border-blue-400/40 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      );
    default:
      return <div className="w-5 h-5 rounded-full bg-slate-500 shrink-0" />;
  }
}

export function LivePlanetaryDistances() {
  const [unit, setUnit] = useState<DistanceUnit>("km");
  // Default to reference epoch to maintain deterministic SSR matching
  const [distances, setDistances] = useState<PlanetaryDistanceData[]>(() =>
    computeLivePlanetaryDistances(1793289650000)
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Instant live sync on client mount
    setDistances(computeLivePlanetaryDistances(Date.now()));

    // Live ephemeris recalculation every 1 second
    const interval = setInterval(() => {
      setDistances(computeLivePlanetaryDistances(Date.now()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDistance = (item: PlanetaryDistanceData) => {
    if (unit === "au") {
      return (
        <>
          <span>{item.distanceAu.toFixed(4)}</span>
          <span className="text-base sm:text-lg font-normal text-slate-400 ml-1.5 tracking-normal">AU</span>
        </>
      );
    }
    if (unit === "mi") {
      return (
        <>
          <span>{Math.round(item.distanceMiles).toLocaleString("en-US")}</span>
          <span className="text-base sm:text-lg font-normal text-slate-400 ml-1.5 tracking-normal">mi</span>
        </>
      );
    }
    return (
      <>
        <span>{Math.round(item.distanceKm).toLocaleString("en-US")}</span>
        <span className="text-base sm:text-lg font-normal text-slate-400 ml-1.5 tracking-normal">km</span>
      </>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Header bar matching original live telemetry screenshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-space-850 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-pulse inline-block" />
          <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-slate-200">
            DISTANCE FROM EARTH RIGHT NOW
          </h2>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-astro-cyan border border-cyan-500/20">
            <Radio className="w-3 h-3 animate-spin-slow" />
            LIVE JPL EPHEMERIS
          </span>
        </div>

        {/* Unit Selector Pills */}
        <div className="flex items-center gap-1 bg-space-950/80 p-1 rounded-lg border border-space-800 text-[11px] font-mono">
          <span className="text-slate-500 text-[10px] px-1.5 uppercase font-semibold hidden xs:inline">
            Unit:
          </span>
          <button
            type="button"
            onClick={() => setUnit("km")}
            className={`px-2.5 py-0.5 rounded-md transition-all font-semibold ${
              unit === "km"
                ? "bg-astro-cyan text-space-950 shadow-cyan-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            KM
          </button>
          <button
            type="button"
            onClick={() => setUnit("au")}
            className={`px-2.5 py-0.5 rounded-md transition-all font-semibold ${
              unit === "au"
                ? "bg-astro-cyan text-space-950 shadow-cyan-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            AU
          </button>
          <button
            type="button"
            onClick={() => setUnit("mi")}
            className={`px-2.5 py-0.5 rounded-md transition-all font-semibold ${
              unit === "mi"
                ? "bg-astro-cyan text-space-950 shadow-cyan-glow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            MI
          </button>
        </div>
      </div>

      {/* 8-Card Telemetry Grid (2 rows of 4 on desktop, responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-space-850/80 border border-space-800/90 rounded-2xl overflow-hidden shadow-2xl">
        {distances.map((planet) => {
          const isApproaching = planet.trend === "approaching";
          const isReceding = planet.trend === "receding";

          return (
            <div
              key={planet.id}
              className="bg-space-950/95 p-5 sm:p-6 flex flex-col justify-between space-y-4 hover:bg-space-900/60 transition-colors group"
            >
              {/* Top: Avatar & Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <PlanetAvatar id={planet.id} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors">
                    {planet.name}
                  </span>
                </div>

                {/* Real-time Relative Orbital Vector indicator */}
                <div className="flex items-center gap-1 text-[10px] font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                  {isApproaching && (
                    <span
                      className="text-emerald-400 flex items-center gap-0.5"
                      title={`Approaching Earth at ${Math.abs(planet.velocityKmS).toFixed(1)} km/s`}
                    >
                      <ArrowDownRight className="w-3 h-3" />
                      <span>{Math.abs(planet.velocityKmS).toFixed(1)} km/s</span>
                    </span>
                  )}
                  {isReceding && (
                    <span
                      className="text-amber-400 flex items-center gap-0.5"
                      title={`Receding from Earth at ${Math.abs(planet.velocityKmS).toFixed(1)} km/s`}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{Math.abs(planet.velocityKmS).toFixed(1)} km/s</span>
                    </span>
                  )}
                  {!isApproaching && !isReceding && (
                    <span className="text-slate-500 font-mono">0.0 km/s</span>
                  )}
                </div>
              </div>

              {/* Middle: Big Distance Number */}
              <div>
                <div className="text-2xl sm:text-[28px] lg:text-[29px] font-extrabold font-mono tracking-tight text-white leading-none">
                  {formatDistance(planet)}
                </div>
              </div>

              {/* Bottom: Light Travel Time & AU */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-space-900">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="text-slate-500">Light:</span>
                  <span className="text-slate-300 font-semibold">{planet.lightTimeFormatted}</span>
                </span>

                {unit !== "au" && (
                  <span className="text-[10px] text-slate-500">
                    {planet.distanceAu.toFixed(3)} AU
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
