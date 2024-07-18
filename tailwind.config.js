/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        hammersmithOne: ["Hammersmith One", "sans-serif"],
        readexPro: ["Readex Pro", "sans-serif"],
        nicomoji: ["Nico Moji", "sans-serif"],
      },
      colors: {
        black: "#000000",
        darkGreen: "#0D2612",
        green: "#0BA42D",
        lightGreen: "#21D511",
        slimGreen: "#D5F8CF",
        white: "#ffffff",
      },
    },
  },
  plugins: [require("daisyui")],
};
