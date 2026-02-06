/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "accent-gold": "#C5A059",
        "deep-navy": "#0A1128",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "serif": ["Playfair Display", "serif"]
      },
    },
  },
  plugins: [],
}