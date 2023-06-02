/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        poolFloor: "url('../public/pool_floor.jpg')",
      },
      fontFamily: {
        montS: "Montserrat",
        passionOne: "Passion One",
      },
      colors: {
        purpleBlack: "#001721",
        passionOrange: "#E9AD83",
        lightBeige: "#FDF3E8",
      },
      content: {
        img: 'url("../public/profile_icon.svg")',
      },
    },
    plugins: [],
  },
};
