<template>
  <section class="w-full mx-auto mt-[130px] px-[32px]">
    <ul class="flex flex-wrap gap-[20px]">
      <li v-for="item in cases.data" :key="item.id">
        <component :is="component.component" :data="item" />
      </li>
    </ul>
    <PaginationNav
      v-if="Math.ceil(cases.meta.filter_count / data.data.count) > 1"
      :current="route.params.pageNumber ? Number(route.params.pageNumber) : 1"
      :total="Math.ceil(cases.meta.filter_count / data.data.count)"
      :path="`${route.params.category}/`"
    />
  </section>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api, site } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);

const { data: cases }: any = await useFetch(
  `${api}items/objects?filter[site][_eq]=${site}&limit=${
    data.value.data.count
  }&fields=*,master.first_name,master.last_name,reviews.*,services.services_id.title,client.img,client.last_name,client.first_name&offset=${
    'pageNumber' in route.params && route.params.pageNumber
      ? (Number(route.params.pageNumber) - 1) * data.value.data.count
      : 0
  }&meta=filter_count`
);

const component_type = computed(() => {
  return data.value?.data?.component_type
    ? data.value.data.component_type
    : 'with_modal';
});

const componentName = component_type.value
  .split('_')
  .map((word: any) => word.slice(0, 1).toUpperCase() + word.slice(1))
  .join('');

const component = {
  component: defineAsyncComponent(() => import(`./cases/${componentName}.vue`)),
};
</script>
