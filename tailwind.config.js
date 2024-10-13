const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        mainblue: {
          500: '#047FD8', // Custom color value
        },
        mainorange: {
          500: '#FF9635', // Custom color value
        },
        mainnavy: {
          500: '#003053', // Custom color value
        },
        maingreen:{
          900: '#003A32'
        },
        mainyellow:{
          900: '#EECD3E'
        }
      },
    },
  },
  plugins: [
  ],
});
