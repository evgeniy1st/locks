<template>
  <div class="flex items-start gap-[24px] my-[15px]">
    <img
      :src="`${api}assets/${data.data.icon}`"
      alt="icon"
      width="20"
      height="auto"
      class="rounded-full block"
    />
    <p>{{ data.data.text }}</p>
  </div>
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
