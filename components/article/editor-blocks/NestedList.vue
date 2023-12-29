<template>
  <ul
    class="my-3"
    :class="
      data.style === 'unordered' ? ' list-disc list-inside' : ' list-none'
    "
  >
    <li v-for="(item, i) in data.items" :key="i" class="my-1">
      <span v-if="data.style === 'ordered'">{{ i + 1 }}. </span>
      <span v-html="item.content"></span>

      <ul
        class="ml-2"
        :class="
          data.style === 'unordered' ? ' list-disc list-inside' : ' list-none'
        "
      >
        <li v-for="(subitem, j) in item.items" :key="`${i}.${j}`">
          <span v-if="data.style === 'ordered'">{{ i + 1 }}.{{ j + 1 }}. </span>
          <span v-html="subitem.content"></span>

          <ul
            class="ml-4"
            :class="
              data.style === 'unordered'
                ? ' list-disc list-inside'
                : ' list-none'
            "
          >
            <li
              v-for="(subsubitem, k) in subitem.items"
              :key="`${i}.${j}.${k}`"
            >
              <span v-if="data.style === 'ordered'">
                {{ i + 1 }}.{{ j + 1 }}.{{ k + 1 }}.
              </span>
              <span v-html="subsubitem.content"></span>

              <ul
                class="ml-6"
                :class="
                  data.style === 'unordered'
                    ? ' list-disc list-inside'
                    : ' list-none'
                "
              >
                <li
                  v-for="(child, l) in subsubitem.items"
                  :key="`${i}.${j}.${k}.${l}`"
                >
                  <span v-if="data.style === 'ordered'">
                    {{ i + 1 }}.{{ j + 1 }}.{{ k + 1 }}.{{ l + 1 }}.
                  </span>
                  <span v-html="child.content"></span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
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
