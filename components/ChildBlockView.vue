<template>
  <component :is="component.component" v-once :block="component.data" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const componentName = props.block.collection
  .replace('block_', '')
  .split('_')
  .map((word: any) => word.slice(0, 1).toUpperCase() + word.slice(1))
  .join('');

const component = {
  component: defineAsyncComponent(
    () => import(`./blocks/${componentName}.vue`)
  ),
  data: props.block,
};
</script>
