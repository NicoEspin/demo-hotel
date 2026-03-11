/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0806',
        surface: '#13110E',
        gold: '#C9A96E',
        'gold-soft': '#E8D5B0',
        cream: '#F5EFE4',
        muted: '#6B6358',
        border: '#2A2520',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        halo: '0 24px 80px rgba(0, 0, 0, 0.32)',
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgba(10, 8, 6, 0.2) 0%, rgba(10, 8, 6, 0.62) 56%, rgba(10, 8, 6, 0.92) 100%)',
        'soft-radial': 'radial-gradient(circle at top, rgba(201, 169, 110, 0.12), transparent 48%)',
      },
      letterSpacing: {
        cinematic: '0.28em',
      },
    },
  },
  plugins: [],
}
