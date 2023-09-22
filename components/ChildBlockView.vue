<template>
  <div class="border rounded-md p-4 max-w-1/3 max-h-[350px] overflow-auto">
    <h1>{{ block.collection }}</h1>
    <component :is="component.component" v-once :block="component.data" />
  </div>
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

const component = ref({
  component: defineAsyncComponent(
    () => import(`./blocks/${componentName}.vue`)
  ),
  data: props.block,
});
</script>
