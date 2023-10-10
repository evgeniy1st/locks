<template>
  <div v-if="'data' in data">
    <Head>
      <Title>{{ data.data.main_page.seo_title }}</Title>
      <Meta name="description" :content="data.data.main_page.seo_description" />
      <Meta name="keywords" :content="data.data.main_page.seo_keywords" />
    </Head>
    <div class="flex flex-col">
      <BlockView
        v-for="block in data.data.main_page.blocks"
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

const { data: data }: any = await useFetch(
  `${api}items/sites/${site}?fields=main_page.*.*`
);
</script>
