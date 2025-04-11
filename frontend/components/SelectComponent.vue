<template>
    <div class="text-left m-0  w-full">
      <!-- Botão que abre o modal -->
      <button
        @click="openModal"
        class="inline-flex justify-between w-full  h-full rounded-md border border-gray-300 shadow-sm px-7 py-3 bg-[#253D90] text-sm font-medium text-white hover:bg-blue-700"
      >
        {{ selectedOptionsText }}
        <!-- Ícone de dropdown (opcional) -->
        <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </button>
  
      <!-- Modal com checklist -->
      <transition name="fade">
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
          <!-- Fundo semi-transparente -->
          <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
  
          <!-- Conteúdo do modal -->
          <div class="bg-white rounded-md p-4 shadow-lg z-50 max-w-xs w-full">
            <h3 class="text-lg font-medium mb-4">Selecione as opções</h3>
            <div v-for="option in options" :key="option.value" class="flex items-center mb-2">
              <input
                type="checkbox"
                :id="option.value"
                :value="option.value"
                v-model="selectedOptions"
                class="mr-2"
              />
              <label :for="option.value" class="text-sm text-gray-700">
                {{ option.label }}
              </label>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="confirmSelection"
                class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mr-2"
              >
                Confirmar
              </button>
              <button
                @click="closeModal"
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  
  // Controle do estado do modal
  const isModalOpen = ref(false)
  
  // Lista de opções para o checklist
  const options = ref([
    { label: 'Por Lote', value: 'lote' },
    { label: 'Por Quadra', value: 'quadra' },
  ])
  
  // Opções selecionadas
  const selectedOptions = ref([])
  
  // Abre o modal
  const openModal = () => {
    isModalOpen.value = true
  }
  
  // Fecha o modal
  const closeModal = () => {
    isModalOpen.value = false
  }
  
  // Confirma a seleção e fecha o modal
  const confirmSelection = () => {
    closeModal()
    // Aqui você pode adicionar alguma lógica, como emitir um evento com as opções selecionadas
  }
  
  // Computa o texto do botão com base nas opções selecionadas
  const selectedOptionsText = computed(() => {
    if (selectedOptions.value.length === 0) return 'Filtro...'
    return selectedOptions.value.join(', ')
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  