<template>
  <ChildBlockView
    v-for="childBlock in data.data.navigation"
    :key="childBlock.id"
    :block="childBlock"
  />
  <pre>
    {{ data }}
  </pre>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
