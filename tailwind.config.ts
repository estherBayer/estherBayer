import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      borderWidth: {
        '20': '20px', // Adding a 20px border option
      },
      colors: {
        electricPurple: '#a251ff',
        licorice: '#170312',
        thistle: '#C4B0B8',
        darkThistle: '#80606D',
        darkThistlePurple: '#8a5c99',
        thistlePurple: '#D9BDE4',
        primaryPurple: '#661fcc',
        menuBlue: '#3F8DEA',
      },
      backgroundImage: {
        'hero-background': "url('https://images.ctfassets.net/af008cnyedli/6GQNZ460U2B4WZaXBdAZ0p/abe57390da3a6c32520138fbe179fdc0/hero2-crop.jpg')",
      },
      
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
