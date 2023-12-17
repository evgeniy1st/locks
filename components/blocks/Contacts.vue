<template>
  <section
    v-if="data && 'data' in data"
    class="px-[148px] pt-[70px] flex items-start justify-between w-full gap-[90px]"
  >
    <div class="flex items-start gap-[40px]">
      <div class="w-[214px]">
        <p class="text-[16px] mb-[10px]">{{ data.data.start_text }}</p>
        <a
          v-if="data.data.enabled_contacts.includes('phone')"
          :href="`tel:${appData.data.phone}`"
          class="text-[24px] leading-[32px] hover:text-deep-blue hover:underline inline-block mb-[10px]"
        >
          {{ phone }}
        </a>
        <br />
        <a
          v-if="data.data.enabled_contacts.includes('email')"
          :href="`mailto:${appData.data.email}`"
          class="text-[15px] leading-[normal] hover:text-deep-blue hover:underline inline-block mb-[20px]"
        >
          {{ appData.data.email }}
        </a>

        <div class="flex items-center gap-[18px]">
          <a
            v-if="data.data.enabled_contacts.includes('whatsapp')"
            :href="`https://wa.me/${appData.data.whatsapp}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <g clip-path="url(#clip0_709_2117)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.6411 4.35825C22.8602 1.55902 19.0746 -0.0104684 15.129 5.25555e-05C6.93705 5.25555e-05 0.270071 6.66632 0.267221 14.8604C0.263723 17.4682 0.948014 20.0309 2.25106 22.2899L0.142519 29.9915L8.0209 27.925C10.1997 29.1122 12.6414 29.7342 15.1226 29.7342H15.129C23.3195 29.7342 29.9871 23.0672 29.99 14.8732C30.0028 10.9281 28.4367 7.14184 25.6411 4.35825ZM15.129 27.221H15.124C12.9118 27.222 10.7399 26.6281 8.8361 25.5015L8.38504 25.2342L3.71045 26.4606L4.95891 21.9L4.66461 21.4326C3.42914 19.4636 2.77549 17.1855 2.7791 14.8611C2.7791 8.05231 8.32019 2.50979 15.134 2.50979C18.4105 2.51167 21.5521 3.81509 23.8676 6.13327C26.1831 8.45146 27.4829 11.5945 27.481 14.8711C27.4781 21.682 21.937 27.221 15.129 27.221ZM21.9042 17.9694C21.533 17.7834 19.7074 16.8856 19.3667 16.758C19.0261 16.6305 18.7789 16.572 18.5316 16.944C18.2844 17.316 17.5725 18.1519 17.3559 18.3999C17.1392 18.6477 16.9226 18.6784 16.5513 18.4925C16.18 18.3065 14.9836 17.9145 13.5649 16.6497C12.4611 15.6649 11.7121 14.4492 11.4983 14.0772C11.2846 13.7052 11.4755 13.5071 11.6615 13.319C11.8283 13.153 12.0328 12.8857 12.2181 12.6685C12.4033 12.4511 12.466 12.2972 12.5893 12.0492C12.7126 11.8012 12.6513 11.5846 12.5586 11.3986C12.466 11.2126 11.7228 9.38485 11.4135 8.64162C11.1121 7.91762 10.8064 8.01525 10.5784 8.00029C10.3646 7.9896 10.1138 7.98746 9.8658 7.98746C9.48528 7.99741 9.12621 8.16584 8.8753 8.45207C8.53539 8.82404 7.57625 9.7219 7.57625 11.5497C7.57625 13.3775 8.90665 15.1432 9.09193 15.3912C9.2772 15.6392 11.7107 19.3896 15.434 20.9986C16.1255 21.2969 16.8321 21.5585 17.5511 21.7825C18.4404 22.0675 19.2499 22.0255 19.8898 21.93C20.6024 21.8231 22.0867 21.0314 22.3966 20.1641C22.7066 19.297 22.706 18.553 22.6105 18.3984C22.515 18.2437 22.2755 18.1582 21.9042 17.9722V17.9694Z"
                  fill="#141414"
                />
              </g>
              <defs>
                <clipPath id="clip0_709_2117">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            v-if="data.data.enabled_contacts.includes('telegram')"
            :href="`https://t.me/${appData.data.telegram.replace('@', '')}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <g clip-path="url(#clip0_709_2121)">
                <path
                  d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                  fill="#141414"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.78985 14.8417C11.1627 12.9365 14.0785 11.6805 15.5375 11.0737C19.7032 9.34105 20.5688 9.04007 21.1329 9.03014C21.257 9.02795 21.5345 9.0587 21.7142 9.20453C21.8659 9.32767 21.9077 9.494 21.9277 9.61075C21.9477 9.72749 21.9725 9.99344 21.9528 10.2012C21.727 12.5731 20.7503 18.329 20.2533 20.9855C20.0431 22.1096 19.629 22.4865 19.2282 22.5233C18.3571 22.6035 17.6957 21.9477 16.852 21.3946C15.5318 20.5292 14.786 19.9905 13.5045 19.146C12.0235 18.1701 12.9836 17.6337 13.8276 16.7571C14.0485 16.5277 17.8865 13.0367 17.9607 12.72C17.97 12.6804 17.9787 12.5328 17.8909 12.4548C17.8032 12.3769 17.6738 12.4035 17.5804 12.4247C17.448 12.4548 15.3389 13.8488 11.2533 16.6067C10.6546 17.0178 10.1124 17.2181 9.6266 17.2076C9.09102 17.196 8.06078 16.9048 7.29491 16.6558C6.35553 16.3504 5.60893 16.189 5.67395 15.6704C5.70781 15.4003 6.07978 15.1241 6.78985 14.8417Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_709_2121">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            v-if="data.data.enabled_contacts.includes('vk')"
            :href="`https://vk.com/${appData.data.vk}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <g clip-path="url(#clip0_709_2119)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.10883 2.10883C0 4.21767 0 7.61178 0 14.4V15.6C0 22.3882 0 25.7823 2.10883 27.8912C4.21767 30 7.61178 30 14.4 30H15.6C22.3882 30 25.7823 30 27.8912 27.8912C30 25.7823 30 22.3882 30 15.6V14.4C30 7.61178 30 4.21767 27.8912 2.10883C25.7823 0 22.3882 0 15.6 0H14.4C7.61178 0 4.21767 0 2.10883 2.10883ZM5.06256 9.12507C5.22504 16.9251 9.12501 21.6125 15.9625 21.6125H16.3501V17.15C18.8626 17.4 20.7625 19.2376 21.5249 21.6125H25.0751C24.1001 18.0626 21.5374 16.1 19.9374 15.35C21.5374 14.4251 23.7875 12.1751 24.3249 9.12507H21.0998C20.3999 11.6001 18.3251 13.85 16.3501 14.0625V9.12507H13.125V17.775C11.125 17.2751 8.60004 14.8501 8.48754 9.12507H5.06256Z"
                  fill="#141414"
                />
              </g>
              <defs>
                <clipPath id="clip0_709_2119">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>

      <div
        v-if="data.data.enabled_contacts.includes('address')"
        class="w-[239px]"
      >
        <p class="w-full text-[16px]">
          {{ data.data.address_text }}
        </p>
        <div v-html="appData.data.address"></div>
      </div>
    </div>

    <div class="flex flex-col gap-[20px]">
      <p class="text-[26px] leading-[32px]">{{ data.data.form_text }}</p>
      <div class="flex gap-[19px]">
        <input
          v-model="nameInput"
          class="p-[16px] rounded-[25px] border border-basic-black grow"
          type="text"
          placeholder="Имя"
        />
        <input
          v-model="phoneInput"
          class="p-[16px] rounded-[25px] border border-basic-black grow"
          type="text"
          placeholder="Телефон"
        />
      </div>
      <div class="w-full flex">
        <button
          class="ml-auto text-white px-[26px] py-[16px] rounded-[25px] text-[16px] font-[700] hover:scale-105 active:scale-95"
          :class="isSuccess ? 'bg-green-500' : 'bg-accent-orange'"
          :disabled="isLoading"
          @click="sendOrder"
        >
          <span v-if="!isLoading">
            <span v-if="!isSuccess">
              {{ data.data.button_text }}
            </span>
            <span v-else class="flex items-center gap-2">
              <Icon name="mdi:check-circle" size="20" />
              <span>Отправлено</span>
            </span>
          </span>
          <Icon v-else name="eos-icons:bubble-loading" size="20" />
        </button>
      </div>
      <div
        v-if="isError"
        class="w-full border border-red-500 rounded-md px-3 py-2 flex"
      >
        <span> Не удалось отправить, проверьте введенные данные </span>
        <button class="ml-auto" @click="isError = false">
          <Icon name="mdi:close-circle" size="20" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const isSuccess = ref(false);
const isError = ref(false);
const isLoading = ref(false);

const phoneInput = ref('');
const nameInput = ref('');

const { api, site } = runtimeConfig.public;
const { data: appData } = useNuxtData('appData');

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*`
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

async function sendOrder() {
  isError.value = false;
  isLoading.value = true;
  isSuccess.value = false;
  try {
    const res: any = await $fetch(`${api}items/orders`, {
      method: 'POST',
      body: {
        phone: phoneInput.value.trim(),
        name: nameInput.value.trim(),
        site: site,
      },
    });

    if (res?.data?.id) {
      isSuccess.value = true;
      phoneInput.value = '';
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
