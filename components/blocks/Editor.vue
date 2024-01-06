<template>
  <div
    v-if="data?.data?.editor"
    class="html-from-admin my-[100px]"
    v-html="data.data.editor"
  ></div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';

const runtimeConfig = useRuntimeConfig();
const { api } = runtimeConfig.public;

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

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
