<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const { data: data } = await useFetch(
  `${runtimeConfig.public.api}items/sites/${runtimeConfig.public.site}?fields=*`
);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
