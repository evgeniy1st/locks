<template>
  <section class="pt-[130px] w-full">
    <h4 class="px-[148px] text-[44px] leading-[50px] mb-[100px]">
      {{ data.data.title }}
    </h4>

    <ul class="p-[32px] flex mx-auto items-start gap-[20px] justify-center">
      <li
        v-for="(master, i) in data.data.masters.slice(0, 4)"
        :key="i"
        class="flex flex-col gap-[30px]"
      >
        <div
          class="w-[329px] h-[220px] rounded-[60px] bg-[rgba(60,138,255,0.60)] blue-glass-shadow flex flex-col items-center gap-[30px]"
        >
          <img
            :src="`${api}assets/${master.masters_id.img}?format=auto&width=160&height=160&fit=cover`"
            alt="Фото сотрудника"
            width="160"
            height="160"
            class="rounded-full -mt-[80px]"
          />
          <div class="flex flex-col items-center text-white">
            <span class="text-[26px] font-[700] leading-[32px]">
              {{ master.masters_id.first_name }}
              {{ master.masters_id.last_name }}
            </span>
            <span class="text-[16px] font-[700] leading-[normal]">
              {{ master.masters_id.skill }}
            </span>
          </div>
        </div>
        <p
          v-if="data.data.with_description"
          class="w-[329px] text-[16px] leading-[normal]"
        >
          {{ master.masters_id.description }}
        </p>
      </li>
    </ul>
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

const { data: data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*,masters.id,masters.masters_id.first_name,masters.masters_id.last_name,masters.masters_id.skill,masters.masters_id.img,masters.masters_id.description`
);
</script>

<style scoped>
.blue-glass-shadow {
  box-shadow: 0px 16px 16px 0px #acc3ff;
  backdrop-filter: blur(10px);
}
</style>
