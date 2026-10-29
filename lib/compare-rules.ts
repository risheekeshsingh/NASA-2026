// Rule-based comparative analysis engine for microgravity combustion experiments.
// Automatically generates plain-language "What's Different and Why It Matters"
// comparative insights without external API dependencies. Always reliable.

import { Experiment } from "@/types";
import { computeExperimentScore } from "@/lib/ranking";

export interface ComparisonInsight {
  id: string;
  category: "atmosphere" | "flow" | "fuel" | "scale" | "suppression" | "synthesis";
  title: string;
  badge: string;
  whatsDifferent: string;
  whyItMatters: string;
  operationalRecommendation: string;
}

export function generateComparativeSummary(experiments: Experiment[]): ComparisonInsight[] {
  if (experiments.length < 2) {
    return [
      {
        id: "need-more",
        category: "synthesis",
        title: "Select At Least 2 Experiments",
        badge: "Comparative Engine",
        whatsDifferent: "Currently fewer than 2 experiments are selected for comparative analysis.",
        whyItMatters: "Direct cross-comparison requires two to four flight investigations.",
        operationalRecommendation: "Select experiments from the list above or pick a curated preset.",
      },
    ];
  }

  const insights: ComparisonInsight[] = [];

  // 1. Oxygen & Atmospheric Pressure Differences
  const o2Levels = experiments.map((e) => ({
    name: e.acronym,
    o2: e.oxygenPercent ?? 21,
    p: e.pressureKPa ?? 101.3,
  }));
  const maxO2 = Math.max(...o2Levels.map((o) => o.o2));
  const minO2 = Math.min(...o2Levels.map((o) => o.o2));
  const highestO2Exp = o2Levels.find((o) => o.o2 === maxO2);
  const lowestO2Exp = o2Levels.find((o) => o.o2 === minO2);

  if (maxO2 - minO2 >= 4) {
    insights.push({
      id: "o2-divergence",
      category: "atmosphere",
      title: "Atmospheric Oxygen Divergence (Artemis Exploration Spec vs. Standard Air)",
      badge: `${minO2}% vs. ${maxO2}% O₂`,
      whatsDifferent: `${highestO2Exp?.name} tested under elevated oxygen (${maxO2}% O₂), whereas ${lowestO2Exp?.name} was conducted at ${minO2}% O₂.`,
      whyItMatters:
        "NASA exploration spacecraft (Orion, Gateway, Lunar Starship) utilize a 34% O₂ hypobaric atmosphere to minimize pre-breathe times for EVA spacewalks. Flame spread velocity on polymers scales exponentially with oxygen concentration. Materials passing standard 21% O₂ tests frequently fail violently in 34% O₂ exploration environments.",
      operationalRecommendation:
        "When engineering lunar habitats or Artemis transit cabins, verify materials against high-oxygen data rather than terrestrial 21% baselines.",
    });
  } else {
    insights.push({
      id: "o2-concordance",
      category: "atmosphere",
      title: "Consistent Oxygen Baseline Tested",
      badge: `${minO2}% O₂ Baseline`,
      whatsDifferent: `All selected investigations (${experiments.map((e) => e.acronym).join(", ")}) share similar oxygen concentrations around ${minO2}%–${maxO2}% O₂.`,
      whyItMatters:
        "Holding oxygen concentration constant isolates other critical physical variables such as airflow velocity, material geometry, and gravity level.",
      operationalRecommendation:
        "Focus on hydrodynamic flow differences and material chemical structure to determine relative flammability.",
    });
  }

  // 2. Convective Flow Regime Differences
  const flows = experiments.map((e) => ({
    name: e.acronym,
    flow: e.flowVelocityCmS,
  }));
  const hasQuiescent = flows.some((f) => f.flow === 0 || f.flow === undefined);
  const hasPeakFlow = flows.some((f) => f.flow !== undefined && f.flow >= 1 && f.flow <= 12);
  const hasHighFlow = flows.some((f) => f.flow !== undefined && f.flow > 12);

  if (hasPeakFlow && hasQuiescent) {
    const peakExp = flows.find((f) => f.flow !== undefined && f.flow >= 1 && f.flow <= 12);
    const quiescExp = flows.find((f) => f.flow === 0 || f.flow === undefined);
    insights.push({
      id: "flow-regime-divergence",
      category: "flow",
      title: "Critical Flow Regime Divergence (Peak Flammability vs. Quiescent Starvation)",
      badge: "Flow Velocity Impact",
      whatsDifferent: `${peakExp?.name} tested in forced micro-flow (${peakExp?.flow} cm/s), while ${quiescExp?.name} operated in quiescent diffusion conditions.`,
      whyItMatters:
        "In microgravity, flames in perfectly still air frequently self-extinguish because combustion products (CO₂ and water vapor) accumulate as a spherical smothering blanket. However, gentle forced ventilation between 1–10 cm/s continually supplies fresh oxidizer without providing the convective cooling of high-speed air, creating the most dangerous fire spread regime in human spaceflight.",
      operationalRecommendation:
        "In the event of an unconfined spacecraft fire alarm, the primary automated response must be immediate ventilation fan cutoff to starve the flame envelope.",
    });
  }

  // 3. Fuel Form & Combustion State
  const fuelTypes = Array.from(new Set(experiments.map((e) => e.fuelType)));
  if (fuelTypes.length > 1) {
    insights.push({
      id: "fuel-form-divergence",
      category: "fuel",
      title: `Multi-Phase Fuel Physics (${fuelTypes.map((f) => f.toUpperCase()).join(" vs. ")})`,
      badge: "Fuel Phase Physics",
      whatsDifferent: `Selected experiments span different fuel phases: ${experiments
        .map((e) => `${e.acronym} (${e.fuelType})`)
        .join(", ")}.`,
      whyItMatters:
        "Liquid droplet experiments (like FLEX) demonstrate isolated spherical combustion, radiative extinction, and stealthy 'cool flames' that burn without visible light. Conversely, solid polymers (like SAFFIRE or BASS) generate porous smoldering char that retains intense thermal energy and can reignite hours later when fresh air circulation resumes.",
      operationalRecommendation:
        "Deploy dual-band optical sensors (UV + infrared) to catch invisible cool-flame droplet burns, and use thermal imaging cameras to inspect solid char for smoldering reignition after apparent flameout.",
    });
  }

  // 4. Physical Scale & Enclosure Realism
  const hasVehicleScale = experiments.some((e) =>
    e.tags.some((t) => t.includes("spacecraft-scale") || t.includes("large-scale"))
  );
  const hasLabScale = experiments.some(
    (e) => !e.tags.some((t) => t.includes("spacecraft-scale") || t.includes("large-scale"))
  );

  if (hasVehicleScale && hasLabScale) {
    const bigExp = experiments.find((e) =>
      e.tags.some((t) => t.includes("spacecraft-scale") || t.includes("large-scale"))
    );
    const smallExp = experiments.find(
      (e) => !e.tags.some((t) => t.includes("spacecraft-scale") || t.includes("large-scale"))
    );
    insights.push({
      id: "scale-divergence",
      category: "scale",
      title: "Scale Scaling Gap (Sub-scale Inserts vs. Spacecraft-Scale Cygnus Burnout)",
      badge: "Scale Scaling Effect",
      whatsDifferent: `${bigExp?.acronym} executed spacecraft-scale burns (meters long in an entire Cygnus cargo vehicle), whereas ${smallExp?.acronym} utilized millimetric sample inserts inside sealed gloveboxes.`,
      whyItMatters:
        "Sub-scale combustion experiments suffer from significant conductive and radiative heat loss to chamber walls, artificially suppressing flame spread. Spacecraft-scale tests (SAFFIRE) demonstrated that large fabric and polymer panels sustain flames at lower oxygen thresholds and higher speeds than laboratory insert rigs predict.",
      operationalRecommendation:
        "Apply a safety factor of at least 1.5x to flame spread velocity and heat release rate when scaling benchtop combustion data to habitat cabin architecture.",
    });
  }

  // 5. Suppression Tactics & Post-Fire Recovery
  const suppressionInsights = experiments.map((e) => ({
    name: e.acronym,
    text: e.suppressionRelevance,
  }));
  insights.push({
    id: "suppression-synthesis",
    category: "suppression",
    title: "Tactical Suppression Comparison",
    badge: "Extinguishment Tactics",
    whatsDifferent: `Different suppression mechanisms investigated across ${experiments.map((e) => e.acronym).join(", ")}.`,
    whyItMatters:
      "Terrestrial fire extinguishers (water sprays, heavy CO₂ blasts) can be hazardous in microgravity: high-velocity gas jets can disperse burning embers across the cabin, and water droplets create electrical short-circuit risks. Comparative findings reveal whether vacuum cabin venting, fine water mist, or localized inert gas blanket is optimal.",
    operationalRecommendation:
      suppressionInsights[0]?.text.slice(0, 140) + "...",
  });

  // 6. Overall Decision-Support Verdict
  const scored = experiments.map((e) => ({
    exp: e,
    score: computeExperimentScore(e),
  }));
  scored.sort((a, b) => b.score.totalScore - a.score.totalScore);
  const highestRisk = scored[0];
  const lowestRisk = scored[scored.length - 1];

  insights.push({
    id: "synthesis-verdict",
    category: "synthesis",
    title: "Comparative Decision-Support Verdict",
    badge: `Heuristic Score Gap: ${Math.round(highestRisk.score.totalScore - lowestRisk.score.totalScore)} pts`,
    whatsDifferent: `${highestRisk.exp.acronym} presents the highest overall flammability severity score (${highestRisk.score.totalScore}/100), compared to ${lowestRisk.exp.acronym} (${lowestRisk.score.totalScore}/100).`,
    whyItMatters:
      `The score divergence is driven primarily by ${highestRisk.score.notes.fireRisk.toLowerCase()}. ` +
      `Conversely, ${lowestRisk.exp.acronym} represents more controlled baseline conditions.`,
    operationalRecommendation:
      `Habitat safety architects should utilize ${highestRisk.exp.acronym} for bounding worst-case emergency egress timelines, and reference ${lowestRisk.exp.acronym} for baseline operational flammability margins.`,
  });

  return insights;
}
