<template>
  <div v-if="data && 'data' in data">
    <Head>
      <Title>{{ data.data[0].seo_title }}</Title>
      <Meta name="description" :content="data.data[0].seo_description" />
    </Head>
    <div class="flex flex-col">
      <BlockView
        v-for="block in data.data[0].blocks"
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
    route.params.section
);

const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/pages?filter[url][_eq]=${route.params.section}&fields=*.*`
);
</script>
