module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      lichtblauw: 'rgb(14, 146, 202)',  // Light Blue
      donkerblauw: 'rgb(0, 105, 141)',  // Dark Blue
    },
    fontFamily: {
      schoolbell: ['Schoolbell', 'cursive'], // Logo font
      shadows: ['"Shadows Into Light Two"', 'cursive'], // Logo font 2
      Rubik: ['Roboto', 'sans-serif'], // Standerd font
    },
  },
  },
  plugins: [],
};
