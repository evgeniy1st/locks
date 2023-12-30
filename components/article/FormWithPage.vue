<template>
  <div
    v-if="data && 'data' in data"
    class="my-[70px] flex gap-[30px] items-stretch"
  >
    <NestedLink
      :item="{
        root_page: data.data.page?.root_page?.url,
        display_name: data.data.page.display_name,
        slug: data.data.page.url,
      }"
      class="flex flex-col w-[445px] shrink-0"
    >
      <span
        class="text-[20px] flex justify-center py-[28px] px-3 border border-black rounded-[60px] bg-light-blue"
        >{{ data.data.page.display_name }}</span
      >
      <img
        :src="`${api}assets/${data.data.page.preview_image}?format=auto&fit=cover&width=445&height=180`"
        :alt="data.data.page.display_name"
        width="445"
        height="180"
        class="rounded-[60px]"
      />
    </NestedLink>
    <div class="flex flex-col justify-between">
      <span class="text-[30px] leading-[38px]">{{ data.data.form_title }}</span>
      <div class="flex flex-col gap-[10px] w-full items-center">
        <input
          v-model="phone"
          type="text"
          class="border rounded-[30px] w-full h-[50px] px-[14px]"
          placeholder="+7 (___) ___-__-__"
          :class="isError ? 'border-red-600' : 'border-basic-black'"
          :disabled="isLoading"
          @keydown.enter="sendOrder"
          @change="isError = false"
        />
        <span v-if="isError" class="text-sm text-red-600">
          Не удалось отправить. Проверьте введённое значение
        </span>
        <span v-else-if="isSuccess" class="text-sm text-green-600">
          Ваша заявка успешно отправлена
        </span>
        <button
          class="bg-accent-orange rounded-[30px] w-full h-[50px] text-center text-white text-[16px] font-[700] disabled:opacity-60"
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
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const phone = ref('');

const isSuccess = ref(false);
const isError = ref(false);
const isLoading = ref(false);

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { api, site } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*,page.root_page.url`
);

async function sendOrder() {
  isError.value = false;
  isLoading.value = true;
  isSuccess.value = false;
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
