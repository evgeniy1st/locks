<template>
  <div class="relative">
    <button
      class="w-[162px] py-[6px] px-[14px] border border-basic-black rounded-[20px] flex justify-between items-center"
      @click.stop.prevent="isOpen = !isOpen"
    >
      <span
        class="text-[12px] font-[700] text-basic-black flex items-center gap-[5px]"
      >
        <span>{{ item.title + ' ' }}</span>
        <span class="text-deep-blue">{{ item.price }}</span>
      </span>
      <span class="h-[15px] w-[15px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
        >
          <circle cx="7.5" cy="8" r="7" stroke="#141414" />
          <path
            d="M8.39506 5.7397V12.193H6.61111V5.7397H8.39506ZM6.5 4.05779C6.5 3.80729 6.59053 3.60053 6.7716 3.43751C6.95267 3.27449 7.19547 3.19298 7.5 3.19298C7.80041 3.19298 8.04115 3.27449 8.22222 3.43751C8.40741 3.60053 8.5 3.80729 8.5 4.05779C8.5 4.30829 8.40741 4.51505 8.22222 4.67807C8.04115 4.84109 7.80041 4.9226 7.5 4.9226C7.19547 4.9226 6.95267 4.84109 6.7716 4.67807C6.59053 4.51505 6.5 4.30829 6.5 4.05779Z"
            fill="black"
          />
        </svg>
      </span>
    </button>

    <div
      v-if="isOpen"
      v-on-click-outside="() => (isOpen = false)"
      class="absolute rounded-[60px] py-[40px] px-[30px] bg-light-blue z-[55] w-[288px] flex flex-col gap-[10px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
      >
        <circle cx="7.5" cy="8" r="7" stroke="#141414" />
        <path
          d="M8.39506 5.7397V12.193H6.61111V5.7397H8.39506ZM6.5 4.05779C6.5 3.80729 6.59053 3.60053 6.7716 3.43751C6.95267 3.27449 7.19547 3.19298 7.5 3.19298C7.80041 3.19298 8.04115 3.27449 8.22222 3.43751C8.40741 3.60053 8.5 3.80729 8.5 4.05779C8.5 4.30829 8.40741 4.51505 8.22222 4.67807C8.04115 4.84109 7.80041 4.9226 7.5 4.9226C7.19547 4.9226 6.95267 4.84109 6.7716 4.67807C6.59053 4.51505 6.5 4.30829 6.5 4.05779Z"
          fill="black"
        />
      </svg>
      <p>{{ item.tooltip }}</p>

      <button
        class="absolute -top-[12px] -right-[12px] duration-150 hover:rotate-90 hover:text-red-500 text-basic-black"
        @click.stop="isOpen = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30 58C45.464 58 58 45.464 58 30C58 14.536 45.464 2 30 2C14.536 2 2 14.536 2 30C2 45.464 14.536 58 30 58ZM30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
            fill="currentColor"
          />
          <path
            d="M42.8701 16L44.2843 17.4142L17.4142 44.2843L16 42.8701L42.8701 16Z"
            fill="currentColor"
          />
          <path
            d="M44.8701 42.8701L43.4558 44.2843L16.5858 17.4142L18 16L44.8701 42.8701Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { ref } from 'vue';

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const isOpen = ref(false);
</script>
