<script setup>
// TODO
// Generalizar props no lugar de lotes e vendas usar items e item
// Generalizar emits no lugar de onEdit, onDelete usar onAction
// Generalizar Modais
// Usar lógica especifica no componente pai para definir se é lote ou venda
// Usar slots para os modais

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  lotes: {
    type: Array,
    default: () => [],
  },
  lote: {
    type: Object,
    default: () => ({
      num: "",
      quadra: "",
    }),
  },
  vendas: {
    type: Array,
    default: () => [],
  },
  venda: {
    type: Object,
    default: () => ({
      num: "",
      quadra: "",
      lote: "",
    }),
  },
  searchPagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      totalPages: 1,
      hasMoreNext: false,
      hasMorePrev: false,
    }),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },

  isModalOpen: {
    type: Boolean,
    default: false,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
  filterLotes: {
    type: Array,
    default: () => [],
  },
  filterVendas: {
    type: Array,
    default: () => [],
  },
  searchByName: {
    type: String,
    default: "",
  },
  isModalFilter: {
    type: Boolean,
    default: false,
  },
});

const isLote = computed(() => {
  return props.lotes.length > 0;
});

const title = computed(() => {
  return isLote.value ? "Lotes" : "Vendas";
});

const { filterLotes, filterVendas } = toRefs(props);
const filter = computed(() =>
  filterLotes.value.length > 0 ? filterLotes.value : filterVendas.value
);

const emit = defineEmits([
  "onEdit",
  "onDelete",
  "onCreate",
  "onFilter",
  "onFilterFunc",
  "clearObj",
  "pagination",
  "openEditModal",
  "openModal",
  "toggleMenu",
  "openModalFilter",
]);
const { lote, isModalOpen, isUpdate, isModalFilter } = toRefs(props);

function OpenModalFilter() {
  emit("openModalFilter");
}
const dataFilter = (filter, options) => {
  emit("onFilter", filter, options);
};

const filterFunction = async () => {
  emit("onFilterFunc");
};

const criarLotes = async (lote) => {
  if (isUpdate.value) {
    await onEdit(lote);
    return;
  }
  emit("onCreate", lote);
};
const openEditModal = (loteEdit) => {
  emit("openEditModal", loteEdit);
};

const openModal = () => {
  clearObj();
  emit("openModal");
};

const closeModal = () => {
  emit("toggleMenu");
  clearObj();
};

const clearObj = () => {
  emit("clearObj");
};

const onEdit = (loteEdit) => {
  emit("onEdit", loteEdit);
};

const onDelete = (loteId) => {
  emit("onDelete", loteId);
};

const pagination = async (
  prevCursor,
  lastPage = "",
  firstPage = "",
  filter = "",
  nextCursor
) => {
  await emit("pagination", prevCursor, lastPage, firstPage, filter, nextCursor);
};
</script>

<template>
  <div>
    <h1 class="text-xl text-center font-semibold text-gray-900">{{ title }}</h1>
    <h2 class="text-md text-center text-gray-600 mb-5">
      Lista de {{ isLote ? "Lotes" : "Vendas" }}
    </h2>
  </div>
  <div class="p-5 bg-white shadow-2xl rounded-lg">
    <div class="flex justify-between items-center mb-5">
      <!-- border-blue-600 -->
      <div class="flex items-center rounded-xl w-4/5">
        <div class="text-center w-1/4">
          <SelectComponent
            :is-modal-filter="isModalFilter"
            :filter="filter"
            @toggleMenu="OpenModalFilter"
            @onConfirmSelection="dataFilter"
          />
        </div>
        <input
          v-if="vendas.length > 0"
          class="w-[50%] p-1 placeholder-gray-400 text-base focus:outline-none mx-5"
          type="text"
          placeholder="Digite o Nome do Cliente ..."
          :value="searchByName"
           @input="$emit('update:searchByName', $event.target.value)"
        />
        <!-- <Icon
          v-if="isSearching"
          name="eos-icons:loading"
          size="25"
          class="mr-2" -->

        <button
          class="flex items-center h-[2.7em] mr-2 p-3 rounded-xl bg-[#253D90]"
          @click="filterFunction"
        >
          <Icon name="ph:magnifying-glass" size="24" class="bg-white" />
        </button>
      </div>

      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        @click="openModal"
      >
        Adicionar Nova Venda
      </button>
      <ListasModalComponentLote
        @toggleMenu="closeModal"
        @onConfirmSelection="criarLotes"
        :lote="lote"
        :is-modal-open="isModalOpen"
        :is-update="isUpdate"
      />
    </div>

    <tableComponent
      v-if="lotes.length > 0"
      @onEdit="openEditModal"
      @onDelete="onDelete"
      :columns="columns"
      :rows="lotes"
      :isLoading="isLoading"
    />
    <!-- @onEdit="openEditModal"
      @onDelete="onDelete" -->
    <tableComponent
      v-if="vendas.length > 0"
      :columns="columns"
      :rows="vendas"
      :isLoading="isLoading"
    />

    <div class="flex justify-center gap-2 mt-4">
      <button
        :disabled="!searchPagination.hasMorePrev"
        :class="[
          'px-4 py-2 bg-blue-600 text-white rounded-lg shadow ',
          !searchPagination.hasMorePrev
            ? 'btn-disable'
            : 'hover:bg-blue-700 transition',
        ]"
        @click="pagination(false, '', true)"
      >
        <!-- First Item  -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.015"
          height="13.015"
          viewBox="0 0 13.015 13.015"
        >
          <path
            id="Icon_material-skip-previous"
            data-name="Icon material-skip-previous"
            d="M9,9h2.169V22.015H9Zm3.8,6.508,9.219,6.508V9Z"
            transform="translate(-9 -9)"
            fill="white"
          />
        </svg>
        <!-- :fill="
                  !firstPage
                    ? 'var(--md-theme-default-navy)'
                    : 'var(--md-theme-default-disabled-field)'
                " -->
      </button>
      <!-- Prev  -->
      <button
        :disabled="!searchPagination.hasMorePrev"
        :class="[
          'px-4 py-2 bg-blue-600 text-white rounded-lg shadow ',
          !searchPagination.hasMorePrev
            ? 'btn-disable'
            : 'hover:bg-blue-700 transition',
        ]"
        @click="pagination(true)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9.219"
          height="13.015"
          viewBox="0 0 9.219 13.015"
        >
          <path
            id="Icon_material-skip-previous"
            data-name="Icon material-skip-previous"
            d="M12.8,15.508l9.219,6.508V9Z"
            transform="translate(-12.796 -9)"
            fill="white"
          />
          <!-- :fill="" -->
        </svg>
      </button>

      <!-- Next  -->
      <button
        :disabled="!searchPagination.hasMoreNext"
        :class="[
          'px-4 py-2 bg-blue-600 text-white rounded-lg shadow ',
          !searchPagination.hasMoreNext
            ? 'btn-disable'
            : 'hover:bg-blue-700 transition',
        ]"
        @click="pagination(false, '', '', '', true)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9.219"
          height="13.015"
          viewBox="0 0 9.219 13.015"
        >
          <path
            id="Icon_material-skip-previous"
            data-name="Icon material-skip-previous"
            d="M12.8,15.508l9.219,6.508V9Z"
            transform="translate(22.015 22.015) rotate(180)"
            fill="white"
          />
        </svg>
        <!-- :fill="
                  !lastPage
                    ? 'var(--md-theme-default-primary)'
                    : 'var(--md-theme-default-disabled-field)'
                " -->
      </button>

      <button
        :disabled="!searchPagination.hasMoreNext"
        :class="[
          'px-4 py-2 bg-blue-600 text-white rounded-lg shadow ',
          !searchPagination.hasMoreNext
            ? 'btn-disable'
            : 'hover:bg-blue-700 transition',
        ]"
        @click="pagination(false, true)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.015"
          height="13.015"
          viewBox="0 0 13.015 13.015"
        >
          <path
            id="Icon_material-skip-next"
            data-name="Icon material-skip-next"
            d="M9,22.015l9.219-6.508L9,9ZM19.846,9V22.015h2.169V9Z"
            transform="translate(-9 -9)"
            fill="white"
          />
        </svg>
        <!-- :fill="
                  !lastPage
                    ? 'var(--md-theme-default-navy)'
                    : 'var(--md-theme-default-disabled-field)'
                " -->
      </button>

      <div class="flex items-center">
        <p class="text-sm text-gray-600">
          Página {{ searchPagination.currentPage }} de
          {{ searchPagination.totalPages }}
        </p>
      </div>
    </div>
  </div>
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50"
  >
    <div class="flex flex-col items-center justify-center p-5 rounded-lg">
      <Icon name="fa-spinner" class="animate-spin text-blue-600 w-16 h-16" />
      <h2>Carregando...</h2>
    </div>
  </div>
</template>

<style scoped>
input {
  padding: 0.5rem;
  border: 1px solid #000000;
  border-radius: 0.375rem;
  width: 100%;
}
</style>
