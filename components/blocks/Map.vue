<template>
  <section
    id="map"
    class="py-[130px] w-full text-basic-black text-[16px] leading-[normal]"
  >
    <div class="flex gap-[110px] items-start mb-[71px] px-[148px]">
      <GetTitle
        v-if="data?.data?.title"
        :title="data.data.title"
        :type="data.data?.title_type ? data.data.title_type : 'span'"
        class="text-[44px] leading-[50px]"
      />

      <div
        v-if="data?.data?.description"
        class="html-from-admin text-[16px] leading-[normal] max-w-[678px]"
        v-html="data.data.description"
      ></div>
    </div>

    <MapMain
      :img="data.data.image"
      :suburb-list-title-type="data.data.suburb_list_title_type"
      :suburb-list-title="data.data.suburb_list_title"
      :district-list-title-type="data.data.district_list_title_type"
      :district-list-title="data.data.district_list_title"
    />
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
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
