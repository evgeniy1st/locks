<template>
  <ul class="my-[10px] flex flex-wrap gap-x-[20px] list-disc list-outside">
    <li
      v-for="(item, i) in data.data.list"
      :key="i"
      class="w-[calc(50%_-_10px)] pl-[10px]"
    >
      {{ item.element }}
    </li>
  </ul>
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
