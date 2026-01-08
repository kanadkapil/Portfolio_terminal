/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: "#0f0",
          blue: "#00f",
          red: "#f00",
          violet: "#ee82ee",
          orange: "#ffa500",
        },
      },
      fontFamily: {
        mono: ["Courier New", "Courier", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
