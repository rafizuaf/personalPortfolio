/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mont: ['var(--font-mont)', ...fontFamily.sans],
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        secondary: "#58E6D9", // 80,230,217
      },
      backgroundImage: {
        circularLight: 'repeating-radial-gradient(rgba(27,27,27,0.4) 2px, #f5f5f5 5px, #f5f5f5 100px);',
        circularDark: 'repeating-radial-gradient(rgba(245,245,245,0.5) 2px, #1b1b1b 5px, #1b1b1b 100px);'
      },
    },
  },
  plugins: [],
}
