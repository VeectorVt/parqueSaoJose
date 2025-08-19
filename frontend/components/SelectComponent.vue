<template>
  <div class="text-left m-0 p-1 w-52">
    <!-- Botão que abre o modal -->
    <button
      @click="openModal"
      class="inline-flex justify-between w-52 h-full rounded-xl border border-gray-300 shadow-sm px-7 py-3 bg-[#253D90] text-sm font-medium text-white hover:bg-blue-700"
    >
      <label
        v-if="filter.length"
        v-for="formattedOption in filter"
        :key="formattedOption.value"
      >
        {{ formattedOption.value.toUpperCase() }}:<br />{{
          formattedOption.num
        }}
        ;
      </label>
      <label v-else for=""> Filtro... </label>
      <!-- Ícone de dropdown (opcional) -->
      <svg
        class="ml-2 h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Modal com checklist -->
    <transition name="fade">
      <div
        v-if="isModalFilter"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <!-- Fundo semi-transparente -->
        <div class="fixed inset-0 bg-black opacity-50" @click="openModal"></div>

        <!-- Conteúdo do modal -->
        <div class="bg-white rounded-md p-4 shadow-lg z-50 max-w-xs w-full">
          <h3 class="text-lg font-medium mb-4">Selecione as opções</h3>
          <div
            v-for="option in options"
            :key="option.value"
            class="flex items-center mb-2"
          >
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
            <input
              v-if="selectedOptions.includes(option.value)"
              id="numero"
              v-model="option.numero"
              :placeholder="`Número ${option.label}`"
              class="input-field"
            />
          </div>

          <div class="mt-4 flex justify-end">
            <button
              @click="confirmSelection"
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mr-2"
            >
              Confirmar
            </button>
            <button
              @click="openModal"
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
// TODO Adicionar reatividade para os campos quando for feita a pesquisa através da requisição
const props = defineProps({
  isModalFilter: {
    type: Boolean,
    required: true,
  },
  filter: {
    type: Array,
    required: false,
    default: () => [],
  },
});
// Lista de opções para o checklist
const options = ref([
  { label: "Por Lote", value: "lote", numero: "" },
  { label: "Por Quadra", value: "quadra", numero: "" },
]);

// Opções selecionadas
const selectedOptions = ref([]);
// let formattedOptions = ref([]);



const emit = defineEmits([
  "toggleMenu",
  "onConfirmSelection",
]);
const { filter } = toRefs(props);

onUpdated(()=>{
  console.log("filter-select",filter.value)
})

// Abre e fecha modal
const openModal = () => {
  emit("toggleMenu");
};

// Confirma a seleção e fecha o modal
const confirmSelection = () => {
  emit("onConfirmSelection", selectedOptions.value, options.value);
  openModal();
};

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
.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 50%;
  margin-left: 1rem;
}
</style>
