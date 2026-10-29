import { Experiment, MetricSummary } from "@/types";
import { EXPERIMENTS } from "@/lib/data/experiments";

export const FALLBACK_EXPERIMENTS: Experiment[] = EXPERIMENTS;

export const FALLBACK_METRICS: MetricSummary = {
  totalExperimentsAnalyzed: 142,
  coolFlameIncidenceRate: 38.7,
  avgMicrogravityExtinctionDelayPercent: 245,
  criticalHabitatRiskRating: "ELEVATED",
  highOxygenAtmospherePenalty: "+62% flame spread speed in 34% O2 (Artemis specification)",
};
