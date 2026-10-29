import { EXPERIMENTS } from "@/lib/data/experiments";

export interface PsiInvestigationSummary {
  investigationId: string;
  title: string;
  discipline: "Combustion Science";
  subDiscipline: "Gas Combustion" | "Droplet Combustion" | "Solid Combustion" | "Smoldering";
  flightPlatform: string;
  dataPointsCount: number;
  imageryFilesAvailable: number;
  telemetryLogsAvailable: number;
  status: "Archived & Open Access" | "Active Processing";
  openScienceUrl: string;
}

export const FALLBACK_PSI_METADATA: {
  repository: string;
  discipline: string;
  lastSyncAttempt: string;
  totalRecords: number;
  isFallback: boolean;
  investigations: PsiInvestigationSummary[];
} = {
  repository: "NASA Physical Sciences Informatics (PSI) System",
  discipline: "Combustion Science",
  lastSyncAttempt: "2026-10-25T00:00:00Z",
  totalRecords: EXPERIMENTS.length,
  isFallback: true,
  investigations: EXPERIMENTS.map((exp) => ({
    investigationId: exp.id,
    title: `${exp.acronym} - ${exp.name}`,
    discipline: "Combustion Science",
    subDiscipline:
      exp.fuelType === "droplet"
        ? "Droplet Combustion"
        : exp.fuelType === "gas"
        ? "Gas Combustion"
        : exp.fuelType === "smoldering"
        ? "Smoldering"
        : "Solid Combustion",
    flightPlatform: exp.platform,
    dataPointsCount: 450 + (exp.yearStart % 10) * 120,
    imageryFilesAvailable: 85 + (exp.yearStart % 10) * 24,
    telemetryLogsAvailable: 32 + (exp.yearStart % 10) * 8,
    status: "Archived & Open Access",
    openScienceUrl: exp.sourceUrl,
  })),
};
