<template>
  <section class="pt-[240px] px-[32px] w-full">
    <div
      class="border border-basic-black rounded-[60px] w-full py-[50px] pr-[60px] pl-[116px] flex items-start gap-[36px] relative z-10"
    >
      <div class="flex flex-col gap-[50px] -mt-[160px] w-[562px] shrink-0">
        <img
          :src="`${api}assets/${data.data.image}?format=auto&width=562&height=337`"
          alt="banner image"
          class="rounded-[60px]"
          width="562"
          height="337"
        />
        <p class="text-[30px] leading-[38px] text-basic-black">
          {{ data.data.description }}
        </p>
      </div>
      <ul class="flex flex-col gap-[36px]">
        <li
          v-for="(item, i) in data.data.list"
          :key="i"
          class="flex items-center gap-[20px] text-basic-black"
        >
          <span
            class="text-[44px] h-[62px] w-[62px] rounded-full shrink-0 grow-0 border border-basic-black flex items-center justify-center"
          >
            {{ i + 1 }}
          </span>
          <span class="text-[16px] leading-[normal]">
            {{ item.description }}
          </span>
        </li>
      </ul>
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
