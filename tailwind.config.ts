import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#05030a",
        gold: "#f8d879",
        cyan: "#45f5ff",
        magenta: "#ff3df2",
        acid: "#c8ff36"
      },
      boxShadow: {
        neon: "0 0 30px rgba(69, 245, 255, 0.28), 0 0 70px rgba(255, 61, 242, 0.14)",
        gold: "0 0 26px rgba(248, 216, 121, 0.28)"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-110%)" },
          "100%": { transform: "translateY(110%)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        },
        glitchShift: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 1px)" }
        }
      },
      animation: {
        scan: "scan 4s linear infinite",
        marquee: "marquee 24s linear infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        glitchShift: "glitchShift 1.3s steps(2, end) infinite"
      }
    }
  },
  plugins: []
};

export default config;
