// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  modules: ['@nuxtjs/tailwindcss', 'nuxt-typed-router'],
  runtimeConfig: {
    public: {
      api: 'https://api.vskrytie-zamkov78.ru/',
      site: 'fbf42f09-5fc0-410e-b287-1e9514821b31',
    },
  },
});
