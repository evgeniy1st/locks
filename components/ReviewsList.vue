<template>
  <ul
    v-if="data && 'data' in data"
    class="flex flex-wrap gap-x-[20px] gap-y-[70px]"
  >
    <li v-for="review in data.data" :key="review.id">
      <ReviewItem :review="review" />
    </li>
  </ul>
  <div
    v-if="data.data.length < data.meta.total_count"
    class="w-full flex justify-center mt-[70px]"
  >
    <button
      :disabled="isLoading"
      class="px-[25px] py-[15px] rounded-[25px] border border-basic-black text-[16px] hover:scale-105 active:scale-95 duration-200 flex items-center justify-center"
      @click="increaseOffset"
    >
      <span v-if="!isLoading">
        {{ buttonText }}
      </span>
      <Icon v-else name="eos-icons:bubble-loading" size="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFetch } from 'nuxt/app';
import { useRoute } from '#vue-router';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
  buttonText: {
    type: String,
    default: '',
  },
});

const offset = ref(0);
const isLoading = ref(false);

const { api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/reviews?fields=id,comment_by_master,stars,text,object.master.first_name,object.master.last_name,object.master.skill,object.master.img,object.client.first_name,object.client.last_name,object.client.img,object.services.services_id.title&limit=${
    props.count
  }&offset=${route.query.offset ? route.query.offset : 0}&meta=*`
);

async function increaseOffset() {
  route.query.offset = data.value.data.length;
  isLoading.value = true;
  try {
    const res: any = await $fetch(
      `${api}items/reviews?fields=id,comment_by_master,stars,text,object.master.first_name,object.master.last_name,object.master.skill,object.master.img,object.client.first_name,object.client.last_name,object.client.img,object.services.services_id.title&limit=${
        props.count
      }&offset=${route.query.offset ? route.query.offset : 0}`
    );

    if (res?.data?.length) {
      res.data.forEach((item: any) => data.value.data.push(item));
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
</script>
