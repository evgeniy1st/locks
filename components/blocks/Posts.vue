<template>
  <section
    class="pt-[130px] px-[148px] text-basic-black flex flex-col gap-[70px]"
  >
    <GetTitle
      v-if="config?.data?.title"
      :title="config.data.title"
      :type="config.data.title_type"
      class="text-[44px] leading-[50px]"
    />

    <PostList
      :count="config.data.post_count"
      :offset="config.data.post_offset"
      :sort="config.data.post_sort"
      :post-title-type="config.data.post_title_type"
    />
    <div class="w-full text-end">
      <NuxtLink
        to="/poleznoe"
        class="bg-accent-orange text-white rounded-full font-700 text-[16px] px-[15px] py-[5px]"
      >
        {{ config.data.button_text }}
      </NuxtLink>
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

const { data: config }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
