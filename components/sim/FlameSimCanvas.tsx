"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  MousePointerClick,
  Info,
  ExternalLink,
  Flame,
  Globe2,
  X,
  Sparkles,
} from "lucide-react";

export type GravitySimRegime = "microgravity" | "lunar" | "martian" | "earth";

interface FlameSimCanvasProps {
  className?: string;
  initialRegime?: GravitySimRegime;
  compact?: boolean;
}

/**
 * Deterministic Starfield generated once without Math.random during render
 */
function ProceduralStarfield() {
  const starPositions = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic spherical distribution based on golden ratio
      const phi = Math.acos(1 - 2 * ((i + 0.5) / count));
      const theta = Math.PI * (1 + 5 ** 0.5) * i;
      const radius = 24 + (i % 9);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

/**
 * Procedural Space Station Model (Destiny/Columbus Lab, Truss & Solar Panels)
 */
function ProceduralSpaceStation({
  reducedMotion,
  showHotspots,
}: {
  reducedMotion: boolean;
  showHotspots: boolean;
}) {
  const stationGroupRef = useRef<THREE.Group>(null);
  const [stationHotspotOpen, setStationHotspotOpen] = useState(false);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (stationGroupRef.current) {
      stationGroupRef.current.rotation.y = t * 0.12;
      stationGroupRef.current.rotation.x = Math.sin(t * 0.08) * 0.04;
    }
  });

  return (
    <group ref={stationGroupRef} position={[2.0, 0.1, 0]} scale={0.85}>
      {/* Central Integrated Truss */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Main Pressurized Lab Modules (Destiny / Columbus) */}
      <mesh position={[0, -0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 1.4, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Service Module */}
      <mesh position={[0, 0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.26, 0.9, 20]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cupola Observation Window Bubble */}
      <mesh position={[0, -0.48, 0.22]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00b4d8"
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* Solar Array Panel Wings */}
      <group>
        <mesh position={[-1.4, 0.55, 0]}>
          <boxGeometry args={[0.42, 1.25, 0.02]} />
          <meshStandardMaterial
            color="#0f2b5c"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[-1.4, -0.55, 0]}>
          <boxGeometry args={[0.42, 1.25, 0.02]} />
          <meshStandardMaterial
            color="#0f2b5c"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[1.4, 0.55, 0]}>
          <boxGeometry args={[0.42, 1.25, 0.02]} />
          <meshStandardMaterial
            color="#0f2b5c"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[1.4, -0.55, 0]}>
          <boxGeometry args={[0.42, 1.25, 0.02]} />
          <meshStandardMaterial
            color="#0f2b5c"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Heat Radiator Panels */}
        <mesh position={[-0.65, 0.32, 0.16]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.16, 0.65, 0.01]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0.65, 0.32, 0.16]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.16, 0.65, 0.01]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>

      {/* Hotspot Label for Space Station */}
      {showHotspots && (
        <Html position={[0, 1.1, 0]} distanceFactor={8} center>
          <div className="relative select-none pointer-events-auto">
            <button
              type="button"
              onClick={() => setStationHotspotOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-space-950/90 border border-cyan-400 text-[11px] font-mono font-bold text-astro-cyan shadow-cyan-glow hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
              aria-label="View ISS Destiny / CIR Experiment Details"
            >
              <span className="w-2 h-2 rounded-full bg-astro-cyan animate-pulse" />
              <span>ISS Destiny / CIR</span>
            </button>

            {stationHotspotOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-space-900/95 border border-cyan-500/40 text-left shadow-2xl backdrop-blur-md z-30">
                <div className="flex items-start justify-between gap-1 mb-1.5 border-b border-space-800 pb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-astro-cyan">
                    Combustion Integrated Rack
                  </span>
                  <button
                    type="button"
                    onClick={() => setStationHotspotOpen(false)}
                    className="p-0.5 text-slate-400 hover:text-white"
                    aria-label="Close hotspot info"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug mb-2">
                  Destiny Laboratory houses sealed combustion racks (CIR) that operate 100 kPa chambers testing droplet and gas flammability.
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-space-850">
                  <Link
                    href="/experiments/saffire-i"
                    className="text-[10px] font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    Saffire-I <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <span className="text-slate-600">&bull;</span>
                  <Link
                    href="/experiments/acme-cld"
                    className="text-[10px] font-mono text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    ACME-CLD <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Layered Procedural Flame Component
 * Matches the uploaded reference: burner stem on left, outer cool flame chemiluminescence,
 * middle luminous envelope, and inner hot incandescent core.
 */
function LayeredFlame({
  regime,
  reducedMotion,
  showHotspots,
}: {
  regime: GravitySimRegime;
  reducedMotion: boolean;
  showHotspots: boolean;
}) {
  const flameGroupRef = useRef<THREE.Group>(null);
  const outerEnvelopeRef = useRef<THREE.Mesh>(null);
  const middleLuminousRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const [flameHotspotOpen, setFlameHotspotOpen] = useState(false);

  // Flame dimensions tailored per gravitational regime
  const geometryParams = useMemo(() => {
    switch (regime) {
      case "microgravity":
        return {
          outerScale: [1.8, 1.8, 1.8] as [number, number, number],
          middleScale: [1.15, 1.15, 1.15] as [number, number, number],
          coreScale: [0.65, 0.65, 0.65] as [number, number, number],
          yOffset: 0.25,
          flickerSpeed: 0.8,
          flickerAmp: 0.015,
        };
      case "lunar":
        return {
          outerScale: [1.5, 2.05, 1.5] as [number, number, number],
          middleScale: [0.95, 1.35, 0.95] as [number, number, number],
          coreScale: [0.55, 0.78, 0.55] as [number, number, number],
          yOffset: 0.45,
          flickerSpeed: 1.8,
          flickerAmp: 0.035,
        };
      case "martian":
        return {
          outerScale: [1.3, 2.35, 1.3] as [number, number, number],
          middleScale: [0.85, 1.55, 0.85] as [number, number, number],
          coreScale: [0.5, 0.92, 0.5] as [number, number, number],
          yOffset: 0.6,
          flickerSpeed: 2.5,
          flickerAmp: 0.055,
        };
      case "earth":
      default:
        return {
          outerScale: [1.0, 2.85, 1.0] as [number, number, number],
          middleScale: [0.72, 1.85, 0.72] as [number, number, number],
          coreScale: [0.42, 1.15, 0.42] as [number, number, number],
          yOffset: 0.75,
          flickerSpeed: 4.2,
          flickerAmp: 0.09,
        };
    }
  }, [regime]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();

    // Natural breathing / buoyant flicker oscillation
    const flicker = Math.sin(t * geometryParams.flickerSpeed) * geometryParams.flickerAmp;

    if (outerEnvelopeRef.current) {
      outerEnvelopeRef.current.scale.set(
        geometryParams.outerScale[0] + flicker * 0.5,
        geometryParams.outerScale[1] + flicker * 1.5,
        geometryParams.outerScale[2] + flicker * 0.5
      );
    }
    if (middleLuminousRef.current) {
      middleLuminousRef.current.scale.set(
        geometryParams.middleScale[0] + flicker * 0.4,
        geometryParams.middleScale[1] + flicker * 1.2,
        geometryParams.middleScale[2] + flicker * 0.4
      );
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.scale.set(
        geometryParams.coreScale[0] + flicker * 0.3,
        geometryParams.coreScale[1] + flicker * 0.8,
        geometryParams.coreScale[2] + flicker * 0.3
      );
    }
  });

  return (
    <group ref={flameGroupRef} position={[-1.8, 0, 0]}>
      {/* Burner Nozzle Stem */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 1.1, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Burner Tip Ring */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Layered Flame Meshes centered above nozzle */}
      <group position={[0, geometryParams.yOffset, 0]}>
        {/* 1. Outer Chemiluminescent Cool Flame Envelope (Pale Teal / Cyan) */}
        <mesh ref={outerEnvelopeRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#0891b2"
            emissive="#06b6d4"
            emissiveIntensity={0.5}
            transparent
            opacity={0.32}
            roughness={0.1}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 2. Middle Luminous Flame Reaction Zone (Vibrant Orange) */}
        <mesh ref={middleLuminousRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ea580c"
            emissive="#f97316"
            emissiveIntensity={0.8}
            transparent
            opacity={0.72}
            roughness={0.2}
          />
        </mesh>

        {/* 3. Hot Incandescent Core (Warm Yellow / White) */}
        <mesh ref={innerCoreRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#fbbf24"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>

        {/* Dynamic Point Light from Flame */}
        <pointLight
          position={[0, 0, 0]}
          intensity={regime === "microgravity" ? 2.5 : 3.8}
          color={regime === "microgravity" ? "#38bdf8" : "#fb923c"}
          distance={8}
        />
      </group>

      {/* Flame Hotspot Label */}
      {showHotspots && (
        <Html position={[0, geometryParams.yOffset + 1.25, 0]} distanceFactor={8} center>
          <div className="relative select-none pointer-events-auto">
            <button
              type="button"
              onClick={() => setFlameHotspotOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-space-950/90 border border-amber-400 text-[11px] font-mono font-bold text-amber-300 shadow-ember-glow hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
              aria-label="View Flame Physics Facts"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>
                {regime === "microgravity"
                  ? "0-g Spherical Flame"
                  : regime === "lunar"
                  ? "0.16-g Lunar Dome"
                  : regime === "martian"
                  ? "0.38-g Mars Teardrop"
                  : "1-g Earth Buoyancy Plume"}
              </span>
            </button>

            {flameHotspotOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-space-900/95 border border-amber-500/40 text-left shadow-2xl backdrop-blur-md z-30">
                <div className="flex items-start justify-between gap-1 mb-1.5 border-b border-space-800 pb-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                    Microgravity Physics
                  </span>
                  <button
                    type="button"
                    onClick={() => setFlameHotspotOpen(false)}
                    className="p-0.5 text-slate-400 hover:text-white"
                    aria-label="Close flame hotspot"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug mb-2">
                  {regime === "microgravity"
                    ? "In zero-g, warm air has no natural buoyancy. Flames expand into calm spherical envelopes governed entirely by oxygen diffusion."
                    : regime === "earth"
                    ? "On Earth (1g), gravitational buoyancy forces hot air upward at ~2.5 m/s, creating tall, incandescent teardrops that flicker rapidly."
                    : "Partial gravity creates an intermediate balance between buoyant upward drafting and slow spherical diffusion."}
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-space-850">
                  <Link
                    href="/experiments/flex-2"
                    className="text-[10px] font-mono text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    FLEX-2 <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                  <span className="text-slate-600">&bull;</span>
                  <Link
                    href="/experiments/bass-ii"
                    className="text-[10px] font-mono text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    BASS-II <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Main FlameSimCanvas Component
 */
export default function FlameSimCanvas({
  className = "",
  initialRegime = "microgravity",
  compact = false,
}: FlameSimCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // States
  const [regime, setRegime] = useState<GravitySimRegime>(initialRegime);
  const [isActive, setIsActive] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // 1. Accessibility: Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // 2. WebGL Hardware Capability Detection
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // 3. Pause rendering when scrolled offscreen (IntersectionObserver)
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut: Escape releases active scroll trap
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  // View control actions
  const handleZoomIn = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2);
      controlsRef.current.update();
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2);
      controlsRef.current.update();
    }
  }, []);

  const handleResetView = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.update();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-space-800 bg-space-950 shadow-2xl transition-all ${
        compact ? "h-[380px]" : "h-[60vh] min-h-[420px] lg:h-[550px]"
      } ${isActive ? "touch-none ring-1 ring-cyan-500/50" : "touch-pan-y"} ${className}`}
      onPointerLeave={() => setIsActive(false)}
      tabIndex={0}
      aria-label="Interactive 3D Microgravity and Planetary Flame Simulator"
    >
      {/* 1. THREE.JS 3D CANVAS OR CSS GRADIENT FALLBACK */}
      {hasWebGL ? (
        <Canvas
          camera={{ position: [0, 0.4, 5.8], fov: 46 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          frameloop={isVisible ? "always" : "demand"}
          className="w-full h-full"
        >
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 3]} intensity={1.1} color="#ffffff" />
          <directionalLight position={[-4, -3, -2]} intensity={0.3} color="#0891b2" />

          {/* Procedural Stars */}
          <ProceduralStarfield />

          {/* 3D Scene Elements */}
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
            <LayeredFlame
              regime={regime}
              reducedMotion={prefersReducedMotion}
              showHotspots={showHotspots}
            />
            <ProceduralSpaceStation
              reducedMotion={prefersReducedMotion}
              showHotspots={showHotspots}
            />
          </Float>

          {/* drei OrbitControls with Strict Scroll-Hijack Fix */}
          <OrbitControls
            ref={controlsRef}
            enabled={isActive}
            enableZoom={isActive}
            enableRotate={isActive}
            enablePan={isActive}
            enableDamping
            dampingFactor={0.06}
            minDistance={3}
            maxDistance={14}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.3}
            autoRotate={autoRotate && !prefersReducedMotion}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      ) : (
        /* CSS Gradient Fallback when WebGL is unavailable */
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-space-950 via-space-900 to-space-950 text-center space-y-4">
          <div className="relative w-32 h-32 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-cyan-glow">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-display font-bold text-white">
              WebGL Hardware Acceleration Offline
            </p>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              Rendering CSS gradient simulation fallback. Enable WebGL in your browser settings to access full 3D interactive manipulation.
            </p>
          </div>
        </div>
      )}

      {/* 2. SCROLL-HIJACK FIX OVERLAY (Only visible when inactive) */}
      {!isActive && hasWebGL && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Click to activate 3D orbital simulation controls"
          onClick={() => setIsActive(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsActive(true);
            }
          }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-space-950/40 backdrop-blur-[1px] cursor-pointer group transition-opacity"
        >
          <div className="px-4 py-2.5 rounded-full bg-space-900/95 border border-cyan-500/40 text-xs font-mono text-white shadow-2xl flex items-center gap-2 group-hover:border-cyan-400 group-hover:bg-space-850 transition-all">
            <MousePointerClick className="w-4 h-4 text-astro-cyan animate-bounce" />
            <span className="font-semibold">Click / Tap to interact with 3D Canvas</span>
          </div>
        </div>
      )}

      {/* 3. ACTIVE STATUS RELEASE PILL (Top Center) */}
      {isActive && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-space-950/90 border border-cyan-500/50 text-[10px] font-mono text-astro-cyan shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-astro-cyan animate-pulse" />
          <span>Active Orbit Mode (Esc to release scroll)</span>
          <button
            type="button"
            onClick={() => setIsActive(false)}
            className="p-0.5 rounded hover:bg-space-800 text-slate-400 hover:text-white"
            aria-label="Release canvas interaction"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 4. GRAVITATIONAL REGIME MODE SELECTOR (Top Left) */}
      <div className="absolute top-3 left-3 z-30 pointer-events-auto flex flex-wrap items-center gap-1.5 bg-space-950/85 backdrop-blur-md p-1.5 rounded-xl border border-space-800 shadow-xl">
        <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold pl-1 hidden sm:inline">
          Regime:
        </span>
        <button
          type="button"
          onClick={() => setRegime("microgravity")}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
            regime === "microgravity"
              ? "bg-astro-cyan text-space-950 shadow-cyan-glow"
              : "text-slate-300 hover:text-white hover:bg-space-850"
          }`}
          aria-label="Select Microgravity (0g) Spherical Flame"
        >
          0-g (Orbit)
        </button>
        <button
          type="button"
          onClick={() => setRegime("lunar")}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
            regime === "lunar"
              ? "bg-amber-500 text-white shadow-ember-glow"
              : "text-slate-300 hover:text-white hover:bg-space-850"
          }`}
          aria-label="Select Moon (0.16g) Gravity Flame"
        >
          0.16-g (Moon)
        </button>
        <button
          type="button"
          onClick={() => setRegime("martian")}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
            regime === "martian"
              ? "bg-red-500 text-white shadow-ember-glow"
              : "text-slate-300 hover:text-white hover:bg-space-850"
          }`}
          aria-label="Select Mars (0.38g) Gravity Flame"
        >
          0.38-g (Mars)
        </button>
        <button
          type="button"
          onClick={() => setRegime("earth")}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
            regime === "earth"
              ? "bg-emerald-500 text-white shadow-sm"
              : "text-slate-300 hover:text-white hover:bg-space-850"
          }`}
          aria-label="Select Earth (1g) Buoyant Plume Flame"
        >
          1.0-g (Earth)
        </button>
      </div>

      {/* 5. VISIBLE CONTROLS: ZOOM IN / ZOOM OUT / RESET / AUTO-ROTATE (Top Right / Mobile Thumb Friendly) */}
      <div className="absolute top-3 right-3 z-30 pointer-events-auto flex items-center gap-1.5 bg-space-950/85 backdrop-blur-md p-1.5 rounded-xl border border-space-800 shadow-xl">
        {/* Zoom In */}
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-space-800 transition-colors focus:outline-none focus:ring-1 focus:ring-astro-cyan"
          title="Zoom in 3D simulation"
          aria-label="Zoom in 3D simulation"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-space-800 transition-colors focus:outline-none focus:ring-1 focus:ring-astro-cyan"
          title="Zoom out 3D simulation"
          aria-label="Zoom out 3D simulation"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset View */}
        <button
          type="button"
          onClick={handleResetView}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-space-800 transition-colors focus:outline-none focus:ring-1 focus:ring-astro-cyan"
          title="Reset 3D camera view"
          aria-label="Reset 3D camera view"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Auto Rotate Toggle */}
        <button
          type="button"
          onClick={() => setAutoRotate((prev) => !prev)}
          className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-astro-cyan ${
            autoRotate
              ? "text-astro-cyan bg-cyan-500/15"
              : "text-slate-400 hover:text-white hover:bg-space-800"
          }`}
          title={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
          aria-label={autoRotate ? "Pause auto-rotation" : "Enable auto-rotation"}
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Toggle Hotspots */}
        <button
          type="button"
          onClick={() => setShowHotspots((prev) => !prev)}
          className={`p-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
            showHotspots
              ? "text-amber-400 bg-amber-500/15"
              : "text-slate-400 hover:text-white hover:bg-space-800"
          }`}
          title={showHotspots ? "Hide 3D Hotspots" : "Show 3D Hotspots"}
          aria-label={showHotspots ? "Hide 3D Hotspots" : "Show 3D Hotspots"}
        >
          Pins
        </button>
      </div>

      {/* 6. EDUCATIONAL DISCLAIMER & NAVIGATION FOOTER (Bottom) */}
      <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
        <div className="bg-space-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-space-800 shadow-md">
          <span className="text-amber-400 font-semibold">* Note:</span> Educational illustration &bull; Not a CFD numerical grid
        </div>

        <div className="pointer-events-auto bg-space-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-space-800 shadow-md flex items-center gap-2">
          <span>Explore flight data:</span>
          <Link
            href="/experiments"
            className="text-astro-cyan hover:underline font-semibold"
          >
            23 Experiments &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
