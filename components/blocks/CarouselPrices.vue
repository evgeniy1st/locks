<template>
  <div v-if="!data.data.isStatic">
    <div class="w-full pt-[31px]">
      <InfiniteCarousel
        :clone="false"
        :gradient="true"
        :gradient-color="[255, 255, 255]"
        gradient-length="5%"
        :pause-on-hover="true"
      >
        <div v-for="item in data.data.items" :key="item.id">
          <span
            v-if="item.services_id.page"
            class="px-[40px] py-[20px] border rounded-[40px] flex gap-[30px] mr-[20px] items-center border-deep-blue hover:underline"
          >
            <SlugToPageUrl :slug="item.services_id.page">
              <span class="max-w-[151px] text-[16px] leading-[normal]">
                {{ item.services_id.title + ' ' }}
              </span>
              <span class="text-[26px]"
                >от {{ item.services_id.min_price + ' ₽' }}</span
              >
            </SlugToPageUrl>
          </span>
          <span
            v-else
            class="px-[40px] py-[20px] border border-basic-black rounded-[40px] flex gap-[30px] mr-[20px] items-center"
          >
            <span class="max-w-[151px] text-[16px] leading-[normal]">
              {{ item.services_id.title }}
            </span>
            <span class="text-[26px]"
              >от {{ item.services_id.min_price + ' ₽' }}</span
            >
          </span>
        </div>
      </InfiniteCarousel>
    </div>
  </div>
  <div
    v-else
    class="px-[32px] flex flex-wrap gap-[20px] items-center pt-[70px]"
  >
    <div
      v-for="item in data.data.items"
      :key="item.id"
      class="px-[40px] py-[20px] border border-basic-black rounded-[40px] flex gap-[30px] items-center"
      :class="item.services_id.page ? 'hover:underline border-deep-blue' : ''"
    >
      <span v-if="item.services_id.page" class="text-[16px] leading-[normal]">
        <SlugToPageUrl :slug="item.services_id.page">
          <span class="max-w-[151px] text-[16px] leading-[normal]">
            {{ item.services_id.title + ' ' }}
          </span>
        </SlugToPageUrl>
      </span>
      <span v-else class="text-[16px] leading-[normal]">
        {{ item.services_id.title }}
      </span>
    </div>

    <NestedLink
      v-if="
        data.data.button_link &&
        !data.data.button_link.includes('#') &&
        link_page &&
        link_page.data
      "
      :item="{
        root_page: link_page.data[0].root_page?.url,
        display_name: link_page.data[0].display_name,
        slug: link_page.data[0].url,
      }"
      class="bg-accent-orange text-white px-[14px] py-[5px] rounded-[30px] flex items-center justify-center text-[16px] font-[700]"
    >
      {{ data.data.button_text }}
    </NestedLink>

    <a
      v-else
      :href="data.data.button_link"
      class="bg-accent-orange text-white px-[14px] py-[5px] rounded-[30px] flex items-center justify-center text-[16px] font-[700]"
    >
      {{ data.data.button_text }}
    </a>
  </div>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,items.services_id.min_price,items.services_id.title,items.services_id.page`
);

const { data: link_page }: any = await useFetch(
  `${api}items/pages?filter[url][_eq]=${data.value.data.button_link}&fields=root_page.url,url,display_name`
);
</script>
