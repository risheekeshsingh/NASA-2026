import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        space: {
          950: "#040711",
          900: "#0a0f1d",
          850: "#0f172a",
          800: "#141e34",
          700: "#1e2b47",
          600: "#2d3d5f",
          500: "#44557b",
        },
        ember: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        flame: {
          glow: "#ff5722",
          core: "#ffeb3b",
          heat: "#ff3d00",
        },
        astro: {
          cyan: "#00e5ff",
          cyanDark: "#0097a7",
          glow: "#38bdf8",
        },
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        display: ["var(--font-source-serif)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "Menlo", "Courier New", "monospace"],
      },
      boxShadow: {
        "ember-glow": "0 0 25px -5px rgba(249, 115, 22, 0.4)",
        "cyan-glow": "0 0 25px -5px rgba(0, 229, 255, 0.35)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
