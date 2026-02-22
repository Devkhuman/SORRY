/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#f8d9e3',
        lavender: '#d9c8f5',
        cream: '#fff9f3',
        rose: '#d77a99',
        plum: '#62475f',
        rosegold: '#c89284',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 45px rgba(118, 80, 106, 0.18)',
      },
      backgroundImage: {
        'gradient-romance': 'linear-gradient(180deg, #fdf3f7 0%, #f8f0ff 45%, #fff9f1 100%)',
      },
    },
  },
  plugins: [],
};
