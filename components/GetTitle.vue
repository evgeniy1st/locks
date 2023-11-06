<template>
  <h1 v-if="type === 'h1'">{{ title }}</h1>
  <h2 v-if="type === 'h2'">{{ title }}</h2>
  <h3 v-if="type === 'h3'">{{ title }}</h3>
  <h4 v-if="type === 'h4'">{{ title }}</h4>
  <h5 v-if="type === 'h5'">{{ title }}</h5>
  <h6 v-if="type === 'h6'">{{ title }}</h6>
  <span v-if="type === 'span'">{{ title }}</span>
  <p v-if="type === 'p'">{{ title }}</p>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'h2',
  },
});
</script>
