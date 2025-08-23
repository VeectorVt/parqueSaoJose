<template>
  <div>
    <searchComponent
      @onFilter="dataFilterSituacoes"
      @onEdit="editarSituacao"
      @openEditModal="openEditModal"
      @onDelete="deleteSituacao"
      @onFilterFunc="filterSituacoesFunction"
      @onCreate="criarSituacao"
      @clearObj="clearSituacao"
      @pagination="paginationSituacoes"
      @toggleMenu="closeModal"
      @openModal="openModal"
      @openModalFilter="openModalFilter"
      :searchPagination="searchPagination"
      :isLoading="isLoading"
      :columns="columns"
      :situacoes="situacoes"
      :situacao="situacao"
      :isModalOpen="isModalOpen"
      :isUpdate="isUpdate"
      :isModalFilter="isModalFilter"
      :filterSituacoes="filterSituacoes"
    />
  </div>
</template>

<script setup>
import situacaoService from "~/services/situacao.service";
import Swal from "~/components/utils/customSwal";

const columns = [
  { label: "Código Situação", key: "codigo_situacao", class: "min-w-[100px]" },
  { label: "Situação", key: "situacao", class: "min-w-[200px]" },
];

const isModalOpen = ref(false);
const isModalFilter = ref(false);
const isUpdate = ref(false);
const filterSituacoes = ref([]);
const searchPagination = ref({ currentPage: 1 });
const situacoes = ref([]);
let isSearching = ref(false);
let isLoading = ref(false);

let situacao = ref({
  codigo_situacao: "",
  situacao: "",
});

onMounted(async () => {
  await fetchSituacoes();
});

const fetchSituacoes = async () => {
  await paginationSituacoes();
};

const dataFilterSituacoes = (filter, options = [], getSituacaoByCrud = false) => {
  filterSituacoes.value = getSituacaoByCrud ? filterSituacoes.value : [...filter];
};

const paginationSituacoes = async () => {
  try {
    isLoading.value = true;
    isSearching.value = true;
    const response = await situacaoService.getSituacoes();
    situacoes.value = response;
  } catch (error) {
    console.error("Erro ao buscar situações:", error);
    Swal.swalErrorResponse({ error });
  } finally {
    isSearching.value = false;
    isLoading.value = false;
  }
};

const filterSituacoesFunction = async () => {
  searchPagination.value.currentPage = 1;
  await paginationSituacoes();
};

const deleteSituacao = async (id) => {
  // Pronto para implementar
  Swal.swalInfo({ text: "Função de deletar situação ainda não implementada." });
};

const editarSituacao = async (situacao) => {
  // Pronto para implementar
  Swal.swalInfo({ text: "Função de editar situação ainda não implementada." });
};

const criarSituacao = async (situacao) => {
  // Pronto para implementar
  Swal.swalInfo({ text: "Função de criar situação ainda não implementada." });
};

const clearSituacao = () => {
  situacao.value = {
    codigo_situacao: "",
    situacao: "",
  };
};

const openEditModal = (situacaoEdit) => {
  isUpdate.value = true;
  situacao.value = { ...situacaoEdit };
  isModalOpen.value = true;
};

const openModal = () => {
  clearSituacao();
  isUpdate.value = false;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  clearSituacao();
};

const openModalFilter = () => {
  isModalFilter.value = !isModalFilter.value;
};
</script>