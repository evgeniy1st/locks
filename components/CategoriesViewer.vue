<template>
  <section class="pt-[100px] w-full px-[32px]">
    <div class="flex items-center gap-[15px] mb-[30px]">
      <GetTitle
        v-if="data?.data?.name"
        :title="data.data.name"
        :type="titleType"
        class="text-[30px] leading-[38px] grow-0 shrink-0"
      />
      <span class="grow h-[1px] bg-black shrink-0 w-1/2"></span>
    </div>

    <p v-if="data.data.description" class="my-[50] text-sm">
      {{ data.data.description }}
    </p>

    <nav>
      <ul class="w-full flex flex-wrap items-center gap-[20px]">
        <li
          v-for="service in data.data.services"
          :key="service.id"
          class="border px-[40px] py-[28px] border-basic-black rounded-[44px] duration-200 relative bg-light-blue hover:bg-main-blue"
          :class="
            service.categories && service.categories.length
              ? 'group hover:border-b-0 hover:rounded-b-none hover:z-10 hover:min-w-[450px]'
              : ''
          "
        >
          <SlugToPageUrl v-if="service.page" :slug="service.page">
            <span class="hover:underline text-deep-blue">
              {{ service.title + ' от ' + service.min_price + ' ₽' }}
            </span>
          </SlugToPageUrl>
          <span v-else>
            {{ service.title + ' от ' + service.min_price + ' ₽' }}
          </span>

          <div
            v-if="service.categories && service.categories.length"
            class="absolute bg-white p-[40px] pt-[10px] w-full left-0 border border-basic-black rounded-[44px] top-[100%] hidden group-hover:block group-hover:border-t-0 group-hover:rounded-t-none max-h-[400px] overflow-y-auto"
          >
            <ul>
              <li
                v-for="category in service.categories"
                :key="service.title + category.category"
                class="text-[16px]"
              >
                <p
                  v-if="category.category"
                  class="font-[700] mt-[20px] mb-[8px]"
                >
                  {{ category.category }}
                </p>

                <ul :class="category.category ? 'mb-[20px]' : 'my-[30px]'">
                  <li
                    v-for="item in category.list"
                    :key="category.category + item.title"
                  >
                    <SlugToPageUrl
                      v-if="item.page"
                      :slug="item.page"
                      class="w-full"
                    >
                      <span
                        class="hover:underline text-deep-blue flex w-full items-start gap-3 justify-between"
                      >
                        <span>{{ item.title }}</span>
                        <span class="whitespace-nowrap shrink-0">{{
                          ' от ' + item.price + ' ₽'
                        }}</span>
                      </span>
                    </SlugToPageUrl>
                    <span
                      v-else
                      class="flex w-full items-start gap-3 justify-between"
                    >
                      <span>{{ item.title }}</span>
                      <span class="whitespace-nowrap shrink-0">{{
                        ' от ' + item.price + ' ₽'
                      }}</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  categoryId: {
    type: [String, Number],
    default: '',
  },
  titleType: {
    type: String,
    default: 'span',
  },
});

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/services_categories/${props.categoryId}?fields=*.*`
);
</script>
