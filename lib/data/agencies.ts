import { Agency, AgencyProfile } from "@/types";

export interface DetailedAgencyProfile extends AgencyProfile {
  slug: string;
  roleInHumanSpaceflight: string;
  issContribution: {
    module: string;
    details: string;
    yearLaunched?: number;
  };
  detailedFacilities: Array<{
    name: string;
    type: "orbital" | "ground" | "flight";
    location: string;
    description: string;
  }>;
  detailedPrograms: Array<{
    name: string;
    focus: string;
    status: "active" | "completed" | "planned";
    description: string;
  }>;
  standardsApproach: {
    standard: string;
    philosophy: string;
    testingMethod: string;
    suppressionAgent: string;
    explorationReady: string;
  };
}

export interface ISSPartnerModule {
  id: string;
  name: string;
  agency: Agency;
  agencyName: string;
  role: string;
  launchYear: number;
  pressurizedVolumeM3?: number;
  primaryFunction: string;
  color: string;
  diagramCoordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
  };
}

export interface CombustionMilestone {
  id: string;
  year: number;
  dateStr?: string;
  title: string;
  agency: Agency | "Global";
  summary: string;
  impactOnFireSafety: string;
  verified: boolean;
  verifyNote?: string;
}

export interface AgencyComparisonEntry {
  agency: Agency;
  fullName: string;
  primaryStandard: string;
  testingPhilosophy: string;
  keyFacilities: string;
  inFlightSuppressionDoctrine: string;
  explorationReadinessScore: "Operational" | "In Validation" | "Harmonized";
  explorationAtmosphereNote: string;
}

export const AGENCIES: DetailedAgencyProfile[] = [
  {
    id: "agency-nasa",
    slug: "nasa",
    acronym: "NASA",
    fullName: "National Aeronautics and Space Administration",
    countryOrRegion: "United States",
    headquarters: "Washington, D.C.",
    establishedYear: 1958,
    website: "https://www.nasa.gov",
    roleInHumanSpaceflight:
      "NASA is the primary civilian aeronautics and space agency of the United States. It manages the US Orbital Segment of the International Space Station, coordinates commercial crew and cargo logistics (SpaceX Crew Dragon, Northrop Grumman Cygnus), and leads the multinational Artemis program aimed at returning humans to the Moon and preparing for crewed Mars transit.",
    issContribution: {
      module: "Destiny Laboratory & Harmony / Tranquility Nodes",
      details:
        "Contributed the primary US scientific research module (Destiny Laboratory, launched 2001), core structural nodes (Unity, Harmony, Tranquility), the Quest Joint Airlock, the Integrated Truss Structure, and the primary electrical solar array wings.",
      yearLaunched: 2001,
    },
    microgravityFacilities: [
      "Combustion Integrated Rack (CIR) on ISS Destiny",
      "Microgravity Science Glovebox (MSG) on ISS",
      "Zero-Gravity Research Facility (ZGF, 5.18s vacuum drop at Glenn)",
      "2.2 Second Drop Tower (NASA Glenn, Cleveland, OH)",
      "White Sands Test Facility (WSTF Hyperbaric Chambers)",
    ],
    detailedFacilities: [
      {
        name: "Combustion Integrated Rack (CIR)",
        type: "orbital",
        location: "ISS Destiny Laboratory (US Segment)",
        description:
          "A 100-liter dual-containment combustion test chamber equipped with automated optical diagnostic packages, fuel injection manifolds, high-speed infrared sensors, and programmable mass flow oxidizer mixing.",
      },
      {
        name: "Zero-Gravity Research Facility (ZGF)",
        type: "ground",
        location: "NASA Glenn Research Center (Cleveland, OH)",
        description:
          "World's largest vacuum drop tower offering 5.18 seconds of high-quality microgravity (10^-5 g) within a 145-meter steel vacuum chamber evacuated to 1.3 Pa.",
      },
      {
        name: "White Sands Test Facility (WSTF)",
        type: "ground",
        location: "Las Cruces, NM",
        description:
          "NASA's primary testing facility for hazardous materials evaluation, oxygen compatibility qualification, high-pressure autoignition testing, and upward flammability screening per NASA-STD-6001B.",
      },
    ],
    combustionResearchSummary:
      "Global leader in microgravity combustion physical sciences. Pioneered large-scale vehicle fire testing via the Saffire program on Cygnus vehicles, discovered cool flame droplet burning in CIR (FLEX), mapped low-velocity flammability boundaries in BASS-II, and investigates Artemis lunar atmospheres with SoFIE.",
    primaryPrograms: ["Saffire I-VI", "ACME", "FLEX / FLEX-2", "BASS & BASS-II", "SoFIE", "SIBAL"],
    detailedPrograms: [
      {
        name: "Saffire I-VI (Spacecraft Fire Safety Demonstration)",
        focus: "Spacecraft-scale flame spread and depressurization extinction",
        status: "completed",
        description:
          "Executed six autonomous large-scale fire experiments inside departing Cygnus cargo vehicles after ISS unberthing. Ignited full-scale SIBAL fabric sheets (up to 0.4 x 1.0 m) and PMMA blocks under realistic microgravity airflow and reduced oxygen conditions.",
      },
      {
        name: "SoFIE (Solid Fuel Ignition and Extinction)",
        focus: "Material flammability in Artemis exploration atmospheres",
        status: "active",
        description:
          "Ongoing multi-investigator testing inside the ISS CIR evaluating solid polymer burning, fabric smoldering, and flame suppression at 34% O2 and 56.5 kPa (8.2 psia) habitat pressures.",
      },
      {
        name: "FLEX / FLEX-2 (Flame Extinguishment Experiment)",
        focus: "Isolated droplet combustion and low-temperature cool flames",
        status: "completed",
        description:
          "Demonstrated that hydrocarbon droplets in microgravity continue non-luminous oxidation ('cool flames') at 600-800 K even after apparent visual extinction.",
      },
    ],
    flammabilityTestingStandard: "NASA-STD-6001B (Flammability, Offgassing, and Compatibility Requirements)",
    standardsApproach: {
      standard: "NASA-STD-6001B",
      philosophy: "Prevent ignition through strict screening; design for rapid detection and clean suppression without cabin toxic contamination.",
      testingMethod: "Test 1 (Upward flame propagation in worst-case flight oxygen/pressure atmosphere); Test 2 (Heat release rate); Test 7 (Toxic offgassing).",
      suppressionAgent: "Fine water mist handheld extinguishers (PFE) utilizing deionized water with nitrogen propellant, replacing halon/carbon dioxide to avoid crew asphyxiation.",
      explorationReady: "High: Active validation via SoFIE at 34% O2 and 8.2 psia habitat atmospheres.",
    },
  },
  {
    id: "agency-esa",
    slug: "esa",
    acronym: "ESA",
    fullName: "European Space Agency",
    countryOrRegion: "Europe (22 Member States)",
    headquarters: "Paris, France",
    establishedYear: 1975,
    website: "https://www.esa.int",
    roleInHumanSpaceflight:
      "ESA is an intergovernmental organization comprising 22 European member states. ESA contributed the Columbus laboratory module and the Cupola observation module to the ISS, manufactures the European Service Module (ESM) that powers the Orion spacecraft for NASA's Artemis lunar missions, and trains European astronauts for long-duration orbital science expeditions.",
    issContribution: {
      module: "Columbus Research Laboratory & Cupola",
      details:
        "Supplied the Columbus Laboratory module (launched 2008 by Space Shuttle Atlantis, STS-122), providing multidisciplinary internal racks and external science platforms, along with the panoramic 7-window Cupola robotic workstation.",
      yearLaunched: 2008,
    },
    microgravityFacilities: [
      "Columbus Laboratory Fluid Science Module on ISS",
      "ZARM Drop Tower Bremen (4.7s drop / 9.3s catapult)",
      "Novespace Airbus A310 Zero-G Parabolic Flight Aircraft (Bordeaux, France)",
    ],
    detailedFacilities: [
      {
        name: "Columbus Laboratory",
        type: "orbital",
        location: "ISS European Segment",
        description:
          "Hosts the Fluid Science Laboratory (FSL) and European Drawer Rack (EDR), enabling investigations into multi-phase thermal dynamics, foam stability, and ignition kinetics.",
      },
      {
        name: "ZARM Drop Tower",
        type: "ground",
        location: "University of Bremen (Bremen, Germany)",
        description:
          "A 146-meter drop tower operating in standard 4.7-second free-fall or 9.3-second pneumatic catapult mode, providing high microgravity quality (10^-6 g) for fundamental combustion and droplet physics.",
      },
      {
        name: "Novespace Zero-G Airbus A310",
        type: "flight",
        location: "Bordeaux-Mérignac Airport (France)",
        description:
          "Dedicated parabolic flight aircraft providing repeated 20-second microgravity, lunar (0.16 g), and Martian (0.38 g) parabolas for intermediate combustion testing and equipment handling.",
      },
    ],
    combustionResearchSummary:
      "Extensive microgravity combustion contributions focusing on magnetic field interactions with flame fronts (MAGNE-FLAME), smoldering in porous foam matrices on parabolic flights, and boiling/multiphase fluid ignition kinetics (RUBI).",
    primaryPrograms: ["MAGNE-FLAME", "RUBI", "THERMAL-C", "Parabolic Smolder Investigations"],
    detailedPrograms: [
      {
        name: "MAGNE-FLAME",
        focus: "Magnetic field interaction with paramagnetic oxygen in microgravity flames",
        status: "completed",
        description:
          "Examined how inhomogeneous magnetic fields exert body forces on paramagnetic O2 molecules, mimicking or counteracting buoyancy in microgravity diffusion flames.",
      },
      {
        name: "RUBI (Reference User Facility for Boiling Investigations)",
        focus: "Phase change, thermal boundary layers, and flammable liquid vaporization",
        status: "active",
        description:
          "Deploys high-speed infrared cameras and electric field electrodes to analyze bubble detachment, vapor films, and boiling heat transfer limits in microgravity.",
      },
    ],
    flammabilityTestingStandard: "ECSS-Q-ST-70-21C (Flammability testing for the screening of space materials)",
    standardsApproach: {
      standard: "ECSS-Q-ST-70-21C",
      philosophy: "Standardized European space materials qualification ensuring flammability thresholds are validated against worst-case flight operational pressures.",
      testingMethod: "Upward and downward flame propagation testing with automated optical tracking and mass loss calorimetry.",
      suppressionAgent: "Harmonized with ISS US segment; portable water mist and carbon dioxide fire extinguishers.",
      explorationReady: "High: Co-engineering Artemis ESM flight hardware under harmonized NASA/ESA environmental limits.",
    },
  },
  {
    id: "agency-roscosmos",
    slug: "roscosmos",
    acronym: "Roscosmos",
    fullName: "State Space Corporation Roscosmos",
    countryOrRegion: "Russian Federation",
    headquarters: "Moscow, Russia",
    establishedYear: 1992,
    website: "https://www.roscosmos.ru",
    roleInHumanSpaceflight:
      "Roscosmos manages the Russian Orbital Segment (ROS) of the International Space Station, operates the crewed Soyuz-MS spacecraft and uncrewed Progress-MS logistical freighters, and holds continuous human orbital spaceflight heritage originating from the Vostok, Voskhod, Salyut, and Mir space station programs.",
    issContribution: {
      module: "Zvezda Service Module, Zarya (FGB) & Nauka (MLM)",
      details:
        "Contributed the foundational functional cargo block (Zarya, launched 1998), the primary living and command quarters (Zvezda Service Module, 2000), the Nauka Multipurpose Laboratory Module (2021), and docking airlocks (Poisk, Rassvet, Prichal).",
      yearLaunched: 1998,
    },
    microgravityFacilities: [
      "Nauka Multi-purpose Laboratory Module on ISS",
      "Zvezda Service Module Combustion Test Mounts",
      "Mir Space Station Kristall Module (Historical)",
    ],
    detailedFacilities: [
      {
        name: "Nauka Multi-purpose Laboratory Module",
        type: "orbital",
        location: "ISS Russian Segment",
        description:
          "Russia's primary scientific module on the ISS, equipped with multiple experimental work stations, glovebox provisions, and telemetry interfaces for physical science investigations.",
      },
      {
        name: "Zvezda Service Module",
        type: "orbital",
        location: "ISS Russian Segment",
        description:
          "The operational nerve center of the Russian segment, housing environmental control systems, oxygen generation units (Elektron), fire warning sensors, and emergency smoke protection equipment.",
      },
    ],
    combustionResearchSummary:
      "Extensive operational fire containment experience stemming from the real-world 1997 Mir solid-fuel oxygen generator (SFOG) fire. Conducted orbital combustion physics with Skorost and Plamya payloads, emphasizing smoke removal, fire suppression foaming, and rapid compartment isolation.",
    primaryPrograms: ["Plamya", "Skorost", "Mir SFOG Fire Safety Post-Investigation Protocols"],
    detailedPrograms: [
      {
        name: "Mir SFOG Investigation & Remediation",
        focus: "Chemical oxygen candle fire mitigation and post-fire toxic scrubbing",
        status: "completed",
        description:
          "Comprehensive engineering investigation following the February 23, 1997 open fire on Mir. Redesigned oxygen generation canisters, emergency oxygen masks (IP-50), and station emergency procedures.",
      },
      {
        name: "Plamya & Skorost Orbital Series",
        focus: "Solid material and droplet combustion under microgravity conditions",
        status: "completed",
        description:
          "Flight experiments on Mir and Salyut stations investigating diffusion flame envelopes, candle flame extinction, and combustion dynamics in sealed volumes.",
      },
    ],
    flammabilityTestingStandard: "GOST R 50804-95 (Crewed Spacecraft Environmental Safety)",
    standardsApproach: {
      standard: "GOST R 50804-95",
      philosophy: "Rigid compartment isolation, rapid electrical de-energization, and specialized chemical foam suppression tailored to Russian module volume.",
      testingMethod: "Materials combustion screening in controlled oxygen chambers measuring linear flame spread and toxic gas output.",
      suppressionAgent: "Specialized potassium-based water-foam portable extinguishers (OКР-1) designed for sealed zero-g cabins without creating conductive splatter.",
      explorationReady: "Moderate: Established for standard 101.3 kPa air mixtures; active research needed for hyperoxic hypobaric architectures.",
    },
  },
  {
    id: "agency-cnsa",
    slug: "cnsa",
    acronym: "CNSA",
    fullName: "China National Space Administration & CMSA",
    countryOrRegion: "China",
    headquarters: "Beijing, China",
    establishedYear: 1993,
    website: "http://www.cnsa.gov.cn",
    roleInHumanSpaceflight:
      "CNSA and the China Manned Space Agency (CMSA) operate the permanently crewed Tiangong Space Station in low Earth orbit. Through the Shenzhou crewed transport and Tianzhou cargo spacecraft, China maintains a continuous three-person crew rotation conducting orbital science, spacewalks, and advanced physical sciences research.",
    issContribution: {
      module: "Tiangong Orbital Station (Independent Architecture)",
      details:
        "Operates the independent Tiangong Space Station, consisting of the Tianhe Core Module and two large scientific laboratory modules: Wentian and Mengtian.",
      yearLaunched: 2021,
    },
    microgravityFacilities: [
      "Mengtian Science Module Combustion Experiment Cabinet (CEC) on Tiangong",
      "National Microgravity Laboratory Drop Tower (CAS, Beijing, 3.6s)",
      "SJ Series Microgravity Retrievable Satellites",
    ],
    detailedFacilities: [
      {
        name: "Combustion Experiment Cabinet (CEC)",
        type: "orbital",
        location: "Tiangong Mengtian Science Module",
        description:
          "World-class orbital combustion rack featuring a sealed combustion chamber, multi-component fuel and gas supply, 360-degree high-speed Schlieren imaging, and Tunable Diode Laser Absorption Spectroscopy (TDLAS).",
      },
      {
        name: "CAS National Microgravity Drop Tower",
        type: "ground",
        location: "Institute of Mechanics, CAS (Beijing)",
        description:
          "A 116-meter drop facility providing 3.6 seconds of high-purity microgravity for preliminary burner validation, droplet evaporation studies, and sensor calibration.",
      },
    ],
    combustionResearchSummary:
      "Rapidly advancing orbital combustion capabilities aboard the Tiangong space station. The Combustion Experiment Cabinet features state-of-the-art optical diagnostic packages, tunable laser diode absorption spectroscopy, and multi-component fuel injection for spherical gas and solid polymer combustion studies.",
    primaryPrograms: ["Tiangong CEC", "SJ-10 Retrievable Satellite Combustion Series"],
    detailedPrograms: [
      {
        name: "Tiangong Combustion Experiment Cabinet (CEC) Program",
        focus: "Orbital microgravity combustion physics, soot formation, and flame speed",
        status: "active",
        description:
          "Active research investigations aboard Mengtian analyzing methane and ethylene spherical diffusion flames, coal particle combustion, and polymer wire flammability in zero gravity.",
      },
      {
        name: "SJ-10 Retrievable Satellite Program",
        focus: "Solid wire insulation ignition and extinction in microgravity",
        status: "completed",
        description:
          "Orbital microgravity flight mission dedicated to physical sciences, recording ignition limits and flame spread over polyethylene and ETFE wire coatings.",
      },
    ],
    flammabilityTestingStandard: "QJ 20387 (Spacecraft Non-Metallic Materials Flammability Requirements)",
    standardsApproach: {
      standard: "QJ 20387 / GJB 2896",
      philosophy: "Strict materials qualification across low-pressure and enriched-oxygen conditions, backed by multi-sensor optical and particle flame detectors.",
      testingMethod: "Upward flame propagation, limiting oxygen index (LOI) testing, and offgassing gas chromatography.",
      suppressionAgent: "Clean gaseous fire suppression and localized aerosol extinguishers designed for the Tiangong cabin atmosphere.",
      explorationReady: "High: Actively designing for deep-space and lunar crewed habitat architectures.",
    },
  },
  {
    id: "agency-jaxa",
    slug: "jaxa",
    acronym: "JAXA",
    fullName: "Japan Aerospace Exploration Agency",
    countryOrRegion: "Japan",
    headquarters: "Chofu, Tokyo, Japan",
    establishedYear: 2003,
    website: "https://global.jaxa.jp",
    roleInHumanSpaceflight:
      "JAXA contributes the Kibo Japanese Experiment Module to the ISS, launched the HTV (Kounotori) cargo freighters, operates the astronaut training center in Tsukuba Space Center, and collaborates actively with NASA on the Artemis program by providing life support hardware and developing the pressurized lunar rover.",
    issContribution: {
      module: "Kibo (Japanese Experiment Module - JEM)",
      details:
        "Contributed the largest single pressurized module on the ISS (Kibo JEM-PM, launched in 2008 by STS-124), along with an external scientific Exposed Facility (EF), an airlock, and a dedicated robotic manipulator arm (JEM-RMS).",
      yearLaunched: 2008,
    },
    microgravityFacilities: [
      "Kibo Japanese Experiment Module (JEM) Multi-purpose Small Payload Rack (MSPR)",
      "Microgravity Science Laboratory inside Kibo Pressurized Module",
      "MGLAB Drop Shaft (Kamioka, Historical 4.5s)",
    ],
    detailedFacilities: [
      {
        name: "Kibo Pressurized Module (JEM-PM)",
        type: "orbital",
        location: "ISS Japanese Segment",
        description:
          "Accommodates the Multi-purpose Small Payload Rack (MSPR) and MSPR-2, which house the Solid Combustion Experiment Module (SCEM) for wire flammability and material testing.",
      },
      {
        name: "Tsukuba Space Center Microgravity Labs",
        type: "ground",
        location: "Tsukuba, Ibaraki, Japan",
        description:
          "Ground test facility equipped with short-duration drop tubes, reduced-gravity parabolic simulation setups, and optical laser diagnostic development rigs.",
      },
    ],
    combustionResearchSummary:
      "Pioneering research into the fundamental flammability limits of solid materials and wire insulation in microgravity. Developed the two-dimensional flammability map in the FLARE experiment and investigated cable fire propagation in the SCEM facility.",
    primaryPrograms: ["FLARE", "SCEM", "Group Combustion on Kibo"],
    detailedPrograms: [
      {
        name: "FLARE (Flammability Assessment of Materials in Reduced Gravity)",
        focus: "Quantitative 2D flammability mapping of space materials and wire insulation",
        status: "active",
        description:
          "Multi-national project in Kibo determining how microgravity and low convective flows shift extinction boundaries, establishing international safety margins beyond standard 1-g tests.",
      },
      {
        name: "SCEM (Solid Combustion Experiment Module)",
        focus: "Electrical cable insulation fire propagation",
        status: "active",
        description:
          "Investigates ignition and flame spreading over current-carrying wires with polymer sheaths under low airflow velocity conditions in the Kibo MSPR.",
      },
    ],
    flammabilityTestingStandard: "JERG-2-130 (Spacecraft Material Flammability Screening Standard)",
    standardsApproach: {
      standard: "JERG-2-130",
      philosophy: "Quantitative modeling of microgravity flammability boundaries, demonstrating that some materials ignite more easily at low airspeeds than in standard 1-g upward tests.",
      testingMethod: "Limiting oxygen index (LOI) combined with low-flow convective wind tunnel verification.",
      suppressionAgent: "Harmonized with ISS segment standards; fine water mist and gaseous suppression.",
      explorationReady: "High: Developing next-generation safety standards for pressurized lunar rover missions.",
    },
  },
  {
    id: "agency-csa",
    slug: "csa",
    acronym: "CSA",
    fullName: "Canadian Space Agency",
    countryOrRegion: "Canada",
    headquarters: "Longueuil, Quebec, Canada",
    establishedYear: 1989,
    website: "https://www.asc-csa.gc.ca",
    roleInHumanSpaceflight:
      "The Canadian Space Agency is a foundational partner in the ISS program, recognized globally for advanced space robotics. CSA provided the iconic Canadarm for the Space Shuttle, Canadarm2 and Dextre for the ISS, is developing Canadarm3 for the Lunar Gateway, and has secured an astronaut seat on the Artemis II crewed lunar flyby.",
    issContribution: {
      module: "Mobile Servicing System (Canadarm2, Dextre & Mobile Base)",
      details:
        "Contributed the Mobile Servicing System (MSS), including the 17-meter Canadarm2 robotic manipulator (launched 2001, STS-100), the Dextre two-armed robotic handyman (2008), and the Mobile Base System traversing the ISS truss.",
      yearLaunched: 2001,
    },
    microgravityFacilities: [
      "NRC Falcon 20 Parabolic Research Aircraft (Ottawa)",
      "ISS Canadarm2 and Special Purpose Dexterous Manipulator support for CIR hardware handling",
    ],
    detailedFacilities: [
      {
        name: "Canadarm2 & Mobile Servicing System",
        type: "orbital",
        location: "ISS Exterior Truss Structure",
        description:
          "Key robotic infrastructure responsible for capturing and berthing visiting cargo spacecraft (Cygnus, Dragon) carrying microgravity combustion payloads and assisting exterior inspection.",
      },
      {
        name: "National Research Council Falcon 20",
        type: "flight",
        location: "Ottawa, Ontario, Canada",
        description:
          "Specially modified twin-jet aircraft operated with the NRC, delivering high-precision 20-second microgravity parabolas (0.01 g) for fluid and combustion experiments.",
      },
    ],
    combustionResearchSummary:
      "Collaborator in space environmental physical sciences, payload robotic servicing, and aircraft parabolic flight campaigns studying aerosol transport, soot formation, and atmospheric contaminant monitoring.",
    primaryPrograms: ["ISS BPS International Science Working Group", "Aerosol Micro-physics"],
    detailedPrograms: [
      {
        name: "ISS Physical Sciences International Working Group",
        focus: "Cross-agency harmonization of combustion experiment data and data access",
        status: "active",
        description:
          "Collaborates with NASA, ESA, and JAXA in physical sciences informatics (PSI), sharing experimental data archives and telemetry models.",
      },
      {
        name: "Aerosol Micro-physics & Particulate Sensor Development",
        focus: "Real-time smoke detection and air quality monitoring in sealed cabins",
        status: "active",
        description:
          "Parabolic flight campaigns testing optical particle counters capable of distinguishing microgravity soot from inert cabin lint and dust.",
      },
    ],
    flammabilityTestingStandard: "NASA-STD-6001B Harmonized / CSA-ST-FLAM",
    standardsApproach: {
      standard: "Harmonized NASA-STD-6001B",
      philosophy: "Integrated bilateral materials qualification with NASA and international partners, with specific focus on external robotic composites and high-durability thermal blankets.",
      testingMethod: "Upward flammability, toxicity offgassing, and thermal vacuum compatibility testing.",
      suppressionAgent: "Harmonized with ISS US segment fire protection doctrines.",
      explorationReady: "High: Co-developing Lunar Gateway external robotics and habitat safety interfaces.",
    },
  },
];

export const ISS_PARTNER_MODULES: ISSPartnerModule[] = [
  {
    id: "module-destiny",
    name: "Destiny Laboratory",
    agency: "NASA",
    agencyName: "National Aeronautics and Space Administration",
    role: "Primary US research module; houses the Combustion Integrated Rack (CIR).",
    launchYear: 2001,
    pressurizedVolumeM3: 106,
    primaryFunction: "Microgravity combustion, fluid physics, and material science",
    color: "#f59e0b", // amber/ember
    diagramCoordinates: { x: 380, y: 150, width: 90, height: 50, label: "Destiny (NASA)" },
  },
  {
    id: "module-columbus",
    name: "Columbus Laboratory",
    agency: "ESA",
    agencyName: "European Space Agency",
    role: "European science module; hosts Fluid Science Laboratory (FSL) and EDR.",
    launchYear: 2008,
    pressurizedVolumeM3: 75,
    primaryFunction: "Fluid physics, biology, and materials research",
    color: "#06b6d4", // cyan
    diagramCoordinates: { x: 490, y: 110, width: 75, height: 45, label: "Columbus (ESA)" },
  },
  {
    id: "module-kibo",
    name: "Kibo (JEM-PM)",
    agency: "JAXA",
    agencyName: "Japan Aerospace Exploration Agency",
    role: "Largest pressurized module; houses MSPR and FLARE/SCEM combustion experiments.",
    launchYear: 2008,
    pressurizedVolumeM3: 130,
    primaryFunction: "Multipurpose science, exposed facility, and material flammability",
    color: "#10b981", // emerald
    diagramCoordinates: { x: 490, y: 195, width: 85, height: 48, label: "Kibo (JAXA)" },
  },
  {
    id: "module-zvezda",
    name: "Zvezda Service Module",
    agency: "Roscosmos",
    agencyName: "State Space Corporation Roscosmos",
    role: "Russian operational and living module; emergency fire response command.",
    launchYear: 2000,
    pressurizedVolumeM3: 90,
    primaryFunction: "Station life support, flight control, and Russian science mounts",
    color: "#ef4444", // red
    diagramCoordinates: { x: 170, y: 150, width: 85, height: 50, label: "Zvezda (Roscosmos)" },
  },
  {
    id: "module-canadarm2",
    name: "Canadarm2 (SSRMS)",
    agency: "CSA",
    agencyName: "Canadian Space Agency",
    role: "17-meter robotic arm; berths visiting combustion payload vehicles (Cygnus, Dragon).",
    launchYear: 2001,
    primaryFunction: "Station assembly, payload relocation, and vehicle berthing",
    color: "#a855f7", // purple
    diagramCoordinates: { x: 360, y: 80, width: 110, height: 35, label: "Canadarm2 (CSA)" },
  },
];

export const COMBUSTION_MILESTONES: CombustionMilestone[] = [
  {
    id: "milestone-1967",
    year: 1967,
    dateStr: "January 27, 1967",
    title: "Apollo 1 (AS-204) Launchpad Flash Fire",
    agency: "NASA",
    summary:
      "During a launch simulation test, an electrical arc ignited flammable materials in a 100% oxygen cabin pressurized to 16.7 psia (115 kPa). The fatal fire led to a total redesign of spacecraft interiors, elimination of high-pressure pure oxygen, and establishment of NASA-STD-6001 materials screening.",
    impactOnFireSafety:
      "Catalyzed modern spacecraft materials flammability qualification, mandatory flame retardancy testing, and zero-tolerance policies for flammable cabin fasteners.",
    verified: true,
  },
  {
    id: "milestone-1973",
    year: 1973,
    dateStr: "May 1973 - February 1974",
    title: "Skylab M518 & Early Orbital Flame Experiments",
    agency: "NASA",
    summary:
      "First systematic visual demonstrations of flames burning in orbital microgravity aboard Skylab. Documented that microgravity flames assume spherical geometries due to the absence of buoyant buoyant convection.",
    impactOnFireSafety:
      "Demonstrated that microgravity flames lack natural upward draft, leading to slower burn rates but prolonged smoldering potential in confined spaces.",
    verified: true,
  },
  {
    id: "milestone-1997-mir",
    year: 1997,
    dateStr: "February 23, 1997",
    title: "Mir Space Station Kvant-1 Solid-Fuel Oxygen Generator Fire",
    agency: "Roscosmos",
    summary:
      "A solid-fuel chemical oxygen candle (Vika / SFOG) ruptured aboard the Mir space station, producing a 90-second open torch flame in microgravity. Crew members battled dense smoke with portable foam extinguishers and emergency masks to extinguish the fire and restore life support.",
    impactOnFireSafety:
      "The most serious open fire in human spaceflight history. Proved that smoke particles do not disperse naturally in zero gravity and underscored the absolute need for specialized microgravity respirators and non-conductive suppression foams.",
    verified: true,
  },
  {
    id: "milestone-1997-sofd",
    year: 1997,
    dateStr: "April & July 1997",
    title: "STS-83/94 Space Shuttle SOFBALL Flame Ball Discovery",
    agency: "NASA",
    summary:
      "Flown twice on Space Shuttle Columbia in the Microgravity Science Laboratory (MSL-1). Deployed the Structure of Flame Balls at Low Lewis-number (SOFBALL) experiment, discovering steady, spherical flame balls burning at sub-watt powers.",
    impactOnFireSafety:
      "Proved that ultra-lean fuel mixtures previously considered non-flammable on Earth can sustain stable, near-invisible combustion in microgravity via pure molecular diffusion.",
    verified: true,
  },
  {
    id: "milestone-2008",
    year: 2008,
    dateStr: "February 2008",
    title: "Combustion Integrated Rack (CIR) Deployed on ISS",
    agency: "NASA",
    summary:
      "Delivered to the ISS Destiny module aboard Space Shuttle Endeavour (STS-126/STS-122). Provided a permanent, sealed dual-containment combustion facility for long-duration orbital physical science.",
    impactOnFireSafety:
      "Enabled over 15 years of uninterrupted, safe microgravity combustion experiments without releasing smoke, toxic effluents, or heat into the crew cabin.",
    verified: true,
  },
  {
    id: "milestone-2012",
    year: 2012,
    dateStr: "2009 - 2013",
    title: "Discovery of Microgravity 'Cool Flames' in FLEX",
    agency: "NASA",
    summary:
      "During the Flame Extinguishment Experiment (FLEX) inside the ISS CIR, isolated alkane fuel droplets exhibited sustained, low-temperature (~600-800 K) chemical reaction waves after visible hot-flame extinction.",
    impactOnFireSafety:
      "Revealed that extinguished flames may continue invisible, low-temperature oxidation, requiring new post-fire monitoring protocols and thermal imaging checks before declaring an area safe.",
    verified: true,
  },
  {
    id: "milestone-2016",
    year: 2016,
    dateStr: "June 2016 - January 2024",
    title: "Saffire I-VI Spacecraft-Scale Fire Demonstrations",
    agency: "NASA",
    summary:
      "Executed six autonomous large-scale fire tests aboard uncrewed Northrop Grumman Cygnus cargo spacecraft after departing the ISS. Tested flame spread over 0.4 x 1.0 m fabric sheets, acrylic slabs, and cabin depressurization extinction.",
    impactOnFireSafety:
      "Provided the first empirical validation that microgravity flames spread upstream against gentle forced airflow (0.1 to 0.2 m/s) and established real-world depressurization limits for future spacecraft.",
    verified: true,
  },
  {
    id: "milestone-2019",
    year: 2019,
    dateStr: "May 2019 - Present",
    title: "JAXA FLARE Flammability Mapping on Kibo",
    agency: "JAXA",
    summary:
      "Conducted extensive solid material and wire insulation flammability testing inside the Kibo module, constructing international 2D flammability boundary maps.",
    impactOnFireSafety:
      "Demonstrated that wire coatings and thin materials exhibit a flammability peak at low convective flow speeds (5-10 cm/s), proving that standard 1-g upward flammability screening is not universally conservative.",
    verified: true,
  },
  {
    id: "milestone-2022-cnsa",
    year: 2022,
    dateStr: "October 2022",
    title: "Tiangong Mengtian Combustion Experiment Cabinet (CEC) Commissioned",
    agency: "CNSA",
    summary:
      "China launched the Mengtian science module carrying the Combustion Experiment Cabinet to the Tiangong space station, equipped with 360-degree Schlieren imaging and tunable diode laser spectroscopy.",
    impactOnFireSafety:
      "Expanded global microgravity combustion research capabilities with a modern, high-precision orbital combustion facility supporting international collaboration.",
    verified: true,
  },
  {
    id: "milestone-2022-sofie",
    year: 2022,
    dateStr: "March 2022 - Present",
    title: "SoFIE Artemis Exploration Atmosphere Testing on ISS",
    agency: "NASA",
    summary:
      "Installed five insert modules into the ISS CIR to evaluate solid fuel ignition, flame spread, and extinction specifically tailored to Artemis lunar habitats (34% O2, 8.2 psia / 56.5 kPa).",
    impactOnFireSafety:
      "Directly informs material selection and fire safety standards for future Moon and Mars habitats operating under hypobaric, oxygen-enriched environments.",
    verified: true,
  },
  {
    id: "milestone-2027-gateway",
    year: 2027,
    dateStr: "Projected 2027 - 2030",
    title: "Lunar Gateway Deep-Space Automated Fire Safety Suite",
    agency: "Global",
    summary:
      "Multinational collaboration (NASA, ESA, JAXA, CSA) developing autonomous fire detection, gas scrubbing, and pressure-relief suppression for uncrewed periods on the Lunar Gateway.",
    impactOnFireSafety:
      "Critical for long uncrewed periods where fire detection and suppression must operate without human astronaut intervention.",
    verified: false,
    verifyNote: "Future roadmap projection. Verify against active multilateral Gateway schedules.",
  },
];

export const AGENCY_COMPARISON_DATA: AgencyComparisonEntry[] = [
  {
    agency: "NASA",
    fullName: "National Aeronautics and Space Administration",
    primaryStandard: "NASA-STD-6001B",
    testingPhilosophy:
      "Worst-case upward flame spread screening in flight atmospheres (Test 1), heat release calorimetry (Test 2), and strict toxic offgassing (Test 7).",
    keyFacilities:
      "Combustion Integrated Rack (CIR on ISS), Zero-Gravity Research Facility (5.18s), White Sands Test Facility.",
    inFlightSuppressionDoctrine:
      "Fine deionized water mist handheld extinguishers (PFE) with N2 propellant, avoiding cabin asphyxiation and toxic contamination.",
    explorationReadinessScore: "Operational",
    explorationAtmosphereNote:
      "Actively validating materials in 34% O2, 8.2 psia atmospheres via SoFIE flight tests aboard the ISS.",
  },
  {
    agency: "ESA",
    fullName: "European Space Agency",
    primaryStandard: "ECSS-Q-ST-70-21C",
    testingPhilosophy:
      "Standardized materials qualification across European aerospace contractors with automated thermal image tracking and mass-loss calorimetry.",
    keyFacilities:
      "Columbus Laboratory Fluid Science Module (ISS), ZARM Drop Tower Bremen (4.7s / 9.3s catapult), Novespace A310 Zero-G.",
    inFlightSuppressionDoctrine:
      "Harmonized with ISS US segment; portable fine water mist extinguishers and localized CO2 safety canisters.",
    explorationReadinessScore: "Harmonized",
    explorationAtmosphereNote:
      "Participating in Artemis European Service Module (ESM) environmental qualification under NASA-STD-6001B equivalency.",
  },
  {
    agency: "Roscosmos",
    fullName: "State Space Corporation Roscosmos",
    primaryStandard: "GOST R 50804-95",
    testingPhilosophy:
      "Operational resilience derived from Mir SFOG fire heritage; emphasis on rapid compartment isolation and non-conductive foam suppression.",
    keyFacilities:
      "Nauka Multi-purpose Laboratory Module (ISS), Zvezda Service Module, historic Mir flight archives.",
    inFlightSuppressionDoctrine:
      "Specialized potassium-based aqueous foam extinguishers (OKR-1) engineered to adhere to zero-g surfaces without creating aerosol droplet hazards.",
    explorationReadinessScore: "Operational",
    explorationAtmosphereNote:
      "Proven for standard 101.3 kPa sea-level air; research ongoing for future low-pressure oxygen-enriched architectures.",
  },
  {
    agency: "CNSA",
    fullName: "China National Space Administration & CMSA",
    primaryStandard: "QJ 20387 / GJB 2896",
    testingPhilosophy:
      "Comprehensive non-metallic material screening combining limiting oxygen index (LOI) testing with low-pressure combustion validation.",
    keyFacilities:
      "Combustion Experiment Cabinet (CEC on Tiangong), CAS Microgravity Drop Tower (3.6s), SJ series satellites.",
    inFlightSuppressionDoctrine:
      "Dual-loop optical/particulate smoke detection coupled with specialized clean gas and aerosol fire extinguishing canisters.",
    explorationReadinessScore: "In Validation",
    explorationAtmosphereNote:
      "Conducting extensive baseline combustion experiments aboard Mengtian preparing for planned crewed lunar surface missions.",
  },
  {
    agency: "JAXA",
    fullName: "Japan Aerospace Exploration Agency",
    primaryStandard: "JERG-2-130",
    testingPhilosophy:
      "Quantitative microgravity flammability boundary mapping (FLARE), recognizing that low airflows can be more hazardous than standard 1-g upward tests.",
    keyFacilities:
      "Kibo Multi-purpose Small Payload Rack (MSPR), Solid Combustion Experiment Module (SCEM), Tsukuba Space Center.",
    inFlightSuppressionDoctrine:
      "Harmonized with ISS standards; fine water mist extinguishers and localized electrical equipment power cutoffs.",
    explorationReadinessScore: "Harmonized",
    explorationAtmosphereNote:
      "Leading international development of 2D flammability safety margins for pressurized lunar rovers and Gateway.",
  },
  {
    agency: "CSA",
    fullName: "Canadian Space Agency",
    primaryStandard: "Harmonized NASA-STD-6001B",
    testingPhilosophy:
      "Integrated materials qualification with NASA and international partners, specializing in external robotic composite coatings and sensor optics.",
    keyFacilities:
      "Canadarm2 and Dextre robotic inspection platforms on ISS, NRC Falcon 20 parabolic research aircraft.",
    inFlightSuppressionDoctrine:
      "Harmonized with ISS US segment fire protection doctrines and robotic exterior thermal monitoring.",
    explorationReadinessScore: "Harmonized",
    explorationAtmosphereNote:
      "Designing deep-space robotic hardware for Lunar Gateway under multilateral exploration atmosphere safety criteria.",
  },
];
