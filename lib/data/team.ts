export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  primaryFocus: string;
  contributions: string[];
  github: string;
  linkedin: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "risheekesh",
    initials: "RS",
    name: "Risheekesh Singh",
    role: "Full-Stack Engineer & Team Lead",
    bio: "Leads the FlameLens architecture, connecting combustion data, the ranking engine, and the dashboard into one working product.",
    primaryFocus: "Combustion Data Modeling & Multi-Criteria Ranking",
    contributions: [
      "Built the transparent ranking model and live weight sliders",
      "Curated and structured the microgravity combustion dataset",
      "Designed the international partnership diagram",
    ],
    github: "https://github.com/risheekeshsingh",
    linkedin: "https://www.linkedin.com/in/risheekesh-singh-rajput-6b084a327/",
  },
  {
    id: "aayush",
    initials: "AB",
    name: "Aayush Bajaj",
    role: "AI / ML & Combustion Science Researcher",
    bio: "Works on the AI fire-safety assistant, grounding its answers in the experiment records with clear uncertainty and sources.",
    primaryFocus: "AI API Integration & Domain Knowledge Retrieval",
    contributions: [
      "Developed the grounded /api/explain route with fallback logic",
      "Created the English/Hindi dictionary and React context",
      "Designed the 8-question knowledge quiz in Learn Mode",
    ],
    github: "https://github.com/Aayush-Bajaj",
    linkedin: "https://www.linkedin.com/in/aayush-bajaj-b3b97a344/",
  },
  {
    id: "barnadeep",
    initials: "BB",
    name: "Barnadeep Basu",
    role: "Frontend Architect & 2D/3D Visualization",
    bio: "Focuses on making complex microgravity flame behavior easy to see and understand through interactive visuals.",
    primaryFocus: "Physical Simulation & Human-Centered Design",
    contributions: [
      "Built the interactive 3D Flame Lab and 2D flame simulator",
      "Designed the printable one-page mission fire-safety brief",
      "Built the responsive dark-space ember UI system",
    ],
    github: "https://github.com/Barnadeep-1611",
    linkedin: "https://www.linkedin.com/in/barnadeep-basu-006288309/",
  },
  {
    id: "swastik",
    initials: "SN",
    name: "Swastik Nayak",
    role: "Mission Operations & Data Quality",
    bio: "Checks the facts, dates, and sources used on the site, and compares how different space agencies approach fire safety.",
    primaryFocus: "Experiment Verification & Agency Standards",
    contributions: [
      "Verified historical dates and claims for the timeline",
      "Built the cross-agency fire-safety comparison table",
      "Prepared the printable completion certificate and rubrics",
    ],
    github: "https://github.com/swastik758",
    linkedin: "https://www.linkedin.com/in/swastik-nayak-67a8a2386/",
  },
];
