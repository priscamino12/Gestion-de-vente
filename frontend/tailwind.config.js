/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",           // Pour Expo Router (dossier app/)
    "./src/app/**/*.{js,jsx,ts,tsx}",       // Ton src/app
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],   // ← LIGNE OBLIGATOIRE (c'est elle qui manquait)
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        primaryDark: "#059669",
        success: "#22c55e",
        background: "#f8fafc",
        card: "#ffffff",
        text: "#1f2937",
        textLight: "#6b7280",
        border: "#e5e7eb",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};