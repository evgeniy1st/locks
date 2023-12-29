<template>
  <div
    class="my-[50px] text-[30px] leading-[38px] flex flex-col items-start pl-[140px] pt-[100px] relative"
  >
    <img
      :src="`${api}assets/640b0b04-b9e3-4a08-bddc-07562288e81a`"
      alt="quote"
      width="179"
      height="185"
      class="absolute top-0 left-0 z-0"
    />
    <blockquote class="mb-[30px] relative z-10">
      {{ data.text }}
    </blockquote>

    <div
      class="flex items-center gap-x-[10px] text-[14px] leading-[14px] ml-auto"
    >
      <span class="w-[239px]">
        <span class="font-[700]">
          {{ data.caption }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { api } = runtimeConfig.public;

defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
