/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#1a1a1a",
        "page-hover": "#222",
        ink: "#e8e8e8",
        "ink-secondary": "#a0a0a0",
        "ink-tertiary": "#707070",
        "ink-faint": "#4a4a4a",
        accent: "#7c9bb5",
        "accent-hover": "#9bb5cc",
        rule: "rgba(255, 255, 255, 0.07)",
        "rule-heavy": "rgba(255, 255, 255, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
