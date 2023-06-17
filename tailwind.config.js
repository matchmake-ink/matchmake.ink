/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        normal: ["Play", "sans-serif"],
      },
      colors: {
        background: {
          main: "#07020d",
          lighter: "#17101d",
          lightest: "#27202d",
        },
        primary: {
          main: "#eaf4f4",
          darker: "#daeded",
          darkest: "#b4dadb",
        },
        accent: {
          50: "#f0fdf5",
          100: "#dcfce9",
          200: "#bbf7d3",
          300: "#86efb2",
          400: "#4ade88",
          500: "#23ce6b",
          600: "#16a351",
          700: "#158043",
          800: "#166538",
          900: "#145330",
          950: "#052e18",
        },
      },
    },
  },
  plugins: [],
};
