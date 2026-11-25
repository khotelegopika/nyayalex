/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--color-navy) / <alpha-value>)',
          light: 'rgb(var(--color-surface) / <alpha-value>)',
          dark: 'rgb(var(--color-charcoal) / <alpha-value>)',
        },
        charcoal: 'rgb(var(--color-charcoal) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ivory: {
          DEFAULT: 'rgb(var(--color-ivory) / <alpha-value>)',
          dark: 'rgb(var(--color-slate) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          light: 'rgb(var(--color-gold-light) / <alpha-value>)',
          dark: 'rgb(var(--color-gold-dark) / <alpha-value>)',
        },
        slate: 'rgb(var(--color-slate) / <alpha-value>)',
        inkborder: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'extra-wide': '0.2em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
