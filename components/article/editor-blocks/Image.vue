<template>
  <div class="my-3 w-full">
    <img
      :src="`${api}assets/${data.file.fileId}?format=auto`"
      :width="data.file.width"
      :height="data.file.height"
      class="max-w-full"
    />
  </div>
  <p v-if="data.caption" class="mt-1 text-small text-[#]">
    {{ data.caption }}
  </p>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { api } = runtimeConfig.public;

defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
