<template>
  <h1 v-if="type === 'h1'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h1>
  <h2 v-if="type === 'h2'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h2>
  <h3 v-if="type === 'h3'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h3>
  <h4 v-if="type === 'h4'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h4>
  <h5 v-if="type === 'h5'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h5>
  <h6 v-if="type === 'h6'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </h6>
  <span v-if="type === 'span'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </span>
  <p v-if="type === 'p'" :id="slugify(title)" v-bind="$attrs">
    {{ title }}
    <span v-if="accent" class="font-bold">{{ ' ' + accent }}</span>
  </p>
</template>

<script setup lang="ts">
import { slugify } from 'transliteration';

defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'h2',
  },
  accent: {
    type: String,
    default: '',
  },
});
</script>
