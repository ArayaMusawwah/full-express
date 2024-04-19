/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  mode: "jit",
  content: ["./views/**/*.{html,js,ejs}", "./public/scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        bgProducts: "#0F4C75",
        bgGarment: "#2D3250",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },

      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};
