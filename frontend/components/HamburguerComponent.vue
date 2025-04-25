<template>
  <div class="w=1/4 flex justify-start">
      <button
        @click="handleClick"
        class="flex-item z-50 text-white p-2 focus:outline-none"
      >
        <svg
          v-if="!isOpen"
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 8h16M4 16h16"
          />
        </svg>
        <!-- Ícone de fechar -->
        <svg
          v-else
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  toggleMenu: Function,
});

const emit = defineEmits(['toggleMenu'])

function handleClick() {
  emit('toggleMenu')
}


</script>
