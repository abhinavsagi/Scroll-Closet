import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F3EC",
          50: "#FDFBF7",
          100: "#F7F3EC",
          200: "#EFE8DB",
        },
        ink: {
          DEFAULT: "#1A1917",
          soft: "#2B2A27",
          muted: "#6B6760",
        },
        cobalt: {
          DEFAULT: "#1F3FE8",
          dark: "#1730B8",
          light: "#4A62F0",
          soft: "#E7EAFF",
        },
        ember: {
          DEFAULT: "#FF6A2B",
          soft: "#FFE8DC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,25,23,0.04), 0 12px 32px -12px rgba(26,25,23,0.18)",
        float: "0 24px 60px -20px rgba(26,25,23,0.28)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.25s ease-out both",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
