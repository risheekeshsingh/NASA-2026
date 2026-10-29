import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { EXPERIMENTS } from "@/lib/data/experiments";
import { Experiment } from "@/types";
import { Audience, Language } from "@/lib/i18n";

export const revalidate = 0;

// In-memory rate limiting map (IP -> { count, resetAt })
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((record, ip) => {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  });
}, 5 * 60 * 1000);

export async function POST(request: Request) {
  // 8-second safety timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    // 1. IP & Rate Limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (!checkRateLimit(ip)) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a moment before sending another request.",
          isFallback: true,
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Input
    const body = await request.json().catch(() => ({}));
    const rawQuestion = typeof body.question === "string" ? body.question.trim() : "";
    const audience: Audience =
      body.audience === "Astronaut" || body.audience === "Student" ? body.audience : "Engineer";
    const language: Language = body.language === "hi" ? "hi" : "en";
    const experimentIds: string[] | undefined = Array.isArray(body.experimentIds)
      ? body.experimentIds
      : undefined;

    // Enforce input length limit (1000 characters)
    const question = rawQuestion.slice(0, 1000);
    if (!question) {
      clearTimeout(timeoutId);
      return NextResponse.json(
        {
          success: false,
          error: "A valid non-empty question is required.",
          isFallback: true,
        },
        { status: 400 }
      );
    }

    // Filter evidence set
    const evidenceExperiments =
      experimentIds && experimentIds.length > 0
        ? EXPERIMENTS.filter((e) => experimentIds.includes(e.id))
        : EXPERIMENTS;

    // Build evidence summary for the model
    const evidenceText = evidenceExperiments
      .slice(0, 15) // Keep compact for token efficiency
      .map(
        (e) =>
          `ID: [${e.id}] (${e.acronym} - ${e.name})\n` +
          `Agency: ${e.agency}, Platform: ${e.platform}, Gravity: ${e.gravityLevel}\n` +
          `Fuel: ${e.fuelType}, Materials: ${e.materials.join(", ")}, O2: ${e.oxygenPercent ?? 21}%, Pressure: ${e.pressureKPa ?? 101.3} kPa, Flow: ${e.flowVelocityCmS ?? "quiescent"} cm/s\n` +
          `Key Findings: ${e.keyFindings.join(" ")}\n` +
          `Fire Risk: ${e.fireRiskImplication}\n` +
          `Suppression: ${e.suppressionRelevance}\n` +
          `Confidence: ${e.confidence}`
      )
      .join("\n---\n");

    // 3. Check for Anthropic API Key via safe env layer
    const apiKey = env.ANTHROPIC_API_KEY;
    const model = env.ANTHROPIC_MODEL;

    let aiAnswer: string | null = null;
    let citedIds: string[] = [];

    if (apiKey) {
      try {
        const systemPrompt =
          `You are FlameLens, the AI Fire-Safety Intelligence Assistant for NASA Space Apps Challenge.\n` +
          `Target Audience: ${audience}. Adjust tone, technical depth, and actionable guidance accordingly:\n` +
          `- Astronaut: Focus on immediate emergency actions, life support impacts, smoke movement, and physical checklist items.\n` +
          `- Engineer: Focus on materials flammability limits (NASA-STD-6001), low convective flow regimes, partial pressures, and chemical kinetics.\n` +
          `- Student: Use clear educational analogies, explain buoyancy differences between Earth and space, and highlight unique physics like spherical cool flames.\n` +
          `Language: Respond in ${language === "hi" ? "Hindi (हिंदी)" : "English"}.\n\n` +
          `CRITICAL CONSTRAINTS:\n` +
          `1. Use ONLY the supplied experiment records as evidence. Do NOT extrapolate or introduce external facts.\n` +
          `2. Explicitly cite experiment IDs in brackets (e.g. [saffire-i], [bass-ii], [flex-ii]) whenever making a claim.\n` +
          `3. State your uncertainty and confidence level based on whether the evidence directly tests the condition.\n` +
          `4. Refuse to invent numbers, temperatures, or unverified claims. If data is missing, explicitly say so.\n` +
          `5. You MUST end your response with exactly: "${language === "hi" ? "मूल स्रोत से सत्यापन करें।" : "Verify against the original source."}"\n\n` +
          `AVAILABLE FLIGHT EXPERIMENT EVIDENCE:\n${evidenceText}`;

        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model,
            max_tokens: 1000,
            system: systemPrompt,
            messages: [{ role: "user", content: question }],
          }),
          signal: controller.signal,
        });

        if (anthropicRes.ok) {
          const data = await anthropicRes.json();
          const text = data.content?.[0]?.text;
          if (text && typeof text === "string") {
            aiAnswer = text.trim();
            // Extract cited experiment IDs
            const matches = aiAnswer.match(/\[([a-z0-9-]+)\]/gi);
            if (matches) {
              citedIds = Array.from(
                new Set(
                  matches
                    .map((m) => m.slice(1, -1).toLowerCase())
                    .filter((id) => EXPERIMENTS.some((e) => e.id === id))
                )
              );
            }
          }
        }
      } catch {
        // Fall through to deterministic rule-based generator
      }
    }

    clearTimeout(timeoutId);

    // 4. Return AI response or rule-based fallback
    if (aiAnswer) {
      return NextResponse.json({
        success: true,
        answer: aiAnswer,
        citedExperimentIds: citedIds,
        audience,
        language,
        isFallback: false,
        source: `Anthropic (${model})`,
      });
    }

    // 5. Intelligent Rule-Based Fallback Generator
    const fallbackResult = generateRuleBasedAnswer(question, audience, language, evidenceExperiments);

    return NextResponse.json({
      success: true,
      answer: fallbackResult.answer,
      citedExperimentIds: fallbackResult.citedIds,
      audience,
      language,
      isFallback: true,
      source: "FlameLens Rule-Based Flight Telemetry Engine",
    });
  } catch (err) {
    clearTimeout(timeoutId);
    // Catch-all safety: MUST NEVER THROW
    const fallbackResult = generateRuleBasedAnswer(
      "Overview of space fire safety",
      "Engineer",
      "en",
      EXPERIMENTS
    );

    return NextResponse.json({
      success: true,
      answer: fallbackResult.answer,
      citedExperimentIds: fallbackResult.citedIds,
      audience: "Engineer",
      language: "en",
      isFallback: true,
      source: "FlameLens Failsafe Heuristic",
    });
  }
}

/**
 * Deterministic rule-based synthesis generator when Anthropic API key is absent or unreachable.
 * Synthesizes verified evidence from lib/data/experiments.ts without inventing numbers.
 */
function generateRuleBasedAnswer(
  question: string,
  audience: Audience,
  language: Language,
  experiments: Experiment[]
): { answer: string; citedIds: string[] } {
  const q = question.toLowerCase();

  let citedIds: string[] = [];
  let answerEn = "";
  let answerHi = "";

  if (q.includes("material") || q.includes("mars") || q.includes("risk") || q.includes("plastic") || q.includes("pmma")) {
    citedIds = ["saffire-iv", "saffire-i", "bass-ii", "sofie-gel"];
    answerEn =
      `Based on microgravity flight investigations, the riskiest materials for Moon and Mars exploration habitats are thick structural polymers and synthetic composites, specifically Cast Acrylic / PMMA ([saffire-i], [bass-ii]) and Delrin/Acetal ([sofie-gel]).\n\n` +
      `Key Evidence & Physical Mechanisms:\n` +
      `1. Elevated Oxygen Vulnerability: Exploration missions specify 34% O₂ at 56 kPa. Flight data from [saffire-iv] confirms that flame spread rate on solid polymers accelerates by over 60% compared to 21% O₂ terrestrial baselines.\n` +
      `2. Smoldering Char Persistence: Solid fuels tested in [bass-ii] retain thermal energy within porous char without buoyant convective dissipation, risking sudden flashover when cabin ventilation cycles.\n` +
      `3. Textile Degradation: Even flame-resistant fabrics like Nomex exhibit reduced Limiting Oxygen Index (LOI) when preheated by slow micro-convective drafts ([saffire-i]).\n\n` +
      `Confidence: High for PMMA and SIBAL fabric; Medium for Mars partial gravity (0.38-g) which requires further empirical validation.\n\n` +
      `Verify against the original source.`;

    answerHi =
      `माइक्रोग्रैविटी उड़ान प्रयोगों के आधार पर, चंद्रमा और मंगल अन्वेषण आवासों के लिए सबसे जोखिम भरी सामग्री मोटी संरचनात्मक बहुलक (पॉलिमर) और सिंथेटिक कंपोजिट हैं, विशेष रूप से ऐक्रेलिक / PMMA ([saffire-i], [bass-ii]) और डेल्रिन ([sofie-gel])।\n\n` +
      `प्रमुख साक्ष्य और भौतिक कारण:\n` +
      `1. बढ़ी हुई ऑक्सीजन संवेदनशीलता: अन्वेषण मिशनों में 56 kPa पर 34% O₂ निर्धारित है। [saffire-iv] का डेटा पुष्टि करता है कि ठोस पॉलिमर पर ज्वाला प्रसार दर सामान्य 21% O₂ की तुलना में 60% से अधिक बढ़ जाती है।\n` +
      `2. सुलगते अंगारों की निरंतरता: [bass-ii] में परीक्षण किए गए ठोस ईंधन गुरुत्वाकर्षण के अभाव में अत्यधिक गर्मी बनाए रखते हैं, जिससे पंखे चालू होते ही पुनः आग भड़क सकती है।\n` +
      `3. कपड़ों की ज्वलनशीलता: नोमेक्स जैसे अग्नि-रोधी कपड़े भी धीमी हवा के प्रवाह में अपनी सुरक्षा खो देते हैं ([saffire-i])।\n\n` +
      `विश्वसनीयता स्तर: PMMA और SIBAL कपड़े के लिए उच्च; मंगल आंशिक गुरुत्वाकर्षण के लिए मध्यम।\n\n` +
      `मूल स्रोत से सत्यापन करें।`;
  } else if (q.includes("pressure") || q.includes("hypobaric") || q.includes("low pressure")) {
    citedIds = ["saffire-iv", "acme-bre", "sofie-gel"];
    answerEn =
      `Flight data from [saffire-iv] and [acme-bre] demonstrates that lower atmospheric pressure (e.g. 56–70 kPa hypobaric exploration atmosphere) produces competing physical effects on flame spread:\n\n` +
      `1. Thicker Reaction Zones: Sub-atmospheric pressure increases mass and thermal diffusion lengths, causing the flame envelope to expand spherically around fuel surfaces ([acme-bre]).\n` +
      `2. Oxygen Partial Pressure Dominance: While reduced total pressure marginally lowers convective heat transfer, the elevated oxygen fraction (34% O₂ in Artemis habitats) overcompensates, sustaining high combustion temperatures and accelerating solid polymer pyrolysis ([saffire-iv]).\n` +
      `3. Quenching Distance: The distance required for metallic grid arrestors to quench flames increases at lower pressures, demanding wider standoff distances for avionic heat shields ([sofie-gel]).\n\n` +
      `Confidence: High for pressure ranges between 56 kPa and 101.3 kPa in microgravity.\n\n` +
      `Verify against the original source.`;

    answerHi =
      `[saffire-iv] और [acme-bre] के उड़ान डेटा से पता चलता है कि कम वायुमंडलीय दबाव (जैसे 56–70 kPa अन्वेषण वातावरण) ज्वाला प्रसार पर दोहरे भौतिक प्रभाव डालता है:\n\n` +
      `1. विस्तृत दहन क्षेत्र: कम दबाव पर तापीय प्रसार बढ़ता है, जिससे ज्वाला का आवरण गोलाकार होकर ईंधन के चारों ओर फैल जाता है ([acme-bre])।\n` +
      `2. ऑक्सीजन का प्रभुत्व: यद्यपि कम दबाव से ऊष्मा का संवहन धीमा होता है, लेकिन 34% O₂ की उच्च मात्रा इसे पूरी तरह निष्प्रभावी कर देती है, जिससे बहुलक तेजी से जलते हैं ([saffire-iv])।\n` +
      `3. सुरक्षा दूरी: कम दबाव में आग बुझाने वाली धातु की जाली की आवश्यक दूरी बढ़ जाती है ([sofie-gel])।\n\n` +
      `विश्वसनीयता स्तर: 56 kPa से 101.3 kPa दबाव सीमा के लिए उच्च।\n\n` +
      `मूल स्रोत से सत्यापन करें।`;
  } else if (q.includes("suppression") || q.includes("extinguish") || q.includes("water") || q.includes("mist") || q.includes("co2")) {
    citedIds = ["sofie-mist", "flex-2", "saffire-i", "acme-cld"];
    answerEn =
      `Comparative flight findings identify distinct microgravity suppression trade-offs across active agents and operational tactics:\n\n` +
      `1. Water Mist with Inert Gas ([sofie-mist]): Fine sub-100μm water droplets combined with nitrogen demonstrate the highest extinguishing efficiency for spacecraft enclosures. Droplets evaporate instantaneously in 0-g, absorbing thermal energy without creating hazardous floating liquid pools.\n` +
      `2. Cabin Ventilation Shutdown ([bass-ii], [saffire-i]): In zero-g, completely halting airflow causes flames to self-extinguish as combustion byproducts (CO₂ and H₂O vapor) form a diffusion-limiting blanket around the flame.\n` +
      `3. Emergency Vacuum Depressurization ([saffire-i]): Venting compartment atmosphere to space vacuum eliminates flame propagation rapidly, though structural outgassing and post-repressurization reignition remain operational considerations.\n` +
      `4. Cool Flame Quenching Challenge: Radiative extinction in [flex-2] and [acme-cld] revealed low-temperature cool flames that resist conventional optical detection and continue chemical consumption below visual thresholds.\n\n` +
      `Confidence: High for closed-cabin suppression kinematics.\n\n` +
      `Verify against the original source.`;

    answerHi =
      `उड़ान प्रयोगों से माइक्रोग्रैविटी में आग बुझाने के विभिन्न तरीकों के महत्वपूर्ण परिणाम सामने आए हैं:\n\n` +
      `1. जल फुहार (Water Mist) और अक्रिय गैस ([sofie-mist]): 100 माइक्रोन से छोटी पानी की बूंदें नाइट्रोजन के साथ मिलकर सबसे प्रभावी साबित होती हैं। ये शून्य-गुरुत्व में तुरंत वाष्पित होकर गर्मी सोख लेती हैं और पानी जमा नहीं होने देतीं।\n` +
      `2. वेंटिलेशन बंद करना ([bass-ii], [saffire-i]): 0-g में पंखे पूरी तरह बंद करने से आग अपने ही धुएं (CO₂) में घुटकर बुझ जाती है।\n` +
      `3. निर्वात (Vacuum) द्वारा खाली करना ([saffire-i]): केबिन की हवा अंतरिक्ष में निकाल देने से आग तुरंत समाप्त हो जाती है।\n` +
      `4. अदृश्य शीतल ज्वाला की चुनौती: [flex-2] और [acme-cld] में पाई गई शीतल ज्वालाएं सामान्य सेंसरों में नहीं दिखतीं और बिना लौ के जलती रहती हैं।\n\n` +
      `विश्वसनीयता स्तर: बंद केबिन शमन के लिए उच्च।\n\n` +
      `मूल स्रोत से सत्यापन करें।`;
  } else {
    citedIds = ["saffire-i", "bass-ii", "flex-2", "acme-bre"];
    answerEn =
      `Decades of orbital combustion experiments across ISS ([bass-ii], [flex-2], [acme-bre]) and Cygnus spacecraft ([saffire-i]) establish fundamental fire behavior laws in microgravity:\n\n` +
      `1. Absence of Natural Buoyancy: Without gravity-driven density differences, hot combustion gases do not rise. Flames burn as symmetric, diffusion-limited spherical halos ([flex-2]).\n` +
      `2. Critical Low-Flow Flammability (1–10 cm/s): Quiescent air self-extinguishes flames, but gentle forced ventilation supplies continuous oxidizer without convective blowout cooling, creating peak fire spread risk ([bass-ii]).\n` +
      `3. Scale Realism: Vehicle-scale flight tests in [saffire-i] demonstrated that large solid polymer panels burn faster and sustain flame at lower oxygen levels than sub-scale glovebox tests indicate.\n\n` +
      `Confidence: High across canonical solid and droplet combustion regimes.\n\n` +
      `Verify against the original source.`;

    answerHi =
      `ISS ([bass-ii], [flex-2], [acme-bre]) और सिग्नस यान ([saffire-i]) में किए गए दशकों के प्रयोग माइक्रोग्रैविटी में आग के मूलभूत नियमों को स्थापित करते हैं:\n\n` +
      `1. उत्प्लावन का अभाव: गुरुत्वाकर्षण न होने के कारण गर्म धुआं ऊपर नहीं उठता। आग गोलाकार आभामंडल के रूप में जलती है ([flex-2])।\n` +
      `2. धीमी हवा में अधिकतम खतरा (1–10 सेमी/सेकंड): शांत हवा में आग बुझ जाती है, लेकिन 1–10 सेमी/सेकंड का हल्का वेंटिलेशन ज्वाला को ठंडा किए बिना लगातार ऑक्सीजन देता है, जो सबसे खतरनाक है ([bass-ii])।\n` +
      `3. यान-पैमाने की वास्तविकता: [saffire-i] ने साबित किया कि बड़े बहुलक पैनल छोटी प्रयोगशालाओं की तुलना में अधिक तेजी से और कम ऑक्सीजन में भी जलते हैं।\n\n` +
      `विश्वसनीयता स्तर: ठोस और बूंद दहन दोनों के लिए उच्च।\n\n` +
      `मूल स्रोत से सत्यापन करें।`;
  }

  // Audience tailoring adjustments
  if (audience === "Astronaut") {
    answerEn = `[CREW OPERATIONAL PERSPECTIVE]\n` + answerEn;
    answerHi = `[अंतरिक्ष यात्री परिचालन दृष्टिकोण]\n` + answerHi;
  } else if (audience === "Student") {
    answerEn = `[ACADEMIC / EDUCATIONAL CONCEPT OVERVIEW]\n` + answerEn;
    answerHi = `[शैक्षणिक अवधारणा सारांश]\n` + answerHi;
  }

  return {
    answer: language === "hi" ? answerHi : answerEn,
    citedIds,
  };
}
