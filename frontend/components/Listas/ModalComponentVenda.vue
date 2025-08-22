<template>
  <div>
    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          class="fixed inset-0 bg-black opacity-50"
          @click="closeModal"
        ></div>

        <div class="bg-white rounded-md p-4 shadow-lg z-50 w-[70vw]">
          <h3 class="text-lg font-medium mb-4">{{ !isUpdate ? 'Adicionar Venda' : 'Editar Venda' }}</h3>

          <div id="first-line" class="grid grid-cols-[5rem_5rem_7fr_2fr_1fr] gap-4 mb-4">
            <div >
              <label for="quadra" class="block text-sm font-medium text-gray-700">Quadra</label>
              <input id="quadra" v-model="venda.quadra" placeholder="Quadra" class="input-field" />
            </div>
            <div>
              <label for="lote" class="block text-sm font-medium text-gray-700">Lote</label>
              <input id="lote" v-model="venda.lote" placeholder="Lote" class="input-field" />
            </div>
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
              <input id="nome" v-model="venda.nome" placeholder="Nome" class="input-field" />
            </div>
            <div>
              <label for="cpf" class="block text-sm font-medium text-gray-700">CPF</label>
              <input id="cpf" v-model="venda.cpf" placeholder="CPF" class="input-field" />
            </div>
            <div>
              <label for="parcela" class="block text-sm font-medium text-gray-700">Parcela</label>
              <input id="parcela" v-model="venda.parcela" placeholder="Parcela" class="input-field" />
            </div>
          </div>

          <div id="second-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label for="valor" class="block text-sm font-medium text-gray-700">Valor</label>
              <input id="valor" v-model="venda.valor" placeholder="Valor" class="input-field" />
            </div>
            <div>
              <label for="data_venda" class="block text-sm font-medium text-gray-700">Data Venda</label>
              <input id="data_venda" v-model="venda.data_venda" placeholder="Data Venda" class="input-field" />
            </div>
            <div>
              <label for="nr_documento" class="block text-sm font-medium text-gray-700">Nr Documento</label>
              <input id="nr_documento" v-model="venda.nr_documento" placeholder="Nr Documento" class="input-field" />
            </div>
            <div>
              <label for="codigo_situacao" class="block text-sm font-medium text-gray-700">Código Situação</label>
              <input id="codigo_situacao" v-model="venda.codigo_situacao" placeholder="Código Situação" class="input-field" />
            </div>
            <div>
              <label for="telefone" class="block text-sm font-medium text-gray-700">Telefone</label>
              <input id="telefone" v-model="venda.telefone" placeholder="Telefone" class="input-field" />
            </div>
          </div>

          <div id="third-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label for="bairro" class="block text-sm font-medium text-gray-700">Bairro</label>
              <input id="bairro" v-model="venda.bairro" placeholder="Bairro" class="input-field" />
            </div>
            <div>
              <label for="cidade" class="block text-sm font-medium text-gray-700">Cidade</label>
              <input id="cidade" v-model="venda.cidade" placeholder="Cidade" class="input-field" />
            </div>
            <div>
              <label for="uf" class="block text-sm font-medium text-gray-700">UF</label>
              <input id="uf" v-model="venda.uf" placeholder="UF" class="input-field" />
            </div>
            <div>
              <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
              <input id="cep" v-model="venda.cep" placeholder="CEP" class="input-field" />
            </div>
            <div>
              <label for="endereco" class="block text-sm font-medium text-gray-700">Endereço</label>
              <input id="endereco" v-model="venda.endereco" placeholder="Endereço" class="input-field" />
            </div>
          </div>

          <div id="fourth-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label for="estado_civil" class="block text-sm font-medium text-gray-700">Estado Civil</label>
              <input id="estado_civil" v-model="venda.estado_civil" placeholder="Estado Civil" class="input-field" />
            </div>
            <div>
              <label for="identidade" class="block text-sm font-medium text-gray-700">Identidade</label>
              <input id="identidade" v-model="venda.identidade" placeholder="Identidade" class="input-field" />
            </div>
            <div>
              <label for="nacionalidade" class="block text-sm font-medium text-gray-700">Nacionalidade</label>
              <input id="nacionalidade" v-model="venda.nacionalidade" placeholder="Nacionalidade" class="input-field" />
            </div>
            <div>
              <label for="moeda" class="block text-sm font-medium text-gray-700">Moeda</label>
              <input id="moeda" v-model="venda.moeda" placeholder="Moeda" class="input-field" />
            </div>
            <div>
              <label for="indexador" class="block text-sm font-medium text-gray-700">Indexador</label>
              <input id="indexador" v-model="venda.indexador" placeholder="Indexador" class="input-field" />
            </div>
          </div>

          <div id="fifth-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label for="codigo_conta" class="block text-sm font-medium text-gray-700">Código Conta</label>
              <input id="codigo_conta" v-model="venda.codigo_conta" placeholder="Código Conta" class="input-field" />
            </div>
            <div>
              <label for="condicao" class="block text-sm font-medium text-gray-700">Condição</label>
              <input id="condicao" v-model="venda.condicao" placeholder="Condição" class="input-field" />
            </div>
            <div>
              <label for="sinal" class="block text-sm font-medium text-gray-700">Sinal</label>
              <input id="sinal" v-model="venda.sinal" placeholder="Sinal" class="input-field" />
            </div>
            <div>
              <label for="baixa" class="block text-sm font-medium text-gray-700">Baixa</label>
              <input id="baixa" v-model="venda.baixa" placeholder="Baixa" class="input-field" />
            </div>
            <!-- <div>
              <label for="lote_id" class="block text-sm font-medium text-gray-700">Lote ID</label>
              <input id="lote_id" v-model="venda.lote_id" placeholder="Lote ID" class="input-field" />
            </div> -->
          </div>

          <div id="sixth-line" class="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label for="observacao1" class="block text-sm font-medium text-gray-700">Observação 1</label>
              <input id="observacao1" v-model="venda.observacao1" placeholder="Observação 1" class="input-field" />
            </div>
            <div>
              <label for="observacao2" class="block text-sm font-medium text-gray-700">Observação 2</label>
              <input id="observacao2" v-model="venda.observacao2" placeholder="Observação 2" class="input-field" />
            </div>
            <div>
              <label for="observacao3" class="block text-sm font-medium text-gray-700">Observação 3</label>
              <input id="observacao3" v-model="venda.observacao3" placeholder="Observação 3" class="input-field" />
            </div>
            <div>
              <label for="observacao4" class="block text-sm font-medium text-gray-700">Observação 4</label>
              <input id="observacao4" v-model="venda.observacao4" placeholder="Observação 4" class="input-field" />
            </div>
          </div>

          <div class="mt-4 flex justify-end">
            <button
              @click="confirmSelection"
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mr-2"
            >
              Confirmar
            </button>
            <button
              @click="closeModal"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggleMenu", "onConfirmSelection"]);

const props = defineProps({
  isModalOpen: Boolean,
  venda: Object,
  isUpdate: Boolean
});
function confirmSelection() {
  emit("onConfirmSelection", props.venda);
}

function closeModal() {
  emit("toggleMenu");
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
}

.col-span-2 .input-field {
  width: 100%;
}
</style>