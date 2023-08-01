const konstaConfig = require('konsta/config');

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  konsta: {
    colors: {
      primary: '#05f7b3',
    },
  },
  theme: {
    // Align these values with the default breakpoints provided by Ionic:
    // https://ionicframework.com/docs/layout/css-utilities#ionic-breakpoints
    screens: {
      xs: '0',
      sm: { max: '576px' },
      md: { max: '768px' },
      lg: '1136px',
      xl: '1200px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ios: ['var(--ion-default-font)'],
        material: ['var(--ion-default-font)'],
      },
    },
  },
  plugins: [],
});
