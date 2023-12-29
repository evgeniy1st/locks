<template>
  <div v-if="data && data?.data?.editor?.blocks.length">
    <div v-for="item in data.data.editor.blocks" :key="item.id">
      <div v-if="item.type in elements">
        <component :is="elements[item.type]" :data="item.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
import Paragraph from '@/components/article/editor-blocks/Paragraph.vue';
import NestedList from '@/components/article/editor-blocks/NestedList.vue';
import Image from '@/components/article/editor-blocks/Image.vue';
import Quote from '@/components/article/editor-blocks/Quote.vue';
import Delimiter from '@/components/article/editor-blocks/Delimiter.vue';
import Checklist from '@/components/article/editor-blocks/Checklist.vue';

const runtimeConfig = useRuntimeConfig();
const { api } = runtimeConfig.public;

const elements: any = {
  paragraph: Paragraph,
  nestedlist: NestedList,
  image: Image,
  quote: Quote,
  delimiter: Delimiter,
  checklist: Checklist,
};

const props = defineProps({
  block: {
    type: Object,
    default: () => {},
  },
});

const { data: data }: any = await useFetch(
  `${api}items/${props.block.collection}/${props.block.item}?fields=*.*`
);
</script>
