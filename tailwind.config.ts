/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 5歳児向けポップな色
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#fb923c',
          500: '#f97316',
        },
      },
    },
  },
  plugins: [],
}
