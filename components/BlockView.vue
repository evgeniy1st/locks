<template>
  <div class="border rounded-md p-4 max-w-1/3 max-h-[350px] overflow-auto">
    <h1>{{ block.collection }}</h1>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const { api } = runtimeConfig.public;

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*.*`
);
</script>
