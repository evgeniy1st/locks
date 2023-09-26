// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'ru',
      },
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
