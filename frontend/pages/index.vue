<template>
  <div>
     <!-- @openEditModal="openModalEdit" -->
    <searchComponent
      @onFilter="dataFilterLotes"
      @onEdit="editarLotes"
     
      @onDelete="deleteLotes"
      @onFilterFunc="filterLotesFunction"
      @onCreate="criarLotes"
      @clearObj="clearLote"
      @paginationLotes="paginationLotes"
      :searchPagination="searchPagination"
      :isLoading="isLoading"
      :columns="columns"
      :lotes="lotes"
      :lote="lote"
      :isModalOpen="isModalOpen"
    :isUpdate="isUpdate"
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
  { label: "Frente", key: "frente" },
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
// const isModalFilter = ref(false);
const isUpdate = ref(false);
const filterLotes = ref([]);
const searchPagination = ref({
  currentPage: 1,
});
const lotes = ref([]);
let isSearching = ref(false);
let isLoading = ref(false);
// Buscar lotes ao carregar a página
const fetchLotes = async () => {
  await paginationLotes();
  // console.log(lotes.value);
};
// isSearching = ref(false);

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
  // await paginationLotes();
});

// function OpenModalFilter() {
//   isModalFilter.value = !isModalFilter.value;
//   // console.log(isModalFilter.value);
// }
const dataFilterLotes = (filter) => {
  filterLotes.value = filter;
  console.log(filterLotes.value);
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

    console.log("search:", search);

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

    console.log(response);
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

    console.log("searchPagination:", searchPagination.value);
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
    console.log(lote);
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
    await fetchLotes();
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
  try {
    console.log(lote);

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
    await fetchLotes();
  }
};
// const openEditModal = (loteEdit) => {
//   console.log(loteEdit);

//   isUpdate.value = true;
//   lote.value = { ...loteEdit };
//   isModalOpen.value = true;
// };

// const openModal = () => {
//   clearLote();
//   isUpdate.value = false;
//   isModalOpen.value = true;
// };
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}
</style>
