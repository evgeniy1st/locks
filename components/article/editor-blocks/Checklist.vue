<template>
  <ul>
    <li v-for="(item, i) in data.items" :key="i">
      <span>
        <Icon
          :name="item.checked ? 'bx:checkbox-checked' : 'bx:checkbox'"
          size="36"
        />
      </span>
      <span v-html="item.text"></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped></style>
