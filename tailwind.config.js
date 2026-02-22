/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f8d9e3',
        lavender: '#d9c8f5',
        cream: '#fff9f3',
        rose: '#c97b95',
        plum: '#6e4e68',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(126, 92, 112, 0.15)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top, rgba(255, 245, 250, 0.9), rgba(255, 249, 243, 0.95))',
      },
    },
  },
  plugins: [],
};
