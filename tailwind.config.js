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
        xs: '360px',
        sm: '550px',
      },
      colors: {
        white: '#fff',
        black: '#000',
        'basic-black': '#141414',
        'deep-blue': '#3C8AFF',
        'accent-orange': '#FF7A00',
        'light-yellow': '#FEF8DB',
        'light-blue': '#E3F1FF',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
