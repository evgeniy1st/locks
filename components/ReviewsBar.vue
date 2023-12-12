<template>
  <div class="flex items-center gap-[40px]">
    <div class="flex items-center gap-[20px] text-[26px]">
      <span class="flex items-center gap-1">
        <span class="text-orange-hover flex items-center">
          <Icon name="ic:sharp-star-purple500" size="36" />
        </span>
        <span>{{ Number(aggregate.data[0].avg.stars).toFixed(2) }}</span>
      </span>

      <span class="flex items-center gap-1">
        <span>{{ aggregate.data[0].count }}</span>
        <span>
          {{
            num_word(aggregate.data[0].count, ['оценка', 'оценки', 'оценок'])
          }}
        </span>
      </span>
    </div>

    <button
      class="rounded-[15px] text-[14px] px-[14px] py-[4px] border border-white hover:scale-105 duration-150 active:scale-95"
      @click="isForm = true"
    >
      Оставить отзыв
    </button>

    <div
      v-if="isForm"
      class="fixed w-screen h-screen bg-[#00000080] top-0 left-0 z-30 flex items-center justify-center"
    >
      <div ref="target" class="flex flex-col w-[600px]">
        <div
          v-if="!isSuccess"
          class="w-full h-[200px] bg-white text-basic-black text-[30px] rounded-[60px] flex items-center justify-center relative bg-cover bg-no-repeat bg-center"
          style="background-image: url('/mail-bg.png')"
        >
          <span class="w-[341px] text-center leading-[38px]">
            Спасибо, что делитесь своим мнением!
          </span>
          <button
            class="absolute top-[40px] right-[40px] hover:rotate-180 duration-200 hover:text-red-500 text-basic-black"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29ZM15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                fill="currentColor"
              />
              <path
                d="M21.435 8L22.1421 8.70711L8.70711 22.1421L8 21.435L21.435 8Z"
                fill="currentColor"
              />
              <path
                d="M22.435 21.435L21.7279 22.1421L8.29289 8.70711L9 8L22.435 21.435Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="!isSuccess"
          class="w-full p-[40px] bg-white rounded-[60px] text-basic-black text-[14px] flex flex-col gap-[22px]"
        >
          <ClientOnly>
            <div class="w-full flex justify-center">
              <star-rating
                v-model:rating="rating"
                :read-only="isLoading"
                :increment="0.5"
                :show-rating="false"
                :star-size="60"
              ></star-rating>
            </div>
          </ClientOnly>
          <textarea
            ref="textarea"
            v-model="input"
            :disabled="isLoading"
            class="resize-none border p-[16px] rounded-[25px] overflow-hidden w-full min-h-[100px]"
            placeholder="Ваш отзыв"
          />

          <div class="flex items-center gap-[22px] justify-between">
            <input
              v-model="name"
              :disabled="isLoading"
              type="text"
              class="border p-[16px] rounded-[25px] grow"
              placeholder="Имя"
            />
            <input
              v-model="phone"
              :disabled="isLoading"
              type="text"
              class="border p-[16px] rounded-[25px] grow"
              placeholder="Телефон"
            />
          </div>

          <div class="w-full flex justify-end">
            <button
              class="bg-accent-orange text-white rounded-[30px] w-[219px] h-[56px] text-[16px] font-[700] hover:scale-105 active:scale-95 duration-200 flex items-center justify-center disabled:opacity-70"
              :disabled="isLoading"
              @click="sendOrder"
            >
              <span v-if="!isLoading"> Отправить </span>
              <Icon v-else name="eos-icons:bubble-loading" size="20" />
            </button>
          </div>
          <div
            v-if="isError"
            class="w-full border flex justify-center px-[25px] py-[16px] border-red-500 rounded-md text-center text-[16px]"
          >
            Не удалось отправить отзыв. Проверьте введённые данные
          </div>
        </div>

        <div
          v-else
          class="w-full min-h-[356px] p-[40px] bg-basic-black rounded-[60px] text-white text-[14px] flex flex-col justify-center items-center gap-[22px] bg-center bg-no-repeat bg-cover relative"
          style="background-image: url('/fish.png')"
        >
          <button
            class="absolute top-[40px] right-[40px] hover:rotate-180 duration-200 hover:text-red-500 text-basic-black"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29ZM15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                fill="currentColor"
              />
              <path
                d="M21.435 8L22.1421 8.70711L8.70711 22.1421L8 21.435L21.435 8Z"
                fill="currentColor"
              />
              <path
                d="M22.435 21.435L21.7279 22.1421L8.29289 8.70711L9 8L22.435 21.435Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <p class="text-[44px] leading-[50px]">Готово</p>
          <p class="text-[30px] leading-[38px]">
            Мы получили ваш отзыв, спасибо!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from 'nuxt/app';
import { onClickOutside, useTextareaAutosize } from '@vueuse/core';
// @ts-ignore
import StarRating from 'vue-star-rating';

const runtimeConfig = useRuntimeConfig();

const { api } = runtimeConfig.public;
const isForm = ref(false);

const target = ref(null);

const { textarea, input } = useTextareaAutosize();
const rating = ref(5);
const name = ref('');
const phone = ref('');

const isSuccess = ref(false);
const isError = ref(false);
const isLoading = ref(false);

onClickOutside(target, () => (isForm.value = false));

const { data: aggregate }: any = await useFetch(
  `${api}items/reviews/?aggregate[count]=*&aggregate[avg]=stars`
);

function num_word(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

function close() {
  isForm.value = false;
  isError.value = false;
  isSuccess.value = false;
}

async function sendOrder() {
  isError.value = false;
  isLoading.value = true;
  try {
    const res: any = await $fetch(`${api}items/reviews_for_approval`, {
      method: 'POST',
      body: {
        name: name.value ? name.value : null,
        phone: phone.value ? phone.value : null,
        stars: rating.value ? rating.value : null,
        text: input.value ? input.value : null,
      },
    });

    if (res?.data?.id) {
      isSuccess.value = true;
      phone.value = '';
      name.value = '';
      input.value = '';
      rating.value = 5;
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
