<template>
  <NestedLink
    v-if="page && 'data' in page && page.data.length"
    :item="{
      root_page: page.data[0]?.root_page?.url,
      display_name: '',
      slug: page.data[0].url,
    }"
  >
    <slot />
  </NestedLink>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  slug: {
    type: String,
    default: '',
  },
});

const { api } = runtimeConfig.public;

const { data: page }: any = await useFetch(
  `${api}items/pages?filter[slug][_eq]=${props.slug}&fields=url,preview_title,root_page.url`
);
</script>
