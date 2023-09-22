<template>
  <div class="pt-[17px] px-[30px] pb-[23px] w-full flex flex-col">
    <div class="w-full justify-between items-center">
      <RouterLink class="flex gap-[10px] items-center" to="/">
        <img
          :src="api + 'assets/' + data.data.logo + '?height=29&width=29'"
          :alt="data.data.title"
          class="grow-0 shrink-0"
        />
        <span class="text-basic-black text-[26px] grow-0 shrink-0">
          {{ data.data.title }}
        </span>
      </RouterLink>
    </div>
    <pre>
      {{ data }}
    </pre>
    <div v-if="'data' in data">
      <div class="flex gap-4 flex-wrap">
        <ChildBlockView
          v-for="childBlock in data.data.blocks"
          :key="childBlock.id"
          :block="childBlock"
        />
      </div>
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

const { data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
