/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        colorOne: '#7BDFF2',
        colorTwo: '#B2F7EF',
        colorThree: '#EFF7F6',
        colorFour: '#F7D6E0',
        colorFive: '#F2B5D4',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        authForm: '1fr 3fr',
      },
    },
  },
};
