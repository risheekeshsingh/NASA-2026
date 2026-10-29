export const NASA_STANDARDS = {
  FLAMMABILITY_STANDARD: "NASA-STD-6001B",
  TITLE: "Flammability, Offgassing, and Compatibility Requirements and Test Procedures",
  TEST_1: "Upward Flame Propagation Test (Worst-case operational O2)",
  TEST_2: "Heat Release and Smoke Measurement Test",
  TEST_4: "Electrical Wire Insulation Flammability Test",
};

export const GRAVITY_LEVELS = [
  { name: "Microgravity (0-g)", value: 0.0, description: "International Space Station / Deep Space Transit" },
  { name: "Lunar Gravity (0.16-g)", value: 0.166, description: "Moon Surface / Artemis Base Camp" },
  { name: "Martian Gravity (0.38-g)", value: 0.376, description: "Mars Surface Exploration Habitats" },
  { name: "Terrestrial (1-g)", value: 1.0, description: "Earth Ground Baseline" },
];

export const ATMOSPHERIC_SPECS = {
  EARTH_ISS: { o2Percent: 21.0, pressurePsi: 14.7, label: "ISS Standard Atmospheric Baseline" },
  ARTEMIS_CAMP: { o2Percent: 34.0, pressurePsi: 8.2, label: "Artemis Lunar Habitat EVA Spec" },
  MARS_SURFACE: { o2Percent: 28.0, pressurePsi: 10.2, label: "Mars Exploration Transit Spec" },
};
