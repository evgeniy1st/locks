<template>
  <div
    id="my-share"
    v-on-click-outside="closeModal"
    class="absolute top-[120%] w-full mx-auto"
  ></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const emit = defineEmits(['update', 'close']);

onMounted(async () => {
  let yaScript = document.createElement('script');
  yaScript.setAttribute('src', 'https://yastatic.net/share2/share.js');
  document.head.appendChild(yaScript);

  setTimeout(() => {
    const myShare = document.getElementById('my-share');
    Ya.share2(myShare, {
      theme: {
        services: 'vkontakte,odnoklassniki,telegram,twitter,whatsapp',
        bare: false,
        colorScheme: 'normal',
        curtain: true,
        shape: 'round',
        size: 'l',
      },
      hooks: {
        onshare: () => {
          emit('update');
        },
      },
    });
  }, 100);
});

function closeModal() {
  emit('close');
}
</script>

<style scoped></style>
