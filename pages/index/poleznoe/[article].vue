<template>
  <div v-if="data && 'data' in data">
    <Header v-if="header" :block="header" />
    <ArticleBreadcrumbs :current="route.params.article.toString()" />
    <article class="flex flex-col">
      <Hero />
      <div class="w-full bg-main-blue h-[6px] sticky top-[76px]">
        <div
          class="absolute h-[6px] bg-deep-blue left-0 top-0"
          :style="{
            width: `${
              (yScroll / contentHeight) * 100 <= 100
                ? (yScroll / contentHeight) * 100
                : 100
            }%`,
          }"
        ></div>
      </div>
      <div class="flex gap-[20px] px-[32px] mt-[70px]">
        <div class="w-[329px] shrink-0">
          <ContentList
            v-if="titles?.length"
            :key="route.path"
            :content="titles"
            :y-scroll="yScroll"
          />
        </div>
        <div ref="mainContent" class="w-auto">
          <div class="mb-[70px] text-[38px] leading-[38px]">
            {{ data.data.preview_text }}
          </div>
          <div>
            <ArticleBLockView
              v-for="block in data.data.content"
              :key="block.id"
              :block="block"
              :page-data="data.data"
            />
          </div>
        </div>
      </div>
    </article>
    <Linked v-if="linked" :block="linked" />
    <FormImage v-if="form" :block="form" />
    <Footer v-if="footer" :block="footer" />
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';
import { computed, ref, type Ref } from 'vue';
import Header from '@/components/blocks/Header.vue';
import Footer from '@/components/blocks/Footer.vue';
import Hero from '@/components/article/Hero.vue';
import FormImage from '@/components/blocks/FormImage.vue';
import ArticleBreadcrumbs from '@/components/article/ArticleBreadcrumbs.vue';
import Linked from '@/components/article/Linked.vue';

type ContentItem = {
  id: number;
  articles_slug: string;
  item: string;
  sort: number;
  collection: string;
};

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const yScroll = ref(0);
const mainContent: Ref<HTMLElement | null> = ref(null);

const { site, api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/articles/${route.params.article}?fields=*.*`
);

const contentHeight = computed(() => {
  if (mainContent.value) {
    return mainContent.value.getBoundingClientRect().height;
  }
  return 0;
});

const header = computed(() => {
  return data?.value?.data?.content.find(
    (b: ContentItem) => b.collection === 'block_header'
  );
});

const linked = computed(() => {
  return data?.value?.data?.content.find(
    (b: ContentItem) => b.collection === 'article_linked'
  );
});

const footer = computed(() => {
  return data?.value?.data?.content.find(
    (b: ContentItem) => b.collection === 'block_footer'
  );
});

const form = computed(() => {
  return data?.value?.data?.content.find(
    (b: ContentItem) => b.collection === 'block_form_image'
  );
});

const titles = computed(() => {
  console.log(data?.value?.data?.content);
  return data?.value?.data?.content
    .filter((item: ContentItem) => item.collection === 'article_title')
    .map((item: ContentItem) => {
      return { item: item.item, sort: item.sort };
    });
});

onMounted(() => {
  window.addEventListener('scroll', setYScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', setYScroll);
});

function setYScroll() {
  const html = document.querySelector('html');
  if (html) {
    yScroll.value = html.scrollTop;
  }
  // console.log(yScroll.value);
}
</script>
