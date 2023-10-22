<template>
  <footer
    class="w-full mx-auto rounded-[60px] bg-main-blue py-[40px] px-[32px]"
  >
    <div v-if="'data' in data" class="flex flex-col gap-[30px]">
      <ChildBlockView
        v-for="childBlock in data.data.blocks"
        :key="childBlock.id"
        :block="childBlock"
      />
    </div>
  </footer>
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
