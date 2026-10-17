import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      colors: {
        coal: { DEFAULT: "#0A0A0A", 900: "#0A0A0A", 800: "#111111", 700: "#171717", 600: "#202020", 500: "#2B2B2B" },
        mario: { DEFAULT: "#D81E1A", bright: "#FF4A3D", dark: "#A3120F" },
        coin: { DEFAULT: "#FFC72C", dark: "#E0A800" },
        flame: "#FF7A1A",
        cream: "#F7F2EA",
        muted: "#A8A29A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.04em" },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,122,26,.25), 0 20px 60px -20px rgba(255,90,20,.55)",
        card: "0 1px 0 rgba(255,255,255,.04) inset, 0 24px 60px -30px rgba(0,0,0,.9)",
      },
      keyframes: {
        rise: { "0%": { transform: "translateY(0) scale(1)", opacity: "0" }, "15%": { opacity: "1" }, "100%": { transform: "translateY(-60vh) scale(.4)", opacity: "0" } },
        flicker: { "0%,100%": { opacity: ".85" }, "45%": { opacity: "1" }, "60%": { opacity: ".7" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        bob: "bob 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
