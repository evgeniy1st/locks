<template>
  <header class="pt-[17px] px-[30px] pb-[23px] w-full flex flex-col">
    <div class="w-full justify-between items-center flex">
      <RouterLink class="flex gap-[10px] items-center" to="/">
        <img
          :src="
            api + 'assets/' + data.data.logo + '?format=auto&height=29&width=29'
          "
          alt="Logo"
          class="grow-0 shrink-0"
          width="29"
          height="29"
        />
        <span class="text-basic-black text-[26px] grow-0 shrink-0">
          {{ data.data.title }}
        </span>
      </RouterLink>

      <div class="flex flex-col gap-[8px] items-end">
        <a
          :href="`tel:${appData.data.phone}`"
          class="text-basic-black flex gap-[10px] items-center hover:underline hover:text-blue-800"
        >
          <span class="h-[23px] w-[23px] shrink-0 grow-0">
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9994 16.2225V19.3839C22.0005 19.6774 21.9403 19.9679 21.8225 20.2368C21.7047 20.5057 21.5319 20.747 21.3152 20.9454C21.0985 21.1438 20.8427 21.2949 20.5642 21.3889C20.2856 21.4829 19.9904 21.5179 19.6975 21.4914C16.4484 21.1391 13.3275 20.0311 10.5853 18.2563C8.03418 16.6384 5.87123 14.4798 4.2501 11.9336C2.46565 9.18454 1.35515 6.05458 1.00857 2.79735C0.982184 2.50594 1.01689 2.21225 1.11046 1.93496C1.20404 1.65767 1.35444 1.40287 1.5521 1.18677C1.74975 0.970672 1.99033 0.798016 2.2585 0.679795C2.52668 0.561574 2.81659 0.500378 3.10976 0.500102H6.27738C6.78981 0.495069 7.28658 0.676167 7.67511 1.00964C8.06364 1.34311 8.31741 1.80621 8.38913 2.31261C8.52283 3.32431 8.77078 4.31767 9.12824 5.27374C9.2703 5.65091 9.30105 6.06082 9.21684 6.4549C9.13263 6.84898 8.93699 7.21071 8.6531 7.49722L7.31214 8.83552C8.81524 11.4737 11.004 13.6581 13.6474 15.1582L14.9883 13.8199C15.2754 13.5366 15.6379 13.3413 16.0327 13.2573C16.4276 13.1732 16.8383 13.2039 17.2162 13.3457C18.1742 13.7025 19.1695 13.9499 20.1832 14.0834C20.6962 14.1556 21.1646 14.4134 21.4994 14.8078C21.8343 15.2022 22.0122 15.7057 21.9994 16.2225Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="text-[26px] grow-0 shrink-0">
            {{ phone }}
          </span>
        </a>
      </div>
    </div>

    <div class="flex">
      <div v-if="'data' in data">
        <ChildBlockView
          v-for="childBlock in data.data.blocks"
          :key="childBlock.id"
          :block="childBlock"
        />
      </div>
      <span class="ml-auto">
        {{ appData.data.city.name }}
      </span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useFetch } from 'nuxt/app';

const runtimeConfig = useRuntimeConfig();
const { data: appData } = useNuxtData('appData');

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api } = runtimeConfig.public;

const { data }: any = useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);

const phone = computed(() => {
  const raw = appData.value?.data.phone;
  if (!raw) {
    return '';
  }

  const isWithPlus = raw[0] === '+' ? true : false;
  const internationalCode = isWithPlus ? raw.slice(0, 2) : raw.slice(0, 1);
  const providerCode = isWithPlus ? raw.slice(2, 5) : raw.slice(1, 4);
  const phoneFirstPart = isWithPlus ? raw.slice(5, 8) : raw.slice(4, 7);
  const phoneSecondPart = isWithPlus ? raw.slice(8, 10) : raw.slice(7, 9);
  const phoneThirdPart = isWithPlus ? raw.slice(10) : raw.slice(9);

  return `${internationalCode} (${providerCode}) ${phoneFirstPart}-${phoneSecondPart}-${phoneThirdPart}`;
});
</script>
