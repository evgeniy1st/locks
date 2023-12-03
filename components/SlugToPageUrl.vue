<template>
  <NestedLink
    v-if="page"
    :item="{
      root_page: page.data.root_page,
      display_name: '',
      slug: page.data.slug,
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
  `${api}items/pages/${props.slug}?fields=slug,preview_title,root_page`
);
</script>
