"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface EmberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
  alphaAmp: number;
  twinkleSpeed: number;
  phase: number;
}

interface FlameOrb {
  relX: number;
  relY: number;
  baseRadius: number;
  pulseAmp: number;
  pulseSpeed: number;
  phase: number;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
  css: string;
}

// 3 soft, spherical microgravity flame halos in the deep-space background
const FLAME_ORBS: FlameOrb[] = [
  { relX: 0.22, relY: 0.35, baseRadius: 180, pulseAmp: 42, pulseSpeed: 0.0011, phase: 0 },
  { relX: 0.78, relY: 0.65, baseRadius: 210, pulseAmp: 48, pulseSpeed: 0.0008, phase: 2.1 },
  { relX: 0.50, relY: 0.50, baseRadius: 145, pulseAmp: 32, pulseSpeed: 0.0014, phase: 4.2 },
];

const EMBER_COLORS = [
  "#ffffff", // White-hot incandescent core
  "#fff7ed", // Warm white
  "#fef08a", // Hot yellow
  "#fed7aa", // Amber highlight
  "#fb923c", // Vibrant flame orange
  "#ea580c", // Deep burning ember
  "#f87171", // Soft reddish halo
];

/**
 * Deterministic pseudo-random box-shadow generator for Layer 1 CSS starfield.
 * Uses a fixed-seed Linear Congruential Generator (LCG) evaluated once at module load,
 * guaranteeing zero Math.random during render and 100% identical SSR/client output.
 */
function generateDeterministicBoxShadows(
  count: number,
  seed: number,
  spreadX: number,
  spreadY: number,
  colorPrefix: string
): string {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const stars: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * spreadX);
    const y = Math.floor(rand() * spreadY);
    const alpha = (0.35 + rand() * 0.55).toFixed(2);
    stars.push(`${x}px ${y}px ${colorPrefix}${alpha})`);
  }
  return stars.join(", ");
}

const STATIC_STARS_1 = generateDeterministicBoxShadows(75, 42, 2200, 1600, "rgba(255,255,255,");
const STATIC_STARS_2 = generateDeterministicBoxShadows(40, 101, 2200, 1600, "rgba(251,146,60,");
const STATIC_STARS_3 = generateDeterministicBoxShadows(20, 202, 2200, 1600, "rgba(56,189,248,");

/**
 * Resolves per-route accent theme hue based on pathname:
 * "/" and "/simulation" = ember orange
 * "/rankings" and "/compare" = amber
 * "/insights" = cyan
 * "/agencies" = blue
 * others = ember
 */
function getThemeForRoute(pathname: string | null): RgbColor {
  if (!pathname) {
    return { r: 249, g: 115, b: 22, css: "rgba(249, 115, 22, 0.12)" }; // ember orange
  }
  if (pathname === "/" || pathname === "/simulation" || pathname.startsWith("/simulation/")) {
    return { r: 249, g: 115, b: 22, css: "rgba(249, 115, 22, 0.12)" }; // ember orange
  }
  if (
    pathname === "/rankings" ||
    pathname.startsWith("/rankings/") ||
    pathname === "/compare" ||
    pathname.startsWith("/compare/")
  ) {
    return { r: 245, g: 158, b: 11, css: "rgba(245, 158, 11, 0.12)" }; // amber
  }
  if (pathname === "/insights" || pathname.startsWith("/insights/")) {
    return { r: 6, g: 182, b: 212, css: "rgba(6, 182, 212, 0.12)" }; // cyan
  }
  if (pathname === "/agencies" || pathname.startsWith("/agencies/")) {
    return { r: 59, g: 130, b: 246, css: "rgba(59, 130, 246, 0.12)" }; // blue
  }
  return { r: 234, g: 88, b: 12, css: "rgba(234, 88, 12, 0.12)" }; // ember
}

export function SpaceFireBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [reducedEffects, setReducedEffects] = useState(false);

  const isSimulationPage =
    pathname === "/simulation" || pathname?.startsWith("/simulation/");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  // Parallax tracking
  const targetParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Theme color lerp tracking
  const activeTheme = getThemeForRoute(pathname);
  const targetThemeRef = useRef<RgbColor>(activeTheme);
  const currentThemeRgbRef = useRef<{ r: number; g: number; b: number }>({
    r: activeTheme.r,
    g: activeTheme.g,
    b: activeTheme.b,
  });

  // Update target theme when pathname changes
  useEffect(() => {
    targetThemeRef.current = getThemeForRoute(pathname);
  }, [pathname]);

  // Initial client setup & accessibility preferences check
  useEffect(() => {
    setMounted(true);

    // 1. Check system prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let systemReduced = mediaQuery.matches;

    // 2. Check localStorage toggle
    let storedReduced = false;
    try {
      const stored = localStorage.getItem("flamelens_reduce_bg");
      if (stored !== null) {
        storedReduced = stored === "true";
      }
    } catch {
      // localStorage may fail in restricted/sandboxed mode
    }

    setReducedEffects(systemReduced || storedReduced);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      systemReduced = e.matches;
      setReducedEffects(systemReduced || storedReduced);
    };

    const handleCustomToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      storedReduced = !!customEvent.detail;
      setReducedEffects(systemReduced || storedReduced);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("flamelens:reduce-bg", handleCustomToggle);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("flamelens:reduce-bg", handleCustomToggle);
    };
  }, []);

  // Main canvas particle and pulsing orb animation loop
  useEffect(() => {
    if (!mounted || reducedEffects || isSimulationPage) {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;
    const particleCount = isMobile ? 15 : 40;

    // Cap devicePixelRatio at 1.5 to maintain performance & low CPU usage
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Create particles inside useEffect (client-only, SSR safe)
    const particles: EmberParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Microgravity drift: slow random velocity with NO downward gravity bias
      const speed = 0.08 + Math.random() * 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 0.8 + Math.random() * 2.0, // 0.8px to 2.8px
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        baseAlpha: 0.35 + Math.random() * 0.45,
        alphaAmp: 0.15 + Math.random() * 0.25,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Parallax pointer tracking (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetParallaxRef.current.x = (e.clientX - cx) * 0.03;
      targetParallaxRef.current.y = (e.clientY - cy) * 0.03;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Pause RAF when document is hidden / tab inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
      } else {
        isPausedRef.current = false;
        if (!animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let lastTime = performance.now();
    let accumulatedTime = 0;

    const render = (now: number) => {
      if (isPausedRef.current) {
        animFrameRef.current = null;
        return;
      }

      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      accumulatedTime += delta;

      // Smoothly interpolate theme accent color
      const targetTheme = targetThemeRef.current;
      currentThemeRgbRef.current.r += (targetTheme.r - currentThemeRgbRef.current.r) * 0.05;
      currentThemeRgbRef.current.g += (targetTheme.g - currentThemeRgbRef.current.g) * 0.05;
      currentThemeRgbRef.current.b += (targetTheme.b - currentThemeRgbRef.current.b) * 0.05;

      const themeR = Math.round(currentThemeRgbRef.current.r);
      const themeG = Math.round(currentThemeRgbRef.current.g);
      const themeB = Math.round(currentThemeRgbRef.current.b);

      // Smoothly interpolate mouse parallax
      currentParallaxRef.current.x +=
        (targetParallaxRef.current.x - currentParallaxRef.current.x) * 0.05;
      currentParallaxRef.current.y +=
        (targetParallaxRef.current.y - currentParallaxRef.current.y) * 0.05;

      const px = currentParallaxRef.current.x;
      const py = currentParallaxRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3 pulsing microgravity flame orbs with radial gradients
      for (let i = 0; i < FLAME_ORBS.length; i++) {
        const orb = FLAME_ORBS[i];
        const pulsedRadius = Math.max(
          40,
          orb.baseRadius + Math.sin(accumulatedTime * orb.pulseSpeed + orb.phase) * orb.pulseAmp
        );
        const ox = orb.relX * width + px * 0.02;
        const oy = orb.relY * height + py * 0.02;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, pulsedRadius);
        grad.addColorStop(0, `rgba(${themeR}, ${themeG}, ${themeB}, 0.09)`);
        grad.addColorStop(0.45, `rgba(${themeR}, ${themeG}, ${themeB}, 0.035)`);
        grad.addColorStop(1, `rgba(${themeR}, ${themeG}, ${themeB}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, pulsedRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw floating ember particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Random slow drift without downward gravity
        p.x += p.vx;
        p.y += p.vy;

        // Gentle wrap-around at screen edges
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Twinkling opacity
        const alpha = Math.max(
          0.12,
          Math.min(0.95, p.baseAlpha + Math.sin(accumulatedTime * p.twinkleSpeed + p.phase) * p.alphaAmp)
        );

        const drawX = p.x + px * 0.04;
        const drawY = p.y + py * 0.04;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = p.radius * 3.2;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, reducedEffects, isSimulationPage]);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* =========================================================================
          Layer 1: Pure CSS Deep-Space Gradient, SSR-Safe Deterministic Starfield
          ========================================================================= */}
      {/* Deep-space base color */}
      <div className="absolute inset-0 bg-[#04060f]" />

      {/* Faint ember glow (#7c2d12 at ~15% opacity) bottom-left */}
      <div
        className="absolute -bottom-[20%] -left-[15%] w-[85vw] h-[85vw] max-w-[950px] max-h-[950px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 45, 18, 0.15) 0%, rgba(124, 45, 18, 0.05) 50%, transparent 75%)",
        }}
      />

      {/* Faint cyan glow (#0e7490 at ~10% opacity) top-right */}
      <div
        className="absolute -top-[20%] -right-[15%] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 116, 144, 0.10) 0%, rgba(14, 116, 144, 0.03) 50%, transparent 75%)",
        }}
      />

      {/* Dynamic route accent hue glow with smooth CSS transition */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(ellipse at 50% 25%, ${activeTheme.css} 0%, transparent 70%)`,
        }}
      />

      {/* CSS Star-field via layered box-shadows (SSR Safe, Zero Hydration Mismatch) */}
      <div
        className="absolute top-0 left-0 w-[1px] h-[1px] rounded-full opacity-80"
        style={{ boxShadow: STATIC_STARS_1 }}
      />
      <div
        className="absolute top-0 left-0 w-[1.5px] h-[1.5px] rounded-full opacity-70"
        style={{ boxShadow: STATIC_STARS_2 }}
      />
      <div
        className="absolute top-0 left-0 w-[2px] h-[2px] rounded-full opacity-60"
        style={{ boxShadow: STATIC_STARS_3 }}
      />

      {/* Very faint orbital ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] sm:w-[1150px] sm:h-[580px] rounded-[50%] border border-white/[0.035] rotate-[-16deg] pointer-events-none"
      />

      {/* =========================================================================
          Layer 2: Client-Only requestAnimationFrame Canvas Embers & Pulsing Orbs
          ========================================================================= */}
      {mounted && !reducedEffects && !isSimulationPage && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in"
          style={{ display: "block" }}
        />
      )}

      {/* =========================================================================
          Accessibility & Contrast Layer: Dark overlay ensuring WCAG AA readability
          ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,6,15,0.40) 0%, rgba(4,6,15,0.55) 50%, rgba(4,6,15,0.65) 100%)",
        }}
      />
    </div>
  );
}
