<template>
  <section class="pt-[130px] w-full">
    <h3
      class="text-[44px] leading-[50px] px-[148px] text-basic-black mb-[70px]"
    >
      {{ data.data.title }}
    </h3>
    <div class="px-[32px] flex items-stretch flex-wrap gap-[20px] w-full">
      <ChildBlockView
        v-for="childBlock in data.data.service"
        :key="childBlock.id"
        :block="childBlock"
      />
    </div>
  </section>
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
