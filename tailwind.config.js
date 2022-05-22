module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#73DB7F",
        secondary: {
          DEFAULT: "#F99717",
          dark: "#FD6F21",
        },
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      transform: ["active"],
      scale: ["active"],
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
