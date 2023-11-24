<template>
  <NuxtLink
    :to="`/poleznoe/${article.slug}`"
    class="w-[392px] h-[280px] rounded-[60px] bg-no-repeat bg-center bg-contain p-[30px] flex flex-col justify-between items-start relative group"
    :style="{
      'background-image': `url(${api}assets/${article.preview_image}?width=392&height=280&format=auto&fit=cover)`,
    }"
  >
    <span
      class="absolute hidden group-hover:flex gap-[6px] text-white text-[26px] font-[700] items-center justify-center w-[392px] h-[280px] top-0 left-0 blue-glass-shadow"
    >
      <span> Читать </span>
      <span>
        <svg
          width="126"
          height="16"
          viewBox="0 0 126 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M125.379 8.70711C125.77 8.31658 125.77 7.68342 125.379 7.29289L119.015 0.928932C118.625 0.538408 117.991 0.538408 117.601 0.928932C117.21 1.31946 117.21 1.95262 117.601 2.34315L123.258 8L117.601 13.6569C117.21 14.0474 117.21 14.6805 117.601 15.0711C117.991 15.4616 118.625 15.4616 119.015 15.0711L125.379 8.70711ZM0.208984 9H124.672V7H0.208984V9Z"
            fill="white"
          />
        </svg>
      </span>
    </span>
    <span
      class="px-[10px] py-[5px] rounded-[17px] bg-deep-blue text-white text-[14px]"
    >
      {{ article.theme ? article.theme : 'Интересное' }}
    </span>
    <span class="text-white text-[26px] font-[700]">
      <span v-if="article.preview_title">
        {{ article.preview_title }}
      </span>
      <span v-else class="">
        {{ article.title }}
      </span>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { api } = runtimeConfig.public;

const props = defineProps({
  article: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped>
.blue-glass-shadow {
  box-shadow: 0px 16px 16px 0px #acc3ff;
  backdrop-filter: blur(10px);
  border-radius: 60px;
  border: 1.5px solid #d6e1ff;
  background: rgba(60, 138, 255, 0.6);
}
</style>
