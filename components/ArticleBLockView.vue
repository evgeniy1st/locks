<template>
  <component
    :is="component.component"
    v-if="
      !block.collection.includes('header') &&
      !block.collection.includes('footer') &&
      !block.collection.includes('block_form_image')
    "
    v-once
    :block="component.data"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
  pageData: {
    type: Object,
    default: () => {},
  },
});

const isDev = computed(() => {
  return import.meta.dev;
});

function getComponentName(collection: string) {
  if (collection.includes('block_')) {
    return {
      dir: 'blocks',
      componentName: collection
        .replace('block_', '')
        .split('_')
        .map((word: any) => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(''),
    };
  } else if (collection.includes('article_')) {
    return {
      dir: 'article',
      componentName: collection
        .replace('article', '')
        .split('_')
        .map((word: any) => word.slice(0, 1).toUpperCase() + word.slice(1))
        .join(''),
    };
  } else {
    return {
      dir: '',
      componentName: '',
    };
  }
}

const { componentName, dir } = getComponentName(props.block.collection);

const component = {
  component: defineAsyncComponent(
    () => import(`./${dir}/${componentName}.vue`)
  ),
  data: props.block,
  pageData: props.pageData,
};
</script>
