<template>
  <section class="w-full mx-auto mt-[130px] px-[32px]">
    <ul class="flex items-center gap-[20px] flex-wrap justify-start">
      <li v-for="article in articles.data" :key="article.slug" class="flex">
        <ArticleAsCard :article="article" />
      </li>
    </ul>
    <PaginationNav
      v-if="Math.ceil(articles.meta.filter_count / data.data.limit) > 1"
      :current="route.params.pageNumber ? Number(route.params.pageNumber) : 1"
      :total="Math.ceil(articles.meta.filter_count / data.data.limit)"
      :path="`poleznoe/`"
    />
  </section>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api, site } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);

const { data: articles }: any = await useFetch(
  `${api}items/articles?filter[status][_eq]=published&filter[site][_eq]=${site}&limit=${
    data.value.data.limit
  }&offset=${
    'pageNumber' in route.params && route.params.pageNumber
      ? (Number(route.params.pageNumber) - 1) * data.value.data.limit
      : 0
  }&meta=filter_count&fields=*`
);
</script>
