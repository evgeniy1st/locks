<template>
  <div class="w-[calc(33%_-_20px)] flex flex-col items-center">
    <img
      v-if="data.data.image"
      :src="`${api}assets/${data.data.image}?format=auto&width=445&height=230`"
      alt="Фото услуги"
      class="rounded-[60px] grow-0 shrink-0"
    />
    <div
      class="pt-[40px] px-[60px] pb-[50px] bg-light-blue rounded-[60px] text-basic-black grow"
    >
      <h4 class="mb-[40px] text-[30px] leading-[38px]">
        {{ data.data.title }}
      </h4>
      <p class="text-[14px] leading-[18px] mb-[10px]">
        {{ data.data.primary_description }}
      </p>
      <p class="text-[14px] leading-[18px]">
        {{ data.data.secondary_description }}
      </p>
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
