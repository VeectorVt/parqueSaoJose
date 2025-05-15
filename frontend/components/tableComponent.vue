<template>
  <div class="overflow-auto h-[40vh]">
    <table
      v-if="!isLoading"
      class="min-w-full bg-white border border-gray-300 rounded-lg"
    >
      <thead>
        <tr class="bg-gray-100 text-gray-700 text-left">
          <th  class="px-4 py-2 border-r border-b w-12">Ações</th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="['px-4', 'py-2', 'border-r', 'border-b', column.class]"
          >
            {{ column.class }}
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="border-b hover:bg-gray-50 transition"
        >
          <td  class="px-4 border-r py-3">
            <div class="flex items-center justify-center">
              <button
                
                @click="() => onEdit(row)"
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
            class="px-4 border-r py-3"
          >
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
const emit  = defineEmits(['onEdit', 'onDelete']);

const onEdit = (row) => {
  emit('onEdit', row);
};

const onDelete = (id) => {
  emit('onDelete', id);
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

th {
  background-color: #f4f4f4;
}

</style>
