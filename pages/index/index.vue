<template>
  <div v-if="'data' in data">
    <Head>
      <Title>{{ data.data[0].seo_title }}</Title>
      <Meta name="description" :content="data.data[0].seo_description" />
      <Meta name="keywords" :content="data.data[0].seo_keywords" />
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

const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data }: any = useFetch(
  `${api}items/pages?filter[type][_eq]=main&filter[site][_eq]=${site}&filter[status][_eq]=published&fields=*,blocks.*`
);
</script>
