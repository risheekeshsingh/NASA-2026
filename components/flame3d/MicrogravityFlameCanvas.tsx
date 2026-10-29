"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

interface FlameMeshProps {
  isMicrogravity: boolean;
  oxygenLevel: number; // 15 to 40
  coolFlameActive: boolean;
}

function FlameMesh({ isMicrogravity, oxygenLevel, coolFlameActive }: FlameMeshProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const coolFlameRef = useRef<THREE.Mesh>(null);

  // Oxygen scaling factor: normal is 21%, Artemis is 34%
  const o2Scale = 0.8 + (oxygenLevel / 21) * 0.35;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      if (isMicrogravity) {
        // Pure spherical slow breathing in zero-g
        const pulse = Math.sin(time * 1.5) * 0.04;
        coreRef.current.scale.set(
          (1 + pulse) * o2Scale,
          (1 + pulse) * o2Scale,
          (1 + pulse) * o2Scale
        );
      } else {
        // Terrestrial 1-g buoyant upward flickering
        const flicker = Math.sin(time * 8) * 0.08 + Math.cos(time * 12) * 0.05;
        coreRef.current.scale.set(
          (0.85 + flicker * 0.4) * o2Scale,
          (1.6 + flicker * 0.8) * o2Scale,
          (0.85 + flicker * 0.4) * o2Scale
        );
        coreRef.current.position.y = 0.4 + flicker * 0.1;
      }
    }

    if (outerHaloRef.current) {
      const haloPulse = Math.sin(time * 1.2) * 0.03;
      const baseOuterScale = isMicrogravity ? 1.6 : 1.3;
      outerHaloRef.current.scale.set(
        (baseOuterScale + haloPulse) * o2Scale,
        (baseOuterScale + (isMicrogravity ? haloPulse : haloPulse * 1.8)) * o2Scale,
        (baseOuterScale + haloPulse) * o2Scale
      );
    }

    if (coolFlameRef.current && isMicrogravity && coolFlameActive) {
      const coolPulse = Math.sin(time * 0.8) * 0.05;
      coolFlameRef.current.scale.set(
        (2.3 + coolPulse) * o2Scale,
        (2.3 + coolPulse) * o2Scale,
        (2.3 + coolPulse) * o2Scale
      );
    }
  });

  return (
    <group>
      {/* Central Fuel Injector / Burner Stand */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 1.2, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Primary Inner Hot Reaction Core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color={isMicrogravity ? "#fef08a" : "#ffffff"}
          emissive={isMicrogravity ? "#f97316" : "#ffedd5"}
          emissiveIntensity={1.8}
          roughness={0.1}
        />
      </mesh>

      {/* Intermediate Flame Envelope */}
      <mesh ref={outerHaloRef} position={[0, isMicrogravity ? 0 : 0.3, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#c2410c"
          emissiveIntensity={1.2}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Microgravity Outer Cool Flame Zone (Invisible to naked eye in 1-G, steady in 0-G) */}
      {isMicrogravity && coolFlameActive && (
        <mesh ref={coolFlameRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial
            color="#00e5ff"
            emissive="#0097a7"
            emissiveIntensity={0.65}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}

export interface MicrogravityFlameCanvasProps {
  isMicrogravity: boolean;
  oxygenLevel: number;
  coolFlameActive: boolean;
}

export default function MicrogravityFlameCanvas({
  isMicrogravity,
  oxygenLevel,
  coolFlameActive,
}: MicrogravityFlameCanvasProps) {
  return (
    <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden bg-space-950 relative border border-space-800">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#fb923c" distance={8} />
        <directionalLight position={[4, 5, 4]} intensity={0.8} />

        <Float speed={isMicrogravity ? 1.2 : 0} rotationIntensity={isMicrogravity ? 0.3 : 0} floatIntensity={0.2}>
          <FlameMesh
            isMicrogravity={isMicrogravity}
            oxygenLevel={oxygenLevel}
            coolFlameActive={coolFlameActive}
          />
        </Float>

        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          autoRotate={isMicrogravity}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Overlay watermark & mode indicator */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
          Simulation Chamber Telemetry
        </span>
        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isMicrogravity ? "bg-astro-cyan animate-pulse" : "bg-ember-500"
            }`}
          />
          {isMicrogravity ? "0.0-g Freefall Diffusion Regime" : "1.0-g Buoyancy Convection"}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none text-right">
        <span className="text-[10px] font-mono text-slate-500 block">Drag to rotate &bull; Scroll to zoom</span>
        <span className="text-[10px] font-mono text-ember-400">R3F / Three.js Microgravity Core</span>
      </div>
    </div>
  );
}
