export interface DataSourceRecord {
  id: string;
  name: string;
  provider: string;
  url: string;
  accessDate: string;
  usedFor: string;
  processingDone: string;
  limitations: string;
  category: "Flight Combustion" | "Agency Repository" | "Public API" | "Engineering Standard";
}

export const DATA_SOURCES: DataSourceRecord[] = [
  {
    id: "src-psi",
    name: "NASA Physical Sciences Informatics (PSI) System",
    provider: "NASA Biological and Physical Sciences (BPS)",
    url: "https://psi.nasa.gov",
    accessDate: "October 2026",
    usedFor:
      "Core combustion parameters, fuel types, oxygen concentrations, chamber pressures, and flow velocities for ISS experiments including FLEX, BASS, ACME, and SoFIE.",
    processingDone:
      "Extracted tabular conditions, converted units to standardized SI/metric (kPa, % O2, cm/s), mapped qualitative findings to fire-risk categories, and computed composite risk indices.",
    limitations:
      "Public PSI entries often bundle raw video and tabular data without standardized cross-experiment comparison metadata. Some historical runs have incomplete flow velocity logs.",
    category: "Flight Combustion",
  },
  {
    id: "src-saffire-missions",
    name: "NASA Saffire Mission Technical Reports & Glenn Research Publications",
    provider: "NASA Glenn Research Center",
    url: "https://www.nasa.gov/mission/saffire/",
    accessDate: "October 2026",
    usedFor:
      "Spacecraft-scale fire propagation data (Saffire I through VI) inside uncrewed Cygnus cargo vehicles, including burn rates of large SIBAL fabrics and PMMA slabs in microgravity.",
    processingDone:
      "Synthesized flight results across six autonomous flight campaigns into normalized flame spread rates, oxygen depletion milestones, and cabin depressurization extinction limits.",
    limitations:
      "Saffire tests were conducted autonomously in uncrewed vehicles under limited airflow run times (up to several hours) without real-time human manual intervention.",
    category: "Flight Combustion",
  },
  {
    id: "src-esa",
    name: "ESA Columbus Science & Microgravity Archives",
    provider: "European Space Agency (ESA)",
    url: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Columbus",
    accessDate: "October 2026",
    usedFor:
      "Columbus laboratory facilities, Fluid Science Laboratory (FSL) capabilities, ZARM drop tower specifications, and MAGNE-FLAME magnetic combustion field data.",
    processingDone:
      "Standardized European aerospace flammability standards (ECSS-Q-ST-70-21C) for comparison with NASA-STD-6001B.",
    limitations:
      "Many proprietary industrial materials screening logs are restricted to European aerospace contractors and not available in full public datasets.",
    category: "Agency Repository",
  },
  {
    id: "src-roscosmos",
    name: "Roscosmos Human Spaceflight Technical Archives & Mir Reports",
    provider: "State Space Corporation Roscosmos / Energia",
    url: "https://www.roscosmos.ru",
    accessDate: "October 2026",
    usedFor:
      "Operational analysis of the 1997 Mir solid-fuel oxygen generator (SFOG) fire, Zvezda and Nauka module safety mounts, and Russian potassium aqueous foam suppression doctrine.",
    processingDone:
      "Reviewed translated technical memoranda on the Mir fire remediation and converted historical Russian cabin environmental specs into modern comparative metrics.",
    limitations:
      "Primary Russian-language mission logs are largely archival print documents; telemetry from early Mir Skorost/Plamya payloads is qualitative rather than digitized high-frequency data.",
    category: "Agency Repository",
  },
  {
    id: "src-cnsa",
    name: "CNSA & CMSA Tiangong Space Station Documentation",
    provider: "China National Space Administration & China Manned Space Agency",
    url: "http://www.cnsa.gov.cn",
    accessDate: "October 2026",
    usedFor:
      "Combustion Experiment Cabinet (CEC) specifications aboard the Mengtian laboratory module, optical diagnostic parameters (Schlieren, TDLAS), and SJ-10 microgravity combustion data.",
    processingDone:
      "Extracted published scientific journal summaries from Chinese Academy of Sciences (CAS) researchers regarding spherical diffusion flame speeds and wire coating flammability.",
    limitations:
      "Raw telemetry from Tiangong orbital science runs is restricted to affiliated academic institutions; dataset relies on peer-reviewed published summaries.",
    category: "Agency Repository",
  },
  {
    id: "src-apod",
    name: "NASA Astronomy Picture of the Day (APOD) API",
    provider: "NASA Open APIs (api.nasa.gov)",
    url: "https://api.nasa.gov",
    accessDate: "October 2026 (Live API with Fallback)",
    usedFor:
      "Dynamic educational space media, astronomy imagery, and daily mission visual context on the FlameLens home dashboard.",
    processingDone:
      "Server-side caching (1 hour TTL) via `/api/apod`, sanitized response formatting, and automatic high-resolution offline fallback image integration when API keys are absent.",
    limitations:
      "APOD provides general astronomical and planetary imagery rather than specific microgravity combustion photography.",
    category: "Public API",
  },
  {
    id: "src-snapi",
    name: "Spaceflight News API (SNAPI v4)",
    provider: "Spaceflight News / The Space Devs",
    url: "https://api.spaceflightnewsapi.net",
    accessDate: "October 2026 (Live API with Fallback)",
    usedFor:
      "Live multi-agency spaceflight news feed on the home page covering Artemis, ISS, Tiangong, and commercial space exploration updates.",
    processingDone:
      "Server-side route `/api/news` with 15-minute in-memory caching, headline sanitization, and structured offline fallback articles in case of network timeouts.",
    limitations:
      "Third-party aggregation service subject to external API rate limits and network latency.",
    category: "Public API",
  },
  {
    id: "src-nasa-std-6001",
    name: "NASA-STD-6001B Flammability Screening Standard",
    provider: "NASA Technical Standards Program",
    url: "https://standards.nasa.gov/standard/NASA/NASA-STD-6001",
    accessDate: "October 2026",
    usedFor:
      "Standard test definitions: Test 1 (Upward Flame Propagation), Test 2 (Heat Release Rate), Test 7 (Toxic Offgassing), and materials certification criteria.",
    processingDone:
      "Harmonized testing methodology across international agencies (ECSS, GOST, JERG, QJ) into a unified comparative matrix.",
    limitations:
      "Standard 1-g upward flammability tests can fail to predict the low-airspeed flammability peak observed in actual microgravity.",
    category: "Engineering Standard",
  },
];
