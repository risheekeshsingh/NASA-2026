import { MetadataRoute } from "next";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { AGENCIES } from "@/lib/data/agencies";
import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL;
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/experiments",
    "/rankings",
    "/compare",
    "/insights",
    "/agencies",
    "/safety-guide",
    "/learn",
    "/data-sources",
    "/about",
    "/team",
    "/roadmap",
    "/demo",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Experiment routes
  const experimentRoutes: MetadataRoute.Sitemap = EXPERIMENTS.map((exp) => ({
    url: `${baseUrl}/experiments/${exp.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic Agency routes
  const agencyRoutes: MetadataRoute.Sitemap = AGENCIES.map((ag) => ({
    url: `${baseUrl}/agencies/${ag.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...experimentRoutes, ...agencyRoutes];
}
