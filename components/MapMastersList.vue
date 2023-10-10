<template>
  <div
    class="w-[280px] h-[480px] bg-[rgba(255,255,255,0.50)] rounded-[40px] relative z-10 glass overflow-y-auto p-[30px]"
  >
    <ul v-if="masters.length" ref="list" class="flex flex-col gap-[22px]">
      <li
        v-for="master in masters"
        :key="master.id"
        class="flex gap-[13px] items-center"
      >
        <img
          :src="`${api}assets/${master.img}?format=auto&width=42&height=42`"
          alt="Фото мастера"
          width="42"
          height="42"
          class="grow-0 shrink-0 rounded-full"
        />
        <div class="flex flex-col gap-[2px] leading-[18px]">
          <span class="text-[14px]"
            >{{ master.first_name }} {{ master.last_name }}</span
          >
          <span class="text-[12px]">{{ master.skill }}</span>
        </div>
      </li>
    </ul>
    <div v-else>
      Извините, в этом месте у нас пока никого нет. Но мастер может приехать из
      соседнего района
    </div>
  </div>
</template>

<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate';
import { computed, onMounted, ref } from 'vue';
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const { data: appData } = useNuxtData('appData');

const props = defineProps({
  currentDistrict: {
    type: String,
    default: '',
  },
  currentStation: {
    type: String,
    default: '',
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/masters?filter[city][_eq]=${appData.value.data.city.id}&filter[status][_eq]=active&fields=id,first_name,last_name,img,skill,districts.districts_id.name,stations.stations_id.name`
);

const list = ref();

const masters = computed(() => {
  console.log(data);
  const all =
    data && 'value' in data && data.value && 'data' in data.value
      ? data.value.data
      : [];
  const filteredByDistricts = all.filter((m: any) => {
    return m.districts.some(
      (i: any) => i.districts_id.name === props.currentDistrict
    );
  });

  if (props.currentStation) {
    return filteredByDistricts.filter((m: any) => {
      return m.stations.some(
        (i: any) => i.stations_id.name === props.currentStation
      );
    });
  }

  return filteredByDistricts;
});

onMounted(() => {
  if (masters.value.length) {
    autoAnimate(list.value);
  }
});
</script>

<style scoped>
.glass {
  box-shadow: 0px 16px 26px 0px #bdc6dc;
  backdrop-filter: blur(10px);
}
</style>
