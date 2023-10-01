<template>
  <ul class="flex flex-col gap-[30px]">
    <li
      v-for="post in posts.data"
      :key="post.id"
      class="flex items-start gap-[20px]"
    >
      <img
        :src="`${api}assets/${post.preview_image}?format=auto&width=329&height=209&fit=cover`"
        alt="Превью статьи"
        width="329"
        height="209"
        class="rounded-[60px]"
      />
      <div class="flex flex-col gap-[20px] items-start grow">
        <h5 class="text-[30px] leading-[38px]">
          {{ post.title }}
        </h5>
        <p class="text-[16px] leading-[normal]">
          {{ post.preview_text }}
        </p>
        <div class="w-full text-end">
          <NuxtLink
            :to="`/articles/${post.slug}`"
            class="px-[14px] py-[4px] rounded-[15px] text-[14px] border border-basic-black"
          >
            Читать
          </NuxtLink>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  count: {
    type: [String, Number],
    default: 3,
  },
  offset: {
    type: [String, Number],
    default: 0,
  },
  sort: {
    type: String,
    default: 'newest',
  },
});

const { api, site } = runtimeConfig.public;

const { data: posts }: any = useFetch(
  `${api}items/articles?limit=${props.count}&offset=${props.offset}&sort=${
    props.sort === 'newest' ? '-date_created' : 'date_created'
  }&filter[status][_eq]=published&filter[site][_eq]=${site}`
);
</script>
