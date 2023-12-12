/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      screens: {
        sm: '406px',
        md: '481px',
        lg: '769px',
        xl: '1281px',
        '2xl': '1441px',
      },
      colors: {
        white: '#fff',
        black: '#000',
        'basic-black': '#141414',
        'deep-blue': '#3C8AFF',
        'accent-orange': '#FF7A00',
        'light-yellow': '#FEF8DB',
        'light-blue': '#E3F1FF',
        link: '#3C8AFF',
        'main-blue': '#A4CFFC',
        'orange-hover': '#FFA800',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
