<template>
  <nav v-if="navigation && 'data' in navigation">
    <ul class="flex gap-[30px] items-center py-[6px]">
      <li
        v-for="item in navigation.data"
        :key="item.slug"
        class="relative group"
      >
        <NuxtLink
          :to="`/${item.slug}`"
          class="text-[16px] text-basic-black hover:text-link"
          :class="route.path.includes(item.slug) ? 'active-navigation' : ''"
        >
          {{ item.display_name }}
        </NuxtLink>
        <NestedNavigation
          v-if="withNested && item.nested_pages.length"
          :root="item.slug"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();
import { useRoute } from 'nuxt/app';
const route = useRoute();

const { api, site } = runtimeConfig.public;

const props = defineProps({
  root: {
    type: String,
    default: 'home',
  },
  withNested: {
    type: Boolean,
    default: true,
  },
});

const { data: navigation }: any = await useFetch(
  `${api}items/pages?filter[root_page][_eq]=${props.root}&filter[status][_eq]=published&fields=slug,nested_pages,display_name`
);
</script>

<style scoped>
.active-navigation {
  color: inherit !important;
  position: relative;
  display: inline;
  box-decoration-break: slice;
  -webkit-box-decoration-break: slice;
  background-color: none;
  background: linear-gradient(90deg, #a2d0f9 50%, #a2d0f9 50%);
  background-size: 100%;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  /* -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px; */
}
</style>
