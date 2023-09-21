<template>
  <div v-if="'data' in data">
    main
    <div class="flex gap-4 flex-wrap">
      <BlockView
        v-for="block in data.data[0].blocks"
        :key="block.id"
        :block="block"
      />
    </div>
    <pre>
      {{ data.data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from 'nuxt/app';
const runtimeConfig = useRuntimeConfig();

const { site, api } = runtimeConfig.public;

const { data }: any = useFetch(
  `${api}items/pages?filter[type][_eq]=main&filter[site][_eq]=${site}&filter[status][_eq]=published&fields=*,blocks.*`
);
</script>
