<template>
  <MainNavigation :root="data.data.page" :with-nested="data.data.with_nested" />
  <!-- <nav>
    <ul class="flex gap-[30px] items-center py-[6px]">
      <li v-for="item in data.data.items" :key="item.text">
        <NuxtLink
          :to="`/${item.link}`"
          class="text-[16px] text-basic-black hover:underline"
          >{{ item.text }}</NuxtLink
        >
      </li>
    </ul>
  </nav> -->
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
