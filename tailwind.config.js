module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'monda': ['Monda', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'zen' : ['Zen Tokyo Zoo', 'cursive'],
      },
      backgroundImage: {
        'city-background': ["url('../constants/cityscape.svg')"],
      },
    },
  },
  plugins: [],
}
