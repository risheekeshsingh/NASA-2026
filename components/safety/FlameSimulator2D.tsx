"use client";

import React, { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Sliders, RotateCcw, AlertTriangle, Wind, Compass, Sparkles, Flame, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

type GravityPreset = "0g" | "lunar" | "mars" | "earth";

interface GravitySpec {
  id: GravityPreset;
  label: string;
  gValue: number; // in g
  description: string;
}

const GRAVITY_SPECS: Record<GravityPreset, GravitySpec> = {
  "0g": { id: "0g", label: "0.00g (Microgravity / Orbit)", gValue: 0.0, description: "No buoyancy; diffusion-controlled spherical flame halo." },
  lunar: { id: "lunar", label: "0.16g (Lunar Surface)", gValue: 0.16, description: "Weak buoyancy; wide domed flame with slow convective draft." },
  mars: { id: "mars", label: "0.38g (Martian Surface)", gValue: 0.38, description: "Moderate buoyancy; transitional oval teardrop plume." },
  earth: { id: "earth", label: "1.00g (Terrestrial Earth)", gValue: 1.0, description: "Strong buoyancy; narrow flickering buoyant teardrop." },
};

export function FlameSimulator2D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation Controls State
  const [gravityPreset, setGravityPreset] = useState<GravityPreset>("0g");
  const [customGravity, setCustomGravity] = useState<number>(0.0);
  const [airflowCmS, setAirflowCmS] = useState<number>(5.0); // 0 to 30 cm/s
  const [coolFlameMode, setCoolFlameMode] = useState<boolean>(false);
  const [showParticles, setShowParticles] = useState<boolean>(true);

  // Derived current g
  const currentG = customGravity;

  // Sync preset changes to slider
  const handlePresetSelect = (preset: GravityPreset) => {
    setGravityPreset(preset);
    setCustomGravity(GRAVITY_SPECS[preset].gValue);
  };

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Soot/Diffusion Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width * 0.45;
      const centerY = height * 0.58;

      // Clear Canvas with subtle dark-space radial gradient
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);

      // Draw Chamber Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Airflow Vector arrows background
      if (airflowCmS > 0) {
        ctx.strokeStyle = "rgba(6, 182, 212, 0.12)";
        ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
        ctx.lineWidth = 1;
        const arrowSpacing = 60;
        const arrowLength = Math.min(28, airflowCmS * 1.2);
        for (let ay = 30; ay < height; ay += arrowSpacing) {
          for (let ax = 20; ax < width; ax += arrowSpacing) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(ax + arrowLength, ay);
            ctx.stroke();
            // Arrow tip
            ctx.beginPath();
            ctx.moveTo(ax + arrowLength, ay);
            ctx.lineTo(ax + arrowLength - 4, ay - 2.5);
            ctx.lineTo(ax + arrowLength - 4, ay + 2.5);
            ctx.fill();
          }
        }
      }

      // Draw Burner Nozzle / Droplet Anchor
      ctx.save();
      // Burner post
      ctx.fillStyle = "#334155";
      ctx.fillRect(centerX - 4, centerY + 8, 8, height - centerY - 8);
      // Burner ceramic tip
      ctx.fillStyle = "#94a3b8";
      ctx.beginPath();
      ctx.arc(centerX, centerY + 8, 6, 0, Math.PI * 2);
      ctx.fill();
      // Liquid droplet or fuel anchor
      ctx.fillStyle = coolFlameMode ? "#38bdf8" : "#fbbf24";
      ctx.beginPath();
      ctx.arc(centerX, centerY + 2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Flame Geometry Calculations
      // 0g: aspectRatio = 1.0 (Sphere)
      // 1g: aspectRatio = 2.4 - 3.2 (Teardrop)
      const buoyancyFactor = Math.pow(currentG, 0.5); // non-linear buoyancy onset
      const elongation = 1.0 + buoyancyFactor * 2.2;
      const flameWidth = 44 / (1.0 + buoyancyFactor * 0.4);
      const flameHeight = flameWidth * elongation;

      // Airflow deflection
      // Airflow pushes the flame center to the right: dx = airflow * factor
      const deflectionX = (airflowCmS / 30) * (36 - buoyancyFactor * 14);
      // Buoyant lift shifts center upward: dy = buoyancy * factor
      const buoyantLiftY = -buoyancyFactor * 32;

      const flameApexX = centerX + deflectionX;
      const flameApexY = centerY + buoyantLiftY;

      // Subtle flickering frequency based on gravity (Earth flames flicker at 10-15 Hz; space flames are steady)
      const flickerAmp = currentG * 0.08;
      const flicker = 1.0 + Math.sin(time * (4 + currentG * 12)) * flickerAmp;

      // Render Flame Layers (outer diffuse envelope -> intermediate reaction zone -> blue base)
      ctx.save();

      if (coolFlameMode) {
        // COOL FLAME: Pure spherical, non-luminous pale blue/violet ring
        const coolRadius = 52 * (1.0 + Math.sin(time * 1.5) * 0.02);
        const coolGrad = ctx.createRadialGradient(
          centerX + deflectionX * 0.3,
          centerY,
          coolRadius * 0.4,
          centerX + deflectionX * 0.3,
          centerY,
          coolRadius
        );
        coolGrad.addColorStop(0, "rgba(56, 189, 248, 0.05)");
        coolGrad.addColorStop(0.7, "rgba(99, 102, 241, 0.35)");
        coolGrad.addColorStop(0.85, "rgba(168, 85, 247, 0.5)");
        coolGrad.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = coolGrad;
        ctx.beginPath();
        ctx.arc(centerX + deflectionX * 0.3, centerY, coolRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner cool flame thermal core ring
        ctx.strokeStyle = "rgba(147, 197, 253, 0.45)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(centerX + deflectionX * 0.3, centerY, coolRadius * 0.75, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // HOT FLAME: Dual-mode Teardrop vs Sphere
        if (currentG < 0.05) {
          // PURE SPHERE (Microgravity)
          const sphereRadius = (flameWidth * 1.1) * flicker;
          const sphereGrad = ctx.createRadialGradient(
            flameApexX,
            centerY,
            sphereRadius * 0.15,
            flameApexX,
            centerY,
            sphereRadius * 1.25
          );

          sphereGrad.addColorStop(0, "rgba(254, 240, 138, 0.95)"); // Bright pale yellow core
          sphereGrad.addColorStop(0.45, "rgba(245, 158, 11, 0.75)"); // Amber middle
          sphereGrad.addColorStop(0.75, "rgba(239, 68, 68, 0.45)"); // Sooty red edge
          sphereGrad.addColorStop(0.9, "rgba(59, 130, 246, 0.5)"); // Thin blue soot-free outer reaction zone
          sphereGrad.addColorStop(1, "rgba(59, 130, 246, 0)");

          ctx.fillStyle = sphereGrad;
          ctx.beginPath();
          ctx.arc(flameApexX, centerY, sphereRadius * 1.15, 0, Math.PI * 2);
          ctx.fill();

          // Blue outer diffusion envelope ring
          ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(flameApexX, centerY, sphereRadius * 0.95, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // BUOYANT TEARDROP (Earth / Lunar / Mars)
          // Outer Glow Gradient
          const flameBaseY = centerY + 4;
          const flameTipY = flameApexY - (flameHeight * 0.8) * flicker;
          const flameMidY = (flameBaseY + flameTipY) / 2;

          ctx.beginPath();
          // Draw teardrop contour with bezier curves
          ctx.moveTo(centerX, flameBaseY);
          // Left curve to tip
          ctx.bezierCurveTo(
            centerX - flameWidth * 1.1,
            flameBaseY - flameHeight * 0.25,
            flameApexX - flameWidth * 0.5,
            flameMidY,
            flameApexX,
            flameTipY
          );
          // Right curve back to base
          ctx.bezierCurveTo(
            flameApexX + flameWidth * 0.5,
            flameMidY,
            centerX + flameWidth * 1.1 + deflectionX * 0.5,
            flameBaseY - flameHeight * 0.25,
            centerX,
            flameBaseY
          );
          ctx.closePath();

          const tearGrad = ctx.createLinearGradient(centerX, flameBaseY, flameApexX, flameTipY);
          tearGrad.addColorStop(0, "rgba(59, 130, 246, 0.8)"); // Blue base
          tearGrad.addColorStop(0.2, "rgba(245, 158, 11, 0.85)"); // Yellow/orange body
          tearGrad.addColorStop(0.7, "rgba(251, 191, 36, 0.95)"); // Bright luminous core
          tearGrad.addColorStop(0.95, "rgba(239, 68, 68, 0.5)"); // Sooty tip
          tearGrad.addColorStop(1, "rgba(239, 68, 68, 0)");

          ctx.fillStyle = tearGrad;
          ctx.fill();

          // Inner luminous core
          ctx.beginPath();
          const innerW = flameWidth * 0.55;
          ctx.moveTo(centerX, flameBaseY - 2);
          ctx.bezierCurveTo(
            centerX - innerW,
            flameBaseY - flameHeight * 0.2,
            flameApexX - innerW * 0.4,
            flameMidY,
            flameApexX,
            flameTipY + 12
          );
          ctx.bezierCurveTo(
            flameApexX + innerW * 0.4,
            flameMidY,
            centerX + innerW + deflectionX * 0.3,
            flameBaseY - flameHeight * 0.2,
            centerX,
            flameBaseY - 2
          );
          ctx.closePath();
          ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
          ctx.fill();
        }
      }

      ctx.restore();

      // PARTICLE EMISSION (Smoke & Soot Drift)
      if (showParticles && Math.random() < (currentG > 0.05 ? 0.6 : 0.35)) {
        const spawnX = currentG < 0.05 ? flameApexX + (Math.random() - 0.5) * flameWidth : flameApexX;
        const spawnY = currentG < 0.05 ? centerY + (Math.random() - 0.5) * flameWidth : centerY - flameHeight * 0.7;

        // Particle velocities:
        // In 1g: upward buoyant drift vy is negative, high
        // In 0g: radial diffusion vy and vx are small and random
        const buoyantVy = -currentG * (2.0 + Math.random() * 2.0);
        const airflowVx = (airflowCmS / 30) * (2.2 + Math.random() * 1.5);
        const radialVx = (Math.random() - 0.5) * (currentG < 0.05 ? 1.4 : 0.6);
        const radialVy = currentG < 0.05 ? (Math.random() - 0.5) * 1.4 : 0;

        particles.push({
          x: spawnX,
          y: spawnY,
          vx: airflowVx + radialVx,
          vy: buoyantVy + radialVy,
          radius: 2 + Math.random() * 3,
          opacity: 0.5 + Math.random() * 0.4,
          life: 0,
          maxLife: 45 + Math.random() * 30,
          color: coolFlameMode ? "#93c5fd" : currentG < 0.05 ? "#f97316" : "#64748b",
        });
      }

      // Update & Render Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.radius += 0.05;
        p.opacity = Math.max(0, 1 - p.life / p.maxLife);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.life >= p.maxLife || p.x > width || p.y < 0) {
          particles.splice(i, 1);
        }
      }

      // Overlay HUD Labels
      ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      ctx.font = "11px monospace";
      ctx.fillText(`g-Vector: ${currentG.toFixed(2)} g`, 16, 26);
      ctx.fillText(`Airflow: ${airflowCmS.toFixed(1)} cm/s`, 16, 42);
      ctx.fillText(
        `Regime: ${
          currentG < 0.05
            ? airflowCmS < 2
              ? "Molecular Diffusion (Quiescent)"
              : "Forced Convective Microgravity Flow"
            : "Buoyant Natural Convection"
        }`,
        16,
        58
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentG, airflowCmS, coolFlameMode, showParticles]);

  return (
    <div className="bg-space-900/90 border border-space-800 rounded-xl p-6 shadow-xl space-y-5">
      {/* Header with Mandatory Educational Flag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-space-850 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-ember-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-ember-400 font-semibold">
              Interactive 2D Flame Chamber
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Microgravity vs Terrestrial Flame Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Adjust gravity and ventilation to observe spherical diffusion envelopes transition into buoyant teardrop plumes.
          </p>
        </div>

        {/* Mandatory Label Notice */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Educational illustration, not a physics-accurate model</span>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 2D Canvas */}
        <div className="lg:col-span-2 relative bg-space-950 rounded-xl border border-space-800 overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[360px]">
          <canvas
            ref={canvasRef}
            width={620}
            height={380}
            className="w-full h-auto block select-none"
          />

          {/* Quick HUD Overlay at Bottom of Canvas */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-space-950/80 border border-space-800/70 backdrop-blur-sm text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>
                Flame: <strong className="text-white">{currentG < 0.05 ? "Spherical Halo" : "Buoyant Teardrop"}</strong>
              </span>
              <span>
                Cool Flame: <strong className={coolFlameMode ? "text-astro-cyan" : "text-slate-500"}>{coolFlameMode ? "ACTIVE (600 K)" : "OFF"}</strong>
              </span>
            </div>
            <span className="text-ember-400 hidden sm:inline">
              Grashof Gr ≈ {(currentG * 1.4e5).toExponential(1)}
            </span>
          </div>
        </div>

        {/* Right Col: Interactive Parameter Sliders */}
        <div className="space-y-5 bg-space-950/70 p-5 rounded-xl border border-space-850 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-space-850 pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-astro-cyan flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Chamber Variables
              </span>
              <button
                type="button"
                onClick={() => {
                  handlePresetSelect("0g");
                  setAirflowCmS(5.0);
                  setCoolFlameMode(false);
                }}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Gravity Level Presets */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 block font-medium">
                Gravity Environment ({customGravity.toFixed(2)} g):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(GRAVITY_SPECS) as GravityPreset[]).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`p-2 rounded-lg text-xs font-mono border text-left transition-all ${
                      gravityPreset === preset && customGravity === GRAVITY_SPECS[preset].gValue
                        ? "bg-ember-500/20 border-ember-500/60 text-ember-300 font-bold shadow-ember-glow"
                        : "bg-space-900 border-space-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {preset === "0g" ? "0g (Orbit)" : preset === "lunar" ? "Lunar (0.16g)" : preset === "mars" ? "Mars (0.38g)" : "Earth (1.0g)"}
                  </button>
                ))}
              </div>

              {/* Fine Gravity Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={customGravity}
                onChange={(e) => {
                  setCustomGravity(parseFloat(e.target.value));
                  setGravityPreset(parseFloat(e.target.value) === 0 ? "0g" : "earth");
                }}
                className="w-full accent-ember-500 mt-1 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block italic">
                {GRAVITY_SPECS[gravityPreset]?.description}
              </span>
            </div>

            {/* Airflow Velocity Slider */}
            <div className="space-y-1.5 pt-2 border-t border-space-850">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300 block font-medium">
                  Airflow Velocity:
                </label>
                <span className="text-xs font-mono text-astro-cyan font-bold">
                  {airflowCmS.toFixed(1)} cm/s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={airflowCmS}
                onChange={(e) => setAirflowCmS(parseFloat(e.target.value))}
                className="w-full accent-astro-cyan cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0 cm/s (Quiescent)</span>
                <span>15 cm/s (Peak)</span>
                <span>30 cm/s (Blowoff)</span>
              </div>
            </div>

            {/* Special Effect Toggles */}
            <div className="space-y-2 pt-2 border-t border-space-850">
              <label className="text-xs font-mono text-slate-300 block font-medium">
                Combustion Modes:
              </label>

              {/* Cool Flame Toggle */}
              <button
                type="button"
                onClick={() => setCoolFlameMode(!coolFlameMode)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                  coolFlameMode
                    ? "bg-cyan-950/60 border-cyan-500/60 text-cyan-300 font-bold"
                    : "bg-space-900 border-space-800 text-slate-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-astro-cyan" />
                  Cool Flame (FLEX)
                </span>
                <Badge variant={coolFlameMode ? "cyan" : "outline"} className="text-[10px]">
                  {coolFlameMode ? "ACTIVE" : "DISABLED"}
                </Badge>
              </button>

              {/* Soot Particle Drift Toggle */}
              <button
                type="button"
                onClick={() => setShowParticles(!showParticles)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                  showParticles
                    ? "bg-space-800 border-space-700 text-white"
                    : "bg-space-900 border-space-800 text-slate-400 hover:text-white"
                }`}
              >
                <span>Smoke / Soot Particles</span>
                <span className="text-[11px] text-slate-400">{showParticles ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>

          {/* Educational Note */}
          <div className="text-[11px] text-slate-400 border-t border-space-850 pt-3 leading-normal">
            Observed in NASA flight experiments: At <strong>0g</strong> with low ventilation (5–15 cm/s), solid fuels like SIBAL and PMMA sustain stable upstream flame spread (see <span className="text-ember-400 font-mono">saffire-i</span> & <span className="text-ember-400 font-mono">bass-ii</span>).
          </div>
        </div>
      </div>
    </div>
  );
}
