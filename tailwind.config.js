/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // analyse tous les fichiers JS/TS/JSX/TSX dans src
  ],
  safelist: [
    "w-1/2",
    "w-1/3",
    "w-2/3",
    "h-1/2",
    "h-1/3",
    "h-2/3",
    "text-1/2",
    "text-1/3",
    "text-2/3",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#146c54",
        secondary: "#0b0b2b",
        accent: "#00bcd4",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
