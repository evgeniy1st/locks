<template>
  <div
    v-if="navigation && 'data' in navigation"
    class="hidden hover:flex flex-col absolute z-50 nav-el"
    :class="parent ? 'left-[100%] top-0' : 'group-hover:flex'"
  >
    <div
      v-for="navEl in navigationList"
      :key="navEl.title"
      class="bg-white py-[10px] shadow-md"
    >
      <p v-if="navEl.title" class="text-[#363642] opacity-50 p-[10px]">
        {{ navEl.title }}
      </p>
      <ul
        v-if="'items' in navEl && navEl.items.length"
        class="flex flex-col gap-[10px] bg-white"
      >
        <li
          v-for="page in navEl.items"
          :key="page.url"
          class="relative nav-group px-[30px]"
        >
          <NuxtLink
            :to="`/${parent ? parent + '/' : ''}${root}/${page.url}`"
            class="text-[16px] text-basic-black hover:text-link whitespace-nowrap"
          >
            {{ page.display_name }}
          </NuxtLink>
          <NestedNavigation
            v-if="page.nested_pages.length"
            :root="page.slug"
            :parent="root"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from 'nuxt/app';

type NavigationEl = {
  url: string;
  slug: string;
  display_name: string;
  group_by: string;
  nested_pages: NavigationEl[];
};

type NestedNavigation = {
  title: string;
  items: NavigationEl[];
};
const runtimeConfig = useRuntimeConfig();

const { api, site } = runtimeConfig.public;

const props = defineProps({
  root: {
    type: String,
    default: '',
  },
  parent: {
    type: String,
    default: '',
  },
});

const { data: navigation }: any = await useFetch(
  `${api}items/pages?filter[root_page][_eq]=${props.root}&filter[status][_eq]=published&fields=url,nested_pages,display_name,group_by,slug`
);

const navigationList = computed(() => {
  if (!navigation.value || !('data' in navigation.value)) {
    return [];
  }

  const result: NestedNavigation[] = [];
  navigation.value.data.forEach((item: NavigationEl) => {
    const target = result.find((el) => el.title == item.group_by);
    if (target) {
      target.items.push(item);
    } else {
      result.push({ title: item.group_by ? item.group_by : '', items: [item] });
    }
  });

  return result;
});
</script>

<style scoped>
.nav-group:hover > .nav-el {
  display: flex;
}
</style>
