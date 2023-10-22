<template>
  <nav>
    <h3>{{ data.data.title }}</h3>
    <ul class="flex gap-[30px] items-center py-[6px]">
      <li v-for="item in navigationList" :key="item.slug">
        <NestedLink :item="item" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,pages.pages_slug.slug,pages.pages_slug.display_name,pages.pages_slug.root_page,articles.articles_slug.preview_title,articles.articles_slug.slug`
);

const pages = computed(() => {
  if (!data.value || !data.value.data || !data.value.data.pages) {
    return [];
  }
  return data.value.data.pages.map((item: any) => {
    return {
      slug: item.pages_slug.slug,
      display_name: item.pages_slug.display_name,
      root_page: item.pages_slug.root_page,
    };
  });
});

const articles = computed(() => {
  if (!data.value || !data.value.data || !data.value.data.articles) {
    return [];
  }
  return data.value.data.articles.map((item: any) => {
    return {
      slug: item.articles_slug.slug,
      display_name: item.articles_slug.preview_title,
      root_page: 'articles',
    };
  });
});

const customs = computed(() => {
  if (!data.value || !data.value.data || !data.value.data.custom) {
    return [];
  }
  return data.value.data.custom.map((item: any) => {
    return {
      slug: item.url,
      display_name: item.text,
      root_page: '',
    };
  });
});

const navigationList = computed(() => {
  return [...pages.value, ...articles.value, customs.value];
});
</script>
