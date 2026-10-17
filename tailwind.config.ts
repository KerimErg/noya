import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: { xs: "380px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1440px" },
    extend: {
      colors: {
        night: { DEFAULT: "#0E0B09", 900: "#0E0B09", 800: "#17120F", 700: "#1F1915", 600: "#2A221D", 500: "#3A332E" },
        gold: { DEFAULT: "#C9A27A", light: "#DDBF9C", dim: "#8F7457" },
        ember: "#E08A4B",
        cream: "#F3EBE1",
        smoke: "#A89A8C",
        full: "#7A3E36",
        closed: "#3A332E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "16px", "2xl": "20px", "3xl": "24px" },
      letterSpacing: { label: "0.2em", wide2: "0.32em" },
      boxShadow: {
        halo: "0 0 0 1px rgba(201,162,122,.25), 0 0 32px -6px rgba(201,162,122,.45)",
        glass: "inset 0 1px 0 rgba(243,235,225,.04), 0 30px 80px -30px rgba(0,0,0,.8)",
      },
      transitionTimingFunction: { silk: "cubic-bezier(.22,1,.36,1)" },
      keyframes: {
        pulseDot: { "0%,100%": { opacity: "1", transform: "scale(1)" }, "50%": { opacity: ".35", transform: "scale(.7)" } },
        drift: { "0%": { transform: "translate3d(0,0,0)" }, "100%": { transform: "translate3d(-2%,-3%,0)" } },
        glow: { "0%,100%": { opacity: ".55" }, "50%": { opacity: "1" } },
      },
      animation: {
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
