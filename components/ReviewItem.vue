<template>
  <div v-if="Object.keys(review).length">
    <div v-if="!review.comment_by_master" class="w-[329px]">
      <img
        :src="`${api}assets/${review.object.client.img}?format=auto&width=160&height=160&fit=cover`"
        alt="Фото клиента"
        width="160"
        height="160"
        class="rounded-full mb-[10px] mx-auto"
      />
      <div
        class="text-[14px] leading-[18px] flex flex-col items-center mb-[28px]"
      >
        <span>
          {{ review.object.client.first_name }}
          {{ review.object.client.last_name }}
        </span>
        <span v-if="review.date">
          {{ dayjs(review.date).format('DD/MM/YYYY') }}
        </span>
      </div>
      <div class="flex justify-center items-center text-[#FF7A00] mb-[20px]">
        <Icon
          v-for="(item, i) in getRatingStar(review.stars)"
          :key="i"
          :name="item"
          size="20"
        />
      </div>
      <p class="text-[16px] leading-[normal] text-left mb-[10px]">
        {{ review.text }}
      </p>
      <ul class="flex flex-wrap gap-x-[10px] text-[10px] text-deep-blue">
        <li v-for="(service, i) in review.object.services" :key="i">
          {{ service.services_id.title }}
        </li>
      </ul>
    </div>

    <div v-else class="rounded-[60px] p-[40px] bg-light-blue flex gap-[20px]">
      <div>
        <img
          :src="`${api}assets/${review.object.client.img}?format=auto&width=160&height=160&fit=cover`"
          alt="Фото клиента"
          width="160"
          height="160"
          class="rounded-full mb-[10px] mx-auto"
        />
        <div
          class="text-[14px] leading-[18px] flex flex-col items-center mb-[28px]"
        >
          <span>
            {{ review.object.client.first_name }}
            {{ review.object.client.last_name }}
          </span>
          <span v-if="review.date">
            {{ dayjs(review.date).format('DD/MM/YYYY') }}
          </span>
        </div>
        <div class="flex justify-center items-center text-[#FF7A00] mb-[20px]">
          <Icon
            v-for="(item, i) in getRatingStar(review.stars)"
            :key="i"
            :name="item"
            size="20"
          />
        </div>
        <p class="w-[309px] text-[16px] leading-[normal] text-left mb-[10px]">
          {{ review.text }}
        </p>

        <ul class="flex flex-wrap gap-x-[10px] text-[10px] text-deep-blue">
          <li v-for="(service, i) in review.object.services" :key="i">
            {{ service.services_id.title }}
          </li>
        </ul>
      </div>

      <div class="w-[248px]">
        <div class="text-[12px] text-deep-blue leading-[18px] mb-[15px]">
          Комментарий мастера
        </div>

        <div class="flex gap-[13px] items-start">
          <img
            :src="`${api}assets/${review.object.master.img}?format=auto&width=42&height=42&fit=cover`"
            :alt="
              'фото ' +
              review.object.master.first_name +
              ' ' +
              review.object.master.last_name
            "
            width="42"
            height="42"
            class="rounded-full"
          />
          <div class="text-[14px] mb-[24px]">
            <p>
              {{
                review.object.master.first_name +
                ' ' +
                review.object.master.last_name
              }}
            </p>
            <p>{{ review.object.master.skill }}</p>
          </div>
        </div>

        <div class="text-[14px] leading-[18px]">
          {{ review.text }}
        </div>

        <button
          class="flex w-full justify-between items-center mt-[20px] text-basic-black hover:text-deep-blue hover:scale-y-105"
        >
          <span class="text-[12px]"> Вызвать мастера </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="144"
            height="8"
            viewBox="0 0 144 8"
            fill="none"
          >
            <path
              d="M143.354 4.35355C143.549 4.15829 143.549 3.84171 143.354 3.64645L140.172 0.464466C139.976 0.269204 139.66 0.269204 139.464 0.464466C139.269 0.659728 139.269 0.976311 139.464 1.17157L142.293 4L139.464 6.82843C139.269 7.02369 139.269 7.34027 139.464 7.53553C139.66 7.7308 139.976 7.7308 140.172 7.53553L143.354 4.35355ZM0 4.5H143V3.5H0V4.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  review: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

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
