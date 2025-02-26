import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(resume)/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js",
  ],
  variants: {
    textShadow: ["responsive", "hover"], // responsive and hover are variants
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        tall: {
          raw: `only screen and (max-height: 960px) and (max-width: 480px)`,
        },
        wide: {
          raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
        },
        short: {
          raw: `only screen and (max-height: 953px)`,
        },
        veryshort: {
          raw: `only screen and (max-height: 505px)`,
        },
        portrait: {
          raw: "(orientation: portrait)",
        },
        landscape: {
          raw: "(orientation: landscape)",
        },
      },
    },
    fontFamily: {
      playfairDisplay: ["var(--font-playfair-display)", ...fontFamily.serif],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("preline/plugin"),
  ],
};
export default config;
