<template>
  <div class="mt-[30px] mb-[50px] flex">
    <img
      :src="`${api}assets/${data.data.image}`"
      alt=""
      width="100%"
      height="auto"
      class="mx-auto rounded-[60px] block"
    />
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
