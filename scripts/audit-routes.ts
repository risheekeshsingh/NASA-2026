import http from "http";

interface RouteTestResult {
  route: string;
  type: "Page" | "API" | "Asset/SEO";
  method: "GET" | "POST";
  status: number;
  timeMs: number;
  note: string;
}

const routesToTest = [
  // Core pages
  { route: "/", type: "Page", method: "GET" },
  { route: "/experiments", type: "Page", method: "GET" },
  { route: "/experiments/saffire-i", type: "Page", method: "GET" },
  { route: "/experiments/flex-2", type: "Page", method: "GET" },
  { route: "/experiments/bass-ii", type: "Page", method: "GET" },
  { route: "/experiments/sofie-gel", type: "Page", method: "GET" },
  { route: "/rankings", type: "Page", method: "GET" },
  { route: "/compare", type: "Page", method: "GET" },
  { route: "/insights", type: "Page", method: "GET" },
  { route: "/agencies", type: "Page", method: "GET" },
  { route: "/agencies/nasa", type: "Page", method: "GET" },
  { route: "/agencies/esa", type: "Page", method: "GET" },
  { route: "/agencies/roscosmos", type: "Page", method: "GET" },
  { route: "/agencies/cnsa", type: "Page", method: "GET" },
  { route: "/agencies/jaxa", type: "Page", method: "GET" },
  { route: "/agencies/csa", type: "Page", method: "GET" },
  { route: "/safety-guide", type: "Page", method: "GET" },
  { route: "/learn", type: "Page", method: "GET" },
  { route: "/data-sources", type: "Page", method: "GET" },
  { route: "/about", type: "Page", method: "GET" },
  { route: "/team", type: "Page", method: "GET" },
  { route: "/roadmap", type: "Page", method: "GET" },
  { route: "/demo", type: "Page", method: "GET" },
  { route: "/contact", type: "Page", method: "GET" },

  // SEO & PWA
  { route: "/sitemap.xml", type: "Asset/SEO", method: "GET" },
  { route: "/robots.txt", type: "Asset/SEO", method: "GET" },
  { route: "/manifest.webmanifest", type: "Asset/SEO", method: "GET" },

  // API Endpoints
  { route: "/api/experiments", type: "API", method: "GET" },
  { route: "/api/experiments/saffire-i", type: "API", method: "GET" },
  { route: "/api/apod", type: "API", method: "GET" },
  { route: "/api/news", type: "API", method: "GET" },
  {
    route: "/api/explain",
    type: "API",
    method: "POST",
    body: JSON.stringify({
      question: "How does microgravity affect flame spread rates on solid PMMA fuels?",
      audience: "Engineer",
      language: "en"
    })
  },
  {
    route: "/api/contact",
    type: "API",
    method: "POST",
    body: JSON.stringify({
      name: "Dr. Elena Rostova",
      email: "elena@spaceflight.org",
      subject: "Microgravity Combustion Inquiry",
      message: "Testing contact form validation and submission handling."
    })
  }
];

async function runAudit() {
  console.log("Starting Full Route Audit against http://localhost:3000...\n");
  const results: RouteTestResult[] = [];

  for (const item of routesToTest) {
    const start = performance.now();
    try {
      const res = await fetch(`http://localhost:3000${item.route}`, {
        method: item.method,
        headers: item.method === "POST" ? { "Content-Type": "application/json" } : undefined,
        body: item.body
      });
      const timeMs = Math.round(performance.now() - start);

      let note = "OK";
      if (item.type === "API") {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          if (item.route === "/api/explain") {
            note = json.isFallback ? "Fallback response (rule-based)" : "Anthropic response";
          } else if (item.route === "/api/experiments") {
            const count = json.total || (json.data && json.data.length) || 0;
            note = `${count} experiments returned`;
          } else if (item.route === "/api/apod") {
            note = json.data?.title ? `APOD: "${json.data.title.slice(0, 24)}..."` : json.title ? `APOD: "${json.title.slice(0, 24)}..."` : "APOD returned";
          } else if (item.route === "/api/news") {
            const count = (json.data && json.data.length) || 0;
            note = `${count} articles returned (${json.source})`;
          } else if (item.route === "/api/contact") {
            note = json.message || "Message processed";
          }
        } catch {
          note = `Text: ${text.slice(0, 30)}...`;
        }
      } else {
        const text = await res.text();
        note = `HTML / Content (${(text.length / 1024).toFixed(1)} KB)`;
      }

      results.push({
        route: item.route,
        type: item.type as any,
        method: item.method as any,
        status: res.status,
        timeMs,
        note
      });
    } catch (err: any) {
      const timeMs = Math.round(performance.now() - start);
      results.push({
        route: item.route,
        type: item.type as any,
        method: item.method as any,
        status: 500,
        timeMs,
        note: `Fetch error: ${err.message}`
      });
    }
  }

  console.log("\n=================== AUDIT RESULTS TABLE ===================");
  console.log("| Route | Method | Type | HTTP Status | Latency | Note |");
  console.log("| :--- | :--- | :--- | :---: | :---: | :--- |");
  for (const r of results) {
    const statusFormatted = r.status === 200 ? `✅ **${r.status}**` : `❌ **${r.status}**`;
    console.log(`| \`${r.route}\` | \`${r.method}\` | ${r.type} | ${statusFormatted} | ${r.timeMs}ms | ${r.note} |`);
  }

  const failed = results.filter(r => r.status !== 200);
  console.log(`\nTotal Routes Tested: ${results.length}`);
  console.log(`Passed (HTTP 200): ${results.length - failed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.error("FAILURES DETECTED:", failed);
    process.exit(1);
  } else {
    console.log("\nALL 30 TESTED ROUTES RETURNED HTTP 200 SUCCESS!");
  }
}

runAudit();
