<template>
  <p class="my-3" v-html="data.text"></p>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
