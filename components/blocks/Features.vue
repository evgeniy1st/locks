<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="w-full pt-[130px] px-[148px]">
    <h3 class="text-[44px] leading-[50px] text-basic-black">
      {{ data.data.title }}
    </h3>
    <ul class="flex items-center w-full flex-wrap pt-[95px] gap-y-[30px]">
      <li v-for="(item, i) in data.data.items" :key="i" class="w-1/3">
        <span class="text-[200px] font-[900] strokeme leading-[70px]">{{
          i + 1
        }}</span>
        <div
          class="feature-description text-[26px] leading-[32px] text-basic-black max-w-[367px]"
          v-html="item.description"
        ></div>
      </li>
    </ul>
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

const { data: data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,items.services_id.min_price,items.services_id.title`
);
</script>

<style>
.feature-description p span.marked {
  color: inherit !important;
  position: relative;
  display: inline;
  box-decoration-break: slice;
  -webkit-box-decoration-break: slice;
  background-color: none;
  background: linear-gradient(90deg, #a2d0f9 50%, #a2d0f9 50%);
  background-size: 100%;
  background-position: 15px 15px;
  background-repeat: no-repeat;
}
/* .feature-description p span.marked::after {
  content: '';
  display: inline;
  z-index: -1;
  position: absolute;
  background: #a2d0f9;
  width: 100%;
  height: 15px;
  left: 14px;
  top: 16px;
  border-radius: 2px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
} */
.strokeme {
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px;
}
</style>
