<template>
  <section
    class="w-full mx-auto pt-[160px] px-[32px] pb-[30px] flex items-stretch"
    @click="isSuccess = false"
  >
    <div ref="imgWrap" class="grow-0 shrink-0 rounded-[60px]">
      <img
        v-if="!isSuccess"
        :src="`${api}assets/${data.data.image}?format=auto&width=635&height=396&fit=cover`"
        alt="Фото мастера"
        width="635"
        height="396"
        class="grow-0 shrink-0 rounded-[60px]"
      />
      <img
        v-else
        :src="`${api}assets/${data.data.success_image}?format=auto&width=635&height=396&fit=cover`"
        alt="Фото успешной отправки"
        width="635"
        height="396"
        class="grow-0 shrink-0 rounded-[60px]"
      />
    </div>
    <div
      ref="formWrap"
      class="bg-light-yellow grow rounded-[60px] pt-[50px] pb-[60px] px-[60px] text-basic-black"
    >
      <div v-if="!isSuccess" class="flex flex-col gap-[30px]">
        <h4 class="text-[44px] leading-[50px]">
          {{ data.data.title }}
        </h4>
        <p class="text-[30px] leading-[38px]">
          {{ data.data.description }}
        </p>
        <div class="flex items-start gap-[22px]">
          <div ref="form" class="grow flex flex-col">
            <input
              v-model="phone"
              type="text"
              class="rounded-full px-[18px] py-[15px] border text-[16px] bg-transparent disabled:opacity-60"
              :class="isError ? 'border-red-600' : 'border-basic-black'"
              :disabled="isLoading"
              @keydown.enter="sendOrder"
              @change="isError = false"
            />
            <span v-if="isError" class="text-sm text-red-600">
              Не удалось отправить. Проверьте введённое значение
            </span>
          </div>
          <button
            class="shrink-0 text-[16px] px-[26px] py-[16px] bg-accent-orange text-white font-[700] rounded-full disabled:opacity-80 min-w-[167px] min-h-[56px] flex items-center justify-center"
            :disabled="isLoading"
            @click="sendOrder"
          >
            <span v-if="!isLoading">
              {{ data.data.button_text }}
            </span>
            <Icon v-else name="eos-icons:bubble-loading" size="20" />
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col gap-[30px] justify-center">
        <h4 class="text-[44px] leading-[50px]">
          {{ data.data.success_title }}
        </h4>
        <p class="text-[30px] leading-[38px]">
          {{ data.data.success_text }}
        </p>
        <span class="text-sm text-gray-500">
          Для возврата к форме кликните внутри этого блока
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import autoAnimate from '@formkit/auto-animate';
import { ref, onMounted } from 'vue';
import { useFetch } from 'nuxt/app';

const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api, site } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);

const phone = ref('');

const isSuccess = ref(false);
const isError = ref(false);
const isLoading = ref(false);

const form = ref();
const imgWrap = ref();
const formWrap = ref();

onMounted(() => {
  autoAnimate(form.value);
  autoAnimate(imgWrap.value);
  autoAnimate(formWrap.value);
});

async function sendOrder() {
  isError.value = false;
  isLoading.value = true;
  try {
    const res: any = await $fetch(`${api}items/orders`, {
      method: 'POST',
      body: { phone: phone.value.trim(), site: site },
    });

    if (res?.data?.id) {
      isSuccess.value = true;
      phone.value = '';
    }
    console.log(res);
  } catch (err) {
    console.log(err);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
}
</script>
