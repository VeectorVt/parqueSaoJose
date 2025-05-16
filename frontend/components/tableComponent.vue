<template>
  <!-- TODO Ajustes da tabela -->
  <div ref="scrollContainer" class="overflow-auto h-[45vh]">
    <table
      v-if="!isLoading"
      class="overflow-auto max-w-full table-auto bg-white border border-gray-300 rounded-lg"
    >
      <thead>
        <tr class="bg-gray-100 w-full text-gray-700 text-left">
          <th
            class="border-[#9794948e] sticky top-0 left-0 bg-gray-300 z-30 px-1 py-1 border-r border-b w-12"
          >
            Ações
          </th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="sticky top-0 bg-gray-300 z-20"
            :class="[
              'px-2',
              'py-2',
              'border-r-2',
              'border-[#9794948e]',
              'border-b',
              'min-w-[120px]',
              'max-w-full',
              'truncate',
              column.class,
              scrolledLeft ? column.class3 : '',
            ]"
          >
            <!-- :style="{ width: column.width , minWidth: column.minWidth }" -->
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="border-b  border-[#9794948e] transition"
          :class="[scrolledLeft ? 'border-b-2 ' : '']"
        >
          <td
            class="px-4 py-3 border-[#9794948e] border-r border-b"
            :class="[
              scrolledLeft
                ? 'bg-white shadow-md z-10 sticky left-0  min-w-[60px] border-[#9794948e] '
                : '',
            ]"
          >
            <div class="flex items-center justify-center">
              <button
                @click="() => onEdit(row)"
                title="Editar"
                class="flex items-center h-[2.7em] mr-2 p-1 rounded-xl"
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
                @click="() => onDelete(row._id)"
              >
                <Icon
                  name="material-symbols:delete-outline"
                  class="text-[#e9130c]"
                  size="24"
                />
              </button>
            </div>
          </td>
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :class="[
              'px-4',
              'py-3',
              'border-r',
              'border-b',
              'border-[#9794948e]',
              column.class || '',
              scrolledLeft ? column.class2 : '',
            ]"
          >
            <!-- :style="{ width: column.width }" -->
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  //   Emits:
  //   onEdit: Function,
  //   onDelete: Function,
});

const scrollContainer = ref(null);
const scrolledLeft = ref(false);

onMounted(() => {
  const el = scrollContainer.value;
  if (!el) return;

  const handleScroll = () => {
    scrolledLeft.value = el.scrollLeft > 0;
  };

  el.addEventListener("scroll", handleScroll);
});

const emit = defineEmits(["onEdit", "onDelete"]);

const onEdit = (row) => {
  emit("onEdit", row);
};

const onDelete = (id) => {
  emit("onDelete", id);
};

// const hasActions = !!(typeof onEdit === 'function' || typeof onDelete === 'function');
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 8px;
}
/* 
th {
  background-color: #f4f4f4;
} */

/* .frente {
  width: 130vw !important;
} */
</style>
