<template>
  <ul class="flex px-[32px] gap-1">
    <li>
      <NuxtLink to="/" class="text-[14px]">Главная</NuxtLink>
    </li>
    <li v-for="item in breadcrumbs.reverse()" :key="item.slug">
      <NuxtLink
        v-if="(item.slug[0] !== '/' ? '/' : '') + item.slug !== route.path"
        :to="(item.slug[0] !== '/' ? '/' : '') + item.slug"
        class="hover:underline text-[14px]"
      >
        {{ '/ ' + item.display_name }}
      </NuxtLink>
      <span v-else class="text-deep-blue text-[14px]">
        {{ '/ ' + item.display_name }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';

type BreadcrumbsItem = {
  slug: string;
  display_name: string;
};

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/pages?filter[slug][_in]=${Object.values(route.params).join(
    ','
  )}&fields=display_name,slug`
);

const breadcrumbs = computed(() => {
  if (
    !data ||
    !('data' in data.value) ||
    !data.value.data ||
    !data.value.data.length
  ) {
    return [];
  }
  const result: BreadcrumbsItem[] = [];
  data.value.data.forEach((element: BreadcrumbsItem, i: number) => {
    result.push({
      display_name: element.display_name,
      slug:
        JSON.parse(JSON.stringify(data.value.data))
          .slice(i + 1)
          .reverse()
          .map((item: BreadcrumbsItem) => item.slug)
          .join('/') +
        '/' +
        element.slug,
    });
  });
  return result;
});
</script>
