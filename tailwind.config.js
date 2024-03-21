/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        mainColor: '#9BC53D',
        secondColor: '#EC1B30',
        lightMain: '#29ACE2',
        rbgSecond: 'rgb(181, 244, 46, 0.5)',
        rbgMain: 'rgba(20, 88, 135, 0.5)',
        customDark: '#769f1e',
        customDarkRed: 'rgba(94, 22, 29, 0.5)',
      },
    },
  },
  plugins: [
  ],
};
