"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import { GravitySimRegime } from "./FlameSimCanvas";

const FlameSimCanvas = dynamic(() => import("./FlameSimCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60vh] min-h-[420px] lg:h-[550px] rounded-2xl border border-space-800 bg-space-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
      <div className="space-y-4">
        <Skeleton className="w-20 h-20 rounded-full mx-auto bg-space-800 animate-pulse" />
        <div className="space-y-1.5">
          <p className="text-sm font-display font-bold text-white">
            Initializing Flame Lab 3D Engine...
          </p>
          <p className="text-xs font-mono text-slate-400">
            Loading WebGL shaders and procedural microgravity scene
          </p>
        </div>
      </div>
    </div>
  ),
});

export interface FlameSimProps {
  className?: string;
  initialRegime?: GravitySimRegime;
  compact?: boolean;
}

export function FlameSim(props: FlameSimProps) {
  return <FlameSimCanvas {...props} />;
}

export default FlameSim;
