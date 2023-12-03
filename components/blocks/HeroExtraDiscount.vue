<template>
  <div
    class="w-full flex flex-col items-center text-deep-blue text-[16px] leading-[normal]"
  >
    <div
      class="py-[10px] pr-[10px] pl-[26px] flex items-center w-full rounded-[40px] justify-between gap-[17px] bg-light-yellow"
    >
      <span>
        {{ data.data.text }}
      </span>
      <div class="flex items-center gap-[10px]">
        <a
          :href="`https://wa.me/${appData.data.whatsapp}`"
          target="_blank"
          rel="nofollow"
        >
          <span class="sr-only">Связаться в whatsapp</span>
          <img
            :src="`${api}assets/${data.data.whatsapp.replace(
              '+',
              ''
            )}?format=auto&width=49&height=50`"
            alt="whatsapp icon"
            width="49"
            height="50"
            class="shrink-0 grow-0"
          />
        </a>
        <a
          :href="`https://t.me/${appData.data.telegram.replace('@', '')}`"
          target="_blank"
          rel="nofollow"
        >
          <span class="sr-only">Связаться в telegram</span>
          <img
            :src="`${api}assets/${data.data.telegram}?format=auto&width=50&height=50`"
            alt="telegram icon"
            width="50"
            height="50"
            class="shrink-0 grow-0"
          />
        </a>
        <a :href="`tel:${appData.data.phone}`">
          <span class="sr-only">Связаться по телефону</span>
          <img
            :src="`${api}assets/${data.data.phone}?format=auto&width=50&height=50`"
            alt="phone icon"
            width="50"
            height="50"
            class="shrink-0 grow-0"
          />
        </a>
      </div>
    </div>
    <div
      class="pr-[10px] pl-[16px] py-[10px] gap-[17px] flex items-center w-full rounded-[40px] justify-start bg-light-blue"
    >
      <img
        :src="`${api}assets/${data.data.promise}?format=auto`"
        alt="icon"
        width="33"
        height="38"
        class="shrink-0 grow-0"
      />
      <span>
        {{ data.data.promise_text }}
      </span>
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

const { data: appData } = useNuxtData('appData');

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
