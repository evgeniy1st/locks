<template>
  <section class="px-[32px] w-full">
    <div
      class="rounded-[60px] w-full py-[50px] pr-[60px] pl-[116px] flex flex-col gap-[30px] -mt-[30px] bg-light-yellow relative text-basic-black"
    >
      <GetTitle
        v-if="data?.data?.title"
        :title="data.data.title"
        :type="data.data?.title_type ? data.data.title_type : 'span'"
        class="text-[44px] leading-[50px]"
      />
      <div class="flex items-start gap-[20px]">
        <div class="flex flex-col gap-[30px]">
          <GetTitle
            v-if="data?.data?.subtitle"
            :title="data.data.subtitle"
            :type="data.data?.subtitle_type ? data.data.subtitle_type : 'span'"
            class="text-[30px] leading-[38px] max-w-[562px]"
          />
        </div>

        <div class="flex flex-col gap-[60px]">
          <div
            v-if="data?.data?.description"
            class="html-from-admin text-[14px] leading-[18px] max-w-[618px]"
            v-html="data.data.description"
          ></div>
          <div class="flex items-center gap-[22px]">
            <label for="stockInput" class="sr-only"> Номер телефона </label>
            <input
              id="stockInput"
              type="text"
              class="rounded-[25px] h-[50px] border border-basic-black bg-light-yellow py-1 px-4 grow"
            />
            <button
              class="h-[50px] rounded-[25px] text-white text-[16px] font-[700] bg-accent-orange flex items-center justify-center py-[16px] px-[26px]"
            >
              {{ data.data.button_text }}
            </button>
          </div>
        </div>
      </div>
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
