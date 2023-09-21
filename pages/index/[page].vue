<template>
  <div>
    main
    <pre>
      {{ dataProp.data.pages }}
    </pre>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const { data } = useFetch(
  'https://api.vskrytie-zamkov78.ru/items/pages?access_token=awu0nRIPhgLuExCUBHA6raOhMxk_k7LH&fields=*.*.*.*&filter[type][_eq]=main'
);
const props = defineProps({
  dataProp: {
    type: Object,
    default: () => {},
  },
});
</script>
