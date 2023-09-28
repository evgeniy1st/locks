<template>
  <section class="px-[32px] w-full">
    <div
      class="rounded-[60px] w-full py-[50px] pr-[60px] pl-[116px] flex flex-col gap-[30px] -mt-[30px] bg-light-yellow relative text-basic-black"
    >
      <h4 class="text-[44px] leading-[50px]">{{ data.data.title }}</h4>
      <div class="flex items-start gap-[20px]">
        <div class="flex flex-col gap-[30px]">
          <p class="text-[30px] leading-[38px] max-w-[562px]">
            {{ data.data.subtitle }}
          </p>
        </div>

        <div class="flex flex-col gap-[60px]">
          <p class="text-[14px] leading-[18px] max-w-[618px]">
            {{ data.data.description }}
          </p>
          <div class="flex items-center gap-[22px]">
            <input
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
  <pre>
    {{ data }}
  </pre>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
);
</script>
