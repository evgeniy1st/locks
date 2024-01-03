<template>
  <div class="w-full flex flex-col items-center gap-[10px]">
    <span class="text-left w-full leading-[32px] text-[26px] text-basic-black">
      {{ data.data.title }}
    </span>
    <div class="flex items-center justify-between w-full">
      <ButtonWithTooltip
        v-for="item in data.data.offers"
        :key="item.title"
        :item="item"
      />
    </div>

    <div class="flex items-center gap-[27px] w-full">
      <NestedLink
        v-if="
          data.data.all_price_link &&
          !data.data.all_price_link.includes('#') &&
          link_page &&
          link_page.data
        "
        :item="{
          root_page: link_page.data[0].root_page?.url,
          display_name: '',
          slug: link_page.data[0].url,
        }"
        class="flex text-accent-orange text-[26px] leading-[32px] text-left shrink-0 items-center"
      >
        <span class="max-w-[80px] text-accent-orange">
          {{ data.data.all_price_title }}
        </span>
        <img
          v-for="i in 3"
          :key="i"
          :src="`${api}assets/${data.data.image}`"
          alt="icon"
          width="28"
          height="53"
        />
      </NestedLink>

      <a
        v-else
        :href="data.data.all_price_link"
        class="flex text-accent-orange text-[26px] leading-[32px] text-left shrink-0 items-center"
      >
        <span class="max-w-[80px]">
          {{ data.data.all_price_title }}
        </span>
        <img
          v-for="i in 3"
          :key="i"
          :src="`${api}assets/${data.data.image}`"
          alt="icon"
          width="28"
          height="53"
        />
      </a>

      <span class="text-[12px] leading-[18px] max-w-[177px]">
        {{ data.data.all_price_description }}
      </span>
    </div>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);

const { data: link_page }: any = await useFetch(
  `${api}items/pages?filter[url][_eq]=${data.value.data.all_price_link}&fields=root_page.url,url,display_name`
);
</script>
