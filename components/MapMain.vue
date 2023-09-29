<template>
  <div>
    <div class="flex items-center gap-[150px] mb-[24px] px-[148px]">
      <div class="relative">
        <button
          class="flex items-center gap-[18px] border-b border-b-basic-black"
          @click="isDistrict = !isDistrict"
        >
          <span class="">
            {{ currentDistrict ? currentDistrict : 'Район' }}
          </span>
          <span v-if="!isDistrict" class="w-[18px] h-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
            >
              <path
                d="M1.19963 0.999998L8 10.1611L14.8004 0.999999L1.19963 0.999998Z"
                stroke="#141414"
              />
            </svg>
          </span>
          <span v-else class="w-[18px] h-[14px] rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
            >
              <path
                d="M1.19963 0.999998L8 10.1611L14.8004 0.999999L1.19963 0.999998Z"
                stroke="#141414"
              />
            </svg>
          </span>
        </button>

        <ul
          v-if="isDistrict"
          v-on-click-outside="() => (isDistrict = false)"
          class="absolute bg-white top-[100%] py-[10px] rounded-md max-h-[300px] overflow-y-auto"
        >
          <li v-for="item in data.data.districts" :key="item.id">
            <button
              class="px-[15px] hover:bg-slate-100 py-[3px] w-full text-left"
              @click="(currentDistrict = item.name), (isDistrict = false)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>

      <div>
        <button
          class="flex items-center gap-[18px] border-b border-b-basic-black"
        >
          <span class=""> Метро </span>
          <span class="w-[18px] h-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
            >
              <path
                d="M1.19963 0.999998L8 10.1611L14.8004 0.999999L1.19963 0.999998Z"
                stroke="#141414"
              />
            </svg>
          </span>
        </button>
      </div>

      <button
        v-if="!currentDistrict && !currentStation"
        class="py-[4px] px-[14px] rounded-[15px] border border-basic-black"
      >
        Сбросить фильтры
      </button>

      <button
        v-else
        class="py-[5px] px-[15px] rounded-[15px] border text-white bg-accent-orange"
        @click="(currentStation = ''), (currentDistrict = '')"
      >
        Сбросить фильтры
      </button>
    </div>

    <div class="w-full px-[32px] h-[540px] rounded-[60px] mb-[40px]">
      <img :src="`${api}assets/${img}`" alt="Карта" width="1376" height="540" />
    </div>

    <div
      class="w-full px-[148px] flex items-start gap-[83px] text-[12px] text-basic-black"
    >
      <div class="w-max-[383px] leading-[18px]">
        <h5 class="mb-[22px] font-[700]">Районы Санкт-Петербурга</h5>
        <ul class="flex flex-wrap">
          <li
            v-for="item in data.data.districts.filter((d) => !d.isSuburb)"
            :key="item.id"
            class="w-1/2"
          >
            <button
              v-if="item.name !== currentDistrict"
              class="hover:bg-slate-100 px-1 rounded-sm"
              @click="currentDistrict = item.name"
            >
              {{ item.name }}
            </button>
            <button
              v-else
              class="bg-slate-300 px-1 rounded-sm"
              @click="currentDistrict = ''"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>

      <div class="leading-[18px] grow">
        <h5 class="mb-[22px] font-[700]">
          Пригороды Санкт-Петербурга (Ленинградская область)
        </h5>
        <ul class="flex flex-wrap gap-x-[34px]">
          <li
            v-for="item in data.data.districts.filter((d) => d.isSuburb)"
            :key="item.id"
            class="w-1/2"
          >
            <button
              v-if="item.name !== currentDistrict"
              class="hover:bg-slate-100 px-1 rounded-sm"
              @click="currentDistrict = item.name"
            >
              {{ item.name }}
            </button>
            <button
              v-else
              class="bg-slate-300 px-1 rounded-sm"
              @click="currentDistrict = ''"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- <pre>
      {{ data }}
    </pre> -->
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { ref } from 'vue';
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const { data: appData } = useNuxtData('appData');

const props = defineProps({
  img: {
    type: String,
    default: '',
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = useFetch(
  `${api}items/cities/${appData.value.data.city.id}?fields=districts.name,districts.id,districts.isSuburb,districts.stations,districts.stations.name,districts.stations.id,districts.masters.masters_id.skill,districts.masters.masters_id.first_name,districts.masters.masters_id.last_name,districts.masters.masters_id.img`
);

const isDistrict = ref(false);
const currentDistrict = ref('');

const isStation = ref(false);
const currentStation = ref('');
</script>
