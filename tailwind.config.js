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
        lightgreen: '#38b000',
        secondColor: '#EC1B30',
        lightMain: '#29ACE2',
        hoverColor: '#008000',
        rbgMain: 'rgba(20, 88, 135, 0.5)',
        customDark: '#00604A',
        customDarkRed: 'rgba(94, 22, 29, 0.5)',
        dashbordColor: '#f8f8f8',
        updatecolor: '#2ecc71',
        deletecolor: '#27ae60',
        sideboard: "#004b23",
      },
      boxShadow: {
        "custom": "0 2px 4px -1px rgba(0, 75, 35, 0.2)",
      },
    },
  },
  plugins: [
  ],
};
