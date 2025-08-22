<!-- filepath: c:\Users\victo\Documents\1Estudos\Apis\parqueSaoJose\frontend\components\Listas\ModalComponentLote.vue -->
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
          <h3 class="text-lg font-medium mb-4">{{ !isUpdate ? 'Adicionar Lote' : 'Editar Lote' }}</h3>

          <div id="first-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label
                for="quadra"
                class="block text-sm font-medium text-gray-700"
                >Quadra</label
              >
              <input
                id="quadra"
                v-model="lote.quadra"
                placeholder="Quadra"
                class="input-field"
              />
            </div>
            <div>
              <label for="lote" class="block text-sm font-medium text-gray-700"
                >Lote</label
              >
              <input
                id="lote"
                v-model="lote.lote"
                placeholder="Lote"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="status_lote"
                class="block text-sm font-medium text-gray-700"
                >Status Lote</label
              >
              <input
                id="status_lote"
                v-model="lote.status_lote"
                placeholder="Status Lote"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="codigo_situacao"
                class="block text-sm font-medium text-gray-700"
                >Código Situação</label
              >
              <input
                id="codigo_situacao"
                v-model="lote.codigo_situacao"
                placeholder="Código Situação"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="medidas"
                class="block text-sm font-medium text-gray-700"
                >Medidas</label
              >
              <input
                id="medidas"
                v-model="lote.medidas"
                placeholder="Medidas"
                class="input-field"
              />
            </div>
          </div>

          <div id="second-line" class="grid grid-cols-5 gap-4 mb-4">
            <div class="col-span-2">
              <label
                for="frente"
                class="block text-sm font-medium text-gray-700"
                >Frente</label
              >
              <input
                id="frente"
                v-model="lote.frente"
                placeholder="Frente"
                class="input-field"
              />
            </div>
            <div class="col-span-2">
              <label for="fundo" class="block text-sm font-medium text-gray-700"
                >Fundo</label
              >
              <input
                id="fundo"
                v-model="lote.fundo"
                placeholder="Fundo"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="direito"
                class="block text-sm font-medium text-gray-700"
                >Direito</label
              >
              <input
                id="direito"
                v-model="lote.direito"
                placeholder="Direito"
                class="input-field"
              />
            </div>
          </div>

          <div id="third-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label
                for="esquerdo"
                class="block text-sm font-medium text-gray-700"
                >Esquerdo</label
              >
              <input
                id="esquerdo"
                v-model="lote.esquerdo"
                placeholder="Esquerdo"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="area_total"
                class="block text-sm font-medium text-gray-700"
                >Área Total</label
              >
              <input
                id="area_total"
                v-model="lote.area_total"
                placeholder="Área Total"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="area_fr"
                class="block text-sm font-medium text-gray-700"
                >Área FR</label
              >
              <input
                id="area_fr"
                v-model="lote.area_fr"
                placeholder="Área FR"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="area_fu"
                class="block text-sm font-medium text-gray-700"
                >Área FU</label
              >
              <input
                id="area_fu"
                v-model="lote.area_fu"
                placeholder="Área FU"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="area_ld"
                class="block text-sm font-medium text-gray-700"
                >Área LD</label
              >
              <input
                id="area_ld"
                v-model="lote.area_ld"
                placeholder="Área LD"
                class="input-field"
              />
            </div>
          </div>

          <div id="fourth-line" class="grid grid-cols-5 gap-4 mb-4">
            <div>
              <label
                for="area_le"
                class="block text-sm font-medium text-gray-700"
                >Área LE</label
              >
              <input
                id="area_le"
                v-model="lote.area_le"
                placeholder="Área LE"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="inscricao_municipal"
                class="block text-sm font-medium text-gray-700"
                >Inscrição Municipal</label
              >
              <input
                id="inscricao_municipal"
                v-model="lote.inscricao_municipal"
                placeholder="Inscrição Municipal"
                class="input-field"
              />
            </div>
            <div>
              <label for="iptu" class="block text-sm font-medium text-gray-700"
                >IPTU</label
              >
              <input
                id="iptu"
                v-model="lote.iptu"
                placeholder="IPTU"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="iptu_desdobramento"
                class="block text-sm font-medium text-gray-700"
                >IPTU Desdobramento</label
              >
              <input
                id="iptu_desdobramento"
                v-model="lote.iptu_desdobramento"
                placeholder="IPTU Desdobramento"
                class="input-field"
              />
            </div>
            <div>
              <label
                for="vr_lote"
                class="block text-sm font-medium text-gray-700"
                >Valor Lote</label
              >
              <input
                id="vr_lote"
                v-model="lote.vr_lote"
                placeholder="Valor Lote"
                class="input-field"
              />
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
  lote: Object,
  isUpdate:Boolean
});

onMounted(() => {
 console.log("Lote:", props.lote);
  // if (props.isUpdate) {
  //   // If it's an update, we can pre-fill the form with the lote data
  //   lote.value = { ...props.lote };
  // }
});
function confirmSelection() {
  // Emit an event to the parent component with the selected value
  console.log("Lote:", props.lote);
 emit("onConfirmSelection", props.lote);
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
