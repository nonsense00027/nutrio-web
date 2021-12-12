module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#73DB7F",
        secondary: "#3bc490",
      },
    },
  },
  variants: {
    extend: {
      transform: ["active"],
      scale: ["active"],
    },
  },
  plugins: [],
};
