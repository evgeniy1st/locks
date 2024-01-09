<template>
  <div
    v-if="data && 'data' in data"
    class="w-[calc(33%_-_20px)] flex flex-col items-center"
  >
    <img
      v-if="data.data.image"
      :src="`${api}assets/${data.data.image}?format=auto&width=445&height=230`"
      alt="Фото услуги"
      class="rounded-[60px] grow-0 shrink-0"
    />
    <div
      class="pt-[40px] px-[60px] pb-[50px] bg-light-blue rounded-[60px] text-basic-black grow"
    >
      <GetTitle
        v-if="data?.data?.title"
        :title="data.data.title"
        :type="data.data?.title_type ? data.data.title_type : 'span'"
        class="mb-[40px] text-[30px] leading-[38px] block"
      >
        <SlugToPageUrl
          v-if="data.data.service.page"
          :slug="data.data.service.page"
        >
          <span class="text-deep-blue hover:underline">{{
            data.data.title
          }}</span>
        </SlugToPageUrl>

        <span v-else>{{ data.data.title }}</span>
      </GetTitle>

      <div
        v-if="data?.data?.primary_description"
        class="html-from-admin text-[14px] leading-[18px] mb-[10px]"
        v-html="data.data.primary_description"
      ></div>
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
</script>

<style>
.html-from-admin table,
.html-from-admin th,
.html-from-admin td {
  border: 1px solid #000;
}

.html-from-admin table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}

.html-from-admin p {
  margin-top: 20px;
  margin-bottom: 20px;
}

.html-from-admin a {
  color: blue;
}

.html-from-admin a:hover {
  text-decoration: underline;
}

.html-from-admin h1 {
  font-size: 50px;
}

.html-from-admin h2 {
  font-size: 40px;
}

.html-from-admin h3 {
  font-size: 35px;
}

.html-from-admin h4 {
  font-size: 30px;
}

.html-from-admin h5,
.html-from-admin h6 {
  font-size: 25px;
}

.html-from-admin ol {
  list-style: auto;
}

.html-from-admin ul {
  list-style: disc;
}
</style>
