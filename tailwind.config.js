/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './components/*.{vue,js}',
    './layouts/**/*.vue',
    './layouts/*.vue',
    './pages/**/*.vue',
    './pages/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
