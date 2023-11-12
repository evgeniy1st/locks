<template>
  <GetTitle
    :title="data.data.title"
    :type="data.data.type"
    class="mb-[20px] mt-[50px]"
    :class="
      data.data.type === 'h2'
        ? 'text-[30px] leading-[38px]'
        : data.data.type === 'h3'
        ? 'text-[16px] font-[700]'
        : 'text-[16px] font-[700]'
    "
  />
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
