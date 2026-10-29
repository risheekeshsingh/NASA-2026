import http from "http";

async function testSimulatedFailures() {
  console.log("=== SIMULATING EXTERNAL API FAILURES & UNSET ENVIRONMENT KEYS ===");

  // Test 1: Anthropic API Key Missing / Fallback Mode
  console.log("\n[Test 1] Testing /api/explain fallback resilience without valid API key...");
  try {
    const res = await fetch("http://localhost:3000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "What suppression methods work best in microgravity without buoyant settling?",
        audience: "Astronaut",
        language: "en"
      })
    });
    const json = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`isFallback: ${json.isFallback}`);
    console.log(`Answer length: ${json.answer?.length} characters`);
    console.log(`Citations count: ${json.citations?.length || 0}`);
    console.log(`First citation: ${json.citations?.[0]?.acronym || "None"}`);
    if (res.status === 200 && json.isFallback === true && json.answer?.length > 100) {
      console.log("✅ Test 1 PASSED: Resilient rule-based AI explanation provided gracefully.");
    } else {
      console.error("❌ Test 1 FAILED: Unexpected response format.");
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Test 1 Exception: ${err.message}`);
    process.exit(1);
  }

  // Test 2: Hindi Translation Fallback
  console.log("\n[Test 2] Testing /api/explain with Hindi language fallback...");
  try {
    const res = await fetch("http://localhost:3000/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: "माइक्रोग्रैविटी में आग कैसे फैलती है?",
        audience: "Student",
        language: "hi"
      })
    });
    const json = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`isFallback: ${json.isFallback}`);
    console.log(`Answer preview: ${json.answer?.slice(0, 100)}...`);
    if (res.status === 200 && json.isFallback === true && json.answer?.length > 100) {
      console.log("✅ Test 2 PASSED: Hindi safety brief delivered gracefully from localized rules.");
    } else {
      console.error("❌ Test 2 FAILED.");
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Test 2 Exception: ${err.message}`);
    process.exit(1);
  }

  // Test 3: APOD Resilience
  console.log("\n[Test 3] Testing /api/apod fallback resilience...");
  try {
    const res = await fetch("http://localhost:3000/api/apod");
    const json = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Source: ${json.source}`);
    console.log(`Title: ${json.data?.title}`);
    if (res.status === 200 && json.data?.title && json.data?.url) {
      console.log("✅ Test 3 PASSED: APOD delivered image and explanation successfully.");
    } else {
      console.error("❌ Test 3 FAILED.");
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Test 3 Exception: ${err.message}`);
    process.exit(1);
  }

  // Test 4: News Fallback Resilience
  console.log("\n[Test 4] Testing /api/news fallback resilience...");
  try {
    const res = await fetch("http://localhost:3000/api/news");
    const json = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Source: ${json.source}`);
    console.log(`Articles count: ${json.data?.length}`);
    if (res.status === 200 && json.data?.length > 0) {
      console.log("✅ Test 4 PASSED: Spaceflight news feed rendered cleanly.");
    } else {
      console.error("❌ Test 4 FAILED.");
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Test 4 Exception: ${err.message}`);
    process.exit(1);
  }

  // Test 5: Malformed Contact Form Handling
  console.log("\n[Test 5] Testing /api/contact validation rejection on invalid email...");
  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test",
        email: "not-an-email",
        subject: "Hi",
        message: "Short"
      })
    });
    const json = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Error message: ${json.error}`);
    if (res.status === 400 && json.error) {
      console.log("✅ Test 5 PASSED: Contact validation accurately rejects malformed email with 400.");
    } else {
      console.error("❌ Test 5 FAILED.");
      process.exit(1);
    }
  } catch (err: any) {
    console.error(`❌ Test 5 Exception: ${err.message}`);
    process.exit(1);
  }

  console.log("\n========================================================");
  console.log("ALL FAILURE SIMULATION & FALLBACK TESTS PASSED!");
  console.log("========================================================\n");
}

testSimulatedFailures();
