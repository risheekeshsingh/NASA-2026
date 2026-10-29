import { NextResponse } from "next/server";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Experiment, Agency, Platform, FuelType, GravityLevel } from "@/types";
import { env } from "@/lib/env";

export const revalidate = 3600; // 1-hour cache

export async function GET(request: Request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout rule

  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.toLowerCase()?.trim();
    const agency = searchParams.get("agency") as Agency | null;
    const platform = searchParams.get("platform") as Platform | null;
    const fuelType = searchParams.get("fuelType") as FuelType | null;
    const gravityLevel = searchParams.get("gravityLevel") as GravityLevel | null;
    const yearStart = searchParams.get("yearStart") ? parseInt(searchParams.get("yearStart")!, 10) : null;
    const yearEnd = searchParams.get("yearEnd") ? parseInt(searchParams.get("yearEnd")!, 10) : null;
    const sort = searchParams.get("sort") || "yearDesc";

    clearTimeout(timeoutId);

    let results: Experiment[] = [...EXPERIMENTS];

    // Filter by query string across multiple text fields
    if (query) {
      results = results.filter((exp) => {
        const matchesName = exp.name.toLowerCase().includes(query);
        const matchesAcronym = exp.acronym.toLowerCase().includes(query);
        const matchesMaterials = exp.materials.some((m) => m.toLowerCase().includes(query));
        const matchesTags = exp.tags.some((t) => t.toLowerCase().includes(query));
        const matchesFindings = exp.keyFindings.some((f) => f.toLowerCase().includes(query));
        return matchesName || matchesAcronym || matchesMaterials || matchesTags || matchesFindings;
      });
    }

    // Filter by agency
    if (agency && agency.toUpperCase() !== "ALL") {
      results = results.filter((exp) => exp.agency.toLowerCase() === agency.toLowerCase());
    }

    // Filter by platform
    if (platform && platform.toUpperCase() !== "ALL") {
      results = results.filter((exp) => exp.platform.toLowerCase() === platform.toLowerCase());
    }

    // Filter by fuelType
    if (fuelType && fuelType.toUpperCase() !== "ALL") {
      results = results.filter((exp) => exp.fuelType.toLowerCase() === fuelType.toLowerCase());
    }

    // Filter by gravityLevel
    if (gravityLevel && gravityLevel.toUpperCase() !== "ALL") {
      results = results.filter((exp) => exp.gravityLevel.toLowerCase() === gravityLevel.toLowerCase());
    }

    // Filter by year range
    if (yearStart !== null && !isNaN(yearStart)) {
      results = results.filter((exp) => exp.yearStart >= yearStart);
    }
    if (yearEnd !== null && !isNaN(yearEnd)) {
      results = results.filter((exp) => exp.yearStart <= yearEnd);
    }

    // Sorting
    results.sort((a, b) => {
      if (sort === "yearAsc") {
        return a.yearStart - b.yearStart;
      }
      if (sort === "nameAsc") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "nameDesc") {
        return b.name.localeCompare(a.name);
      }
      // default: yearDesc
      return b.yearStart - a.yearStart;
    });

    return NextResponse.json({
      success: true,
      total: results.length,
      data: results,
      isFallback: false,
      source: "FlameLens Microgravity Combustion Research Database",
    });
  } catch {
    clearTimeout(timeoutId);

    // Failsafe fallback
    return NextResponse.json({
      success: true,
      total: EXPERIMENTS.length,
      data: EXPERIMENTS,
      isFallback: true,
      source: "Local NASA PSI Offline Backup Cache",
    });
  }
}
