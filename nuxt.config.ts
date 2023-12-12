// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // site: {
  //   ...(process.env.NODE_ENV === 'production'
  //     ? { url: 'https://sandbox.vskrytie-zamkov78.ru' }
  //     : {}),
  //   name: 'Обслуживание замков в Санкт-Петербурге',
  //   description:
  //     'Вскрытие, замена и ремонт любых замков в Санкт-Петербурге и Ленинградской области',
  //   defaultLocale: 'ru',
  // },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
        // { rel: 'yandex-tableau-widget', href: '/tableau.json' },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-typed-router',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'vue3-carousel-nuxt',
    'dayjs-nuxt',
    'nuxt-icon',
    // '@nuxtseo/module',
  ],
  imports: {
    dirs: ['./stores'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  googleFonts: {
    families: {
      Roboto: {
        wght: [400, 700, 900],
        ital: [400],
      },
    },
  },
  runtimeConfig: {
    public: {
      api: 'https://api.vskrytie-zamkov78.ru/',
      site: 'fbf42f09-5fc0-410e-b287-1e9514821b31',
    },
  },
});
