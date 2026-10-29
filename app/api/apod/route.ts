import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export const revalidate = 3600; // 1-hour caching

export interface ApodData {
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
}

const FALLBACK_APOD: ApodData = {
  title: "Microgravity Spherical Flame in the Combustion Integrated Rack",
  explanation:
    "A spherical flame burns serenely in freefall inside the International Space Station Destiny laboratory module. In the absence of gravity-driven buoyant convection, hot air does not rise. Oxygen reaches the combustion zone solely through molecular diffusion, producing a symmetrical, pale glowing sphere that contrasts with the elongated teardrop flames seen on Earth.",
  url: "https://images-assets.nasa.gov/image/iss036e006249/iss036e006249~orig.jpg",
  media_type: "image",
  date: "2024-10-25",
  copyright: "NASA Physical Sciences Informatics Archive",
};

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout rule

  try {
    const key = env.NASA_API_KEY || "DEMO_KEY";
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(key)}`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data: ApodData = await response.json();
      return NextResponse.json({
        success: true,
        isFallback: false,
        source: "NASA Astronomy Picture of the Day Live API",
        data,
      });
    }

    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "NASA APOD Archive (Offline Backup)",
      data: FALLBACK_APOD,
    });
  } catch {
    clearTimeout(timeoutId);

    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "NASA APOD Archive (Offline Backup)",
      data: FALLBACK_APOD,
    });
  }
}
