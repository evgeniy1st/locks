<template>
  <ul class="flex px-[32px] gap-1 mb-[14px]">
    <li>
      <NuxtLink to="/" class="text-[14px]">Главная</NuxtLink>
    </li>
    <li>
      <NuxtLink
        :to="`/${appData.data.articles_page.url}`"
        class="hover:underline text-[14px]"
      >
        <span v-if="appData.data.articles_page.preview_title">
          {{ '/' + appData.data.articles_page.preview_title }}
        </span>
        <span v-else>{{ '/' + appData.data.articles_page.seo_title }}</span>
      </NuxtLink>
      <span class="text-deep-blue text-[14px]">
        {{ '/ ' + current }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: appData } = useNuxtData('appData');

const { api } = runtimeConfig.public;

const props = defineProps({
  current: {
    type: String,
    default: '',
  },
});

const { data: data }: any = await useFetch(
  `${api}items/pages?filter[url][_in]=${Object.values(route.params).join(
    ','
  )}&fields=display_name,url`
);
</script>
