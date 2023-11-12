<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

await useFetch(
  `${runtimeConfig.public.api}items/sites/${runtimeConfig.public.site}?fields=city.name,city.id,url,phone,email,whatsapp,telegram,articles_page.slug,articles_page.preview_title,articles_page.seo_title`,
  { key: 'appData' }
);
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400&display=swap'); */
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  scroll-behavior: smooth;
  scroll-margin: 20px;
}
</style>
