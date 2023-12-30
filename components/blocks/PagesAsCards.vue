<template>
  <section
    v-if="
      data && 'data' in data && 'pages' in data.data && data.data.pages.length
    "
    class="mx-auto px-[32px] flex flex-col lg:flex-row items-stretch gap-[20px] mt-[130px] w-full"
  >
    <NestedLink
      :item="{
        root_page: data.data.pages[0].pages_slug?.root_page?.url,
        display_name: data.data.pages[0].pages_slug.preview_title,
        slug: data.data.pages[0].pages_slug.url,
      }"
      class="flex flex-col group max-w-[445px]"
    >
      <span
        class="rounded-[60px] flex items-center justify-center text-[44px] leading-[50px] min-w-[329px] min-h-[268px]"
        :style="{
          'background-color': data.data.pages[0].pages_slug.preview_bg,
        }"
      >
        {{ data.data.pages[0].pages_slug.preview_title }}
      </span>
      <span
        class="rounded-[60px] relative"
        :style="{
          'background-color': data.data.pages[0].pages_slug.preview_bg,
        }"
      >
        <img
          :src="`${api}assets/${data.data.pages[0].pages_slug.preview_image}?format=auto&width=445&height=586&fit=cover`"
          :alt="data.data.pages[0].pages_slug.preview_title"
          class="rounded-[60px] group-hover:opacity-0 duration-300"
        />
        <span
          class="absolute opacity-0 group-hover:opacity-100 text-[26px] leading-[32px] top-0 p-[40px]"
        >
          {{ data.data.pages[0].pages_slug.preview_description }}
        </span>
      </span>
    </NestedLink>

    <div class="flex flex-col gap-[20px] max-w-[909px] grow">
      <!-- @vue-ignore -->
      <NestedLink
        v-for="card in data.data.pages.slice(1).sort((a, b) => a.sort - b.sort)"
        :key="card.pages_slug.url"
        :item="{
          root_page: card.pages_slug?.root_page?.url,
          display_name: card.pages_slug.preview_title,
          slug: card.pages_slug.url,
        }"
        class="flex even:flex-row-reverse max-h-[268px] group"
      >
        <span
          class="rounded-[60px] flex items-center justify-center text-[44px] leading-[50px] min-w-[329px] min-h-[268px] max-w-full"
          :class="!card.pages_slug.preview_image ? 'w-full' : ''"
          :style="{
            'background-color': card.pages_slug.preview_bg,
          }"
        >
          <span class="p-[40px] min-h-[268px] flex justify-center items-center">
            {{ card.pages_slug.preview_title }}
          </span>

          <span
            v-if="!card.pages_slug.preview_image"
            class="hidden group-hover:flex text-[26px] leading-[32px] top-0 p-[40px]"
          >
            {{ card.pages_slug.preview_description }}
          </span>
        </span>
        <span
          v-if="card.pages_slug.preview_image"
          class="flex rounded-[60px] relative grow"
          :style="{
            'background-color': card.pages_slug.preview_bg,
          }"
        >
          <img
            :src="`${api}assets/${card.pages_slug.preview_image}?format=auto&width=445&height=586&fit=contain`"
            :alt="card.pages_slug.preview_title"
            class="rounded-[60px] object-cover grow group-hover:opacity-0 duration-300"
          />
          <span
            class="absolute opacity-0 group-hover:opacity-100 text-[26px] leading-[32px] top-0 p-[40px]"
          >
            {{ card.pages_slug.preview_description }}
          </span>
        </span>
      </NestedLink>
    </div>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=pages.sort,pages.pages_slug.preview_image,pages.pages_slug.url,pages.pages_slug.preview_title,pages.pages_slug.slug,pages.pages_slug.display_name,pages.pages_slug.preview_description,pages.pages_slug.root_page,pages.pages_slug.root_page.url,pages.pages_slug.preview_bg`
);
</script>
