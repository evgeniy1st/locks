<template>
  <div
    v-if="'data' in data"
    class="flex py-[23px] px-[31px] gap-x-[20px] w-full mx-auto"
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

const { data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
