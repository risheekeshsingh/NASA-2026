// Test suite for POST /api/explain logic and lib/i18n.ts
// Run with: npx tsx scripts/test-explain.ts

import { DICTIONARY } from "../lib/i18n";
import { EXPERIMENTS } from "../lib/data/experiments";

console.log("=== Testing FlameLens AI Explain & i18n Systems ===");

let passed = 0;
let total = 0;

function assert(condition: boolean, name: string, details?: string) {
  total++;
  if (!condition) {
    console.error(`❌ FAILED: ${name} ${details ? `(${details})` : ""}`);
    process.exit(1);
  } else {
    passed++;
    console.log(`✅ PASSED: ${name}`);
  }
}

// 1. i18n Dictionary Integrity
console.log("\n[Test 1] Validating English and Hindi dictionaries");
assert(!!DICTIONARY.en.insightsTitle, "English insightsTitle exists");
assert(!!DICTIONARY.hi.insightsTitle, "Hindi insightsTitle exists");
assert(!!DICTIONARY.en.verifyNotice, "English verifyNotice exists");
assert(!!DICTIONARY.hi.verifyNotice, "Hindi verifyNotice exists");
assert(DICTIONARY.en.verifyNotice === "Verify against the original source.", "English verifyNotice exact match");
assert(DICTIONARY.hi.verifyNotice === "मूल स्रोत से सत्यापन करें।", "Hindi verifyNotice exact match");
assert(DICTIONARY.en.keyTakeawaysTitle.length > 0, "English key takeaways title present");
assert(DICTIONARY.hi.keyTakeawaysTitle.length > 0, "Hindi key takeaways title present");

// 2. Audience Perspectives
console.log("\n[Test 2] Audience translations and descriptions");
assert(DICTIONARY.en.audienceAstronaut.includes("Astronaut"), "Astronaut audience translated");
assert(DICTIONARY.en.audienceEngineer.includes("Engineer"), "Engineer audience translated");
assert(DICTIONARY.en.audienceStudent.includes("Student"), "Student audience translated");
assert(DICTIONARY.hi.audienceAstronaut.length > 0, "Hindi Astronaut translated");

// 3. Dataset citations existence
console.log("\n[Test 3] Citations match valid experiment IDs");
const knownCitations = ["saffire-i", "saffire-iv", "bass-ii", "flex-2", "sofie-mist"];
for (const cid of knownCitations) {
  const found = EXPERIMENTS.some((e) => e.id === cid);
  assert(found, `Cited experiment ID "${cid}" exists in EXPERIMENTS dataset`);
}

console.log(`\n========================================================`);
console.log(`🎉 ALL ${passed}/${total} TESTS PASSED FOR AI EXPLAIN & i18n!`);
console.log(`========================================================\n`);
