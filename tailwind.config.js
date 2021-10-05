module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      red: {
        DEFAULT: '#F31515'
      },
      blue: {
        dark: '#31448E',
        DEFAULT: '#3C60FD'
      },
      gray: {
        DEFAULT: '#BABABA'
      },
      black: {
        DEFAULT: '#000'
      },
      white: {
        DEFAULT: '#FFF'
      }
    },
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
