<template>
  <div
    v-if="data && data.data"
    class="mx-[32px] flex px-[50px] bg-deep-blue rounded-[79px] items-center h-[118px] text-[44px] text-white mt-[14px]"
  >
    <GetTitle :title="data.data.title" :type="data.data.type" />
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
