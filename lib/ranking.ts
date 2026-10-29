// Transparent, explainable scoring model for microgravity combustion experiments.
// Decision-support heuristic designed for FlameLens (NASA Space Apps Challenge).
// Evaluates experiments on 4 key axes:
// 1. Fire-risk severity (0-100): Flame spread, ignition ease at low flow, elevated O2, scale.
// 2. Exploration relevance (0-100): Artemis / Lunar / Martian atmosphere and materials.
// 3. Evidence strength (0-100): Confidence, open data availability, repeat campaigns.
// 4. Suppression insight value (0-100): Actionable extinguishing, depressurization, and detection findings.

import { Experiment } from "@/types";

export interface RankingWeights {
  fireRisk: number;
  exploration: number;
  evidence: number;
  suppression: number;
}

export const DEFAULT_RANKING_WEIGHTS: RankingWeights = {
  fireRisk: 35,
  exploration: 30,
  evidence: 20,
  suppression: 15,
};

export interface ExperimentScoreBreakdown {
  fireRisk: number;
  exploration: number;
  evidence: number;
  suppression: number;
  notes: {
    fireRisk: string;
    exploration: string;
    evidence: string;
    suppression: string;
  };
}

export interface RankedExperiment {
  experiment: Experiment;
  rank: number;
  totalScore: number;
  breakdown: ExperimentScoreBreakdown;
}

/**
 * Calculates the Fire-Risk Severity sub-score (0-100).
 * High O2, critical low-convective flow (1-10 cm/s), solid spacecraft materials,
 * and large fire scale contribute positively to severity.
 */
export function calculateFireRiskSeverity(exp: Experiment): { score: number; note: string } {
  let score = 40; // baseline
  const reasons: string[] = [];

  // Oxygen concentration factor (21% is ambient baseline, 34% is exploration spec)
  const o2 = exp.oxygenPercent ?? 21;
  if (o2 >= 34) {
    score += 30;
    reasons.push(`Hyper-elevated oxygen (${o2}% O₂) drastically lowers ignition threshold`);
  } else if (o2 >= 28) {
    score += 22;
    reasons.push(`Elevated oxygen (${o2}% O₂) accelerates flame propagation`);
  } else if (o2 > 21) {
    score += 12;
    reasons.push(`Slightly elevated oxygen (${o2}% O₂)`);
  } else if (o2 < 20) {
    score -= 10;
    reasons.push(`Hypoxic/reduced oxygen (${o2}% O₂)`);
  } else {
    score += 5;
    reasons.push("Standard atmospheric oxygen (21% O₂)");
  }

  // Flow velocity: In microgravity, low convective velocities (1-10 cm/s) provide the
  // dangerous "sweet spot" of continuous oxygen replenishment without blow-off cooling.
  const flow = exp.flowVelocityCmS;
  if (flow !== undefined) {
    if (flow >= 1 && flow <= 12) {
      score += 18;
      reasons.push(`Peak flammability convective regime (${flow} cm/s)`);
    } else if (flow === 0) {
      score += 8;
      reasons.push("Quiescent diffusion-limited flame regime");
    } else if (flow > 12) {
      score += 10;
      reasons.push(`Forced convective air circulation (${flow} cm/s)`);
    }
  }

  // Fuel form & scale
  if (exp.fuelType === "solid") {
    score += 10;
    reasons.push("Solid polymer fuel poses persistent flame and char hazard");
  } else if (exp.fuelType === "smoldering") {
    score += 12;
    reasons.push("Smoldering combustion can transition unpredictably to open flame");
  } else if (exp.fuelType === "droplet") {
    score += 5;
    reasons.push("Droplet combustion with spherical vapor cloud dynamics");
  }

  // Spacecraft-scale bonus
  if (exp.tags.some((t) => t.toLowerCase().includes("spacecraft-scale") || t.toLowerCase().includes("large-scale"))) {
    score += 12;
    reasons.push("Spacecraft-scale vehicle envelope validation");
  }

  const finalScore = Math.max(5, Math.min(100, Math.round(score)));
  return {
    score: finalScore,
    note: reasons.join("; "),
  };
}

/**
 * Calculates Relevance to Exploration Missions (0-100).
 * Evaluates fidelity to Artemis / Lunar / Martian exploration atmospheres (34% O2, 56-70 kPa),
 * planetary gravity regimes, and flight-qualified materials (PMMA, Nomex, Kapton, SIBAL).
 */
export function calculateExplorationRelevance(exp: Experiment): { score: number; note: string } {
  let score = 35; // baseline
  const reasons: string[] = [];

  // Environmental atmospheric similarity to Artemis/Gateway (34% O2, 56 kPa or 70.3 kPa)
  const o2 = exp.oxygenPercent ?? 21;
  const p = exp.pressureKPa ?? 101.3;
  if (o2 >= 30 && p < 80) {
    score += 25;
    reasons.push("Direct match to NASA Exploration Atmosphere (34% O₂ / hypobaric)");
  } else if (o2 >= 28 || p < 85) {
    score += 15;
    reasons.push("Near-exploration atmospheric baseline conditions");
  }

  // Gravity regime
  if (exp.gravityLevel === "lunar" || exp.gravityLevel === "martian") {
    score += 20;
    reasons.push(`Direct ${exp.gravityLevel} partial-gravity fidelity`);
  } else if (exp.gravityLevel === "microgravity") {
    score += 12;
    reasons.push("Orbital transit / microgravity baseline");
  }

  // Material engineering realism
  const realisticKeywords = [
    "pmma",
    "nomex",
    "cotton",
    "fiberglass",
    "kapton",
    "silicone",
    "wire",
    "polyethylene",
    "sibal",
    "acrylic",
    "polyester",
  ];
  const matchedMaterials = exp.materials.filter((m) =>
    realisticKeywords.some((k) => m.toLowerCase().includes(k))
  );

  if (matchedMaterials.length >= 2) {
    score += 18;
    reasons.push(`Tests mission-critical flight materials (${matchedMaterials.slice(0, 2).join(", ")})`);
  } else if (matchedMaterials.length === 1) {
    score += 10;
    reasons.push(`Tests realistic spacecraft material (${matchedMaterials[0]})`);
  } else {
    reasons.push("Fundamental canonical fuel tests");
  }

  // Mission platform fidelity
  if (exp.platform === "ISS" || exp.platform === "Cygnus" || exp.platform === "Tiangong") {
    score += 12;
    reasons.push(`Conducted inside pressurized orbital facility (${exp.platform})`);
  }

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));
  return {
    score: finalScore,
    note: reasons.join("; "),
  };
}

/**
 * Calculates Evidence Strength sub-score (0-100).
 * Based on data confidence rating, open public access, long-duration campaigns,
 * and repeat experiment flights.
 */
export function calculateEvidenceStrength(exp: Experiment): { score: number; note: string } {
  let score = 30;
  const reasons: string[] = [];

  // Confidence grade
  if (exp.confidence === "high") {
    score += 35;
    reasons.push("Peer-reviewed high-confidence observational data");
  } else if (exp.confidence === "medium") {
    score += 22;
    reasons.push("Standard flight telemetry and camera data");
  } else {
    score += 10;
    reasons.push("Preliminary or limited sensor fidelity");
  }

  // Data access
  if (exp.dataAccess === "public") {
    score += 20;
    reasons.push("Fully open public repository data (PSI/NASA DDC)");
  } else if (exp.dataAccess === "request") {
    score += 10;
    reasons.push("Available upon scientific archive request");
  } else {
    score += 5;
    reasons.push("Restricted or internal agency repository");
  }

  // Multi-year campaign or repeat tests
  const duration = (exp.yearEnd ?? exp.yearStart) - exp.yearStart;
  if (duration >= 2) {
    score += 15;
    reasons.push(`Multi-year longitudinal campaign (${duration + 1} years active)`);
  } else if (exp.tags.some((t) => t.includes("series") || t.includes("repeat"))) {
    score += 8;
    reasons.push("Documented multi-sample repeat test matrix");
  }

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));
  return {
    score: finalScore,
    note: reasons.join("; "),
  };
}

/**
 * Calculates Suppression Insight Value sub-score (0-100).
 * Assesses practical extinguishability, quenchant behavior (CO2, N2, water mist),
 * depressurization venting, and cool-flame detection.
 */
export function calculateSuppressionInsight(exp: Experiment): { score: number; note: string } {
  let score = 30;
  const reasons: string[] = [];

  const suppText = (exp.suppressionRelevance + " " + exp.fireRiskImplication + " " + exp.flammabilityLimitNote).toLowerCase();

  if (suppText.includes("extinguish") || suppText.includes("suppression") || suppText.includes("quenching")) {
    score += 25;
    reasons.push("Explicit active extinguishing thresholds determined");
  }

  if (suppText.includes("vent") || suppText.includes("depressuriz") || suppText.includes("vacuum")) {
    score += 15;
    reasons.push("Evaluates emergency cabin vacuum venting tactics");
  }

  if (suppText.includes("cool flame") || suppText.includes("smolder") || suppText.includes("reignition")) {
    score += 18;
    reasons.push("Identifies stealth fire hazards (cool flames or smolder reignition)");
  }

  if (suppText.includes("airflow") || suppText.includes("shut off") || suppText.includes("circulation")) {
    score += 12;
    reasons.push("Provides cabin ventilation airflow cutoff recommendations");
  }

  const finalScore = Math.max(10, Math.min(100, Math.round(score)));
  return {
    score: finalScore,
    note: reasons.join("; "),
  };
}

/**
 * Computes individual breakdown and composite score for a single experiment.
 */
export function computeExperimentScore(
  exp: Experiment,
  weights: RankingWeights = DEFAULT_RANKING_WEIGHTS
): ExperimentScoreBreakdown & { totalScore: number } {
  const fireRisk = calculateFireRiskSeverity(exp);
  const exploration = calculateExplorationRelevance(exp);
  const evidence = calculateEvidenceStrength(exp);
  const suppression = calculateSuppressionInsight(exp);

  const totalWeight = Math.max(1, weights.fireRisk + weights.exploration + weights.evidence + weights.suppression);

  const weightedSum =
    fireRisk.score * weights.fireRisk +
    exploration.score * weights.exploration +
    evidence.score * weights.evidence +
    suppression.score * weights.suppression;

  const totalScore = Math.round((weightedSum / totalWeight) * 10) / 10;

  return {
    fireRisk: fireRisk.score,
    exploration: exploration.score,
    evidence: evidence.score,
    suppression: suppression.score,
    notes: {
      fireRisk: fireRisk.note,
      exploration: exploration.note,
      evidence: evidence.note,
      suppression: suppression.note,
    },
    totalScore,
  };
}

/**
 * Scores and sorts an array of experiments based on customized weights.
 */
export function rankExperiments(
  experiments: Experiment[],
  weights: RankingWeights = DEFAULT_RANKING_WEIGHTS
): RankedExperiment[] {
  const scored = experiments.map((exp) => {
    const computed = computeExperimentScore(exp, weights);
    return {
      experiment: exp,
      rank: 0,
      totalScore: computed.totalScore,
      breakdown: {
        fireRisk: computed.fireRisk,
        exploration: computed.exploration,
        evidence: computed.evidence,
        suppression: computed.suppression,
        notes: computed.notes,
      },
    };
  });

  // Sort descending by total score, secondary sort by fireRisk sub-score
  scored.sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    return b.breakdown.fireRisk - a.breakdown.fireRisk;
  });

  // Assign 1-indexed ranks
  return scored.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}
