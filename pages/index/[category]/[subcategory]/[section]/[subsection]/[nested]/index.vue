<template>
  <div v-if="'data' in data">
    <Head>
      <Title>{{ data.data.seo_title }}</Title>
      <Meta name="description" :content="data.data.seo_description" />
      <Meta name="keywords" :content="data.data.seo_keywords" />
    </Head>
    <div class="flex flex-col">
      <BlockView
        v-for="block in data.data.blocks"
        :key="block.id"
        :block="block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';
const route = useRoute();
console.log(
  route.params.category +
    '/' +
    route.params.subcategory +
    '/' +
    route.params.section +
    '/' +
    route.params.subsection +
    '/' +
    route.params.nested
);

const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/pages/${route.params.nested}?fields=*.*`
);
</script>
