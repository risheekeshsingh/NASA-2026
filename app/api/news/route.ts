import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 minutes caching

export interface SpaceNewsItem {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
}

const FALLBACK_NEWS: SpaceNewsItem[] = [
  {
    id: "news-saffire-analysis",
    title: "NASA Completes Final Saffire Spacecraft Fire Safety Mission",
    url: "https://www.nasa.gov/mission/saffire/",
    imageUrl: "https://images-assets.nasa.gov/image/iss036e006249/iss036e006249~orig.jpg",
    newsSite: "NASA Spaceflight Systems",
    summary:
      "Engineers at NASA Glenn Research Center review data from the concluding Saffire-VI flight, documenting material flammability in oxygen-rich exploration atmospheres before Cygnus burn-up.",
    publishedAt: "2024-03-12T14:00:00Z",
  },
  {
    id: "news-artemis-safety",
    title: "Fire Protection Protocols Formulated for Artemis Lunar Surface Camp",
    url: "https://www.nasa.gov/mission/artemis/",
    imageUrl: "https://images-assets.nasa.gov/image/artemis_lunar_habitat/artemis_lunar_habitat~orig.jpg",
    newsSite: "Orbital Safety Review",
    summary:
      "Life support engineers establish baseline suppression requirements for the 34% oxygen habitat environment, incorporating dual-band thermal sensors to counter invisible cool flames.",
    publishedAt: "2024-05-18T09:30:00Z",
  },
  {
    id: "news-cir-sofie",
    title: "Solid Fuel Ignition Experiments Aboard ISS Advance Flame Spread Models",
    url: "https://www.nasa.gov/mission/station/",
    imageUrl: "https://images-assets.nasa.gov/image/iss067e372551/iss067e372551~orig.jpg",
    newsSite: "Microgravity Science Journal",
    summary:
      "The SoFIE project team publishes new limiting velocity curves for polymer combustion under micro-convective airflows, refining spacecraft material screening guidelines.",
    publishedAt: "2024-08-22T17:15:00Z",
  },
  {
    id: "news-tiangong-combustion",
    title: "Chinese Tiangong Station Mengtian Module Expands Combustion Tests",
    url: "http://www.cnsa.gov.cn/",
    imageUrl: "https://images-assets.nasa.gov/image/tiangong_mengtian/tiangong_mengtian~orig.jpg",
    newsSite: "International Space Sciences",
    summary:
      "Taikonauts conduct spherical diffusion flame test series inside the Combustion Experiment Cabinet, evaluating low-speed soot radiation dynamics.",
    publishedAt: "2024-09-04T11:45:00Z",
  },
];

export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout rule

  try {
    const response = await fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=4&search=microgravity%20OR%20station%20OR%20fire",
      {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        next: { revalidate: 1800 },
      }
    );

    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      if (Array.isArray(json.results) && json.results.length > 0) {
        interface RawArticle {
          id: number | string;
          title?: string;
          url?: string;
          image_url?: string;
          news_site?: string;
          summary?: string;
          published_at?: string;
        }

        const articles: SpaceNewsItem[] = json.results.map((item: RawArticle) => ({
          id: String(item.id),
          title: item.title || "Space Exploration Science Update",
          url: item.url || "https://www.nasa.gov",
          imageUrl: item.image_url || "",
          newsSite: item.news_site || "Space News Wire",
          summary: item.summary || "Latest research update from spaceflight and microgravity science teams.",
          publishedAt: item.published_at || new Date().toISOString(),
        }));

        return NextResponse.json({
          success: true,
          isFallback: false,
          source: "Spaceflight News Live API",
          data: articles,
        });
      }
    }

    // Response not ok or empty results
    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "FlameLens Space News Archive (Offline Backup)",
      data: FALLBACK_NEWS,
    });
  } catch {
    clearTimeout(timeoutId);

    return NextResponse.json({
      success: true,
      isFallback: true,
      source: "FlameLens Space News Archive (Offline Backup)",
      data: FALLBACK_NEWS,
    });
  }
}
