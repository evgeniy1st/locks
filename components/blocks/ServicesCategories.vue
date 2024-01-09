<template>
  <section v-if="data && 'data' in data" class="w-full">
    <CategoriesViewer
      v-for="category in data.data.categories"
      :key="category.id"
      :category-id="category.services_categories_id"
      :title-type="data.data.title_type"
    />
  </section>
</template>

<script setup lang="ts">
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
