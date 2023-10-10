<template>
  <section class="pt-[130px]">
    <h3 class="text-[44px] leading-[50px] px-[148px] text-basic-black">
      {{ data.data.title }}
    </h3>

    <div class="p-[32px]">
      <div class="rounded-[60px] bg-light-blue flex gap-[27px]">
        <img
          :src="`${api}assets/${data.data.image}?width=832&height=798&format=auto&quality=80`"
          alt="Фото сотрудника"
          class="-mt-[65px] grow-0 shrink-0"
          width="832"
          height="798"
        />

        <div class="pt-[52px] pb-[70px] flex flex-col">
          <ul class="flex flex-wrap gap-y-[60px] gap-x-[29px]">
            <li
              v-for="item in data.data.services.slice(0, 10)"
              :key="item.services_id.title"
              class="flex flex-col max-w-[211px] gap-[10px]"
            >
              <span class="text-[16px] leading-[normal]">
                {{ item.services_id.title }}
              </span>
              <span class="text-[26px] leading-[32px]">
                от
                {{
                  new Intl.NumberFormat('ru-RU').format(
                    Number(item.services_id.min_price)
                  )
                }}
                руб.
              </span>
            </li>
          </ul>

          <a
            :href="data.data.button_link"
            class="mt-auto mx-auto rounded-[30px] py-[5px] px-[14px] bg-accent-orange text-white text-[16px] font-[700] flex items-center justify-center"
          >
            {{ data.data.button_text }}
          </a>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,services.services_id.title,services.services_id.min_price`
);
</script>
