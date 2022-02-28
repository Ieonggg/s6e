module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    color: {
      'outlineColor': '#fcfbec',
    },
    fontFamily: {
      productSans: "'Product Sans', Arial",
    },
  },
  plugins: [],
  transitionProperty: {
    'height': 'h',
  },
  
}
