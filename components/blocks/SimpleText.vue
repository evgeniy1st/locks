<template>
  <div
    class="mx-auto pt-[70px] px-[148px] w-full text-[30px] leading-[38px] text-basic-black flex flex-col gap-[20px]"
  >
    <p v-for="(item, i) in data.data.text" :key="i">
      {{ item.paragraph }}
    </p>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=text`
);
</script>
