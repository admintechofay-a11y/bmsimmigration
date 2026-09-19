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
        page: '#F7F9FC',
        surface: '#FFFFFF',
        tint: '#EEF3FB',
        ink: {
          900: '#0B1B3A', // Primary Ink Navy Text
          800: '#142952',
          700: '#233866',
          500: '#4A5B78', // Muted Text
          400: '#64748B',
          300: '#94A3B8',
        },
        navy: {
          950: '#060F24',
          900: '#0B1B3A', // Deep Ink Navy
          850: '#10244D',
          800: '#1A3366',
          700: '#264580',
          600: '#3B5E9C',
          100: '#EEF3FB',
          50: '#F7F9FC',
        },
        gold: {
          300: '#EAB308',
          400: '#D97706',
          500: '#C8921F', // Rich Gold (darkened for high contrast on white)
          600: '#A16E14',
          700: '#7D520C',
        },
        electric: {
          400: '#60A5FA',
          500: '#2F80ED', // Electric Blue
          600: '#1D4ED8',
        },
        teal: {
          400: '#22D3EE',
          500: '#0EA5C6', // Teal Accent
          600: '#0891B2',
        },
        success: {
          500: '#16A34A', // Success Green
        },
        border: {
          light: '#E3EAF5',
          subtle: '#EDF2F9',
        },
        brand: {
          bg: '#F7F9FC',
          surface: '#FFFFFF',
          tint: '#EEF3FB',
          ink: '#0B1B3A',
          gold: '#C8921F',
          blue: '#2F80ED',
          teal: '#0EA5C6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 6px -1px rgba(11, 27, 58, 0.05), 0 1px 4px -1px rgba(11, 27, 58, 0.03)',
        'soft-md': '0 10px 25px -5px rgba(11, 27, 58, 0.06), 0 4px 10px -2px rgba(11, 27, 58, 0.03)',
        'soft-lg': '0 20px 40px -12px rgba(11, 27, 58, 0.08), 0 8px 16px -4px rgba(11, 27, 58, 0.04)',
        'soft-elevated': '0 25px 60px -15px rgba(11, 27, 58, 0.12), 0 10px 20px -5px rgba(11, 27, 58, 0.05)',
        'btn-navy': '0 6px 20px -4px rgba(11, 27, 58, 0.35)',
        'btn-blue': '0 6px 20px -4px rgba(47, 128, 237, 0.4)',
        'btn-gold': '0 6px 20px -4px rgba(200, 146, 31, 0.4)',
        'card-elevated': '0 12px 32px -4px rgba(11, 27, 58, 0.07), 0 4px 12px -2px rgba(11, 27, 58, 0.04)',
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
