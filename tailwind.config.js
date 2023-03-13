/** @type {import('tailwindcss').Config} */

module.exports ={
  content: ["./src/**/*.{html,js}","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      inset: {
      },
      boxShadow: {
        'custom' : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      }
    },
  },
  variants: {},
  plugins: [],
  base: {},
}