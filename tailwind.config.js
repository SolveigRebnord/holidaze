/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'poolFloor': "url('../public/pool_floor.jpg')"
    }
  },
  },
  plugins: [],
}
