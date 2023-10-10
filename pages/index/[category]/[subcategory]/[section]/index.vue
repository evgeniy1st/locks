<template>
  <p>{{ route.params.category }}</p>
  <p>{{ route.params.subcategory }}</p>
  <p>{{ route.params.section }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();

console.log(
  route.params.category +
    '/' +
    route.params.subcategory +
    '/' +
    route.params.section
);
</script>
