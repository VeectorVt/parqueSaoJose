<template>
    <div>
        <tableComponent/>
    </div>
</template>

<script setup>
//   import { useUserStore } from '~/stores/user';
//   const userStore = useUserStore()

//   watch(() => windowWidth.value, () => {
//       if (windowWidth.value >= 767) {
//           userStore.isMenuOverlay = false
//       }
//   })
//   let tabelaDados = ref(null)

</script>

<style scoped>



table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

th, td {
    padding: 8px;
}

th {
    background-color: #f4f4f4;
}
</style>