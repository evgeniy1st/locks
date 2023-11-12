<template>
  <div
    class="my-[50px] text-[30px] leading-[38px] flex flex-col items-start pl-[140px] pt-[100px] relative"
  >
    <img
      :src="`${api}assets/${data.data.icon}`"
      alt=""
      width="179"
      height="185"
      class="absolute top-0 left-0 z-0"
    />
    <blockquote class="mb-[30px] relative z-10">
      {{ data.data.text }}
    </blockquote>

    <div
      class="flex items-center gap-x-[10px] text-[14px] leading-[14px] ml-auto"
    >
      <img
        :src="`${api}assets/${data.data.author_img}`"
        alt=""
        width="24"
        height="24"
      />
      <span class="w-[239px]">
        <span class="font-[700]">
          {{ data.data.author_name }}
        </span>
        {{ data.data.author_text }}
      </span>
    </div>
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
