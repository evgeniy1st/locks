<template>
  <section class="pt-[130px] text-basic-black">
    <h4 class="px-[148px] mb-[70px] text-[44px] leading-[50px]">
      {{ data.data.title }}
    </h4>

    <ul class="px-[32px] flex flex-wrap gap-[20px] items-start w-full">
      <li
        v-for="item in data.data.cases"
        :key="item.block_portfolio_id"
        class="flex flex-col w-[329px]"
      >
        <img
          :src="`${api}assets/${item.objects_id.photo}?format=auto&width=329&height=222&fit=cover`"
          alt="Фото работы"
          width="329"
          height="222"
          class="rounded-[60px]"
        />
        <div
          class="p-[40px] rounded-[60px] border border-basic-black flex gap-[20px] flex-col"
        >
          <h5 class="text-[16px] leading-[normal]">
            {{ item.objects_id.title }}
          </h5>
          <span class="text-[30px] leading-[38px]">
            {{
              new Intl.NumberFormat('ru-RU').format(
                Number(item.objects_id.cost)
              )
            }}
            руб
          </span>
        </div>
      </li>
      <li class="flex flex-col w-[329px] h-[222px] justify-center items-center">
        <a
          :href="data.data.button_link"
          class="bg-accent-orange text-white px-[14px] py-[5px] rounded-[30px] flex items-center justify-center text-[16px] font-[700]"
        >
          {{ data.data.button_text }}
        </a>
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

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,cases.block_portfolio_id,cases.objects_id.title,cases.objects_id.cost,cases.objects_id.photo`
);
</script>
