<template>
  <NuxtLink v-if="!item.root_page" :to="item.slug" class="text-basic-black">
    <slot>
      <span class="hover:underline">
        {{ item.display_name }}
      </span>
    </slot>
  </NuxtLink>
  <NuxtLink
    v-else-if="item.root_page === 'home'"
    :to="`/${item.slug}`"
    class="text-basic-black"
  >
    <slot>
      <span class="hover:underline">
        {{ item.display_name }}
      </span>
    </slot>
  </NuxtLink>
  <NuxtLink
    v-else-if="item.root_page === 'poleznoe'"
    :to="`/poleznoe/${item.url}`"
    class="text-basic-black"
  >
    <slot>
      <span class="hover:underline">
        {{ item.display_name }}
      </span>
    </slot>
  </NuxtLink>
  <NestedLink
    v-else-if="data && Object.keys(data.data[0]).length"
    :item="newItem"
  >
    <slot></slot>
  </NestedLink>
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
      return new Promise((resolve) => resolve({ data: [{}] }));
    }
    return $fetch(
      `${api}items/pages?filter[url][_eq]=${props.item.root_page}&fields=root_page.url,url,display_name`
    );
  }
);

const newItem = computed(() => {
  if (
    !data.value ||
    !data.value?.data[0] ||
    !Object.keys(data.value?.data[0]).length
  ) {
    return {};
  }
  return {
    slug: `${
      data.value.data[0].root_page?.url &&
      data.value.data[0].root_page.url !== 'home'
        ? '/' + data.value.data[0].root_page.url
        : ''
    }/${props.item.root_page}/${props.item.slug}`,
    display_name: props.item.display_name,
    root: data.value.data[0].root_page?.url,
  };
});
</script>
