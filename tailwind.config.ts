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
        de: {
          green: "#6A9A00",
          "green-hover": "#5c8700",
          amber: "#FFAA1D",
          "amber-hover": "#f09b0a",
          black: "#0B0B09",
          white: "#FFFFFF",
          warm: "#F7F5EF",
          body: "#14140F",
          muted: "#5A5850",
          border: "#E5E0D2",
          whatsapp: "#25D366",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        hard: "5px 5px 0px #0B0B09",
        "hard-sm": "3px 3px 0px #0B0B09",
        "hard-lg": "8px 8px 0px #0B0B09",
        "hard-amber": "5px 5px 0px #FFAA1D",
        "hard-green": "5px 5px 0px #6A9A00",
        soft: "0 10px 30px -10px rgba(0,0,0,0.06)",
        card: "0 4px 20px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        btn: "8px",
        card: "14px",
        panel: "18px",
      },
    },
  },
  plugins: [],
};
export default config;
