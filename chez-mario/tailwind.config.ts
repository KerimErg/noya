import type { Config } from "tailwindcss";

/** Univers « jeu de plateforme » : ciel, nuages, collines, pièces d'or — couleurs rouge / bleu / vert / jaune. */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      colors: {
        cream: { DEFAULT: "#FFF6E5", dark: "#FBE9C8" },
        ink: { DEFAULT: "#1F1A17", soft: "#5C5248" },
        mario: { DEFAULT: "#E52521", dark: "#C81E17", light: "#FF6B5E" },
        luigi: { DEFAULT: "#2DA84B", dark: "#1A7A33", light: "#7DDC8F" },
        royal: { DEFAULT: "#1D5FD6", dark: "#133F99", light: "#7FB0FF" },
        coin: { DEFAULT: "#FFC81F", dark: "#E9A800", light: "#FFE07A" },
        sky: { DEFAULT: "#63C7F7", light: "#C9EEFF" },
        dirt: { DEFAULT: "#B5651D", dark: "#7A4211" },
        tile: "#0E1018",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Rounded MT Bold", "Arial Black", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pop: "5px 5px 0 0 #1F1A17",
        "pop-sm": "3px 3px 0 0 #1F1A17",
        "pop-lg": "8px 8px 0 0 #1F1A17",
      },
      keyframes: {
        jump: {
          "0%, 100%": { transform: "translateY(0) scale(1.04, .96)" },
          "10%": { transform: "translateY(0) scale(.96, 1.05)" },
          "45%": { transform: "translateY(-16%) scale(1, 1)" },
          "80%": { transform: "translateY(0) scale(1, 1)" },
          "88%": { transform: "translateY(0) scale(1.06, .94)" },
        },
        spin3d: { "0%": { transform: "rotateY(0deg)" }, "100%": { transform: "rotateY(360deg)" } },
        float: { "0%,100%": { transform: "translateY(0) rotate(var(--r,0deg))" }, "50%": { transform: "translateY(-12px) rotate(var(--r,0deg))" } },
        drift: { "0%": { transform: "translateX(-30vw)" }, "100%": { transform: "translateX(130vw)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        pop: { "0%": { transform: "scale(.4) translateY(30px)", opacity: "0" }, "70%": { transform: "scale(1.08) translateY(-4px)", opacity: "1" }, "100%": { transform: "scale(1) translateY(0)", opacity: "1" } },
        kenburns: { "0%": { transform: "scale(1) translate(0,0)" }, "100%": { transform: "scale(1.07) translate(-1.5%, -1%)" } },
        wiggle: { "0%,100%": { transform: "rotate(0deg)" }, "25%": { transform: "rotate(-8deg)" }, "75%": { transform: "rotate(8deg)" } },
      },
      animation: {
        jump: "jump 2.4s cubic-bezier(.3,.7,.4,1) infinite",
        spin3d: "spin3d 2.2s linear infinite",
        float: "float 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        pop: "pop .7s cubic-bezier(.34,1.56,.64,1) both",
        wiggle: "wiggle .5s ease-in-out",
        kenburns: "kenburns 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
