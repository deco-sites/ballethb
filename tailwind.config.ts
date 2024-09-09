import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
        fadeIn: "fadeIn 1s ease-out forwards",
        fadeInUp: "fadeInUp 1s ease-out forwards",
        fadeInLeft: "fadeInLeft 1s ease-out forwards",
        vibrate: "vibrate 1s ease-in-out infinite 2s", // 0.4s vibração + 2s delay
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        vibrate: {
          "0%, 20%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-2px)" },
          "30%, 50%": { transform: "translateX(0)" },
          "40%": { transform: "translateX(2px)" },
          "60%, 100%": { transform: "translateX(0)" }, // Pausa após a vibração
        },
      },
      boxShadow: {
        "header": "0 4px 16px rgba(0, 0, 0, .12);",
      },
      screens: {
        "3xl": "1650px",
      },
    },
  },
};
