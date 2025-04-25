<template>
  <div
    class="flex mx-auto will-change-auto min-h-screen transition-all duration-300 bg-gray-100"
  >
    <!-- <transition name="slide"> -->
    <div class="flex max-w-[20%] transition-all duration-300 bg-gray-100">
      <!-- Menu -->

      <MenuOverlay @toggleMenu="toggleMenu" :is-Open="isOpen" />
      <!-- Conteúdo Principal -->
    </div>
    <!-- </transition> -->
    <div class="flex min-w-[80%] min-h-screen flex-col">
      <header class="bg-blue-500 text-white p-4 text-center">
        <nav class="flex justify-between items-center">
          <HamburguerComponent
            v-if="!isOpen"
            :is-Open="isOpen"
            @toggleMenu="toggleMenu"
          />
          <div class="flex-grow text-center">
            <h1 class="text-xl text-center font-bold">
              Gerenciamento de Lotes
            </h1>
          </div>
        </nav>
      </header>
      <!-- ml-64  -->
      <main
        :class="[
          'p-8 transition-all duration-300',
          isOpen ? 'ml-[20vw] lg:ml-[20vw] md:ml-0 sm:ml-0' : 'ml-0',
        ]"
        class="p-8"
      >
        <NuxtPage />
        <!-- Conteúdo da página aqui -->
      </main>
      <!-- <div class=" flex-col h-screen"> -->
      <!-- </div> -->
      <footer class="bg-gray-100 text-gray-600 p-4 text-center mt-auto">
        <p>&copy; 2025 - Todos os direitos reservados</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// const closeMenu = () => {
//   isOpen.value = false;
// };
</script>

<style scoped>
/* .slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
} */
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
