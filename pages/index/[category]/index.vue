<template>
  <p>{{ route.params.category }}</p>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
const route = useRoute();

console.log(route.params.category);
</script>
