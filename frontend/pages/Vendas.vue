<template>
  <div>
    <searchComponent
      @onFilter="dataFilterVendas"
      @onEdit="editarVendas"
      @openEditModal="openEditModal"
      @onDelete="deleteVendas"
      @onFilterFunc="filterVendasFunction"
      @onCreate="criarVendas"
      @clearObj="clearVenda"
      @pagination="paginationVendas"
      @toggleMenu="closeModal"
      @openModal="openModal"
      @openModalFilter="openModalFilter"
      :searchPagination="searchPagination"
      :isLoading="isLoading"
      :columns="columns"
      
      :vendas="vendas"
      :venda="venda"
      :isModalOpen="isModalOpen"
      :isUpdate="isUpdate"
      :isModalFilter="isModalFilter"
      :filterVendas="filterVendas"
    />

  </div>
</template>

<script setup>
import vendaService from "~/services/vendas.service";
import Swal from "~/components/utils/customSwal";
const columns = [
  { label: "Lote", key: "lote", class: "min-w-[80px]" },
  { label: "Quadra", key: "quadra", class: "min-w-[80px]" },
  { label: "Nome", key: "nome", class: "min-w-[120px]" },
  { label: "CPF", key: "cpf", class: "min-w-[100px]" },
  { label: "Parcela", key: "parcela", class: "min-w-[60px]" },
  { label: "Valor", key: "valor", class: "min-w-[80px]" },
  { label: "Data Venda", key: "data_venda", class: "min-w-[100px]" },
  { label: "Nr Documento", key: "nr_documento", class: "min-w-[100px]" },
  { label: "Situação", key: "codigo_situacao", class: "min-w-[80px]" },
  { label: "Telefone", key: "telefone", class: "min-w-[100px]" },
  { label: "Bairro", key: "bairro", class: "min-w-[100px]" },
  { label: "Cidade", key: "cidade", class: "min-w-[100px]" },
  { label: "UF", key: "uf", class: "min-w-[50px]" },
  // TODO:
  // Adicione outros campos do model de venda conforme necessário
];
const isModalOpen = ref(false);
const isModalFilter = ref(false);
const isUpdate = ref(false);
const filterVendas = ref([]);
const searchPagination = ref({
  currentPage: 1,
});
const formattedOptions = ref([]);
const vendas = ref([]);
let isSearching = ref(false);
let isLoading = ref(false);

let venda = ref({
  lote: "",
  lote_id: "",
  quadra: "",
  nome: "",
  cpf: "",
  parcela: "",
  valor: "",
  data_venda: "",
  nr_documento: "",
  codigo_situacao: "",
  telefone: "",
  bairro: "",
  cidade: "",
  uf: "",
  // Adicione outros campos do model de venda conforme necessário
});

onMounted(async () => {
  await fetchVendas();
});

const fetchVendas = async () => {
  await paginationVendas();
};

const dataFilterVendas = (filter, options = [], getVendaByCrud = false) => {
  if (!getVendaByCrud)
    formattedOptions.value = filter.map((option) => {
      return {
        value: option,
        num: options.find((o) => o.value === option).numero,
      };
    });

  filterVendas.value = getVendaByCrud
    ? filterVendas.value
    : [...formattedOptions.value];
};

const getVenda = (lote, quadra) => {
  filterVendas.value = [
    { value: "quadra", num: quadra ? quadra : "" },
    { value: "lote", num: lote ? lote : "" },
  ];

  dataFilterVendas(filterVendas.value, [], true);
};

const paginationVendas = async (
  prevCursor,
  lastPage = "",
  firstPage = "",
  filter = "",
  nextCursor
) => {
  const quadra = filterVendas.value.find((item) => item.value === "quadra");
  const lote = filterVendas.value.find((item) => item.value === "lote");

  try {
    isLoading.value = true;
    isSearching.value = true;
    const search = {
      size: 25,
      cursor:
        vendas.value.length &&
        !prevCursor &&
        !lastPage &&
        !firstPage &&
        !filter &&
        nextCursor
          ? vendas.value[vendas.value.length - 1]._id
          : "",
      prevCursor:
        prevCursor && !lastPage && !firstPage && !filter
          ? vendas.value[0]._id
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

    const response = await vendaService.paginationVenda(
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
        text: "Nenhuma venda encontrada com os Filtros Aplicados",
      });
      return;
    }

    vendas.value = response?.items;
    console.log("Vendas:", vendas.value);

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
    console.error("Error fetching paginated vendas:", error);
    Swal.swalErrorResponse({ error });
  } finally {
    isSearching.value = false;
    isLoading.value = false;
  }
};

const filterVendasFunction = async () => {
  searchPagination.value.currentPage = 1;
  await paginationVendas(false, "", "", true);
};

const deleteVendas = async (vendaId) => {
  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja Deletar esta venda?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await vendaService.deleteVenda(vendaId);
      if (result) {
        await Swal.swalSuccess({ text: "Venda Deletada com sucesso!" });
      }
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      await paginationVendas(false, "", "", "", false);
    }
  }
};

const editarVendas = async (venda) => {
  if (venda.quadra == "") {
    Swal.swalError({ text: "Campo Quadra é obrigatório!" });
    return;
  }
  if (venda.lote == "") {
    Swal.swalError({ text: "Campo Lote é obrigatório!" });
    return;
  }

  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja Editar esta venda?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await vendaService.updateVenda(venda._id, venda);
      if (result) {
        await Swal.swalSuccess({ text: "Venda Editada com sucesso!" });
        isModalOpen.value = false;
      }
    } catch (error) {
      console.error("Error editing venda:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      clearVenda();
      isUpdate.value = false;
      getVenda(venda.lote, venda.quadra);
      await filterVendasFunction();
    }
  }
};

const criarVendas = async (venda) => {
  const lote_num = venda.lote;

  venda = {
    ...venda,
    lote_num: Number(lote_num),
  };

  if (venda.quadra == "") {
    Swal.swalError({ text: "Campo Quadra é obrigatório!" });
    return;
  }
  if (venda.lote == "") {
    Swal.swalError({ text: "Campo Lote é obrigatório!" });
    return;
  }

  const result = await Swal.swalConfirm(
    "Você tem certeza que deseja criar esta venda?",
    "",
    "warning",
    "Sim",
    "Não",
    true,
    true
  );
  if (result.isConfirmed) {
    try {
      const result = await vendaService.createVenda(venda);
      if (result) {
        isModalOpen.value = false;
        await Swal.swalSuccess({ text: "Venda Criada com sucesso!" });
      }
    } catch (error) {
      console.error("Error creating venda:", error);
      Swal.swalErrorResponse({ error });
    } finally {
      clearVenda();
      getVenda(venda.lote, venda.quadra);
      await filterVendasFunction();
    }
  }
};

const clearVenda = () => {
  venda.value = {
    lote: "",
    lote_id: "",
    quadra: "",
    nome: "",
    cpf: "",
    parcela: "",
    valor: "",
    data_venda: "",
    nr_documento: "",
    codigo_situacao: "",
    telefone: "",
    bairro: "",
    cidade: "",
    uf: "",
    // Adicione outros campos do model de venda conforme necessário
  };
};

const openEditModal = (vendaEdit) => {
  isUpdate.value = true;
  venda.value = { ...vendaEdit };
  isModalOpen.value = true;
};

const openModal = () => {
  clearVenda();
  isUpdate.value = false;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  clearVenda();
};

const openModalFilter = () => {
  isModalFilter.value = !isModalFilter.value;
};
</script>

<style scoped></style>