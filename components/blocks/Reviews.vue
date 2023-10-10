<template>
  <section class="pt-[130px] w-full text-basic-black">
    <h4 class="text-[44px] leading-[50px] mb-[100px] px-[148px]">
      {{ data.data.title }}
    </h4>
    <div
      class="mx-[32px] bg-light-blue rounded-[60px] overflow-y-visible review-block pb-[60px]"
    >
      <Carousel :items-to-show="3" :wrap-around="true" snap-align="center">
        <Slide v-for="review in data.data.reviews" :key="review.id">
          <div class="carousel__item -mt-[80px] mb-[70px]">
            <img
              :src="`${api}assets/${review.reviews_id.object.client.img}?format=auto&width=160&height=160&fit=cover`"
              alt="Фото клиента"
              width="160"
              height="160"
              class="rounded-full mb-[10px] mx-auto"
            />
            <div
              class="text-[14px] leading-[18px] flex flex-col items-center mb-[28px]"
            >
              <span>
                {{ review.reviews_id.object.client.first_name }}
                {{ review.reviews_id.object.client.last_name }}
              </span>
              <span>
                {{ dayjs(review.reviews_id.date_created).format('DD/MM/YYYY') }}
              </span>
            </div>
            <div
              class="flex justify-center items-center text-[#FF7A00] mb-[20px]"
            >
              <Icon
                v-for="(item, i) in getRatingStar(review.reviews_id.stars)"
                :key="i"
                :name="item"
                size="20"
              />
            </div>
            <p class="w-[329px] text-[16px] leading-[normal] text-left">
              {{ review.reviews_id.text }}
            </p>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();
const dayjs = useDayjs();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?filter={ "reviews": { "reviews_id": {"status": {"_eq": "published"}} }}&fields=*,reviews.id,reviews.reviews_id.*,reviews.reviews_id.object.client.img,reviews.reviews_id.object.client.first_name,reviews.reviews_id.object.client.last_name`
);

function getRatingStar(rating: number): string[] {
  if (!rating) {
    return [];
  }
  const starList = [];
  while (rating > 0) {
    if (rating > 0.5) {
      starList.push('ic:outline-star');
    } else {
      starList.push('ic:outline-star-half');
    }
    rating--;
  }

  while (starList.length < 5) {
    starList.push('ic:outline-star-border');
  }
  return starList;
}
</script>

<style>
.review-block .carousel__viewport {
  overflow: visible;
  /* overflow-x: hidden; */
}
.carousel__viewport .carousel__pagination {
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
