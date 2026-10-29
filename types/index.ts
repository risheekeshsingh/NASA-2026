// Central TypeScript definitions for FlameLens

export type Agency =
  | "NASA"
  | "ESA"
  | "JAXA"
  | "CSA"
  | "Roscosmos"
  | "CNSA"
  | "Multi";

export type Platform =
  | "ISS"
  | "Cygnus"
  | "Drop tower"
  | "Parabolic flight"
  | "Sounding rocket"
  | "Tiangong"
  | "Shuttle";

export type FuelType =
  | "solid"
  | "gas"
  | "liquid"
  | "droplet"
  | "smoldering";

export type GravityLevel =
  | "microgravity"
  | "lunar"
  | "martian";

export interface Experiment {
  id: string;
  name: string;
  acronym: string;
  agency: Agency;
  platform: Platform;
  yearStart: number;
  yearEnd?: number;
  fuelType: FuelType;
  materials: string[];
  oxygenPercent?: number;
  pressureKPa?: number;
  flowVelocityCmS?: number;
  gravityLevel: GravityLevel;
  keyFindings: string[];
  fireRiskImplication: string;
  suppressionRelevance: string;
  flammabilityLimitNote: string;
  sourceUrl: string;
  dataAccess: "public" | "request" | "unknown";
  confidence: "high" | "medium" | "low";
  tags: string[];
}

export interface AgencyProfile {
  id: string;
  slug?: string;
  acronym: Agency;
  fullName: string;
  countryOrRegion: string;
  headquarters: string;
  establishedYear: number;
  website: string;
  roleInHumanSpaceflight?: string;
  issContribution?: {
    module: string;
    details: string;
    yearLaunched?: number;
  };
  microgravityFacilities: string[];
  detailedFacilities?: Array<{
    name: string;
    type: "orbital" | "ground" | "flight";
    location: string;
    description: string;
  }>;
  combustionResearchSummary: string;
  primaryPrograms: string[];
  detailedPrograms?: Array<{
    name: string;
    focus: string;
    status: "active" | "completed" | "planned";
    description: string;
  }>;
  flammabilityTestingStandard?: string;
  standardsApproach?: {
    standard: string;
    philosophy: string;
    testingMethod: string;
    suppressionAgent: string;
    explorationReady: string;
  };
}

export interface MetricSummary {
  totalExperimentsAnalyzed: number;
  coolFlameIncidenceRate: number;
  avgMicrogravityExtinctionDelayPercent: number;
  criticalHabitatRiskRating: "LOW" | "ELEVATED" | "CRITICAL";
  highOxygenAtmospherePenalty: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  isFallback: boolean;
  source: string;
  cachedAt?: string;
  error?: string;
}

export interface NavLinkItem {
  name: string;
  href: string;
  badge?: string;
}

// Backwards-compatible CombustionExperiment alias if needed
export interface CombustionExperiment {
  id: string;
  code: string;
  title: string;
  facility: string;
  missionDuration: string;
  primaryFuel: string;
  fuelType: "Gas" | "Liquid Droplet" | "Solid Polymer" | "Fabric Blend";
  gravityEnvironment: "Microgravity (0-g)" | "Lunar (0.16-g)" | "Martian (0.38-g)" | "Terrestrial (1-g)";
  flameShape: "Spherical Halo" | "Elongated Teardrop" | "Smoldering Filament" | "Diffuse Wake";
  peakTemperatureK: number;
  extinctionTimeSec: number;
  oxygenIndexPercent: number;
  pressureKPa: number;
  coolFlameObserved: boolean;
  sootProductionLevel: "Very Low" | "Low" | "Moderate" | "High";
  fireSafetyRiskScore: number;
  hazardSummary: string;
  mitigationRecommendation: string;
  targetEnvironment: "ISS / LEO" | "Gateway / Lunar" | "Mars Transit & Surface" | "All Habitats";
  burnRateMmPerSec: number;
  radiationHeatFluxKWm2: number;
}
