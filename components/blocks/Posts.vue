<template>
  <section
    class="pt-[130px] px-[148px] text-basic-black flex flex-col gap-[70px]"
  >
    <h4 class="text-[44px] leading-[50px]">
      {{ config.data.title }}
    </h4>

    <PostList
      :count="config.data.post_count"
      :offset="config.data.post_offset"
      :sort="config.data.post_sort"
    />
    <div class="w-full text-end">
      <a
        :href="config.data.button_link"
        class="bg-accent-orange text-white rounded-full font-700 text-[16px] px-[15px] py-[5px]"
      >
        {{ config.data.button_text }}
      </a>
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

const { data: config }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
