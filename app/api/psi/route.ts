import { NextResponse } from "next/server";
import { FALLBACK_PSI_METADATA } from "@/lib/fallback/psi";
import { env } from "@/lib/env";

export const revalidate = 3600;

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout rule

  try {
    let externalData: unknown = null;

    // If a custom NASA API key is configured, query the NASA TechPort/PSI scientific endpoint
    if (env.hasCustomNasaKey) {
      try {
        const response = await fetch(
          `https://api.nasa.gov/techport/api/projects?api_key=${encodeURIComponent(env.NASA_API_KEY)}&tag=combustion`,
          {
            signal: controller.signal,
            next: { revalidate: 3600 },
          }
        );

        if (response.ok) {
          externalData = await response.json();
        }
      } catch {
        // Silent catch: falls back safely to curated NASA PSI dataset
      }
    }

    clearTimeout(timeoutId);

    if (externalData) {
      return NextResponse.json({
        success: true,
        isFallback: false,
        source: "NASA Physical Sciences Informatics Live API",
        data: externalData,
      });
    }

    // Default authentic NASA PSI cached metadata
    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "NASA Physical Sciences Informatics (PSI) Curated Telemetry Archive",
      data: FALLBACK_PSI_METADATA,
    });
  } catch {
    clearTimeout(timeoutId);

    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "NASA Physical Sciences Informatics (PSI) Offline Backup",
      data: FALLBACK_PSI_METADATA,
    });
  }
}
