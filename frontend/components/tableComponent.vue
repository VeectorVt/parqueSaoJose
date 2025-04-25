<script setup>
import loteService from "~/services/lotes.service";
const search = ref("");
const lotes = ref([]);
let isSearching = ref(false);
// Buscar lotes ao carregar a página
const fetchLotes = async () => {
  lotes.value = await loteService.getLotes();
  // console.log(lotes.value);
};

onMounted(await fetchLotes);

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
  <div class=" p-5 bg-white shadow-2xl rounded-lg">
    <div class="flex justify-between items-center mb-5">
      <!-- border-blue-600 -->
      <div class=" flex  items-center border-2 rounded-xl w-4/5">
        <div
          class=" text-center w-1/3"
        >
        <SelectComponent/>
        </div>
        <input
          class="w-full p-1  placeholder-gray-400 text-base focus:outline-none"
          type="text"
          placeholder="Pesquisar Lote ..."
          v-model="search"
        />
        <Icon 
          v-if="isSearching"
          name="eos-icons:loading"
          size="25"
          class="mr-2"
        />
        <button
          class="flex items-center h-[2.7em] mr-2 p-3 rounded-xl  bg-[#253D90]"
        >
          <Icon  name="ph:magnifying-glass" size="24" class="bg-white" />
        </button>
      </div>

      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Adicionar Novo Lote
      </button>
    </div>

    <div class="overflow-auto h-[40vh]">
      <table
        class="min-w-full bg-white border border-gray-300 rounded-lg"
      >
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-left">
            <th class="px-4 py-2 border-r border-b">Ações</th>
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
            <td class="px-4 border-r py-3">Edit/Delet</td>
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
