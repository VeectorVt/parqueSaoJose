<template>
  <header class="bg-blue-500 text-white p-4 text-center">
    <nav>
      <h1 class="text-xl font-bold">Gerenciamento</h1>
      <!-- Adicione links ou navegação aqui -->
    </nav>
  </header>
  <div class="flex flex-col min-h-screen">
    <div class="min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside
        class="fixed inset-y-0 left-0 w-64 bg-[#121c3e] shadow-lg overflow-y-auto transition-all duration-300"
      >
        <div class="p-4">
          <!-- Logo/Nome do Sistema -->
        
        <!-- Perfil do Usuário -->
        <div class="flex bottom-0 left-0 right-0 p-4 border-b">
          <div class="flex items-center space-x-3">
            <img
              class="w-8 h-8 rounded-full"
              src="https://placeholder.co/32"
              alt="Tom Cook"
            />
            <div>
              <p class="text-sm font-medium">Tom Cook</p>
              <p class="text-xs text-gray-500">View profile</p>
            </div>
          </div>
        </div>

          <!-- Menu Principal -->
          <nav class="mt-5">
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center space-x-3 p-2 rounded-lg"
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
              </li>
              <!-- Repetir para outros itens -->
              <li>
                <a
                  href="#"
                  class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  >📁 Consulta de Vendas</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                  >📁 Consulta de Situação</a
                >
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

      <!-- Conteúdo Principal -->
      <main class="ml-64 p-8">
        <NuxtPage />
        <!-- Conteúdo da página aqui -->
      </main>
    </div>

    <!-- <main class="flex-grow p-6">
            <nuxt />
          
        </main> -->
    <footer class="bg-gray-100 text-gray-600 p-4 text-center mt-auto">
      <p>&copy; 2024 - Todos os direitos reservados</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
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

span, a{
color:#f8f9fa;
}
span:hover , a:hover{
    background-color: #ffc20e;
    color: black;
}

main {
  padding: 2rem;
}
</style>
