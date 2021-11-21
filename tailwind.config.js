module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: '#232F3E',
          DEFAULT: '#131921',
        },
      },
    },
  },
  variants: {
    extend: {},
    gradientColorStops: ['responsive', 'focus', 'active', 'hover'],
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
