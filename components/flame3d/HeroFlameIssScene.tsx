"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import {
  Radio,
  Box,
} from "lucide-react";

const PRIMARY_VIDEO_URL = "https://video-public.canva.com/VAF-73sv_T8/v/c1ba321ece.mp4";
const LOCAL_FALLBACK_URL = "/space-flame.mp4";

/**
 * Procedural Low-Poly Space Station (ISS-like) Model
 */
function SpaceStationModel() {
  const stationRef = useRef<THREE.Group>(null);
  const solarWingsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (stationRef.current) {
      stationRef.current.rotation.y = time * 0.15;
      stationRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={stationRef} position={[1.4, 0.2, 0]} scale={0.75}>
      {/* Central Integrated Truss Structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Pressurized Laboratory Modules (Destiny / Columbus / Kibo) */}
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 1.4, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Service & Propulsion Module (Zvezda / Node) */}
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.24, 0.8, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Cupola Observation Window Bubble */}
      <mesh position={[0, -0.42, 0.2]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#00e5ff" emissive="#0097a7" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>

      {/* Solar Array Wings */}
      <group ref={solarWingsRef}>
        <mesh position={[-1.4, 0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-1.4, -0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.4, 0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.4, -0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Thermal Radiator Panels */}
        <mesh position={[-0.6, 0.3, 0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.01]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0.6, 0.3, 0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.01]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Spherical Microgravity Flame with Emissive Core & Cool Flame Envelope
 */
function SphericalMicrogravityFlame() {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const coolFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      const pulse = Math.sin(time * 2.0) * 0.04;
      coreRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    }

    if (haloRef.current) {
      const haloPulse = Math.sin(time * 1.5) * 0.05;
      haloRef.current.scale.set(1.4 + haloPulse, 1.4 + haloPulse, 1.4 + haloPulse);
    }

    if (coolFlameRef.current) {
      const coolPulse = Math.sin(time * 1.0) * 0.06;
      coolFlameRef.current.scale.set(2.0 + coolPulse, 2.0 + coolPulse, 2.0 + coolPulse);
    }
  });

  return (
    <group position={[-1.3, 0, 0]}>
      {/* Inner Radiant Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#fffbeb"
          emissive="#f59e0b"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>

      {/* Intermediate Orange Reaction Envelope */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#c2410c"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Cyan Cool Flame Aura */}
      <mesh ref={coolFlameRef}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Microgravity Burner Tip Stand */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function HeroFlameIssScene() {
  const [viewMode, setViewMode] = useState<"video" | "3d">("video");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(PRIMARY_VIDEO_URL);
  const [hasWebGl, setHasWebGl] = useState(true);
  const [isOnScreen, setIsOnScreen] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to render 3D canvas only when on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Check WebGL availability for 3D tab
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGl(false);
      }
    } catch {
      setHasWebGl(false);
    }
  }, []);

  // Guarantee continuous, zero-error autoplay execution across all browsers
  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Autoplay policy prevented immediate playback; attach single-interaction listener
          console.log("Autoplay deferred by browser policy, awaiting interaction:", error);
          const handleInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
          };
          window.addEventListener("click", handleInteraction, { once: true });
          window.addEventListener("touchstart", handleInteraction, { once: true });
          window.addEventListener("keydown", handleInteraction, { once: true });
        });
    }
  }, []);

  // Initialize playback immediately when viewMode is video
  useEffect(() => {
    if (viewMode === "video") {
      playVideo();
    }
  }, [viewMode, videoSrc, playVideo]);

  // Handle visibility changes (resume continuous loop when user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && viewMode === "video" && videoRef.current) {
        if (videoRef.current.paused) {
          playVideo();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [viewMode, playVideo]);

  // Fallback handler if external URL encounters CORS or network hiccups
  const handleVideoError = () => {
    console.warn("Primary Canva video URL unreachable or blocked, seamlessly switching to local asset.");
    if (videoSrc !== LOCAL_FALLBACK_URL) {
      setVideoSrc(LOCAL_FALLBACK_URL);
      if (videoRef.current) {
        videoRef.current.load();
        playVideo();
      }
    }
  };

  // Continuous loop safety watchdog
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="group w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden relative border border-space-800 bg-space-950/90 backdrop-blur-md shadow-2xl transition-all"
    >
      {/* 1. CONTINUOUS ORBITAL VIDEO FEED (DEFAULT VIEW) */}
      {viewMode === "video" && (
        <div className="absolute inset-0 w-full h-full bg-space-950">
          {/* Subtle loading skeleton before first frame */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-space-950">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full border-2 border-astro-cyan/30 border-t-astro-cyan animate-spin mx-auto" />
                <p className="text-xs font-mono text-slate-400">Connecting to Continuous Orbital Stream...</p>
              </div>
            </div>
          )}

          {/* Continuous Autoplaying Looping HTML5 Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            tabIndex={-1}
            aria-hidden="true"
            aria-label="Continuous orbital Earth observation video in microgravity"
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsPlaying(true)}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className={`w-full h-full object-cover pointer-events-none select-none transition-opacity duration-700 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={PRIMARY_VIDEO_URL} type="video/mp4" />
            <source src={LOCAL_FALLBACK_URL} type="video/mp4" />
            Your browser does not support HTML5 video playback.
          </video>

          {/* Transparent interaction shield & Vignette: intercepts mouse events so browser video hover overlay never triggers */}
          <div className="absolute inset-0 pointer-events-auto bg-gradient-to-t from-space-950/90 via-transparent to-space-950/70" />
          <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-space-950/40" />
        </div>
      )}

      {/* 2. 3D R3F MICROGRAVITY PHYSICS SIM (OPTIONAL TOGGLE) */}
      {viewMode === "3d" && (
        <div className="absolute inset-0 w-full h-full bg-space-950/80">
          {hasWebGl && isOnScreen ? (
            <Canvas
              camera={{ position: [0, 0, 4.6], fov: 48 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.45} />
              <pointLight position={[-1.3, 0, 0]} intensity={3.5} color="#fb923c" distance={7} />
              <directionalLight position={[4, 5, 3]} intensity={1.2} color="#ffffff" />

              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
                <SphericalMicrogravityFlame />
                <SpaceStationModel />
              </Float>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 1.7}
                minPolarAngle={Math.PI / 2.3}
              />
            </Canvas>
          ) : hasWebGl && !isOnScreen ? (
            <div className="w-full h-full bg-space-950/80" />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-ember-500 to-astro-cyan mx-auto animate-pulse blur-sm" />
                <p className="text-xs font-mono text-slate-400">
                  WebGL acceleration offline &bull; Microgravity Flame Simulation Fallback
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. FLOATING HUD BADGE & STATUS HEADER (Exact match with original screenshot) */}
      <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {/* Left Live Indicator & Title */}
        <div className="flex items-center gap-2 bg-space-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-space-800 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-astro-cyan animate-pulse shadow-cyan-glow" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
            {viewMode === "video" ? "LIVE R3F MICROGRAVITY PHYSICS SIM" : "LIVE R3F MICROGRAVITY PHYSICS SIM"}
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-600" />
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-astro-cyan">
            {viewMode === "video" ? "CONTINUOUS STREAM" : "INTERACTIVE 3D"}
          </span>
        </div>

        {/* Right View Switcher Pills (Pointer events enabled) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-space-950/80 backdrop-blur-md p-1 rounded-full border border-space-800 shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode("video")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              viewMode === "video"
                ? "bg-astro-cyan text-space-950 font-bold shadow-cyan-glow"
                : "text-slate-400 hover:text-white hover:bg-space-850"
            }`}
            title="Continuous Orbital Earth Observation Video"
          >
            <Radio className="w-3 h-3" />
            <span>Live Video</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all ${
              viewMode === "3d"
                ? "bg-ember-500 text-white font-bold shadow-ember-glow"
                : "text-slate-400 hover:text-white hover:bg-space-850"
            }`}
            title="Interactive Three.js 3D Microgravity Physics Sim"
          >
            <Box className="w-3 h-3" />
            <span>3D Sim</span>
          </button>
        </div>
      </div>
    </div>
  );
}
