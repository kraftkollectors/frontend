import type { Config } from "tailwindcss";
import { DEFAULT_CIPHERS } from "tls";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        display: [
          "57px",
          {
            // letterSpacing: '-0.01em',
            lineHeight: "64px",
          },
        ],
        headline: [
          "32px",
          {
            // letterSpacing: '-0.02em',
            lineHeight: "40px",
          },
        ],
        title: [
          "24px",
          {
            // letterSpacing: '-0.02em',
            lineHeight: "28px",
          },
        ],
        body: [
          "16px",
          {
            // letterSpacing: '-0.02em',
            lineHeight: "24px",
          },
        ],
        label: [
          "14px",
          {
            // letterSpacing: '-0.02em',
            lineHeight: "20px",
          },
        ],
        small: [
          "10px",
          {
            // letterSpacing: '-0.02em',
            lineHeight: "16px",
          },
        ],
      },
      colors: {
        black: {
          DEFAULT: "#000000",
          50: "#e7e7e7",
          100: "#b6b6b6",
          200: "#929292",
          300: "#606060",
          400: "#414141",
          500: "#121212",
          600: "#101010",
          700: "#0d0d0d",
          800: "#0a0a0a",
          900: "#080808",
          950: "#050505",
        },
        primary: {
          DEFAULT: "#2680BF",
          light: "#93BFDF",
          lightActive: "#BCD8EB",
          lightActive2: "#E9F2F9",
          dark: "#1D608F",
          darkActive: "#113A56",
        },
        secondary: {
          DEFAULT: "#E0A44F",
          light: "#FCF6ED",
          lightActive: "#F5E3C8",
          dark: "#A87B3B",
          darkActive: "#654A24",
        },
        light: {
          DEFAULT: "#FFFFFF",
          text: "#F5F5F5",
        },
        dark: {
          DEFAULT: "#010101",
          text: "#131313",
          gray: "#555555",
        },
        danger: {
          DEFAULT: "#BE2828",
          dark: "#00000",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
