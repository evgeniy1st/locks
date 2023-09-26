<template>
  <ClientOnly v-if="!data.data.isStatic">
    <div class="w-full pt-[31px]">
      <Vue3Marquee
        :clone="true"
        :gradient="true"
        :gradient-color="[255, 255, 255]"
        gradient-length="5%"
        :pause-on-hover="true"
      >
        <div
          v-for="item in data.data.items"
          :key="item.id"
          class="px-[40px] py-[20px] border border-basic-black rounded-[40px] flex gap-[30px] mr-[20px] items-center"
        >
          <span class="max-w-[151px] text-[16px] leading-[normal]">
            {{ item.services_id.title }}
          </span>
          <span class="text-[26px]">от {{ item.services_id.min_price }}</span>
        </div>

        <!-- <a
          v-if="data.data.button_link"
          :href="data.data.button_link"
          class="rounded-[30px] py-[5px] px-[14px] bg-accent-orange text-white text-[16px] font-[700] flex items-center justify-center mr-[20px]"
        >
          {{ data.data.button_text }}
        </a> -->
      </Vue3Marquee>
    </div>
  </ClientOnly>
  <div v-else></div>
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
