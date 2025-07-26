<template>
  <!-- <div class="fixed"> -->
  <!-- Botão do Menu Hambúrguer -->

  <!-- Sidebar -->
  <!-- <transition name="slide"> -->
  <!-- v-if="isOpen" -->
  <aside
    :class="[
      'w-[20vw] bg-[#121c3e] shadow-lg overflow-y-auto transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
    class="fixed top-0 left-0 h-full z-40"
  >
    <div class="p-4">
      <HamburguerComponent
        v-if="isOpen"
        :is-Open="isOpen"
        @toggleMenu="toggleMenu"
      />
      <!-- Logo/Nome do Sistema -->
      <!-- Perfil do Usuário -->
      <div class="flex bottom-0 left-0 right-0 p-4 border-b">
        <div class="flex items-center space-x-3">
          <div>
            <p class="text-sm text-white font-medium">Elisabete Calheiros</p>
            <p class="text-xs text-gray-500">View profile</p>
          </div>
        </div>
      </div>
      <!-- Menu Principal -->
      <nav class="mt-5">
        <ul class="space-y-2">
          <li>
            <NuxtLink to="/">
              <a
                :class="[isActive === 'lotes' ? 'bg-[#ffc20e] text-black' : '']"
                @click="toggleItens('lotes')"
                href="#"
                class="flex items-center space-x-3 p-2 rounded-lg active:bg-yellow-700"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Consulta de Lotes</span>
              </a>
            </NuxtLink>
          </li>
          <!-- Repetir para outros itens -->
          <li>
        
              <NuxtLink to="/vendas">
                <a
                  :class="[isActive === 'vendas' ? 'bg-[#ffc20e] text-black' : '']"
                  @click="toggleItens('vendas')"
                  href="#"
                  class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  >📁 Consulta de Vendas</a>

              </NuxtLink>
         
            
          </li>
          <li>
            <a
              :class="[
                isActive === 'situacao' ? 'bg-[#ffc20e] text-black' : '',
              ]"
              @click="toggleItens('situacao')"
              href="#"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900">📁 Consulta de Situação</a>
          </li>
        </ul>
      </nav>
      <!-- Seção "Your Items" -->
      <div class="mt-8">
        <h3 class="px-2 text-sm font-medium text-gray-500">Configurações</h3>
        <ul class="mt-2 space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center space-x-3 px-2 py-1.5 text-sm rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              >🟢 Configurações</a
            >
          </li>
        </ul>
      </div>
    </div>
  </aside>
  <!-- </transition> -->
  <!-- </div> -->
</template>

<script setup>
const emit = defineEmits(['toggleMenu'])

defineProps({
  isOpen: Boolean,
});

let isActive = ref(null);

const toggleItens = (itemActive) => {
  isActive.value = isActive.value === itemActive ? null : itemActive;
};

const toggleMenu = () => {
  emit('toggleMenu');
};
</script>

<style scoped>
/* .slide-enter-active, .slide-leave-active {
  transition: transform opacity 0.3s 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
} */

span,
a {
  color: #f8f9fa;
}
span:hover,
a:hover {
  background-color: #ffc20e;
  color: black;
}

main {
  padding: 2rem;
}
</style>
