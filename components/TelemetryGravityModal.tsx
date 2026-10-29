"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Orbit,
  Gauge,
  Flame,
  Wind,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useGravity, GRAVITY_REGIMES, GravityRegime } from "@/context/GravityContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function TelemetryGravityModal() {
  const { regime, telemetry, setRegime, isModalOpen, setIsModalOpen } = useGravity();

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, setIsModalOpen]);

  if (!isModalOpen) return null;

  const regimesList: GravityRegime[] = ["microgravity", "lunar", "martian", "earth"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="telemetry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-space-950/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/30 bg-space-900/95 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-space-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-astro-cyan shrink-0">
              <Orbit className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-astro-cyan font-bold">
                  <span className="w-2 h-2 rounded-full bg-astro-cyan animate-pulse" />
                  Orbital Telemetry & Simulation Controller
                </span>
                <Badge variant="cyan" className="text-[10px] py-0 px-1.5">
                  Live
                </Badge>
              </div>
              <h2
                id="telemetry-modal-title"
                className="text-xl sm:text-2xl font-bold font-display text-white"
              >
                Spacecraft Environment & Gravity Physics
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-space-800 border border-space-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-astro-cyan"
            aria-label="Close telemetry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gravity Regime Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
              <Gauge className="w-4 h-4 text-astro-cyan" />
              Select Target Gravitational Regime
            </label>
            <span className="text-xs text-slate-400 font-mono">
              Active: <strong className="text-astro-cyan">{telemetry.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {regimesList.map((rKey) => {
              const item = GRAVITY_REGIMES[rKey];
              const isSelected = regime === rKey;
              return (
                <button
                  key={rKey}
                  type="button"
                  onClick={() => setRegime(rKey)}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 ${
                    isSelected
                      ? "border-cyan-400 bg-space-850 shadow-cyan-glow ring-1 ring-cyan-400/50"
                      : "border-space-800 bg-space-950/60 hover:bg-space-850 hover:border-space-700"
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="text-xs font-bold text-white font-display leading-tight">
                      {item.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-astro-cyan shrink-0" />
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-mono font-bold" style={{ color: item.accentHex }}>
                      {item.gValue === 0.000001 ? "0.00 g (μg)" : `${item.gValue} g`}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {item.pressurePsi} psi &bull; {item.oxygenPercent}% O₂
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Telemetry Details Grid */}
        <div className="p-5 rounded-2xl border border-space-800 bg-space-950/80 space-y-4">
          <div className="flex items-center justify-between border-b border-space-850 pb-3">
            <span className="text-xs font-mono text-slate-400">
              Facility / Mission Context:
            </span>
            <span className="text-xs font-semibold text-slate-200 font-mono">
              {telemetry.missionContext}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-space-900 border border-space-850">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Cabin Pressure
              </span>
              <span className="text-base font-bold font-mono text-white">
                {telemetry.pressureKPa} kPa
              </span>
              <span className="text-[11px] text-slate-400 block">
                ({telemetry.pressurePsi} psi)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-space-900 border border-space-850">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Oxygen Fraction
              </span>
              <span className="text-base font-bold font-mono text-amber-400">
                {telemetry.oxygenPercent}% O₂
              </span>
              <span className="text-[11px] text-slate-400 block">
                {telemetry.oxygenPercent > 21 ? "Enriched Risk" : "Standard Air"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-space-900 border border-space-850">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                HVAC Micro-Draft
              </span>
              <span className="text-base font-bold font-mono text-cyan-400">
                {telemetry.flowVelocityCmS} cm/s
              </span>
              <span className="text-[11px] text-slate-400 block">Forced Convection</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900 border border-space-850">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Ambient Temp
              </span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {telemetry.ambientTempC} &deg;C
              </span>
              <span className="text-[11px] text-slate-400 block">Controlled ECLSS</span>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <Flame className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
              <span>
                <strong>Flame Morphology:</strong> {telemetry.flameShape}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Wind className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Combustion Regime:</strong> {telemetry.combustionMode}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Suppression Response:</strong> {telemetry.suppressionAgent}
              </span>
            </div>
          </div>
        </div>

        {/* Action Hub */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              href="/safety-guide#simulator"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs">
                <Sliders className="w-3.5 h-3.5 text-ember-400" />
                2D Physics Simulator
              </Button>
            </Link>

            <Link
              href="/simulator"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                3D Chamber Sim
              </Button>
            </Link>

            <Link
              href="/advisor"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto"
            >
              <Button variant="secondary" size="sm" className="w-full gap-1.5 text-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                Safety Advisor
              </Button>
            </Link>
          </div>

          <Button
            variant="cyan"
            size="sm"
            onClick={() => setIsModalOpen(false)}
            className="w-full sm:w-auto gap-2 text-xs"
          >
            Apply & Close
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
