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
        // デザイントークン
        bg: { warm: '#fff8e8', cool: '#e8f7ff' },
        surface: '#ffffff',
        ink: '#1e293b',
        muted: '#475569',
        line: '#cfe3ff',
        brand: { DEFAULT: '#0ea5e9', strong: '#0284c7' },
        accent: '#f97316',
        ok: '#16a34a',
        warn: '#b45309',
        // グリッドセル用パステルカラー
        cell: {
          blue: '#93c5fd',
          green: '#86efac',
          pink: '#f9a8d4',
          yellow: '#fde68a',
        },
      },
      fontFamily: {
        kid: ["'Hiragino Maru Gothic ProN'", "'Nunito'", "'Yu Gothic'", 'sans-serif'],
      },
      borderRadius: {
        card: '26px',
        btn: '18px',
        option: '16px',
      },
      boxShadow: {
        card: '0 14px 34px rgba(2, 132, 199, 0.12)',
        btn: '0 9px 18px rgba(22, 163, 74, 0.26)',
        'btn-blue': '0 9px 18px rgba(2, 132, 199, 0.24)',
      },
    },
  },
  plugins: [],
}
