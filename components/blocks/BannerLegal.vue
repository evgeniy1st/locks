<template>
  <section
    class="pt-[130px] w-full px-[148px] flex items-start gap-[21px] text-basic-black text-[16px] leading-[normal]"
  >
    <div>
      <GetTitle
        v-if="data?.data?.title"
        :title="data.data.title"
        :type="data.data?.title_type ? data.data.title_type : 'span'"
        class="text-[44px] leading-[50px] pb-[70px]"
      />
      <div class="flex flex-col gap-[30px]">
        <GetTitle
          v-if="data?.data?.subtitle"
          :title="data.data.subtitle"
          :type="data.data?.subtitle_type ? data.data.subtitle_type : 'span'"
          class="text-[30px] leading-[38px]"
        />
        <p>
          {{ data.data.start_text }}
        </p>
        <ul class="flex flex-col gap-[10px]">
          <li
            v-for="(item, i) in data.data.list"
            :key="i"
            class="flex items-start gap-[20px] grow-0"
          >
            <span
              class="w-[78px] h-[8px] overflow-hidden flex items-end justify-center shrink-0 mt-[7px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="8"
                viewBox="0 0 78 8"
                fill="none"
              >
                <path
                  d="M77.3536 4.35355C77.5488 4.15829 77.5488 3.84171 77.3536 3.64645L74.1716 0.464466C73.9763 0.269204 73.6597 0.269204 73.4645 0.464466C73.2692 0.659728 73.2692 0.976311 73.4645 1.17157L76.2929 4L73.4645 6.82843C73.2692 7.02369 73.2692 7.34027 73.4645 7.53553C73.6597 7.7308 73.9763 7.7308 74.1716 7.53553L77.3536 4.35355ZM0 4.5H77V3.5H0V4.5Z"
                  fill="black"
                />
              </svg>
            </span>
            <span class="">
              {{ item.description }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <img
        :src="`${api}assets/${data.data.image}?format=auto&width=484&height=346`"
        alt="Фуражка"
        width="484"
        height="346"
        class="mx-auto mb-[82px]"
      />
      <p>
        {{ data.data.end_text }}
      </p>
    </div>
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

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
);
</script>
