"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type GravityRegime = "microgravity" | "lunar" | "martian" | "earth";

export interface GravityTelemetry {
  regime: GravityRegime;
  name: string;
  badgeLabel: string;
  gValue: number; // in g
  color: "cyan" | "ember" | "primary" | "secondary";
  accentHex: string;
  missionContext: string;
  pressureKPa: number;
  pressurePsi: number;
  oxygenPercent: number;
  flowVelocityCmS: number;
  ambientTempC: number;
  flameShape: string;
  combustionMode: string;
  suppressionAgent: string;
}

export const GRAVITY_REGIMES: Record<GravityRegime, GravityTelemetry> = {
  microgravity: {
    regime: "microgravity",
    name: "Orbital Microgravity",
    badgeLabel: "Microgravity Active",
    gValue: 0.000001,
    color: "cyan",
    accentHex: "#00e5ff",
    missionContext: "ISS Destiny / Columbus CIR & Cygnus Saffire (LEO)",
    pressureKPa: 101.3,
    pressurePsi: 14.7,
    oxygenPercent: 20.9,
    flowVelocityCmS: 8.5,
    ambientTempC: 21.5,
    flameShape: "Spherical, pale blue diffusion envelope",
    combustionMode: "Diffusion-controlled (Zero natural convection)",
    suppressionAgent: "Fine Water Mist / CO2 flood (Zero buoyant settling)",
  },
  lunar: {
    regime: "lunar",
    name: "Lunar Surface Gravity",
    badgeLabel: "Lunar Gravity (0.16g)",
    gValue: 0.166,
    color: "ember",
    accentHex: "#f97316",
    missionContext: "Artemis Base Camp Surface Habitat",
    pressureKPa: 56.0,
    pressurePsi: 8.2,
    oxygenPercent: 34.0,
    flowVelocityCmS: 12.0,
    ambientTempC: 22.0,
    flameShape: "Slightly elongated rounded dome with dim soot trail",
    combustionMode: "Weak buoyant convection + diffusion dominance",
    suppressionAgent: "Hypobaric N2 inert gas displacement",
  },
  martian: {
    regime: "martian",
    name: "Martian Surface Gravity",
    badgeLabel: "Mars Gravity (0.38g)",
    gValue: 0.38,
    color: "primary",
    accentHex: "#ef4444",
    missionContext: "Mars Transit Habitat / Surface Base",
    pressureKPa: 65.5,
    pressurePsi: 9.5,
    oxygenPercent: 28.0,
    flowVelocityCmS: 15.0,
    ambientTempC: 20.0,
    flameShape: "Transitional teardrop with low-speed buoyant plume",
    combustionMode: "Moderate buoyancy with reduced thermal draft",
    suppressionAgent: "Atmospheric CO2 recovery + Halon replacement",
  },
  earth: {
    regime: "earth",
    name: "Terrestrial Baseline",
    badgeLabel: "Earth Baseline (1.0g)",
    gValue: 1.0,
    color: "secondary",
    accentHex: "#10b981",
    missionContext: "Ground Testing Baseline (NASA Glenn / WSTF)",
    pressureKPa: 101.3,
    pressurePsi: 14.7,
    oxygenPercent: 20.9,
    flowVelocityCmS: 25.0,
    ambientTempC: 21.0,
    flameShape: "Classic tall teardrop with bright yellow incandescence",
    combustionMode: "Buoyancy-dominated rapid convective draft",
    suppressionAgent: "Standard gravity settling foam / CO2 blanket",
  },
};

interface GravityContextType {
  regime: GravityRegime;
  telemetry: GravityTelemetry;
  setRegime: (regime: GravityRegime) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  toggleModal: () => void;
}

const GravityContext = createContext<GravityContextType | undefined>(undefined);

export function GravityProvider({ children }: { children: React.ReactNode }) {
  const [regime, setRegimeState] = useState<GravityRegime>("microgravity");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safely restore user preference from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("flamelens_gravity_regime") as GravityRegime | null;
      if (saved && GRAVITY_REGIMES[saved]) {
        setRegimeState(saved);
      }
    } catch {
      // Ignore local storage restrictions
    }
  }, []);

  const setRegime = (newRegime: GravityRegime) => {
    setRegimeState(newRegime);
    try {
      localStorage.setItem("flamelens_gravity_regime", newRegime);
    } catch {
      // Ignore local storage restrictions
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <GravityContext.Provider
      value={{
        regime,
        telemetry: GRAVITY_REGIMES[regime],
        setRegime,
        isModalOpen,
        setIsModalOpen,
        toggleModal,
      }}
    >
      {children}
    </GravityContext.Provider>
  );
}

export function useGravity() {
  const context = useContext(GravityContext);
  if (!context) {
    throw new Error("useGravity must be used within a GravityProvider");
  }
  return context;
}
