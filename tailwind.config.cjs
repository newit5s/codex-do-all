/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e6efff',
          200: '#c2daff',
          300: '#99c2ff',
          400: '#4f93ff',
          500: '#1f6bff',
          600: '#0f4ed1',
          700: '#0c3da8',
          800: '#0c3587',
          900: '#0c2e6e'
        }
      }
    }
  },
  plugins: []
};
