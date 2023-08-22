const konstaConfig = require('konsta/config');
const { breakpoints, PRIMARY_COLOR } = require('./utils');

/** @type {import('tailwindcss').Config} */
module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Let tailwind classes remain the overriding source of truth unless
  // a more elegant approach to integrate with ionic styling can be devised.
  important: true,
  konsta: {
    colors: {
      primary: '#05f7b3',
    },
  },
  theme: {
    // Align these values with the default breakpoints provided by Ionic:
    // https://ionicframework.com/docs/layout/css-utilities#ionic-breakpoints
    screens: breakpoints,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ios: 'var(--ion-font-family)',
        material: ['var(--ion-font-family)'],
      },
    },
  },
  plugins: [],
});
