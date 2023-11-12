<template>
  <div>
    <div class="flex items-center gap-[150px] mb-[24px] px-[148px]">
      <div class="relative">
        <button
          class="flex items-center gap-[18px] border-b border-b-basic-black min-w-[190px] justify-between"
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
          class="absolute bg-white top-[100%] py-[10px] rounded-md max-h-[300px] overflow-y-auto z-10"
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

      <div class="relative">
        <button
          class="flex items-center gap-[18px] border-b border-b-basic-black disabled:opacity-60 min-w-[190px] justify-between"
          :disabled="stationsList.length === 0"
          @click="isStation = !isStation"
        >
          <span class="">
            {{ currentStation ? currentStation : 'Метро' }}
          </span>
          <span v-if="!isStation" class="w-[18px] h-[14px]">
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
          v-if="isStation"
          v-on-click-outside="() => (isStation = false)"
          class="absolute bg-white top-[100%] py-[10px] rounded-md max-h-[300px] overflow-y-auto z-10"
        >
          <li v-for="item in stationsList" :key="item.id">
            <button
              class="px-[15px] hover:bg-slate-100 py-[3px] w-full text-left"
              @click="(currentStation = item.name), (isStation = false)"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
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

    <div
      class="w-[1376px] px-[32px] h-[540px] rounded-[60px] mb-[40px] relative p-[30px] flex items-center justify-end mx-auto overflow-hidden"
    >
      <img
        :src="`${api}assets/${img}?format=auto`"
        alt="Карта"
        width="1376"
        height="540"
        class="absolute top-0 left-0 mx-auto"
      />

      <Transition name="slide">
        <MapMastersList
          v-if="currentDistrict"
          :current-station="currentStation"
          :current-district="currentDistrict"
        />
      </Transition>
    </div>

    <div
      class="w-full px-[148px] flex items-start gap-[83px] text-[12px] text-basic-black"
    >
      <div class="w-max-[383px] leading-[18px]">
        <h5 class="mb-[22px] font-[700]">Районы Санкт-Петербурга</h5>
        <ul class="flex flex-wrap">
          <!-- @vue-ignore -->
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
          <!-- @vue-ignore -->
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
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { ref, computed, watch } from 'vue';
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

const { data: data }: any = await useFetch(
  `${api}items/cities/${appData.value.data.city.id}?fields=districts.name,districts.id,districts.isSuburb,districts.stations,districts.stations.name,districts.stations.id`
);

const isDistrict = ref(false);
const currentDistrict = ref('');

const isStation = ref(false);
const currentStation = ref('');

const stationsList = computed(() => {
  let district = data.value.data.districts.find(
    // @ts-ignore
    (d) => currentDistrict.value === d.name
  );
  if (!district) {
    return [];
  }
  return district.stations;
});

watch(currentDistrict, () => {
  currentStation.value = '';
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-1000px);
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
