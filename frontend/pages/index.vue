<template>
  <div>
    <searchComponent
      @onFilter="dataFilterLotes"
      @onEdit="editarLotes"
      @openEditModal="openEditModal"
      @onDelete="deleteLotes"
      @onFilterFunc="filterLotesFunction"
      @onCreate="criarLotes"
      @clearObj="clearLote"
      @paginationLotes="paginationLotes"
      @toggleMenu="closeModal"
      @openModal="openModal"
      @openModalFilter="openModalFilter"
      :searchPagination="searchPagination"
      :isLoading="isLoading"
      :columns="columns"
      :lotes="lotes"
      :lote="lote"
      :isModalOpen="isModalOpen"
      :isUpdate="isUpdate"
      :isModalFilter="isModalFilter"
      :filterLotes="filterLotes"
    />
  </div>
</template>

<script setup>
import loteService from "~/services/lotes.service";
const columns = [
  { label: "Lote", key: "lote" },
  { label: "Quadra", key: "quadra" },
  { label: "Status", key: "status_lote" },
  { label: "Situação", key: "codigo_situacao" },
  { label: "Medidas", key: "medidas" },
  { label: "Frente", key: "frente", class: "w-1/2" },
  { label: "Fundo", key: "fundo" },
  { label: "Direito", key: "direito" },
  { label: "Esquerdo", key: "esquerdo" },
  { label: "Área total", key: "area_total" },
  { label: "Área FR", key: "area_fr" },
  { label: "Área FU", key: "area_fu" },
  { label: "Área ld", key: "area_ld" },
  { label: "Área le", key: "area_le" },
  { label: "Insc. Mun.", key: "inscricao_municipal" },
  { label: "IPTU", key: "iptu" },
  { label: "IPTU Desdob.", key: "iptu_desdobramento" },
  { label: "Vr Lote", key: "vr_lote" },
  { label: "Vr m²", key: "vr_metro_quadrado" },
];
const isModalOpen = ref(false);
const isModalFilter = ref(false);
const isUpdate = ref(false);
const filterLotes = ref([]);
const searchPagination = ref({
  currentPage: 1,
});
const formattedOptions = ref([]);
const lotes = ref([]);
let isSearching = ref(false);
let isLoading = ref(false);
// Buscar lotes ao carregar a página
const fetchLotes = async () => {
  await paginationLotes();

};


let lote = ref({
  quadra: "",
  lote: "",
  status_lote: "",
  codigo_situacao: "",
  medidas: "",
  frente: "",
  fundo: "",
  direito: "",
  esquerdo: "",
  area_total: "",
  area_fr: "",
  area_fu: "",
  area_ld: "",
  area_le: "",
  inscricao_municipal: "",
  iptu: "",
  iptu_desdobramento: "",
  vr_lote: "",
  vr_metro_quadrado: "",
});

onMounted(async () => {
  await fetchLotes();
});

const dataFilterLotes = (filter, options = [], getLoteByCrud = false) => {
  if (!getLoteByCrud)
    formattedOptions.value = filter.map((option) => {
      return {
        value: option,
        num: options.find((o) => o.value === option).numero,
      };
    });

filterLotes.value = getLoteByCrud
    ? filterLotes.value
    : [...formattedOptions.value];

};

const getLote = (lote, quadra) => {
  filterLotes.value = [
    { value: "quadra", num: quadra ? quadra : "" },
    { value: "lote", num: lote ? lote : "" },
  ];

  dataFilterLotes(filterLotes.value, [], true);
};

const paginationLotes = async (
  prevCursor,
  lastPage = "",
  firstPage = "",
  filter = "",
  nextCursor
) => {
  const quadra = filterLotes.value.find((item) => item.value === "quadra");
  const lote = filterLotes.value.find((item) => item.value === "lote");

  try {
    isLoading.value = true;
    isSearching.value = true;
    const search = {
      size: 25,
      cursor:
        lotes.value.length && !prevCursor && !lastPage && !firstPage && !filter
          ? lotes.value[lotes.value.length - 1]._id
          : "",
      prevCursor:
        prevCursor && !lastPage && !firstPage && !filter
          ? lotes.value[0]._id
          : "",
      quadra: quadra ? quadra.num : "",
      lote: lote ? lote.num : "",
      totalPages: 0,
      totalItens: 0,
      hasMoreNext: false,
      hasMorePrev: false,
      lastPage: lastPage,
      firstPage: firstPage,
      isFilter: filter,
    };


    const response = await loteService.paginationLote(
      search.size,
      search.cursor,
      search.prevCursor,
      search.quadra,
      search.lote,
      search.lastPage,
      search.firstPage,
      search.isFilter
    );

    if (response.items.length === 0) {
      alert("Nenhum lote encontrado com os filtros aplicados.");
      return;
    }


    lotes.value = response?.items;

    search.totalPages = response?.totalPages;
    search.totalItens = response?.totalItens;
    search.hasMoreNext = response?.hasMoreNext;
    search.hasMorePrev = response?.hasMorePrev;

    searchPagination.value = Object.assign(searchPagination.value, search);

    if (lastPage) searchPagination.value.currentPage = search.totalPages;
    if (firstPage) searchPagination.value.currentPage = 1;
    if (prevCursor) searchPagination.value.currentPage -= 1;
    if (nextCursor) searchPagination.value.currentPage += 1;


  } catch (error) {
    console.error("Error fetching paginated lotes:", error);
  } finally {
    isSearching.value = false;
    isLoading.value = false;
  }
};

const filterLotesFunction = async () => {
  searchPagination.value.currentPage = 1;
  await paginationLotes(false, "", "", true);
};

const deleteLotes = async (loteId) => {
  try {
    const confirmDelete = confirm("Tem certeza que deseja deletar este lote?");
    if (!confirmDelete) return;

    const result = await loteService.deleteLote(loteId);
    if (result) {
      alert("Lote deletado com sucesso!");
      await fetchLotes();
    } else {
      alert("Erro ao deletar lote. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deletar lote:", error);
    alert("Erro ao deletar lote. Tente novamente.");
  }
};

const editarLotes = async (lote) => {
  try {

    if (lote.quadra == "") {
      alert("Campo Quadra é obrigatório!");
      return;
    }
    if (lote.lote == "") {
      alert("Campo Lote é obrigatório!");
      return;
    }

    const result = await loteService.updateLote(lote._id, lote);
    if (result) {
      alert("Lote editado com sucesso!");
      isModalOpen.value = false;
    } else {
      alert("Erro ao editar lote. Verifique os dados e tente novamente.");
    }
  } catch (error) {
    console.error("Error editing lote:", error);
    alert("Erro ao editar lote. Verifique os dados e tente novamente.");
  } finally {
    clearLote();
    isUpdate.value = false;
    getLote(lote.lote, lote.quadra);
    await filterLotesFunction();
  }
};

const clearLote = () => {
  lote.value = {
    quadra: "",
    lote: "",
    status_lote: "",
    codigo_situacao: "",
    medidas: "",
    frente: "",
    fundo: "",
    direito: "",
    esquerdo: "",
    area_total: "",
    area_fr: "",
    area_fu: "",
    area_ld: "",
    area_le: "",
    inscricao_municipal: "",
    iptu: "",
    iptu_desdobramento: "",
    vr_lote: "",
    vr_metro_quadrado: "",
  };
};

const criarLotes = async (lote) => {
  const lote_num = lote.lote;

  lote = {
    ...lote,
    lote_num: Number(lote_num),
  };

  try {

    if (lote.quadra == "") {
      alert("Campo Quadra é obrigatório!");
      return;
    }
    if (lote.lote == "") {
      alert("Campo Lote é obrigatório!");
      return;
    }

    const result = await loteService.createLote(lote);
    if (result) {
      alert("Lote criado com sucesso!");
      isModalOpen.value = false;
    } else {
      alert("Erro ao criar lote. Verifique os dados e tente novamente.");
    }
  } catch (error) {
    console.error("Error creating lote:", error);
    alert("Erro ao criar lote. Verifique os dados e tente novamente.");
  } finally {
    clearLote();
    getLote(lote.lote, lote.quadra);
    await filterLotesFunction();
  }
};
const openEditModal = (loteEdit) => {
  isUpdate.value = true;
  lote.value = { ...loteEdit };
  isModalOpen.value = true;
};

const openModal = () => {
  clearLote();
  isUpdate.value = false;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  clearLote();
};

const openModalFilter = () => {
  isModalFilter.value = !isModalFilter.value;

};
</script>

<style scoped></style>
