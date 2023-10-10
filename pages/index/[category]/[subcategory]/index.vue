<template>
  <p>{{ route.params.category }}</p>
  <p>{{ route.params.subcategory }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();

console.log(route.params.category + '/' + route.params.subcategory);
</script>
