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
        navy: {
          950: '#030611',
          900: '#050816',
          850: '#080D1F',
          800: '#0B1120',
          700: '#111827',
          600: '#1E293B',
        },
        gold: {
          300: '#FDE047',
          400: '#F4C76A',
          500: '#D4A44A',
          600: '#B8860B',
          700: '#926707',
        },
        electric: {
          400: '#60A5FA',
          500: '#2F80ED',
          600: '#1E40AF',
        },
        brand: {
          dark: '#050816',
          surface: '#0B1120',
          gold: '#D4A44A',
          blue: '#2F80ED',
          accent: '#F4C76A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        sora: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 164, 74, 0.25)',
        'gold-elevated': '0 20px 60px rgba(212, 164, 74, 0.2)',
        'blue-glow': '0 0 25px rgba(47, 128, 237, 0.25)',
        'card-elevated': '0 25px 80px rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
