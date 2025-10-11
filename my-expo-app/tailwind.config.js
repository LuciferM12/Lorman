import { COLORS } from './constants/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: COLORS.primaryDark,
          light: COLORS.primaryLight,
        },
        gold: COLORS.gold,
        lightGray: COLORS.lightGray,
        darkGray: COLORS.darkGray, 
      }
    },
  },
  plugins: [],
};
