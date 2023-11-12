<template>
  <nav class="sticky top-[82px] bg-white z-10">
    <h3 class="text-[16px] font-bold mb-[50px]">Содержание</h3>
    <ul v-if="navList && navList.length">
      <li
        v-for="link in navList"
        :key="link.id"
        :style="{
          'margin-left': `${link.offsetLeft}px`,
          'margin-bottom': `${link.offsetY}px`,
          'margin-top': `${link.offsetY}px`,
        }"
      >
        <a
          :href="`#${slugify(link.title)}`"
          :class="
            yScroll + 200 >= link.start && yScroll + 200 < link.end
              ? 'marked'
              : ' opacity-50'
          "
          @click.prevent.stop="goTo(link.start, slugify(link.title))"
        >
          {{ link.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import { slugify } from 'transliteration';
import { useRoute } from 'nuxt/app';
import { computed, ref, onMounted } from 'vue';

const route = useRoute();

const props = defineProps({
  content: {
    type: Array,
    default: () => [],
  },
  yScroll: {
    type: Number,
    default: 0,
  },
});

const isMounted = ref(false);

const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data: data }: any = await useFetch(
  `${api}items/article_title?fields=*.*&filter[id][_in]=${props.content.join(
    ','
  )}`
);

const navList = computed(() => {
  if (!data?.value?.data) {
    return [];
  }

  if (!isMounted.value) {
    return data.value.data;
  }

  const typesList = data.value.data.map((el: any) => {
    return Number(el.type.replace('h', ''));
  });

  const min = Math.min(...typesList);

  data.value.data.forEach((item: any, i: number, arr: any[]) => {
    item.offsetLeft = (Number(item.type.replace('h', '')) - min) * 20;
    item.offsetY = Number(item.type.replace('h', '')) === min ? 10 : 0;
    const target = document.getElementById(slugify(item.title));

    if (target) {
      item.start = target.getBoundingClientRect().top;
      if (arr[i + 1]) {
        const next = document.getElementById(slugify(arr[i + 1].title));
        if (next) {
          item.end = next.getBoundingClientRect().top - 1;
        } else {
          item.end = item.start + 2000;
        }
      } else {
        item.end = item.start + 2000;
      }
    }
  });
  return data.value.data;
});

onMounted(() => {
  isMounted.value = true;
});

function goTo(position: number, id: string) {
  window.scrollTo({
    top: position - 200,
    behavior: 'smooth',
  });
  history.pushState({}, '', route.path + '#' + id);
}
</script>

<style scoped>
.marked {
  color: inherit !important;
  position: relative;
  display: inline;
  box-decoration-break: slice;
  -webkit-box-decoration-break: slice;
  background-color: none;
  background: linear-gradient(90deg, #a2d0f9 50%, #a2d0f9 50%);
  background-size: 100%;
  background-position: 10px 10px;
  background-repeat: no-repeat;
}
</style>
