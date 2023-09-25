<template>
  <div class="w-full flex items-start gap-[22px]">
    <div
      class="flex items-center justify-center w-[211px] h-[118px] rounded-[10px] relative"
    >
      <img
        :src="`${api}assets/${data.data.map_img}`"
        alt="mini map"
        width="211"
        height="118"
        class="absolute top-0 left-0 rounded-[10px]"
      />
      <img
        :src="`${api}assets/${data.data.pin_img}`"
        alt="map pin"
        width="63"
        height="63"
        class="relative z-10"
      />
    </div>
    <a
      :href="data.data.link"
      class="leading-[normal] text-[16px] max-w-[134px]"
    >
      {{ data.data.text }}
    </a>
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

const { data: data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
