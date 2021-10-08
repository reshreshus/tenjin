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
      airblue: {
        light: '#EFF1F8',
        DEFAULT: '#A4AFFF',
        8: 'rgba(164, 175, 255, 0.08)',
        16: 'rgba(164, 175, 255, 0.16)',
        dark: '#BAC4E8',
        darker: '#ADB4D7',
        darkest: '#A6ACCB'
      },
      gray: {
        // light: '#FaFaFa',
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
  plugins: [
    require('@tailwindcss/typography')
  ],
}
