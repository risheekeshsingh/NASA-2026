"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Experiment } from "@/types";

interface ExperimentConditionsChartProps {
  experiment: Experiment;
}

export function ExperimentConditionsChart({ experiment }: ExperimentConditionsChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 w-full rounded-xl bg-space-950 border border-space-850 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500">Initializing telemetry chart...</span>
      </div>
    );
  }

  // Normalized comparative parameters
  const expO2 = experiment.oxygenPercent ?? 21;
  const expPressure = experiment.pressureKPa ?? 101.3;
  const expFlow = experiment.flowVelocityCmS ?? 2.5;

  const chartData = [
    {
      parameter: "Oxygen (% O₂)",
      Experiment: expO2,
      EarthBaseline: 21,
      ArtemisSpec: 34,
    },
    {
      parameter: "Pressure (% atm)",
      Experiment: Math.round((expPressure / 101.3) * 100),
      EarthBaseline: 100,
      ArtemisSpec: Math.round((56.5 / 101.3) * 100),
    },
    {
      parameter: "Convective Flow (cm/s)",
      Experiment: expFlow,
      EarthBaseline: 250, // Typical natural draft ~2-3 m/s = 200-300 cm/s
      ArtemisSpec: 5,
    },
  ];

  return (
    <div className="w-full h-72 rounded-xl bg-space-950/80 p-4 border border-space-850">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-space-850 text-xs">
        <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">
          Environmental Matrix vs Flight Benchmarks
        </span>
        <span className="text-astro-cyan font-mono text-[11px] font-semibold">Recharts Engine</span>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="parameter"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#334155" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#090d1a",
              borderColor: "#334155",
              borderRadius: "0.5rem",
              fontSize: "12px",
              color: "#f8fafc",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }}
          />
          <Bar dataKey="Experiment" fill="#f97316" radius={[4, 4, 0, 0]} name={`${experiment.acronym}`} />
          <Bar dataKey="EarthBaseline" fill="#64748b" radius={[4, 4, 0, 0]} name="Earth (1-g / 1 atm)" />
          <Bar dataKey="ArtemisSpec" fill="#00e5ff" radius={[4, 4, 0, 0]} name="Artemis (34% O₂)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
