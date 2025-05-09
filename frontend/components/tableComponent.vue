<!-- TODO : Criar Indicação de Página , Criar Loading , Criar alert usando sweetAlert , Componentizar para outras listas -->
<script setup>
import loteService from "~/services/lotes.service";
const isModalOpen = ref(false);
const isModalFilter = ref(false);
const isUpdate = ref(false);
const filterLotes = ref([]);
const searchPagination = ref({
  currentPage: 1,
});
const lotes = ref([]);
let isSearching = ref(false);
// Buscar lotes ao carregar a página
const fetchLotes = async () => {
  await paginationLotes();
  // console.log(lotes.value);
};
isSearching = ref(false);
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

function OpenModalFilter() {
  isModalFilter.value = !isModalFilter.value;
  // console.log(isModalFilter.value);
}
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
  }
};

const filterLotesFunction = async () => {
  // const quadra = filterLotes.value.find((item) => item.value === "quadra");
  // const lote = filterLotes.value.find((item) => item.value === "lote");

  // if (!filterLotes.value.length) {
  //   alert("Selecione um filtro!");
  //   return;
  // }
  // let response;

  // try {
  //   response = await loteService.buscarQuadraELote(quadra.num, lote.num);
  //   //  console.log(response);
  // } catch (error) {
  //   console.error("Erro buscando quadra e lote:", error);
  // } finally {
  //   lotes.value = response?.lotes;
  // }
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
  if (isUpdate.value) {
    await editarLotes(lote);
    return;
  }
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
const openEditModal = (loteEdit) => {
  console.log(loteEdit);

  isUpdate.value = true;
  lote.value = { ...loteEdit };
  isModalOpen.value = true;
};

const openModal = () => {
  clearLote();
  isUpdate.value = false;
  isModalOpen.value = true;
};
</script>

<template>
  <div>
    <h1 class="text-xl text-center font-semibold text-gray-900">Lotes</h1>
    <h2 class="text-md text-center text-gray-600 mb-5">
      Lista de Todos os Lotes:
    </h2>
  </div>
  <div class="p-5 bg-white shadow-2xl rounded-lg">
    <div class="flex justify-between items-center mb-5">
      <!-- border-blue-600 -->
      <div class="flex items-center rounded-xl w-4/5">
        <div class="text-center w-1/4">
          <SelectComponent
            :is-modal-filter="isModalFilter"
            @toggleMenu="OpenModalFilter"
            @onConfirmSelection="dataFilterLotes"
          />
        </div>
        <!-- <input
          class="w-full p-1 placeholder-gray-400 text-base focus:outline-none"
          type="text"
          placeholder="Pesquisar Lote ..."
          v-model="search"
        /> -->
        <!-- <Icon
          v-if="isSearching"
          name="eos-icons:loading"
          size="25"
          class="mr-2" -->

        <button
          class="flex items-center h-[2.7em] mr-2 p-3 rounded-xl bg-[#253D90]"
          @click="filterLotesFunction"
        >
          <Icon name="ph:magnifying-glass" size="24" class="bg-white" />
        </button>
      </div>

      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        @click="openModal"
      >
        Adicionar Novo Lote
      </button>
      <ListasModalComponentLote
        @toggleMenu="isModalOpen = !isModalOpen"
        @onConfirmSelection="criarLotes"
        :lote="lote"
        :is-modal-open="isModalOpen"
        :is-update="isUpdate"
      />
    </div>

    <div class="overflow-auto h-[40vh]">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-left">
            <th class="px-4 py-2 border-r border-b w-26">Ações</th>
            <th class="px-4 py-2 border-r border-b">Lote</th>
            <th class="px-4 py-2 border-r border-b">Quadra</th>
            <th class="px-4 py-2 border-r border-b">Status</th>
            <th class="px-4 py-2 border-r border-b">Situação</th>
            <th class="px-4 py-2 border-r border-b">Medidas</th>
            <th class="px-4 py-2 border-r border-b">frente</th>
            <th class="px-4 py-2 border-r border-b">fundo</th>
            <th class="px-4 py-2 border-r border-b">direito</th>
            <th class="px-4 py-2 border-r border-b">esquerdo</th>
            <th class="px-4 py-2 border-r border-b">Área total</th>
            <th class="px-4 py-2 border-r border-b">Área FR</th>
            <th class="px-4 py-2 border-r border-b">Área FU</th>
            <th class="px-4 py-2 border-r border-b">Área ld</th>
            <th class="px-4 py-2 border-r border-b">Área Le</th>
            <th class="px-4 py-2 border-r border-b">Insc. Mun.</th>
            <th class="px-4 py-2 border-r border-b">Iptu</th>
            <th class="px-4 py-2 border-r border-b">Iptu Desdob.</th>
            <th class="px-4 py-2 border-r border-b">Vr Lote</th>
            <th class="px-4 py-2 border-r border-b">Vr m²</th>
            <!-- <th class="px-4 py-2 border-b"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(lote, index) in lotes"
            :key="index"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-4 border-r py-3">
              <div class="flex items-center justify-center">
                <button
                  @click="openEditModal(lote)"
                  title="Editar"
                  class="flex items-center h-[2.7em] mr-2 p-3 rounded-xl"
                >
                  <Icon
                    name="material-symbols:edit"
                    size="24"
                    class="text-[#253D90]"
                  />
                </button>
                <button
                  title="Deletar"
                  class="flex items-center h-[2.7em] mr-2 p-3 rounded-xl"
                  @click="deleteLotes(lote._id)"
                >
                  <Icon
                    name="material-symbols:delete-outline"
                    class="text-[#e9130c]"
                    size="24"
                  />
                  <!-- color=""  -->
                </button>
              </div>
            </td>
            <td class="px-4 border-r py-3">{{ lote.lote }}</td>
            <td class="px-4 border-r py-3">{{ lote.quadra }}</td>
            <td class="px-4 border-r py-3">{{ lote.status_lote }}</td>
            <td class="px-4 border-r py-3">{{ lote.codigo_situacao }}</td>
            <td class="px-4 border-r py-3">{{ lote.medidas }}</td>
            <td class="px-4 border-r py-3">{{ lote.frente }}</td>
            <td class="px-4 border-r py-3">{{ lote.fundo }}</td>
            <td class="px-4 border-r py-3">{{ lote.direito }}</td>
            <td class="px-4 border-r py-3">{{ lote.esquerdo }}</td>
            <td class="px-4 border-r py-3">{{ lote.area_total }}</td>
            <td class="px-4 border-r py-3">{{ lote.area_fr }}</td>
            <td class="px-4 border-r py-3">{{ lote.area_fu }}</td>
            <td class="px-4 border-r py-3">{{ lote.area_ld }}</td>
            <td class="px-4 border-r py-3">{{ lote.area_le }}</td>
            <td class="px-4 border-r py-3">{{ lote.inscricao_municipal }}</td>
            <td class="px-4 border-r py-3">{{ lote.iptu }}</td>
            <td class="px-4 border-r py-3">{{ lote.iptu_desdobramento }}</td>
            <td class="px-4 border-r py-3">{{ lote.vr_lote }}</td>
            <td class="px-4 border-r py-3">{{ lote.vr_metro_quadrado }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center gap-2 mt-4">
      <button
        :disabled="!searchPagination.hasMorePrev"
        :class="[
          'px-4 py-2 bg-blue-600 text-white rounded-lg shadow ',
          !searchPagination.hasMorePrev
            ? 'btn-disable'
            : 'hover:bg-blue-700 transition',
        ]"
        @click="paginationLotes(false, '', true)"
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
        @click="paginationLotes(true)"
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
        @click="paginationLotes(false, '', '', '', true)"
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
        @click="paginationLotes(false, true)"
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
</template>
