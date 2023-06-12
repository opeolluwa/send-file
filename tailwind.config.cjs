/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      app: {
        DEFAULT: "#3074F5",
        50: "#DFEAFD",
        100: "#CCDDFD",
        200: "#A5C2FB",
        300: "#7EA8F9",
        400: "#578EF7",
        500: "#3074F5",
        600: "#0B55E2",
        700: "#0841AC",
        800: "#062D77",
        900: "#031941",
        950: "#020F27",
      },

      "app-dark": {
        DEFAULT: "#18122B",
        50: "#907DC9",
        100: "#836FC3",
        200: "#6A52B7",
        300: "#58429E",
        400: "#483681",
        500: "#382A65",
        600: "#281E48",
        700: "#18122B",
        800: "#020103",
        900: "#000000",
        950: "#000000",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
