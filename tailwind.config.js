/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Fira Sans", "sans-serif"],
      stylized: ["Pixel"],
    },
    extend: {
      colors: {
        text: "#ffffff",
        background: {
          dark: "#050303",
          normal: "#0f0d0d",
          light: "#2b2523",
        },
        secondary: {
          50: "#E5E8EB",
          100: "#CED4D9",
          200: "#9DA9B3",
          300: "#6B7C8A",
          400: "#455059",
          500: "#1F2428",
          600: "#181C20",
          700: "#121517",
          800: "#0D0F11",
          900: "#070809",
          950: "#020303",
        },
        primary: {
          50: "#E4E4FB",
          100: "#CACAF7",
          200: "#9595EF",
          300: "#5F5FE7",
          400: "#2626DF",
          500: "#1A1AAE",
          600: "#15158A",
          700: "#10106A",
          800: "#0B0B47",
          900: "#050523",
          950: "#030312",
        },
        accent: {
          50: "#FCF3E8",
          100: "#F9E7D2",
          200: "#F4D2A9",
          300: "#EEBB7C",
          400: "#E8A34F",
          500: "#E38D24",
          600: "#B97118",
          700: "#8C5512",
          800: "#5F3A0C",
          900: "#2D1B06",
          950: "#170E03",
        },
      },
    },
  },
  plugins: [],
};
