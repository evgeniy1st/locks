<template>
  <div v-if="data && 'data' in data">
    <Head>
      <Title>{{ data.data.seo_title }}</Title>
      <Meta
        name="description"
        :content="data.data?.seo_description ? data.data.seo_description : ''"
      />
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

if (Number(route.params.pageNumber) == 1) {
  await navigateTo('/poleznoe');
}

const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/pages/poleznoe?fields=*.*`
);
</script>
