<template>
  <section class="w-full px-[32px] mb-[130px]">
    <div
      v-if="data && data.data"
      class="flex px-[50px] bg-deep-blue rounded-[79px] items-center h-[118px] text-[44px] text-white mt-[14px] mb-[71px]"
    >
      <GetTitle :title="data.data.title" :type="data.data.title_type" />
      <ReviewsBar class="ml-auto" />
    </div>

    <ReviewsList
      v-if="data && data.data"
      :count="data.data.count"
      :button-text="data.data.button_text"
    />
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
