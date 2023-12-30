<template>
  <section class="mt-[160px]">
    <h3 class="text-[30px] leading-[38px] mb-[70px]">{{ data.data.title }}</h3>
    <div
      class="px-[148px] flex items-center gap-[21px]"
      :class="
        data.data.articles.length > 2 ? 'justify-between' : 'justify-center'
      "
    >
      <button
        v-if="data.data.articles.length > 2"
        :disabled="current === 0"
        @click="current--"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="98"
          height="24"
          viewBox="0 0 98 24"
          fill="none"
        >
          <path
            :opacity="current === 0 ? '0.2' : '1'"
            d="M0.939339 13.0607C0.353554 12.4749 0.353554 11.5251 0.939339 10.9393L10.4853 1.3934C11.0711 0.807611 12.0208 0.807611 12.6066 1.3934C13.1924 1.97919 13.1924 2.92893 12.6066 3.51472L4.12132 12L12.6066 20.4853C13.1924 21.0711 13.1924 22.0208 12.6066 22.6066C12.0208 23.1924 11.0711 23.1924 10.4853 22.6066L0.939339 13.0607ZM98 13.5H2V10.5H98V13.5Z"
            fill="#141414"
          />
        </svg>
      </button>
      <ul
        class="max-w-full overflow-x-auto flex items-center justify-center gap-[20px]"
      >
        <li
          v-for="article in data.data.articles.slice(current, current + 2)"
          :key="article.articles_slug.url"
        >
          <ArticleAsCard :article="article.articles_slug" />
        </li>
      </ul>
      <button
        v-if="data.data.articles.length > 2"
        :disabled="current + 2 === data.data.articles.length"
        @click="current++"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="98"
          height="24"
          viewBox="0 0 98 24"
          fill="none"
        >
          <path
            :opacity="current + 2 === data.data.articles.length ? '0.2' : '1'"
            d="M97.0607 13.0607C97.6464 12.4749 97.6464 11.5251 97.0607 10.9393L87.5147 1.3934C86.9289 0.807611 85.9792 0.807611 85.3934 1.3934C84.8076 1.97919 84.8076 2.92893 85.3934 3.51472L93.8787 12L85.3934 20.4853C84.8076 21.0711 84.8076 22.0208 85.3934 22.6066C85.9792 23.1924 86.9289 23.1924 87.5147 22.6066L97.0607 13.0607ZM0 13.5H96V10.5H0V13.5Z"
            fill="#141414"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*.*`
);

const current = ref(0);
</script>
