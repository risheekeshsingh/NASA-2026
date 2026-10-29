"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Info, Sliders, Shield, Zap, Globe2 } from "lucide-react";
import { Badge, SampleDataBadge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

// Strict dynamic import with ssr: false for Three.js component
const MicrogravityFlameCanvas = dynamic(
  () => import("@/components/flame3d/MicrogravityFlameCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[450px] flex items-center justify-center bg-space-950 rounded-2xl border border-space-800">
        <div className="text-center space-y-3">
          <Skeleton className="w-24 h-24 rounded-full mx-auto" />
          <p className="text-xs font-mono text-slate-400">Initializing WebGL Microgravity Chamber...</p>
        </div>
      </div>
    ),
  }
);

export default function SimulatorPage() {
  const [isMicrogravity, setIsMicrogravity] = useState(true);
  const [oxygenLevel, setOxygenLevel] = useState(21);
  const [coolFlameActive, setCoolFlameActive] = useState(true);

  // Derived physics indicators
  const grashofNumber = isMicrogravity ? "0.00" : "1.42 x 10^5";
  const flameType = isMicrogravity
    ? "Diffusion-Limited Spherical Envelope"
    : "Buoyant Convective Plume";
  const quenchingDiameter = isMicrogravity ? "18.2 mm" : "4.5 mm";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-space-850 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">
              <Sparkles className="w-3.5 h-3.5" />
              3D Physical Science Engine
            </Badge>
            <SampleDataBadge />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Microgravity Flame Chamber Simulator
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-2xl">
            Compare zero-g spherical combustion envelopes with terrestrial 1-g buoyancy plumes under varying oxygen concentrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3D Canvas Area */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="h-[460px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <MicrogravityFlameCanvas
              isMicrogravity={isMicrogravity}
              oxygenLevel={oxygenLevel}
              coolFlameActive={coolFlameActive}
            />
          </div>

          {/* Physics Telemetry Status Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-space-900 border border-space-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Grashof Number (Gr)</span>
              <span className="font-mono font-bold text-astro-cyan">{grashofNumber}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Flame Regime</span>
              <span className="font-semibold text-white truncate block">{flameType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Quenching Diameter</span>
              <span className="font-mono font-bold text-ember-400">{quenchingDiameter}</span>
            </div>
          </div>
        </div>

        {/* Chamber Controls Panel */}
        <div className="space-y-6">
          <Card className="border-space-800 bg-space-900/80">
            <CardHeader className="pb-3 border-b border-space-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-ember-400" />
                <CardTitle className="text-base text-white">Environmental Controls</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
              {/* Gravity Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Gravity Field</span>
                  <span className="font-mono text-astro-cyan">{isMicrogravity ? "0.0-g (Orbit)" : "1.0-g (Earth)"}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMicrogravity(true)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      isMicrogravity
                        ? "bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-ember-glow"
                        : "bg-space-950 text-slate-400 border border-space-800 hover:text-white"
                    }`}
                  >
                    Microgravity (0-g)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMicrogravity(false)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                      !isMicrogravity
                        ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white"
                        : "bg-space-950 text-slate-400 border border-space-800 hover:text-white"
                    }`}
                  >
                    Earth Baseline (1-g)
                  </button>
                </div>
              </div>

              {/* Oxygen Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-slate-300">Oxygen (O₂) Index</span>
                  <span className="font-mono font-bold text-amber-400">{oxygenLevel}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={40}
                  step={1}
                  value={oxygenLevel}
                  onChange={(e) => setOxygenLevel(Number(e.target.value))}
                  className="w-full accent-ember-500 bg-space-950 cursor-pointer h-2 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>15% (Extinction limit)</span>
                  <span className="text-astro-cyan">21% (Earth/ISS)</span>
                  <span className="text-ember-400">34% (Artemis)</span>
                </div>
              </div>

              {/* Cool Flame Toggle */}
              {isMicrogravity && (
                <div className="pt-2 border-t border-space-850">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-xs font-semibold text-white block">Visualize Cool Flame Halo</span>
                      <span className="text-[11px] text-slate-400 block">Cyan secondary reaction envelope (~600 K)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={coolFlameActive}
                      onChange={(e) => setCoolFlameActive(e.target.checked)}
                      className="w-4 h-4 accent-astro-cyan rounded cursor-pointer"
                    />
                  </label>
                </div>
              )}

              {/* Real-world NASA Mission Insight Box */}
              <div className="p-3 rounded-lg bg-space-950/80 border border-space-800 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                  <Info className="w-3.5 h-3.5" />
                  Flight Experiment Finding
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {isMicrogravity
                    ? "In zero-g, soot particles radiate heat outward symmetrically, reducing core temperature but allowing steady combustion at fuel flow rates 50% below terrestrial limits."
                    : "Terrestrial gravity creates buoyant upward drafts (2-3 m/s) that accelerate oxidizer mixing and stretch the flame tip."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Habitat Safety Impact */}
          <div className="p-4 rounded-xl border border-space-800 bg-space-900/40 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Shield className="w-4 h-4 text-ember-400" />
              Spacecraft Design Guideline
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Because microgravity flames do not rise toward ceiling smoke detectors, fire sensors in Lunar &amp; Martian habitats must be placed directly inside ventilation return ducts where airflow exceeds 0.05 m/s.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
