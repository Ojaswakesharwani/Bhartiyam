/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F2EDE2',
          300: '#E8DFD0',
          400: '#D5C7B0',
        },
        navy: {
          950: '#070D1A',
          900: '#0A1326',
          800: '#0F1D3A',
          700: '#1A2E56',
          600: '#264278',
        },
        gold: {
          300: '#F4E7CA',
          400: '#E6D5B8',
          500: '#C99D42',
          600: '#A67C2E',
          700: '#86611F',
        },
        vermilion: {
          500: '#D1581C',
          600: '#B84A14',
          700: '#94380D',
        },
        hairline: '#E2DBD0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(15, 29, 58, 0.04)',
        'elevated': '0 10px 30px rgba(15, 29, 58, 0.07)',
        'gold-glow': '0 0 25px rgba(166, 124, 46, 0.18)',
      },
      animation: {
        'spin-slow': 'spin 40s linear infinite',
        'spin-reverse': 'spin-reverse 50s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
