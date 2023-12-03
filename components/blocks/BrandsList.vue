<template>
  <!-- eslint-disable vue/no-v-html -->
  <section
    class="pt-[130px] text-basic-black flex flex-col w-full mx-auto gap-[70px]"
  >
    <h4 class="text-[44px] leading-[50px] px-[148px]">
      {{ data.data.title }}
    </h4>
    <div class="px-[148px]">
      <p
        class="text-[16px] leading-[normal] max-w-[604px] first-line:leading-[35px]"
        v-html="data.data.description.replaceAll('\n', '<br />')"
      ></p>
    </div>

    <div class="flex flex-col gap-[26px]">
      <h5 class="text-[30px] leading-[38px] mb-[26px] px-[148px]">
        {{ data.data.subtitle }}
      </h5>

      <div class="px-[32px]">
        <Carousel :items-to-show="6" :wrap-around="true" snap-align="start">
          <Slide
            v-for="brand in data.data.brands"
            :key="brand.block_brands_list_id"
          >
            <div v-if="!brand.brands_id.page" class="carousel__item">
              <img
                :src="`${api}assets/${brand.brands_id.logo}?format=auto`"
                :alt="'Логотип бренда ' + brand.brands_id.name"
              />
            </div>
            <BrandLink v-else :brand="brand.brands_id" />
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
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
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*,brands.brands_id.*`
);
</script>

<style>
.carousel__pagination {
  align-items: center;
}
.carousel__pagination-button::after {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #000;
}

.carousel__pagination-button.carousel__pagination-button--active::after {
  width: 12px;
  height: 12px;
}
</style>
