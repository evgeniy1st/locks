<template>
  <nav v-if="'data' in navigation">
    <ul class="flex gap-[30px] items-center py-[6px]">
      <li
        v-for="item in navigation.data"
        :key="item.slug"
        class="relative group"
      >
        <NuxtLink
          :to="`/${item.slug}`"
          class="text-[16px] text-basic-black hover:underline"
        >
          {{ item.display_name }}
        </NuxtLink>
        <NestedNavigation v-if="item.sections.length" :root="item.slug" />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const { api, site } = runtimeConfig.public;

const { data: navigation }: any = await useFetch(
  `${api}items/sections?filter[root][_null]=true&fields=slug,sections,display_name`
);
</script>
