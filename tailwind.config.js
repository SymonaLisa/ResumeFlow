/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7fb',
          100: '#e9eff7',
          200: '#cedeed',
          300: '#a3c3dd',
          400: '#72a2ca',
          500: '#4f85b7',
          600: '#3d699a',
          700: '#33547d',
          800: '#2d4668',
          900: '#293c57',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e5fe',
          300: '#7cd0fd',
          400: '#36b8fa',
          500: '#0c9eeb',
          600: '#0280c9',
          700: '#0666a3',
          800: '#0b5586',
          900: '#0f476f',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};