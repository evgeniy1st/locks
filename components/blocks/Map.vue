<template>
  <section
    id="map"
    class="py-[130px] w-full text-basic-black text-[16px] leading-[normal]"
  >
    <div class="flex gap-[110px] items-start mb-[71px] px-[148px]">
      <h4 class="text-[44px] leading-[50px]">
        {{ data.data.title }}
      </h4>
      <p class="text-[16px] leading-[normal] max-w-[678px]">
        {{ data.data.description }}
      </p>
    </div>

    <MapMain :img="data.data.image" />
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
