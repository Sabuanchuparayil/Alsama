/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          red: '#DC143C',
          'red-dark': '#C41E3A',
          black: '#000000',
          dark: '#1A1A1A',
          gold: '#FFD700',
          light: '#f5f5f5',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
