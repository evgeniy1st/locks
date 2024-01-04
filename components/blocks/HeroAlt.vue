<template>
  <section
    v-if="data && 'data' in data && data.data"
    class="w-full mx-auto bg-slate-500 bg-no-repeat bg-cover bg-center max-h-[400px] overflow-visible"
    :style="{
      'background-image': `url(${api}assets/${data.data.image}?width=1440&format=auto&fit=cover)`,
    }"
  >
    <div
      class="w-full px-[149px] pt-[58px] flex justify-between items-start gap-[50px]"
    >
      <div>
        <div class="w-[503px] flex flex-col mb-[52px]">
          <div v-if="data.data.title" class="white-glass px-[40px] py-[20px]">
            <GetTitle
              :title="data.data.title"
              :accent="data.data?.accent_in_title"
              :type="data.data.title_type"
              class="font-roboto text-[30px] leading-[38px]"
            />
          </div>

          <div
            v-if="data.data.description"
            class="white-glass px-[40px] py-[20px]"
          >
            {{ data.data.description }}
          </div>

          <div
            v-if="data.data.content_image"
            class="white-glass px-[40px] py-[20px]"
          >
            <img
              :src="`${api}assets/${data.data.content_image}?width=423&format=auto&fit=contain`"
              alt="Изображение страницы"
              width="423"
              height="auto"
            />
          </div>
        </div>

        <ul
          v-if="data?.data?.services.length"
          class="flex flex-wrap gap-[20px]"
        >
          <li
            v-for="service in data.data.services"
            :key="service"
            class="px-[30px] py-[18px] rounded-[44px] border border-basic-black text-basic-black bg-light-blue text-[16px]"
          >
            {{ service.title }}
          </li>
        </ul>
      </div>

      <ul
        v-if="data?.data?.item_list.length"
        class="w-[329px] flex flex-col gap-[10px] text-white"
      >
        <li
          v-for="item in data.data.item_list"
          :key="item.title"
          class="blue-glass px-[36px] py-[20px]"
        >
          <p v-if="item?.title" class="text-[16px] font-[700]">
            {{ item.title }}
          </p>
          <p v-if="item?.description" class="text-[14px]">
            {{ item.description }}
          </p>
        </li>

        <li
          v-if="data.data?.extra_text"
          class="bg-light-yellow rounded-[60px] px-[50px] py-[30px] text-[44px] text-basic-black leading-[50px]"
        >
          {{ data.data.extra_text }}
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

const { data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>

<style scoped>
.white-glass {
  border-radius: 40px;
  border: 1.5px solid #fff;
  background: rgba(255, 255, 255, 0.5);

  /* White Glass Shadow */
  box-shadow: 0px 16px 26px 0px #bdc6dc;
  backdrop-filter: blur(10px);
}

.blue-glass {
  border-radius: 40px;
  border: 1.5px solid #d6e1ff;
  background: rgba(60, 138, 255, 0.6);

  /* Blue Glass Shadow */
  box-shadow: 0px 16px 16px 0px #acc3ff;
  backdrop-filter: blur(10px);
}
</style>
