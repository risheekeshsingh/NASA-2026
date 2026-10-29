export interface QuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  experimentId: string;
  experimentName: string;
  category: "Physics" | "Materials" | "Atmosphere" | "Suppression" | "History";
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Why do flames burn in a spherical shape in microgravity rather than a traditional teardrop plume?",
    scenario: "Astronaut observes a burning droplet inside the Combustion Integrated Rack on the ISS.",
    options: [
      "Microgravity accelerates the chemical reaction rate outward in all directions equally.",
      "The absence of buoyancy eliminates buoyant convective updraft, leaving molecular diffusion as the sole transport mechanism.",
      "High cabin ventilation pushes the flame evenly into a sphere.",
      "Surface tension of the air compresses the flame into a minimum energy sphere.",
    ],
    correctIndex: 1,
    explanation:
      "On Earth, hot combustion gases are less dense than cool ambient air, causing buoyant updraft that shapes the flame into a teardrop. In microgravity, gravity-driven buoyancy vanishes (Grashof number ≈ 0), so oxidizer and fuel vapor diffuse radially in all directions, creating a spherical flame halo.",
    experimentId: "flex-2",
    experimentName: "FLEX-2 (Flame Extinguishment Experiment)",
    category: "Physics",
  },
  {
    id: 2,
    question: "Why can low-speed airflow (5 to 15 cm/s) in space be MORE hazardous for flame spread than stagnant air?",
    scenario: "Cabin ventilation continues at low emergency circulation speed across electrical rack cables.",
    options: [
      "Low airflow blows away flame-retardant gases produced by the material.",
      "Slow airflow delivers fresh oxygen to the flame front without exerting enough convective cooling to quench it.",
      "Low air velocities ignite the nitrogen component in the air.",
      "It induces high turbulence that scatters hot burning embers throughout the module.",
    ],
    correctIndex: 1,
    explanation:
      "In quiescent zero-g, combustion products build up and starve the flame of oxygen. However, gentle forced airflow (5-15 cm/s, typical of cabin fans) constantly replenishes oxygen to the combustion zone without moving fast enough to cool or blow out the flame, causing a flammability peak.",
    experimentId: "bass-ii",
    experimentName: "BASS-II (Burning and Suppression of Solids - II)",
    category: "Physics",
  },
  {
    id: 3,
    question: "What is a 'cool flame' in microgravity, and why is it a significant safety concern?",
    scenario: "A hot droplet flame appears to self-extinguish, but temperature sensors continue to register 700 K.",
    options: [
      "A flame cooled by liquid nitrogen that produces no thermal signature.",
      "A low-temperature (600-800 K) non-luminous oxidation reaction that continues invisibly after apparent hot-flame extinction.",
      "A static electrical discharge mistaken for chemical combustion.",
      "A smoldering foam reaction that only burns backwards toward the fuel tank.",
    ],
    correctIndex: 1,
    explanation:
      "First discovered in orbital microgravity during the FLEX experiment, cool flames are quasi-steady low-temperature chemical reaction regimes (600–800 K vs 1500–2000 K for hot flames). Because they emit almost no visible light, crew members cannot see them without infrared thermal imaging, risking reignition.",
    experimentId: "flex-2",
    experimentName: "FLEX-2 Droplet Combustion Series",
    category: "Physics",
  },
  {
    id: 4,
    question: "Why do proposed Artemis lunar surface habitats plan to operate at 34% O₂ and 8.2 psia (56.5 kPa) instead of sea-level air?",
    scenario: "Habitat architecture engineers select cabin environmental pressure parameters for the lunar south pole base camp.",
    options: [
      "Higher oxygen concentration reduces spacecraft hull weight by eliminating all fire detection sensors.",
      "It allows astronauts to perform spacewalks (EVAs) without lengthy pre-breathe nitrogen purge protocols while maintaining identical alveolar oxygen partial pressure.",
      "Lower pressure prevents any flame from ever igniting regardless of fuel.",
      "It is cheaper to launch pure oxygen tanks than nitrogen pressurization bottles.",
    ],
    correctIndex: 1,
    explanation:
      "Operating at 8.2 psia (56.5 kPa) with 34% O2 maintains an alveolar oxygen partial pressure equivalent to sea-level Earth (~21 kPa O2), preventing hypoxia while enabling astronauts to transition directly into 4.3 psi spacesuits without hours of pre-breathe to avoid decompression sickness ('the bends').",
    experimentId: "sofie-gel",
    experimentName: "SoFIE (Solid Fuel Ignition and Extinction)",
    category: "Atmosphere",
  },
  {
    id: 5,
    question: "Why has NASA adopted Portable Fine Water Mist Extinguishers (PFE) over Halon or CO₂ for the ISS US segment?",
    scenario: "Fire emergency response procedure selection inside the US Destiny laboratory.",
    options: [
      "Water mist is cheaper to refill from Russian Progress cargo tanks.",
      "Water mist rapidly absorbs thermal energy and blocks radiative heat without producing toxic breakdown gases or suffocating the crew in a closed cabin.",
      "CO2 cannot be released in microgravity because it turns into solid dry ice pellets.",
      "Water mist floats into return ducts and automatically starts the air conditioning fans.",
    ],
    correctIndex: 1,
    explanation:
      "In a sealed space cabin with finite life support scrubbing capacity, releasing Halon produces toxic acid gases (HF, HBr), while dumping large quantities of CO2 can raise carbon dioxide concentrations to asphyxiating levels for the crew. Fine deionized water mist with nitrogen propellant suppresses fires cleanly without toxic residue.",
    experimentId: "sofie-mist",
    experimentName: "SoFIE-MIST (Water Mist Suppression)",
    category: "Suppression",
  },
  {
    id: 6,
    question: "How does smoke dispersion in microgravity differ from terrestrial building fires?",
    scenario: "A smoldering cable harness overheats behind an avionics equipment rack.",
    options: [
      "Smoke rises rapidly to the ceiling of the module due to high heat.",
      "Smoke particles do not rise; they remain suspended and diffuse slowly throughout the cabin volume until entrained by HVAC return airflow.",
      "Smoke immediately settles to the floor plates due to electrostatic attraction.",
      "Smoke particles condense into flammable liquid pools on metal walls.",
    ],
    correctIndex: 1,
    explanation:
      "Because buoyancy is absent, smoke does not rise to form a hot ceiling gas layer. Instead, smoke particles stay suspended in the exact location they were generated and drift along whatever forced air currents exist, making return air duct detectors and particle ionization sensors essential.",
    experimentId: "saffire-i",
    experimentName: "Saffire-I (Large-Scale Spacecraft Fire)",
    category: "Physics",
  },
  {
    id: 7,
    question: "What was the direct cause of the 1997 fire aboard the Mir space station?",
    scenario: "Historic spaceflight emergency analysis of the February 23, 1997 incident in the Kvant-1 module.",
    options: [
      "A short circuit in a lithium-ion laptop battery pack.",
      "A rupture and combustion of a solid-fuel chemical oxygen generator canister (SFOG / 'Vika candle').",
      "Leakage of hydrazine thruster fuel through an exterior docking seal.",
      "An electrical arc inside the Kristall materials processing furnace.",
    ],
    correctIndex: 1,
    explanation:
      "On February 23, 1997, a solid-fuel oxygen generator (SFOG / Vika candle) ignited and burned with a torch-like open flame for ~90 seconds inside Mir's Kvant-1 module, producing dense smoke and molten metal slag. It remains the most severe in-flight fire experienced in human spaceflight.",
    experimentId: "saffire-i",
    experimentName: "Saffire-I (Spacecraft-Scale Enclosed Fire)",
    category: "History",
  },
  {
    id: 8,
    question: "What primary parameter does NASA-STD-6001B Test 1 evaluate when screening spacecraft materials?",
    scenario: "Materials engineering certification of a new polymer bracket for the Orion crew capsule.",
    options: [
      "Toxicity offgassing when submerged in deionized water.",
      "Upward flame propagation length under worst-case anticipated cabin oxygen concentration and minimum pressure.",
      "Electrical resistivity when exposed to atomic oxygen.",
      "Mechanical shear strength after 100 thermal vacuum cycles.",
    ],
    correctIndex: 1,
    explanation:
      "NASA-STD-6001B Test 1 evaluates upward flame propagation. A sample is ignited from the bottom in a test chamber configured with the vehicle's worst-case anticipated oxygen percentage and lowest pressure. To pass, the flame spread must not exceed 12 inches (30.5 cm) and must not ignite paper indicator sheets below.",
    experimentId: "flare-jaxa",
    experimentName: "FLARE (Flammability Assessment in Reduced Gravity)",
    category: "Materials",
  },
];
