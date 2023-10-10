<template>
  <div class="relative flex justify-end shrink-0 pl-[116px] h-[483px]">
    <div
      class="rounded-[60px] grow flex items-center justify-center w-full max-w-[563px] h-[483px]"
    >
      <video
        :src="`${api}assets/${data.data.video}`"
        muted="true"
        autoplay="true"
        loop="true"
        class="rounded-[60px] w-full h-[483px] grow object-cover bg-[#abd7fa]"
      ></video>
    </div>
    <div class="absolute bottom-0 left-0 flex flex-col items-start">
      <span class="flex items-center gap-[10px]">
        <span
          class="text-[140px] font-[900] strokeme text-deep-blue leading-[50px]"
        >
          {{ data.data.content[0].accent_text.slice(0, 2) }}
        </span>
        <span class="text-[30px] text-deep-blue max-w-[150px] leading-[38px]">
          {{ data.data.content[0].accent_text.slice(2) }}
        </span>
      </span>
      <span class="text-[44px] text-basic-black max-w-[354px] leading-[50px]">
        {{ data.data.content[0].text }}
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

const { data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>

<style scoped>
.strokeme {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px;
}
</style>
