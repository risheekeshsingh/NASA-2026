import { FALLBACK_EXPERIMENTS, FALLBACK_METRICS } from "@/lib/fallback/experiments";
import { Experiment, MetricSummary } from "@/types";

export type { Experiment, MetricSummary as FireSafetyMetrics };

export const EXPERIMENTS_FALLBACK_DATA: Experiment[] = FALLBACK_EXPERIMENTS;
export const SAFETY_METRICS_FALLBACK: MetricSummary = FALLBACK_METRICS;
