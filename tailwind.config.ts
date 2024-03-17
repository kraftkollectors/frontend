import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          DEFAULT: '#2680BF',
          light: '#93BFDF',
          lightActive: '#BCD8EB',
          dark: '#1D608F',
          darkActive: '#113A56',
        },
        secondary:{
          DEFAULT: '#E0A44F',
          light: '#FCF6ED',
          lightActive: '#F5E3C8',
          dark: '#A87B3B',
          darkActive: '#654A24',
        },
        light:{
          DEFAULT: '#FFFFFF',
          text: '#F5F5F5',
        },
        dark:{
          DEFAULT: '#010101',
          text: '#131313',
          gray: '#343434',
        }
      }
    },
  },
  plugins: [],
};
export default config;
