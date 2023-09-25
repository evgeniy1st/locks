<template>
  <div
    class="flex flex-col gap-[16px] pt-[26px] items-start w-[280px] pl-[5px]"
  >
    <ul class="flex flex-col gap-[5px] items-start w-full">
      <li
        v-for="item in data.data.items"
        :key="item.title"
        class="py-[20px] px-[36px] rounded-[40px] flex flex-col gap-[5px] shrink-0 grow-0 w-[253px] text-white bg-[rgba(60,138,255,0.60)] blue-glass-shadow"
      >
        <h4 class="text-[16px] font-[700]">
          {{ item.title }}
        </h4>
        <h5 class="text-[14px] leading-[18px]">
          {{ item.description }}
        </h5>
      </li>
    </ul>
    <button
      class="w-[253px] bg-accent-orange text-white px-[26px] py-[16px] rounded-[30px] flex items-center justify-center font-[700] text-[16px]"
    >
      {{ data.data.button_text }}
    </button>
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

<style scoped>
.blue-glass-shadow {
  box-shadow: 0px 16px 16px 0px #acc3ff;
  backdrop-filter: blur(10px);
}
</style>
