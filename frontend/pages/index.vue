<template>
    <div>
        <h1>Tabela de Informações</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Quadra</th>
                    <th>Lote</th>
                    <th>Venda</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tabelaDados" :key="index">
                    <td>{{ item.quadra }}</td>
                    <td>{{ item.lote }}</td>
                    <td>{{ item.venda }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabelaDados: [
                { quadra: 'A1', lote: '101', venda: 'Sim' },
                { quadra: 'B2', lote: '202', venda: 'Não' },
                { quadra: 'C3', lote: '303', venda: 'Sim' },
            ],
        };
    },
};
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