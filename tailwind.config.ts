// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // ...
  theme: {
    extend: {
      animation: {
        "fade-in-scale": "fadeInScale 0.3s ease-out",
      },
      keyframes: {
        fadeInScale: {
          "0%": {
            opacity: 0,
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
