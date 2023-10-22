<template>
  <p>{{ route.params.article }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();

console.log(route.params.article);
</script>
