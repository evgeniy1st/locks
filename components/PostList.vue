<template>
  <ul class="flex flex-col gap-[30px]">
    <li
      v-for="post in posts.data"
      :key="post.id"
      class="flex items-start gap-[20px]"
    >
      <NuxtLink
        :to="`/poleznoe/${post.url}`"
        class="rounded-[60px] shrink-0 hover:scale-105 duration-150"
      >
        <img
          :src="`${api}assets/${post.preview_image}?format=auto&width=329&height=209&fit=cover`"
          alt="Превью статьи"
          width="329"
          height="209"
          class="rounded-[60px]"
        />
      </NuxtLink>

      <div class="flex flex-col gap-[20px] items-start grow">
        <GetTitle
          v-if="post?.title"
          :title="post.title"
          :type="postTitleType"
          class="text-[30px] leading-[38px]"
        />
        <p class="text-[16px] leading-[normal]">
          {{ post.preview_text }}
        </p>
        <div class="w-full text-end">
          <NuxtLink
            :to="`/poleznoe/${post.url}`"
            class="px-[14px] py-[4px] rounded-[15px] text-[14px] border border-basic-black hover:scale-105 duration-150"
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
  postTitleType: {
    type: String,
    default: 'span',
  },
});

const { api, site } = runtimeConfig.public;

const { data: posts }: any = await useFetch(
  `${api}items/articles?limit=${props.count}&offset=${props.offset}&sort=${
    props.sort === 'newest' ? '-date_created' : 'date_created'
  }&filter[status][_eq]=published&filter[site][_eq]=${site}`
);
</script>
