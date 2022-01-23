const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: {
          DEFAULT: colors.gray[700],
          dark: colors.gray[900],
        },
        white: {
          DEFAULT: colors.white,
          dark: colors.gray[300],
        },
        blue: colors.blue,
        gray: colors.gray,
        indigo: colors.indigo,
        red: colors.rose,
        yellow: colors.amber,
        accent1: {
          DEFAULT: "var(--carolina-blue)",
          dark: "var(--carolina-blue-dark)",
        },
        accent2: {
          DEFAULT: "var(--russian-green)",
          dark: "var(--russian-green-dark)",
        },
        accent3: {
          DEFAULT: "var(--ruby-red)",
          dark: "var(--ruby-red-dark)",
        },
        panel: {
          DEFAULT: colors.white,
          dark: colors.gray[800],
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Lato", "sans-serif"],
        sans2: ["Exo", "sans-serif"],
        condensed: ["Lato", "sans-serif"],
        header: ["Exo", "sans-serif"],
      },
      backgroundImage: {
        header: "url('/src/img/msgorigin2.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
