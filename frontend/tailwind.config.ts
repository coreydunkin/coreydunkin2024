import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js'
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
    },
    fontFamily: {
      playfairDisplay: ["var(--font-playfair-display)", ...fontFamily.serif],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('preline/plugin'),
    //require('@tailwindcss/aspect-ratio'),
    //require('@tailwindcss/forms'),
  ],
};
export default config;
