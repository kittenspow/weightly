/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#4E58DE',
        'secondary-blue': '#949CFF',
        'blue-text': '#454ECF',
      },
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}