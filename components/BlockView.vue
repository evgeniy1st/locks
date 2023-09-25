<template>
  <div v-if="isDev" class="w-full relative">
    <div
      class="absolute top-[30px] w-full opacity-70 p-2 border border-dotted border-slate-600 text-purple-600 flex justify-center items-center z-20"
    >
      {{ block.collection }}
    </div>
  </div>
  <component :is="component.component" v-once :block="component.data" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const isDev = computed(() => {
  return import.meta.dev;
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
