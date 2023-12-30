<template>
  <NestedLink
    :item="{
      root_page: page.data.root_page?.url,
      display_name: '',
      slug: page.data.url,
    }"
    class="carousel__item"
  >
    <img
      :src="`${api}assets/${brand.logo}?format=auto`"
      :alt="'Логотип бренда ' + brand.name"
    />
    <span class="sr-only"> Страница бренда {{ brand.name }} </span>
  </NestedLink>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  brand: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data: page }: any = await useFetch(
  `${api}items/pages/${props.brand.page}?fields=url,root_page.url`
);
</script>
