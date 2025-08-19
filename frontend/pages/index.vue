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
      @pagination="paginationLotes"
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
import Swal from "~/components/utils/customSwal";
const columns = [
  {
    label: "Lote",
    key: "lote",
    class: "min-w-[80px]",
    class2: "sticky left-[100px] z-10 bg-white min-w-[60px] border-r-2",
    class3:'left-[100px] z-30 border-r-2 '
  },
  {
    label: "Quadra",
    key: "quadra",
    class: "min-w-[80px]",
    class2: "sticky left-[170px] z-10 bg-white min-w-[60px] border-r-2",
     class3:'left-[170px] z-30 border-r-2'
  },
  { label: "Status", key: "status_lote", class: "min-w-[60px]" },
  { label: "Situação", key: "codigo_situacao", class: "min-w-[50px]" },
  { label: "Medidas", key: "medidas" },
  {
    label: "Frente",
    key: "frente",
    class: "min-w-[150px]",
  },
  { label: "Fundo", key: "fundo" },
  { label: "Direito", key: "direito" },
  { label: "Esquerdo", key: "esquerdo" },
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
        lotes.value.length &&
        !prevCursor &&
        !lastPage &&
        !firstPage &&
        !filter &&
        nextCursor
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
      Swal.swalError({
        text: "Nenhum lote encontrado com os Filtros Aplicados",
      });
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
    Swal.swalErrorResponse({ error });
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
  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja Deletar este lote?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await loteService.deleteLote(loteId);
      if (result) {
        await Swal.swalSuccess({ text: "Lote Deletado com sucesso!" });
      }
    } catch (error) {
      console.error("Erro ao deletar lote:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      await paginationLotes(false, "", "", "", false);
    }
  }
};

const editarLotes = async (lote) => {
  if (lote.quadra == "") {
    Swal.swalError({ text: "Campo Quadra é obrigatório!" });
    return;
  }
  if (lote.lote == "") {
    Swal.swalError({ text: "Campo Lote é obrigatório!" });
    return;
  }

  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja Editar este lote?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await loteService.updateLote(lote._id, lote);
      if (result) {
        await Swal.swalSuccess({ text: "Lote Editado com sucesso!" });
        isModalOpen.value = false;
      }
    } catch (error) {
      console.error("Error editing lote:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      clearLote();
      isUpdate.value = false;
      getLote(lote.lote, lote.quadra);
      await filterLotesFunction();
    }
  }
};

const criarLotes = async (lote) => {
  const lote_num = lote.lote;

  lote = {
    ...lote,
    lote_num: Number(lote_num),
  };

  if (lote.quadra == "") {
    Swal.swalError({ text: "Campo Quadra é obrigatório!" });
    return;
  }
  if (lote.lote == "") {
    Swal.swalError({ text: "Campo Lote é obrigatório!" });
    return;
  }

  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja criar este lote?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await loteService.createLote(lote);
      if (result) {
        isModalOpen.value = false;
        await Swal.swalSuccess({ text: "Lote Criado com sucesso!" });
      }
    } catch (error) {
      console.error("Error creating lote:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      clearLote();
      getLote(lote.lote, lote.quadra);
      await filterLotesFunction();
    }
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
