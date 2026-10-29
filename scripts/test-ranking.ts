// Unit tests for lib/ranking.ts scoring algorithm
// Run with: npx tsx scripts/test-ranking.ts

import { EXPERIMENTS } from "../lib/data/experiments";
import {
  calculateFireRiskSeverity,
  calculateExplorationRelevance,
  calculateEvidenceStrength,
  calculateSuppressionInsight,
  computeExperimentScore,
  rankExperiments,
  DEFAULT_RANKING_WEIGHTS,
} from "../lib/ranking";
import { Experiment } from "../types";

console.log("=== Testing FlameLens Heuristic Scoring Model (lib/ranking.ts) ===");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${testName} ${details ? `(${details})` : ""}`);
    process.exit(1);
  } else {
    passedTests++;
    console.log(`✅ PASSED: ${testName}`);
  }
}

// 1. Check all experiments score within [0, 100] for all sub-scores and composite
console.log("\n[Test 1] Range validation across all dataset experiments");
for (const exp of EXPERIMENTS) {
  const fire = calculateFireRiskSeverity(exp);
  const expl = calculateExplorationRelevance(exp);
  const evid = calculateEvidenceStrength(exp);
  const supp = calculateSuppressionInsight(exp);
  const score = computeExperimentScore(exp, DEFAULT_RANKING_WEIGHTS);

  assert(fire.score >= 0 && fire.score <= 100, `${exp.acronym} fireRisk in range [0, 100]`, `Got ${fire.score}`);
  assert(expl.score >= 0 && expl.score <= 100, `${exp.acronym} exploration in range [0, 100]`, `Got ${expl.score}`);
  assert(evid.score >= 0 && evid.score <= 100, `${exp.acronym} evidence in range [0, 100]`, `Got ${evid.score}`);
  assert(supp.score >= 0 && supp.score <= 100, `${exp.acronym} suppression in range [0, 100]`, `Got ${supp.score}`);
  assert(score.totalScore >= 0 && score.totalScore <= 100, `${exp.acronym} totalScore in range [0, 100]`, `Got ${score.totalScore}`);
  assert(fire.note.length > 0, `${exp.acronym} fire note present`);
}

// 2. High O2 / Large-scale experiments should score high on fire risk
console.log("\n[Test 2] High O2 and vehicle-scale fire risk verification");
const saffire = EXPERIMENTS.find((e) => e.acronym.toUpperCase().startsWith("SAFFIRE"));
if (saffire) {
  const saffireScore = computeExperimentScore(saffire);
  assert(saffireScore.fireRisk >= 70, "SAFFIRE scores >= 70 in fireRisk", `Got ${saffireScore.fireRisk}`);
  assert(saffireScore.totalScore >= 65, "SAFFIRE composite score >= 65", `Got ${saffireScore.totalScore}`);
} else {
  assert(false, "SAFFIRE experiment found");
}

// 3. Weight adjustment responsiveness
console.log("\n[Test 3] Live weight adjustment responsiveness");
const rankedDefault = rankExperiments(EXPERIMENTS, DEFAULT_RANKING_WEIGHTS);
const heavySuppressionWeights = {
  fireRisk: 0,
  exploration: 0,
  evidence: 0,
  suppression: 100,
};
const rankedSuppression = rankExperiments(EXPERIMENTS, heavySuppressionWeights);

assert(rankedDefault.length === EXPERIMENTS.length, "Ranked list preserves dataset length");
assert(rankedSuppression.length === EXPERIMENTS.length, "Custom weighted list preserves dataset length");

// Check that top experiment under suppression weight has top suppression score
const topSupp = rankedSuppression[0];
assert(topSupp.breakdown.suppression >= 80, "Top suppression-weighted experiment has high suppression sub-score", `Got ${topSupp.breakdown.suppression}`);

// 4. Edge cases: synthetic experiment with missing optional parameters
console.log("\n[Test 4] Resiliency to missing optional parameters");
const minimalExp: Experiment = {
  id: "test-minimal",
  name: "Minimal Synthetic Experiment",
  acronym: "MSE",
  agency: "NASA",
  platform: "Drop tower",
  yearStart: 2024,
  fuelType: "solid",
  materials: ["cotton"],
  gravityLevel: "microgravity",
  keyFindings: ["Flame extinguishes quickly."],
  fireRiskImplication: "Minimal risk under short durations.",
  suppressionRelevance: "Self-extinguishes.",
  flammabilityLimitNote: "Standard limit.",
  sourceUrl: "https://example.com",
  dataAccess: "unknown",
  confidence: "low",
  tags: ["test"],
};

const minScore = computeExperimentScore(minimalExp);
assert(!isNaN(minScore.totalScore), "Minimal experiment produces valid numeric totalScore");
assert(!isNaN(minScore.fireRisk), "Minimal experiment produces valid fireRisk score");
assert(minScore.notes.fireRisk.length > 0, "Minimal experiment provides reasoning note");

console.log(`\n========================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED FOR lib/ranking.ts!`);
console.log(`========================================================\n`);
