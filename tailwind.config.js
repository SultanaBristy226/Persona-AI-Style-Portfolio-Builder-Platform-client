/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-sec": "var(--bg-sec)",
        "bg-deep": "var(--bg-deep)",
        primary: "var(--primary)",
        violet: "var(--violet)",
        neon: "var(--neon)",
        lavender: "var(--lavender)",
        "soft-lav": "var(--soft-lav)",
        text: "var(--text)",
        "text-sec": "var(--text-sec)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(168, 85, 247, 0.35)",
        "glow-sm": "0 0 20px rgba(168, 85, 247, 0.25)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};