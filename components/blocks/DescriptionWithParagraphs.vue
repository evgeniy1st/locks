<template>
  <div class="pt-[70px] px-[148px] text-basic-black flex flex-col gap-[70px]">
    <span class="text-[30px] leading-[38px]">
      {{ data.data.description }}
    </span>

    <ul class="flex flex-wrap w-full gap-y-[50px]">
      <li
        v-for="item in data.data.paragraphs"
        :key="item.title"
        class="max-w-[562px] flex flex-col gap-[15px] text-basic-black w-1/2 items-start"
      >
        <h4 class="text-[14px] font-[700] leading-[22px] highlight">
          {{ item.title }}
        </h4>
        <p class="text-[14px] leading-[18px] pr-[21px]">
          {{ item.description }}
        </p>
      </li>
    </ul>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
);
</script>

<style scoped>
.highlight {
  color: inherit !important;
  position: relative;
  display: inline;
  box-decoration-break: slice;
  -webkit-box-decoration-break: slice;
  background-color: none;
  background: linear-gradient(90deg, #a2d0f9 50%, #a2d0f9 50%);
  background-size: 100%;
  background-position: 10px 10px;
  background-repeat: no-repeat;
}
</style>
