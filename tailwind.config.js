/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Roboto Mono"', 'monospace'], // Your Google font
    },
    extend: {
      fontSize: {
        huge: ['8rem', { lineHeight: '1' }], 
      },
      height: {
        screenD: '100dvh',
      },
      colors: {
        pizza: '#123456', 
      },
    },
  },
  plugins: [],
};
