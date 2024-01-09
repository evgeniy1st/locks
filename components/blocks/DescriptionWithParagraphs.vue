<template>
  <div class="pt-[70px] px-[148px] text-basic-black flex flex-col gap-[70px]">
    <div
      v-if="data?.data?.description"
      class="html-from-admin text-[30px] leading-[38px]"
      v-html="data.data.description"
    ></div>

    <ul class="flex flex-wrap w-full gap-y-[50px]">
      <li
        v-for="item in data.data.paragraphs"
        :key="item.title"
        class="max-w-[562px] flex flex-col gap-[15px] text-basic-black w-1/2 items-start"
      >
        <GetTitle
          v-if="item?.title"
          :title="item.title"
          :type="item?.title_type ? item.title_type : 'span'"
          class="text-[14px] font-[700] leading-[22px] highlight-t"
        />

        <div
          v-if="item?.description"
          class="html-from-admin text-[14px] leading-[18px] pr-[21px]"
          v-html="item.description"
        ></div>
      </li>
    </ul>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
);
</script>

<style>
.highlight-t {
  color: inherit !important;
  position: relative;
  display: inline;
  box-decoration-break: slice;
  -webkit-box-decoration-break: slice;
  background-color: none;
  background: linear-gradient(90deg, #a2d0f9 50%, #a2d0f9 50%);
  background-size: 100%;
  background-position: 10px 10px;
  background-repeat: no-repeat;
}

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
