<template>
  <div class="mt-[30px]">
    <div
      class="w-[911px] h-[540px] mx-auto flex items-center justify-center shadow-lg rounded-[60px]"
    >
      <img
        :key="current"
        :src="`${api}assets/${data.data.images[current].directus_files_id}?format=auto&fit=contain&width=911&height=540`"
        alt="gallery item"
        width="911"
        height="540"
        class="rounded-[60px] object-contain"
      />
    </div>
    <div class="flex mx-auto gap-[26px] items-center justify-center mt-[30px]">
      <button :disabled="current === 0" @click="current--">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="98"
          height="24"
          viewBox="0 0 98 24"
          fill="none"
        >
          <path
            :opacity="current === 0 ? '0.2' : '1'"
            d="M0.939339 13.0607C0.353554 12.4749 0.353554 11.5251 0.939339 10.9393L10.4853 1.3934C11.0711 0.807611 12.0208 0.807611 12.6066 1.3934C13.1924 1.97919 13.1924 2.92893 12.6066 3.51472L4.12132 12L12.6066 20.4853C13.1924 21.0711 13.1924 22.0208 12.6066 22.6066C12.0208 23.1924 11.0711 23.1924 10.4853 22.6066L0.939339 13.0607ZM98 13.5H2V10.5H98V13.5Z"
            fill="#141414"
          />
        </svg>
      </button>
      <span>{{ current + 1 }}/{{ data.data.images.length }}</span>
      <button
        :disabled="current + 1 === data.data.images.length"
        @click="current++"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="98"
          height="24"
          viewBox="0 0 98 24"
          fill="none"
        >
          <path
            :opacity="current + 1 === data.data.images.length ? '0.2' : '1'"
            d="M97.0607 13.0607C97.6464 12.4749 97.6464 11.5251 97.0607 10.9393L87.5147 1.3934C86.9289 0.807611 85.9792 0.807611 85.3934 1.3934C84.8076 1.97919 84.8076 2.92893 85.3934 3.51472L93.8787 12L85.3934 20.4853C84.8076 21.0711 84.8076 22.0208 85.3934 22.6066C85.9792 23.1924 86.9289 23.1924 87.5147 22.6066L97.0607 13.0607ZM0 13.5H96V10.5H0V13.5Z"
            fill="#141414"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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

const current = ref(0);
</script>
