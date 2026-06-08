import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abyss: {
          50: '#1b2a47',
          100: '#152340',
          200: '#0f1b32',
          300: '#0b1730',
          400: '#081225',
          500: '#050d1b',
          600: '#030813',
          700: '#02060d',
          800: '#01040a',
          900: '#000206',
        },
        glow: {
          DEFAULT: '#7df9ff',
          soft: '#a8fff8',
          deep: '#3ecfd6',
        },
        bloom: {
          DEFAULT: '#d97ee6',
          soft: '#f4b6ff',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', '"EB Garamond"', 'Georgia', 'serif'],
        serif: ['"EB Garamond"', 'Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        caveat: ['"Caveat"', 'cursive'],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.6  0 0 0 0 0.8  0 0 0 0 1  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
} satisfies Config;
