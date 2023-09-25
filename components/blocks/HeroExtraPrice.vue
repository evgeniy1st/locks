<template>
  <div class="w-full flex flex-col items-center gap-[10px]">
    <span class="text-left w-full leading-[32px] text-[26px] text-basic-black">
      {{ data.data.title }}
    </span>
    <div class="flex items-center justify-between w-full">
      <button
        v-for="item in data.data.offers"
        :key="item.title"
        class="w-[162px] py-[6px] px-[14px] border border-basic-black rounded-[20px] flex justify-between items-center"
      >
        <span
          class="text-[12px] font-[700] text-basic-black flex items-center gap-[5px]"
        >
          <span>{{ item.title + ' ' }}</span>
          <span class="text-deep-blue">{{ item.price }}</span>
        </span>
        <span class="h-[15px] w-[15px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <circle cx="7.5" cy="8" r="7" stroke="#141414" />
            <path
              d="M8.39506 5.7397V12.193H6.61111V5.7397H8.39506ZM6.5 4.05779C6.5 3.80729 6.59053 3.60053 6.7716 3.43751C6.95267 3.27449 7.19547 3.19298 7.5 3.19298C7.80041 3.19298 8.04115 3.27449 8.22222 3.43751C8.40741 3.60053 8.5 3.80729 8.5 4.05779C8.5 4.30829 8.40741 4.51505 8.22222 4.67807C8.04115 4.84109 7.80041 4.9226 7.5 4.9226C7.19547 4.9226 6.95267 4.84109 6.7716 4.67807C6.59053 4.51505 6.5 4.30829 6.5 4.05779Z"
              fill="black"
            />
          </svg>
        </span>
      </button>
    </div>

    <div class="flex items-center gap-[27px] w-full">
      <a
        :href="data.data.all_price_link"
        class="flex text-accent-orange text-[26px] leading-[32px] text-left shrink-0"
      >
        <span class="max-w-[80px]">
          {{ data.data.all_price_title }}
        </span>
        <span class="flex shrink">
          <img
            v-for="i in 3"
            :key="i"
            :src="`${api}assets/${data.data.image}`"
            alt="icon"
            width="28"
            height="53"
          />
        </span>
      </a>
      <span class="text-[12px] leading-[18px] max-w-[177px]">
        {{ data.data.all_price_description }}
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

const { data: data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
