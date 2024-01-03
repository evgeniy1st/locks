<template>
  <div v-if="data && data.data.length">
    <div
      class="w-full m-auto bg-cover bg-no-repeat bg-center h-[500px] bg-slate-500 flex flex-col items-center justify-end"
      :style="{
        'background-image': `url(${api}assets/${data.data[0].preview_image})`,
      }"
    >
      <span
        class="px-[10px] py-[5px] rounded-[17px] bg-deep-blue text-white text-[14px] mb-[13px]"
      >
        {{ data.data[0].theme ? data.data[0].theme : 'Интересное' }}
      </span>
      <h1 class="text-white text-[44px] font[700] leading-[50px] mb-[50px]">
        {{ data.data[0].title }}
      </h1>

      <div class="text-white flex flex-col items-center">
        <span class="text-[12px]">Автор</span>
        <span class="flex items-center gap-[10px]">
          <img
            :src="`${api}assets/${data.data[0].author.img}?width=24&height=24&fit=contain&format=auto`"
            alt="Фото мастера по вскрытию замков"
            width="24"
            height="24"
          />
          <span class="font-[700]"
            >{{ data.data[0].author.first_name }}
            {{ data.data[0].author.last_name }},</span
          >
          <span> {{ data.data[0].author.skill }}</span>
        </span>
        <span class="mb-[20px] text-[12px]">
          <span> Время прочтения </span>
          <ClientOnly>
            <span>{{ duration }}</span>
          </ClientOnly>
        </span>

        <ClientOnly>
          <div
            class="flex items-center gap-[20px] mb-[30px] relative justify-center w-full"
          >
            <Share
              v-show="isShares"
              :key="route.fullPath"
              @update="updateShares"
              @close="isShares = false"
            />
            <button
              class="px-[10px] py-[4px] rounded-[26px] text-[14px] flex items-center gap-[4px] border active:scale-95 hover:scale-105"
              @click="updateSocial('likes')"
            >
              <span>{{ data.data[0].likes }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.81235 1.63528C6.11852 0.908099 5.18262 0.5 4.2071 0.5C3.22388 0.5 2.28091 0.91456 1.58548 1.65254C0.890439 2.39095 0.5 3.39219 0.5 4.43615C0.5 5.48011 0.890439 6.48135 1.58548 7.21976L7.50025 13.5L13.4181 7.21976C14.112 6.48055 14.5011 5.47906 14.5 4.43536C14.4989 3.39165 14.1075 2.39112 13.412 1.65361C12.7167 0.915366 11.7737 0.500627 10.7904 0.500627C9.81526 0.500627 8.87973 0.908506 8.18614 1.63529C8.18033 1.64137 8.17454 1.64748 8.16876 1.65361L7.49924 2.3645L6.82872 1.65254C6.82327 1.64677 6.81782 1.64102 6.81235 1.63528ZM6.10074 2.33815C5.5876 1.79372 4.90511 1.5 4.2071 1.5C3.50917 1.5 2.82676 1.79365 2.31364 2.33795M6.10074 2.33815L7.49924 3.82307L8.89673 2.33923C9.40976 1.79452 10.0923 1.50063 10.7904 1.50063C11.4885 1.50063 12.171 1.79452 12.684 2.33923C13.1992 2.88545 13.4991 3.63911 13.5 4.43644C13.5009 5.23348 13.2032 5.98718 12.6896 6.5347L7.50044 12.0416L2.31364 6.53435C1.79895 5.98744 1.5 5.23359 1.5 4.43615C1.5 3.63866 1.79888 2.88487 2.31364 2.33795"
                  :fill="socialState.likes ? 'red' : 'white'"
                />
              </svg>
            </button>

            <button
              class="px-[10px] py-[4px] rounded-[26px] text-[14px] flex items-center gap-[4px] border active:scale-95 hover:scale-105"
              @click.stop.prevent="updateSocial('shares')"
            >
              <span>{{ data.data[0].shares }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.96715 16.0105L18.5003 8.00524L6.96715 0L6.96715 4.1976C2.92611 4.55715 0.5 7.2185 0.5 11.0782V18.0003C0.5 18.0003 0.732534 16.7863 1.5 15.4108C2.29779 13.981 3.67361 12.3766 5.96715 11.7799C6.2828 11.6978 6.61584 11.6348 6.96715 11.5939V16.0105ZM1.5 13.6116C2.60857 12.2107 4.31283 10.8959 6.85162 10.6006L7.96715 10.4709V14.0991L16.7466 8.00524L7.96715 1.91139L7.96715 5.11258L7.05577 5.19367C5.23757 5.35544 3.86565 6.0244 2.94972 7.00714C2.03501 7.98857 1.5 9.36314 1.5 11.0782V13.6116Z"
                  fill="white"
                />
              </svg>
            </button>

            <span
              class="px-[10px] py-[4px] rounded-[26px] text-[14px] flex items-center gap-[4px] border active:scale-95 hover:scale-105"
            >
              <span>{{ data.data[0].views }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="12"
                viewBox="0 0 21 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.500366 6C0.500366 6 4.97752 12 10.5004 12C16.0232 12 20.5004 6 20.5004 6C20.5004 6 16.0232 0 10.5004 0C4.97752 0 0.500366 6 0.500366 6ZM1.79256 6C1.86432 6.08296 1.94346 6.17288 2.02966 6.2687C2.51184 6.8047 3.20902 7.51854 4.06746 8.2301C5.81271 9.67673 8.08708 11 10.5004 11C12.9137 11 15.188 9.67673 16.9333 8.2301C17.7917 7.51854 18.4889 6.8047 18.9711 6.2687C19.0573 6.17288 19.1364 6.08296 19.2082 6C19.1364 5.91704 19.0573 5.82712 18.9711 5.7313C18.4889 5.1953 17.7917 4.48146 16.9333 3.7699C15.188 2.32327 12.9137 1 10.5004 1C8.08708 1 5.81271 2.32327 4.06746 3.7699C3.20902 4.48146 2.51184 5.1953 2.02966 5.7313C1.94346 5.82712 1.86432 5.91704 1.79256 6Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.10193 7.09956C7.38979 7.93544 7.98614 8.63792 8.77343 9.06802C9.56065 9.4981 10.4806 9.62413 11.3517 9.42263C12.2226 9.22117 12.982 8.70686 13.4807 7.98138C13.9795 7.25586 14.182 6.37077 14.0471 5.50016C13.9122 4.62941 13.4495 3.83671 12.7497 3.27898C12.05 2.72127 11.1649 2.43979 10.2697 2.48899C9.3746 2.53818 8.53414 2.9143 7.91336 3.54239L7.18836 2.85364C7.98658 2.04603 9.06623 1.56354 10.2138 1.50047C11.3612 1.43742 12.4932 1.79818 13.387 2.51059C14.2808 3.22299 14.8727 4.23612 15.0455 5.35086C15.2182 6.46574 14.9591 7.60172 14.318 8.53436C13.6769 9.46705 12.7009 10.1277 11.583 10.3862C10.4653 10.6448 9.28749 10.4826 8.28146 9.93295C7.27549 9.38338 6.51328 8.48582 6.14513 7.41679C5.77694 6.34766 5.82944 5.18387 6.29376 4.155L7.2172 4.55512C6.85577 5.35601 6.81411 6.26378 7.10193 7.09956Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useFetch } from 'nuxt/app';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const isShares = ref(false);

const socialState = useStorage(`socialState-${route.params.article}`, {
  views: false,
  likes: false,
});

const props = defineProps({
  contentHeight: {
    type: Number,
    default: 500,
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/articles/?filter[url][_eq]=${route.params.article}&fields=*.*`
);

const duration = computed(() => {
  if (props.contentHeight < 600) {
    return 'менее одной минуты';
  }
  let min = Math.ceil(props.contentHeight / 12 / 60);
  let max = Math.ceil(props.contentHeight / 10 / 60);
  const result =
    min === max ? `${min} - ${max + 1} минут` : `${min} - ${max} минут`;

  return result;
});

onMounted(async () => {
  if (!socialState.value.views && data.value?.data[0]) {
    const res = await $fetch(
      `${api}items/articles/${data.value?.data[0].slug}`,
      {
        method: 'PATCH',
        body: { views: ++data.value.data[0].views },
      }
    );

    socialState.value.views = true;
  }
});

async function updateShares() {
  await $fetch(`${api}items/articles/${data.value?.data[0].slug}`, {
    method: 'PATCH',
    body: { shares: ++data.value.data[0].shares },
  });
}

async function updateSocial(param: 'likes' | 'shares') {
  let newVal = 0;
  if (param === 'likes') {
    socialState.value[param] = !socialState.value[param];
    newVal = socialState.value[param]
      ? ++data.value.data[0][param]
      : --data.value.data[0][param];

    const res = await $fetch(
      `${api}items/articles/${data.value?.data[0].slug}`,
      {
        method: 'PATCH',
        body: { [param]: newVal },
      }
    );
  } else if (param === 'shares') {
    isShares.value = !isShares.value;
  }
}
</script>
