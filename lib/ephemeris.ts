/**
 * NASA JPL Planetary Ephemeris Calculation Library
 * Computes high-precision live distances, coordinates, and light travel times
 * from Earth to the Sun and all major planets using NASA JPL Keplerian Elements (AD 1800 - 2050).
 * Reference: Standish & Williams, NASA JPL Solar System Dynamics (approx_pos.html)
 */

export const AU_IN_KM = 149597870.7;
export const KM_TO_MILES = 0.621371;
export const SPEED_OF_LIGHT_KM_S = 299792.458;

export interface PlanetOrbitalElements {
  a: [number, number];     // Semi-major axis (au, au/Cy)
  e: [number, number];     // Eccentricity (dimensionless, rate/Cy)
  I: [number, number];     // Inclination (deg, deg/Cy)
  L: [number, number];     // Mean longitude (deg, deg/Cy)
  peri: [number, number];  // Longitude of perihelion (deg, deg/Cy)
  node: [number, number];  // Longitude of ascending node (deg, deg/Cy)
}

export const JPL_TABLE_1: Record<string, PlanetOrbitalElements> = {
  mercury: {
    a: [0.38709927, 0.00000037],
    e: [0.20563593, 0.00001906],
    I: [7.00497902, -0.00594749],
    L: [252.25032350, 149472.67411175],
    peri: [77.45779628, 0.16047689],
    node: [48.33076593, -0.12534081],
  },
  venus: {
    a: [0.72333566, 0.00000390],
    e: [0.00677672, -0.00004107],
    I: [3.39467605, -0.00078890],
    L: [181.97909950, 58517.81538729],
    peri: [131.60246718, 0.00268329],
    node: [76.67984255, -0.27769418],
  },
  earth: {
    a: [1.00000261, 0.00000562],
    e: [0.01671123, -0.00004392],
    I: [-0.00001531, -0.01294668],
    L: [100.46457166, 35999.37244981],
    peri: [102.93768193, 0.32327364],
    node: [0.0, 0.0],
  },
  mars: {
    a: [1.52371034, 0.00001847],
    e: [0.09339410, 0.00007882],
    I: [1.84969142, -0.00813131],
    L: [-4.55343205, 19140.30268499],
    peri: [-23.94362959, 0.44441088],
    node: [49.55953891, -0.29257343],
  },
  jupiter: {
    a: [5.20288700, -0.00011607],
    e: [0.04838624, -0.00013253],
    I: [1.30439695, -0.00183714],
    L: [34.39644051, 3034.74612775],
    peri: [14.72847983, 0.21252668],
    node: [100.47390909, 0.20469106],
  },
  saturn: {
    a: [9.53667594, -0.00125060],
    e: [0.05386179, -0.00050991],
    I: [2.48599187, 0.00193609],
    L: [49.95424423, 1222.49362201],
    peri: [92.59887831, -0.41897216],
    node: [113.66242448, -0.28867794],
  },
  uranus: {
    a: [19.18916464, -0.00196176],
    e: [0.04725744, -0.00004397],
    I: [0.77263783, -0.00242939],
    L: [313.23810451, 428.48202785],
    peri: [170.95427630, 0.40805281],
    node: [74.01692503, 0.04240589],
  },
  neptune: {
    a: [30.06992276, 0.00026291],
    e: [0.00859048, 0.00005105],
    I: [1.77004347, 0.00035372],
    L: [-55.12002969, 218.45945325],
    peri: [44.96476227, -0.32241464],
    node: [131.78422574, -0.00508664],
  },
};

export interface HeliocentricPos {
  x: number; // in AU
  y: number; // in AU
  z: number; // in AU
}

/**
 * Calculates J2000 Ecliptic heliocentric position (x, y, z in AU)
 */
export function getHeliocentricPosition(planetKey: string, timeMs: number): HeliocentricPos {
  if (planetKey === "sun") {
    return { x: 0, y: 0, z: 0 };
  }

  const p = JPL_TABLE_1[planetKey];
  if (!p) {
    throw new Error(`Unknown planet key: ${planetKey}`);
  }

  // Julian date and centuries past J2000.0
  const jd = timeMs / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;

  // 1. Elements at time T
  const a = p.a[0] + p.a[1] * T;
  const e = p.e[0] + p.e[1] * T;
  const I_rad = ((p.I[0] + p.I[1] * T) * Math.PI) / 180;
  const L = p.L[0] + p.L[1] * T;
  const peri = p.peri[0] + p.peri[1] * T;
  const node = p.node[0] + p.node[1] * T;

  const omega_deg = peri - node;
  let M_deg = L - peri;
  // Normalize M to [-180, +180] degrees
  M_deg = (((M_deg + 180) % 360) + 360) % 360 - 180;

  // 2. Solve Kepler's equation M = E - e*sin(E) in radians
  const M_rad = (M_deg * Math.PI) / 180;
  let E_rad = M_rad + e * Math.sin(M_rad);
  for (let i = 0; i < 15; i++) {
    const deltaM = M_rad - (E_rad - e * Math.sin(E_rad));
    const deltaE = deltaM / (1 - e * Math.cos(E_rad));
    E_rad += deltaE;
    if (Math.abs(deltaE) < 1e-12) break;
  }

  // 3. Coordinates in orbital plane
  const x_prime = a * (Math.cos(E_rad) - e);
  const y_prime = a * Math.sqrt(Math.max(0, 1 - e * e)) * Math.sin(E_rad);

  // 4. Rotate to J2000 ecliptic coordinates
  const omega_rad = (omega_deg * Math.PI) / 180;
  const node_rad = (node * Math.PI) / 180;

  const cosW = Math.cos(omega_rad);
  const sinW = Math.sin(omega_rad);
  const cosNode = Math.cos(node_rad);
  const sinNode = Math.sin(node_rad);
  const cosI = Math.cos(I_rad);
  const sinI = Math.sin(I_rad);

  const x =
    (cosW * cosNode - sinW * sinNode * cosI) * x_prime +
    (-sinW * cosNode - cosW * sinNode * cosI) * y_prime;
  const y =
    (cosW * sinNode + sinW * cosNode * cosI) * x_prime +
    (-sinW * sinNode + cosW * cosNode * cosI) * y_prime;
  const z = sinW * sinI * x_prime + cosW * sinI * y_prime;

  return { x, y, z };
}

/**
 * Formats light travel time to match "8 min 15.6 s" or "1 h 11 min"
 */
export function formatLightTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds.toFixed(1)} s`;
  }
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const remainingSec = (seconds % 60).toFixed(1);
    return `${mins} min ${remainingSec} s`;
  }
  const hours = Math.floor(seconds / 3600);
  const remainingMins = Math.floor((seconds % 3600) / 60);
  return `${hours} h ${remainingMins} min`;
}

export interface PlanetaryDistanceData {
  id: string;
  name: string;
  distanceKm: number;
  distanceAu: number;
  distanceMiles: number;
  lightTimeSeconds: number;
  lightTimeFormatted: string;
  velocityKmS: number; // Positive = receding, Negative = approaching
  trend: "approaching" | "receding" | "stable";
}

const BODIES = [
  { id: "sun", name: "Sun" },
  { id: "mercury", name: "Mercury" },
  { id: "venus", name: "Venus" },
  { id: "mars", name: "Mars" },
  { id: "jupiter", name: "Jupiter" },
  { id: "saturn", name: "Saturn" },
  { id: "uranus", name: "Uranus" },
  { id: "neptune", name: "Neptune" },
];

/**
 * Computes live planetary distances from Earth at a specific timestamp.
 */
export function computeLivePlanetaryDistances(timeMs: number): PlanetaryDistanceData[] {
  const earthPos = getHeliocentricPosition("earth", timeMs);
  
  // Also calculate at timeMs + 1000 to determine precise relative velocity
  const earthPosNext = getHeliocentricPosition("earth", timeMs + 1000);

  return BODIES.map((body) => {
    const pPos = getHeliocentricPosition(body.id, timeMs);
    const dx = pPos.x - earthPos.x;
    const dy = pPos.y - earthPos.y;
    const dz = pPos.z - earthPos.z;
    const distAu = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const distKm = distAu * AU_IN_KM;
    const distMiles = distKm * KM_TO_MILES;

    // Velocity calculation
    const pPosNext = getHeliocentricPosition(body.id, timeMs + 1000);
    const dxNext = pPosNext.x - earthPosNext.x;
    const dyNext = pPosNext.y - earthPosNext.y;
    const dzNext = pPosNext.z - earthPosNext.z;
    const distAuNext = Math.sqrt(dxNext * dxNext + dyNext * dyNext + dzNext * dzNext);
    const distKmNext = distAuNext * AU_IN_KM;
    const velocityKmS = distKmNext - distKm;

    const lightTimeSeconds = distKm / SPEED_OF_LIGHT_KM_S;

    let trend: "approaching" | "receding" | "stable" = "stable";
    if (velocityKmS < -0.05) trend = "approaching";
    else if (velocityKmS > 0.05) trend = "receding";

    return {
      id: body.id,
      name: body.name,
      distanceKm: distKm,
      distanceAu: distAu,
      distanceMiles: distMiles,
      lightTimeSeconds,
      lightTimeFormatted: formatLightTime(lightTimeSeconds),
      velocityKmS,
      trend,
    };
  });
}
