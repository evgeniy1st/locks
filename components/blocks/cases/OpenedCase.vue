<template>
  <div
    class="border border-main-blue rounded-[60px] p-[40px] flex flex-col gap-[40px]"
  >
    <h5 class="text-[30px] leading-[38px]">{{ data.title }}</h5>

    <div class="flex gap-[95px]">
      <div class="flex flex-col gap-[30px] shrink-0">
        <img
          :src="`${api}assets/${data.photo}?format=auto&width=445&height=280&fit=cover`"
          alt="Фото работы"
          width="445"
          height="280"
          class="rounded-[60px] shrink-0"
        />
        <div class="flex gap-[30px] items-start justify-between max-w-[465px]">
          <div class="flex gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 4.5V9L12 10.5"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="flex flex-col text-[14px]">
              <span>Длительность работ</span>
              <span>{{ data.duration }}</span>
            </span>
          </div>
          <div class="flex gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M15.75 3H2.25C1.42157 3 0.75 3.67157 0.75 4.5V13.5C0.75 14.3284 1.42157 15 2.25 15H15.75C16.5784 15 17.25 14.3284 17.25 13.5V4.5C17.25 3.67157 16.5784 3 15.75 3Z"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M0.75 7.5H17.25"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="flex flex-col text-[14px]">
              <span>Стоимость</span>
              <span
                >{{
                  new Intl.NumberFormat('ru-RU').format(Number(data.cost))
                }}
                руб</span
              >
            </span>
          </div>
          <div class="flex gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                stroke="#141414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span class="flex flex-col text-[14px]">
              <span>Мастер</span>
              <span>
                {{ data.master.first_name + ' ' + data.master.last_name }}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-[40px]">
        <div class="text-basic-black" v-html="data.content"></div>
        <div
          class="p-[30px] rounded-[60px] bg-light-blue flex items-start gap-[20px]"
        >
          <div>
            <img
              :src="`${api}assets/${data.client.img}?format=auto&width=60&height=60&fit=cover`"
              alt="Фото клиента"
              width="60"
              height="60"
              class="rounded-full mb-[10px] mx-auto"
            />
            <div
              class="text-[14px] leading-[18px] flex flex-col items-center mb-[20px]"
            >
              <span class="whitespace-nowrap">
                {{ data.client.first_name }}
                {{ data.client.last_name }}
              </span>
              <span v-if="data?.reviews[0]?.date">
                {{ dayjs(data.reviews[0].date).format('DD/MM/YYYY') }}
              </span>
            </div>
          </div>

          <div>
            <div
              class="flex justify-start items-center text-[#FF7A00] mb-[20px]"
            >
              <Icon
                v-for="(item, i) in getRatingStar(data.reviews[0].stars)"
                :key="i"
                :name="item"
                size="20"
              />
            </div>
            <p class="text-[16px] leading-[normal] text-left">
              {{ data.reviews[0].text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();
const runtimeConfig = useRuntimeConfig();

const { api } = runtimeConfig.public;

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

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
