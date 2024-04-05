/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['PPNeueMontreal-Book', 'sans-serif'],
      },
      colors: {
        mainColor: '#00604A',
        lightgreen: '#9BC53D',
        secondColor: '#EC1B30',
        lightMain: '#29ACE2',
        rbgSecond: 'rgb(181, 244, 46, 0.5)',
        rbgMain: 'rgba(20, 88, 135, 0.5)',
        customDark: '#00604A',
        customDarkRed: 'rgba(94, 22, 29, 0.5)',
        dashbordColor: '#f8f8f8',
        updatecolor: '#2ecc71',
        deletecolor: '#27ae60',
      },
    },
  },
  plugins: [
  ],
};
