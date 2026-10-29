/**
 * Microgravity Combustion Data Validator
 * Validates integrity, schema adherence, required fields, and uniqueness.
 * Runnable via: npx tsx scripts/validate-data.ts
 */

import { EXPERIMENTS } from "../lib/data/experiments";
import { AGENCIES } from "../lib/data/agencies";
import { Agency, Platform, FuelType, GravityLevel } from "../types";

const VALID_AGENCIES: Agency[] = [
  "NASA",
  "ESA",
  "JAXA",
  "CSA",
  "Roscosmos",
  "CNSA",
  "Multi",
];

const VALID_PLATFORMS: Platform[] = [
  "ISS",
  "Cygnus",
  "Drop tower",
  "Parabolic flight",
  "Sounding rocket",
  "Tiangong",
  "Shuttle",
];

const VALID_FUEL_TYPES: FuelType[] = [
  "solid",
  "gas",
  "liquid",
  "droplet",
  "smoldering",
];

const VALID_GRAVITY_LEVELS: GravityLevel[] = [
  "microgravity",
  "lunar",
  "martian",
];

const VALID_DATA_ACCESS = ["public", "request", "unknown"];
const VALID_CONFIDENCE = ["high", "medium", "low"];

function validateData(): boolean {
  console.log("=================================================");
  console.log("   FLAMELENS: Microgravity Data Validation Engine");
  console.log("=================================================\n");

  const errors: string[] = [];
  const seenIds = new Set<string>();

  // 1. Validate EXPERIMENTS count
  if (!Array.isArray(EXPERIMENTS) || EXPERIMENTS.length < 20) {
    errors.push(
      `Dataset must contain at least 20 experiments. Found: ${EXPERIMENTS?.length ?? 0}`
    );
  } else {
    console.log(`✓ Experiment count: ${EXPERIMENTS.length} entries (Target >= 20 met)`);
  }

  // 2. Iterate each experiment
  EXPERIMENTS.forEach((exp, idx) => {
    const entryLabel = `Experiment #${idx + 1} (${exp?.id || "MISSING ID"})`;

    // ID validation & uniqueness
    if (!exp.id || typeof exp.id !== "string" || exp.id.trim() === "") {
      errors.push(`${entryLabel}: Missing or empty id`);
    } else if (seenIds.has(exp.id)) {
      errors.push(`${entryLabel}: Duplicate ID detected: '${exp.id}'`);
    } else {
      seenIds.add(exp.id);
    }

    // Required string fields
    if (!exp.name || typeof exp.name !== "string") {
      errors.push(`${entryLabel}: Missing or non-string 'name'`);
    }
    if (!exp.acronym || typeof exp.acronym !== "string") {
      errors.push(`${entryLabel}: Missing or non-string 'acronym'`);
    }
    if (!exp.fireRiskImplication || typeof exp.fireRiskImplication !== "string") {
      errors.push(`${entryLabel}: Missing 'fireRiskImplication'`);
    }
    if (!exp.suppressionRelevance || typeof exp.suppressionRelevance !== "string") {
      errors.push(`${entryLabel}: Missing 'suppressionRelevance'`);
    }
    if (!exp.flammabilityLimitNote || typeof exp.flammabilityLimitNote !== "string") {
      errors.push(`${entryLabel}: Missing 'flammabilityLimitNote'`);
    }
    if (!exp.sourceUrl || typeof exp.sourceUrl !== "string") {
      errors.push(`${entryLabel}: Missing 'sourceUrl'`);
    }

    // Enum validations
    if (!VALID_AGENCIES.includes(exp.agency)) {
      errors.push(
        `${entryLabel}: Invalid agency '${exp.agency}'. Allowed: ${VALID_AGENCIES.join(", ")}`
      );
    }
    if (!VALID_PLATFORMS.includes(exp.platform)) {
      errors.push(
        `${entryLabel}: Invalid platform '${exp.platform}'. Allowed: ${VALID_PLATFORMS.join(", ")}`
      );
    }
    if (!VALID_FUEL_TYPES.includes(exp.fuelType)) {
      errors.push(
        `${entryLabel}: Invalid fuelType '${exp.fuelType}'. Allowed: ${VALID_FUEL_TYPES.join(", ")}`
      );
    }
    if (!VALID_GRAVITY_LEVELS.includes(exp.gravityLevel)) {
      errors.push(
        `${entryLabel}: Invalid gravityLevel '${exp.gravityLevel}'. Allowed: ${VALID_GRAVITY_LEVELS.join(", ")}`
      );
    }
    if (!VALID_DATA_ACCESS.includes(exp.dataAccess)) {
      errors.push(
        `${entryLabel}: Invalid dataAccess '${exp.dataAccess}'. Allowed: ${VALID_DATA_ACCESS.join(", ")}`
      );
    }
    if (!VALID_CONFIDENCE.includes(exp.confidence)) {
      errors.push(
        `${entryLabel}: Invalid confidence '${exp.confidence}'. Allowed: ${VALID_CONFIDENCE.join(", ")}`
      );
    }

    // Year validation
    if (typeof exp.yearStart !== "number" || exp.yearStart < 1960 || exp.yearStart > 2035) {
      errors.push(`${entryLabel}: Invalid yearStart: ${exp.yearStart}`);
    }
    if (exp.yearEnd !== undefined && (typeof exp.yearEnd !== "number" || exp.yearEnd < exp.yearStart)) {
      errors.push(`${entryLabel}: yearEnd (${exp.yearEnd}) must be >= yearStart (${exp.yearStart})`);
    }

    // Array validations
    if (!Array.isArray(exp.materials) || exp.materials.length === 0) {
      errors.push(`${entryLabel}: 'materials' must be a non-empty array of strings`);
    }
    if (!Array.isArray(exp.keyFindings) || exp.keyFindings.length === 0) {
      errors.push(`${entryLabel}: 'keyFindings' must be a non-empty array of strings`);
    }
    if (!Array.isArray(exp.tags) || exp.tags.length === 0) {
      errors.push(`${entryLabel}: 'tags' must be a non-empty array of strings`);
    }

    // Optional numeric sanity checks
    if (exp.oxygenPercent !== undefined && (exp.oxygenPercent <= 0 || exp.oxygenPercent > 100)) {
      errors.push(`${entryLabel}: oxygenPercent out of bounds: ${exp.oxygenPercent}`);
    }
    if (exp.pressureKPa !== undefined && exp.pressureKPa <= 0) {
      errors.push(`${entryLabel}: pressureKPa must be positive: ${exp.pressureKPa}`);
    }
    if (exp.flowVelocityCmS !== undefined && exp.flowVelocityCmS < 0) {
      errors.push(`${entryLabel}: flowVelocityCmS cannot be negative: ${exp.flowVelocityCmS}`);
    }
  });

  // 3. Validate AGENCIES dataset
  console.log(`✓ Agency profiles: ${AGENCIES.length} profiles loaded`);
  const seenAgencyIds = new Set<string>();
  AGENCIES.forEach((agency) => {
    if (!agency.id || seenAgencyIds.has(agency.id)) {
      errors.push(`Agency profile duplicate or empty id: ${agency.id}`);
    }
    seenAgencyIds.add(agency.id);
    if (!agency.website.startsWith("http")) {
      errors.push(`Agency '${agency.acronym}' website must start with http/https`);
    }
  });

  console.log("\n-------------------------------------------------");
  if (errors.length === 0) {
    console.log("✓ ALL VALIDATIONS PASSED ZERO ERRORS!");
    console.log(`✓ Verified ${EXPERIMENTS.length} experiments and ${AGENCIES.length} agency profiles.`);
    console.log("=================================================\n");
    return true;
  } else {
    console.error(`✗ VALIDATION FAILED with ${errors.length} error(s):\n`);
    errors.forEach((err, i) => console.error(`  [${i + 1}] ${err}`));
    console.log("\n=================================================\n");
    return false;
  }
}

const success = validateData();
process.exit(success ? 0 : 1);
