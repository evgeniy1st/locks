<template>
  <div
    v-if="navigation && 'data' in navigation"
    class="hidden group-hover:block p-[10px] absolute z-10"
  >
    <div v-for="navEl in navigationList" :key="navEl.title" class="bg-white">
      <span>{{ navEl.title }}</span>
      <ul class="flex flex-col bg-white p-[10px]">
        <li
          v-for="section in navEl.items"
          :key="section.slug"
          class="relative group"
        >
          <NuxtLink
            :to="`/${parent ? parent + '/' : ''}${root}/${section.slug}`"
            class="text-[16px] text-basic-black hover:underline"
          >
            {{ section.display_name }}
          </NuxtLink>
          <NestedNavigation :root="section.slug" :parent="root" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from 'nuxt/app';

type NavigationEl = {
  slug: string;
  display_name: string;
  group_by: string;
  sections: NavigationEl[];
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
  `${api}items/sections?filter[root][_eq]=${props.root}&fields=slug,sections,display_name,group_by`
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
