<script setup>
import loteService from "~/services/lotes.service";
const isModalOpen = ref(false);
const isModalFilter = ref(false);
const filterLotes = ref([]);
const search = ref("");
const lotes = ref([]);
let isSearching = ref(false);
// Buscar lotes ao carregar a página
const fetchLotes = async () => {
  lotes.value = await loteService.getLotes();
  // console.log(lotes.value);
};
isSearching= ref(false);
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

onMounted(await fetchLotes);

function OpenModalFilter() {
  isModalFilter.value = !isModalFilter.value;
  // console.log(isModalFilter.value);
}
const dataFilterLotes = (filter) => {
  filterLotes.value = filter;
  console.log(filterLotes.value);
};

const filterLotesFunction = async () => {
  const quadra = filterLotes.value.find((item) => item.value === "quadra");
  const lote = filterLotes.value.find((item) => item.value === "lote");

  if (!filterLotes.value.length) {
    alert("Selecione um filtro!");
    return;
  }
  let response;

  try {
     response = await loteService.buscarQuadraELote(quadra.num, lote.num);
    //  console.log(response);
  } catch (error) {
    console.error("Erro buscando quadra e lote:", error);
  } finally {
    lotes.value = response?.lotes;
   
  }
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
    await fetchLotes();
  }
};

const openModal = () => {
  // console.log("openModal");
  isModalOpen.value = true;
};

const users = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];
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
  </div>
</template>
