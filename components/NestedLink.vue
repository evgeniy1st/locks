<template>
  <NuxtLink
    v-if="!item.root_page"
    :to="item.slug"
    target="_blank"
    class="text-[16px] text-basic-black hover:underline"
    >{{ item.display_name }}</NuxtLink
  >
  <NuxtLink
    v-else-if="item.root_page === 'home'"
    :to="`/${item.slug}`"
    class="text-[16px] text-basic-black hover:underline"
    >{{ item.display_name }}</NuxtLink
  >
  <NuxtLink
    v-else-if="item.root_page === 'articles'"
    :to="`/articles/${item.slug}`"
    class="text-[16px] text-basic-black hover:underline"
    >{{ item.display_name }}</NuxtLink
  >
  <NestedLink v-else-if="data && Object.keys(data).length" :item="newItem" />
</template>

<script setup>
import { computed, ref } from 'vue';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data: data } = await useAsyncData(
  `root-page-slug:${props.item.slug}`,
  () => {
    if (
      !props.item.root_page ||
      props.item.root_page === 'home' ||
      props.item.root_page === 'articles'
    ) {
      return new Promise((resolve) => resolve({ data: {} }));
    }
    return $fetch(
      `${api}items/pages/${props.item.root_page}?fields=slug,root_page`
    );
  }
);

const newItem = computed(() => {
  if (
    !data.value ||
    !data.value?.data ||
    !Object.keys(data.value?.data).length
  ) {
    return {};
  }
  return {
    slug: `${
      data.value.data.root_page && data.value.data.root_page !== 'home'
        ? '/' + data.value.data.root_page
        : ''
    }/${props.item.root_page}/${props.item.slug}`,
    display_name: props.item.display_name,
    root: data.value.data.root_page,
  };
});
</script>
