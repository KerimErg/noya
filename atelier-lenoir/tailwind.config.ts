import type { Config } from "tailwindcss";

/** Univers monochrome : encre, papier et une gamme de gris neutres. */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0B", soft: "#1A1A1A", line: "#2A2A2A" },
        paper: { DEFAULT: "#F4F3EF", dim: "#E7E6E1" },
        stone: { DEFAULT: "#8A8A86", light: "#B9B9B4", dark: "#5A5A57" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: { label: "0.22em" },
      transitionTimingFunction: { silk: "cubic-bezier(.22,1,.36,1)" },
    },
  },
  plugins: [],
} satisfies Config;
