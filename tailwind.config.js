module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        '4.5': '1.125rem'
      },
      colors: {
        orange: {
          // DEFAULT: '#f7ba20',
          DEFAULT: '#e8b125',
          50: '#f5f0e9',
          600: '#b5a181',
          700: '#a69277',
          800: '#523309'
        }
      }
    }
  }
}
