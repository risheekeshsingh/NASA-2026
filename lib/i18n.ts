// In-house English / Hindi localization dictionary for FlameLens
// Zero external dependencies, typed, reliable.

export type Language = "en" | "hi";
export type Audience = "Astronaut" | "Engineer" | "Student";

export interface Translations {
  insightsTitle: string;
  insightsSubtitle: string;
  audienceLabel: string;
  audienceAstronaut: string;
  audienceEngineer: string;
  audienceStudent: string;
  audienceAstronautDesc: string;
  audienceEngineerDesc: string;
  audienceStudentDesc: string;
  languageLabel: string;
  suggestedQuestionsLabel: string;
  inputPlaceholder: string;
  sendButton: string;
  thinking: string;
  sourcesCited: string;
  copyButton: string;
  copiedButton: string;
  fallbackNotice: string;
  generateBriefButton: string;
  briefTitle: string;
  briefSubtitle: string;
  briefScenarioLabel: string;
  briefPrintButton: string;
  briefCloseButton: string;
  verifyNotice: string;
  keyTakeawaysTitle: string;
  keyTakeawaysSubtitle: string;
  keyTakeaway1: string;
  keyTakeaway2: string;
  keyTakeaway3: string;
  keyTakeaway4: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    insightsTitle: "AI Fire-Safety Intelligence Assistant",
    insightsSubtitle:
      "Synthesizes decades of microgravity combustion telemetry into evidence-backed safety insights for Moon and Mars missions.",
    audienceLabel: "Target Audience Perspective",
    audienceAstronaut: "Astronaut / Crew",
    audienceEngineer: "Spacecraft Engineer",
    audienceStudent: "Student / Researcher",
    audienceAstronautDesc: "Operational checklists, emergency smoke migration, egress windows, life-support impact.",
    audienceEngineerDesc: "Materials qualification (NASA-STD-6001), low-flow flammability peaks, partial pressures, extinction kinetics.",
    audienceStudentDesc: "Fundamental 0-g flame physics, absence of buoyancy, cool flame chemistry, spherical halos.",
    languageLabel: "Language",
    suggestedQuestionsLabel: "Suggested Mission Inquiries",
    inputPlaceholder: "Ask about microgravity combustion, material flammability, or suppression...",
    sendButton: "Ask Assistant",
    thinking: "Analyzing microgravity combustion records...",
    sourcesCited: "Evidence Sources Cited",
    copyButton: "Copy Response",
    copiedButton: "Copied!",
    fallbackNotice: "Heuristic Mode: Response generated deterministically from verified flight records.",
    generateBriefButton: "Generate Mission Fire-Safety Brief",
    briefTitle: "Mission Fire-Safety Assessment Brief",
    briefSubtitle: "Official mission-planning heuristic summary generated from microgravity combustion telemetry.",
    briefScenarioLabel: "Mission Operational Scenario",
    briefPrintButton: "Print / Save PDF",
    briefCloseButton: "Close Brief",
    verifyNotice: "Verify against the original source.",
    keyTakeawaysTitle: "Executive Fire-Safety Takeaways",
    keyTakeawaysSubtitle: "High-level empirical findings derived from 22 microgravity flight experiments.",
    keyTakeaway1: "Peak Flammability Danger (1–10 cm/s): Still air starves flames, but gentle forced ventilation supplies oxidizer without convective cooling, maximizing fire spread.",
    keyTakeaway2: "Artemis 34% O₂ Hazard: The 34% oxygen exploration atmosphere dramatically accelerates flame propagation and renders standard fire-resistant Nomex textiles flammable.",
    keyTakeaway3: "Invisible Cool Flames: Droplet and liquid fuels can sustain non-luminous low-temperature reactions (500–750 K) that resist optical detection and reignite when airflow restarts.",
    keyTakeaway4: "Vehicle-Scale Duct Risk: SAFFIRE proved that large fabric and polymer sheets sustain fire at lower oxygen limits than small laboratory racks predict.",
  },
  hi: {
    insightsTitle: "एआई अग्नि सुरक्षा बुद्धिमत्ता सहायक",
    insightsSubtitle:
      "चंद्रमा और मंगल मिशनों के लिए माइक्रोग्रैविटी दहन डेटा से साक्ष्य-आधारित सुरक्षा अंतर्दृष्टि प्रदान करता है।",
    audienceLabel: "लक्षित दर्शक दृष्टिकोण",
    audienceAstronaut: "अंतरिक्ष यात्री / दल",
    audienceEngineer: "अंतरिक्ष यान इंजीनियर",
    audienceStudent: "छात्र / शोधकर्ता",
    audienceAstronautDesc: "परिचालन चेकलिस्ट, आपातकालीन धुआं प्रसार, निकासी खिड़की, जीवन-रक्षक प्रभाव।",
    audienceEngineerDesc: "सामग्री योग्यता (NASA-STD-6001), कम-प्रवाह ज्वलनशीलता शिखर, आंशिक दबाव, शमन गतिशीलता।",
    audienceStudentDesc: "मूलभूत शून्य-गुरुत्व ज्वाला भौतिकी, उत्प्लावन का अभाव, शीतल ज्वाला रसायन, गोलाकार आभामंडल।",
    languageLabel: "भाषा",
    suggestedQuestionsLabel: "सुझाए गए मिशन प्रश्न",
    inputPlaceholder: "माइक्रोग्रैविटी दहन, सामग्री ज्वलनशीलता या शमन विधियों के बारे में पूछें...",
    sendButton: "पूछें",
    thinking: "माइक्रोग्रैविटी दहन रिकॉर्ड का विश्लेषण हो रहा है...",
    sourcesCited: "उद्धृत साक्ष्य स्रोत",
    copyButton: "उत्तर कॉपी करें",
    copiedButton: "कॉपी हो गया!",
    fallbackNotice: "ह्यूरिस्टिक मोड: सत्यापित उड़ान रिकॉर्ड से नियम-आधारित उत्तर तैयार किया गया।",
    generateBriefButton: "मिशन अग्नि सुरक्षा संक्षिप्त रिपोर्ट बनाएं",
    briefTitle: "मिशन अग्नि सुरक्षा मूल्यांकन रिपोर्ट",
    briefSubtitle: "माइक्रोग्रैविटी दहन टेलीमेट्री से तैयार आधिकारिक मिशन योजना सारांश।",
    briefScenarioLabel: "मिशन परिचालन परिदृश्य",
    briefPrintButton: "प्रिंट / पीडीएफ सेव करें",
    briefCloseButton: "बंद करें",
    verifyNotice: "मूल स्रोत से सत्यापन करें।",
    keyTakeawaysTitle: "प्रमुख अग्नि सुरक्षा निष्कर्ष",
    keyTakeawaysSubtitle: "22 माइक्रोग्रैविटी उड़ान प्रयोगों से प्राप्त उच्च स्तरीय अनुभवजन्य निष्कर्ष।",
    keyTakeaway1: "चरम ज्वलनशीलता खतरा (1–10 सेमी/सेकंड): शांत हवा में आग बुझ जाती है, लेकिन हल्का वेंटिलेशन ज्वाला को ठंडा किए बिना ऑक्सीजन देता रहता है, जिससे आग तेजी से फैलती है।",
    keyTakeaway2: "आर्टेमिस 34% O₂ खतरा: 34% ऑक्सीजन वाला अन्वेषण वातावरण ज्वाला प्रसार को अत्यधिक तेज करता है और सामान्य नोमेक्स कपड़ों को भी ज्वलनशील बना देता है।",
    keyTakeaway3: "अदृश्य शीतल ज्वालाएं (Cool Flames): बूंद और तरल ईंधन कम तापमान (500–750 K) पर बिना दिखाई दिए जलते रह सकते हैं और हवा चलने पर पुनः भड़क सकते हैं।",
    keyTakeaway4: "यान-पैमाने पर डक्ट जोखिम: SAFFIRE प्रयोग ने सिद्ध किया कि बड़े कपड़े और बहुलक प्रयोगशाला की छोटी नलियों की तुलना में कम ऑक्सीजन में भी आग पकड़ते हैं।",
  },
};
