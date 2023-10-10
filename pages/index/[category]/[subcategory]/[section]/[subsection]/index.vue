<template>
  <p>{{ route.params.category }}</p>
  <p>{{ route.params.subcategory }}</p>
  <p>{{ route.params.section }}</p>
  <p>{{ route.params.subsection }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();

console.log(
  route.params.category +
    '/' +
    route.params.subcategory +
    '/' +
    route.params.section +
    '/' +
    route.params.subsection
);
</script>
