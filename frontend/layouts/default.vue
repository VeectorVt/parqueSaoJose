<template>
     <div class="flex mx-auto min-h-screen bg-gray-100">
       <div class=" flex max-w-[20%]  bg-gray-100">
        <!-- Menu -->
        <MenuOverlay  v-if="true" />
        <!-- Conteúdo Principal -->
        </div>
       
         <div class="flex min-w-[80%]  min-h-screen flex-col">
           <header class="bg-blue-500  text-white p-4 text-center">
             <nav class="flex justify-between items-center">
                   <div class="w=1/4 flex justify-start">
            <button
              @click="toggleMenu"
              class="flex-item z-50 text-white p-2 focus:outline-none"
            >
              <!-- Ícone do hambúrguer (você pode substituir pelo seu ícone preferido) -->
              <svg
                v-if="!isOpen"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
              <!-- Ícone de fechar -->
              <svg
                v-else
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
                   </div>
                   <div class="flex-grow text-center">
            <h1 class="text-xl text-center font-bold">Gerenciamento de Lotes</h1>
                   </div>
             </nav>
           </header>
            <!-- ml-64  -->
           <main class=" p-8">
            <NuxtPage />
            <!-- Conteúdo da página aqui -->
           </main>
           <!-- <div class=" flex-col h-screen"> -->
           <!-- </div> -->
           <footer class="bg-gray-100 text-gray-600 p-4 text-center mt-auto">
                   <p>&copy; 2024 - Todos os direitos reservados</p>
             </footer>
         </div>
     </div>

</template>

<script setup>
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style scoped>
header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
}

footer {
  background-color: #f8f9fa;
  color: #6c757d;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

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
