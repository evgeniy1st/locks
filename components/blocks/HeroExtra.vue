<template>
  <div
    v-if="data && 'data' in data"
    class="flex flex-col gap-[34px] ml-auto w-[350px] pt-[26px]"
  >
    <ChildBlockView
      v-for="childBlock in data.data.blocks"
      :key="childBlock.id"
      :block="childBlock"
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

const { data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
