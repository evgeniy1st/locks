<template>
  <section v-if="data && 'data' in data" class="pt-[130px] text-basic-black">
    <GetTitle
      v-if="data?.data?.title"
      :title="data.data.title"
      :type="data.data?.title_type ? data.data.title_type : 'span'"
      class="px-[148px] mb-[70px] text-[44px] leading-[50px] block"
    />

    <p v-if="'description' in data.data" class="mb-[70px]">
      {{ data.data.description }}
    </p>

    <ul class="px-[32px] flex flex-wrap gap-[20px] items-start w-full">
      <li v-for="item in data.data.cases" :key="item.block_portfolio_id">
        <component
          :is="component.component"
          :data="item.objects_id"
          :title-type="data.data.cases_title_type"
        />
      </li>
      <li class="flex flex-col w-[329px] h-[222px] justify-center items-center">
        <NestedLink
          :item="{
            root_page: link_page.data[0].root_page?.url,
            display_name: link_page.data[0].display_name,
            slug: link_page.data[0].url,
          }"
          class="bg-accent-orange text-white px-[14px] py-[5px] rounded-[30px] flex items-center justify-center text-[16px] font-[700]"
        >
          {{ data.data.button_text }}
        </NestedLink>
      </li>
    </ul>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,cases.block_portfolio_id,cases.objects_id.*,cases.objects_id.master.first_name,cases.objects_id.master.last_name,cases.objects_id.reviews.*,cases.objects_id.services.services_id.title,cases.objects_id.client.img,cases.objects_id.client.last_name,cases.objects_id.client.first_name`
);

const { data: link_page }: any = await useFetch(
  `${api}items/pages?filter[url][_eq]=${data.value.data.button_link}&fields=root_page.url,url,display_name`
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
