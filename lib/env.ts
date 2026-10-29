/**
 * Safe Environment Variable Access Layer
 * Guaranteed never to throw, with reliable defaults for NASA Space Apps Challenge.
 */

export interface AppEnv {
  NASA_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL: string;
  NODE_ENV: "development" | "production" | "test";
  SITE_URL: string;
  hasCustomNasaKey: boolean;
  hasAnthropicKey: boolean;
}

export function getEnv(): AppEnv {
  try {
    const rawNasaKey = process.env.NASA_API_KEY?.trim();
    const rawAnthropicKey = process.env.ANTHROPIC_API_KEY?.trim();
    const rawModel = process.env.ANTHROPIC_MODEL?.trim();
    const rawNodeEnv = process.env.NODE_ENV;
    const rawSiteUrl =
      process.env.SITE_URL?.trim() ||
      "https://flamelens.vercel.app";

    const nasaKey = rawNasaKey && rawNasaKey.length > 0 ? rawNasaKey : "DEMO_KEY";
    const anthropicKey = rawAnthropicKey && rawAnthropicKey.length > 0 ? rawAnthropicKey : "";
    const anthropicModel = rawModel && rawModel.length > 0 ? rawModel : "claude-sonnet-4-6";
    const nodeEnv: "development" | "production" | "test" =
      rawNodeEnv === "production" ? "production" : rawNodeEnv === "test" ? "test" : "development";

    return {
      NASA_API_KEY: nasaKey,
      ANTHROPIC_API_KEY: anthropicKey,
      ANTHROPIC_MODEL: anthropicModel,
      NODE_ENV: nodeEnv,
      SITE_URL: rawSiteUrl,
      hasCustomNasaKey: nasaKey !== "DEMO_KEY",
      hasAnthropicKey: anthropicKey.length > 0,
    };
  } catch {
    // Failsafe fallback
    return {
      NASA_API_KEY: "DEMO_KEY",
      ANTHROPIC_API_KEY: "",
      ANTHROPIC_MODEL: "claude-sonnet-4-6",
      NODE_ENV: "development",
      SITE_URL: "https://flamelens.vercel.app",
      hasCustomNasaKey: false,
      hasAnthropicKey: false,
    };
  }
}

export const env = getEnv();
