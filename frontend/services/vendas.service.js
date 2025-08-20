import $api from './api.services';

export default {
  // Buscar todas as vendas
  getVendas() {
    return $api('/vendas', {
      method: 'GET',
      ContentType: 'application/json',
    });
  },

  // Buscar venda por ID
  getVendaById(id) {
    return $api(`/vendas/${id}`);
  },

  // Criar uma nova venda
  createVenda(payload) {
    return $api('/vendas', {
      method: 'POST',
      body: payload
    });
  },

  // Atualizar uma venda existente
  updateVenda(id, payload) {
    return $api(`/vendas/${id}`, {
      method: 'PUT',
      body: payload
    });
  },

  // Deletar uma venda
  deleteVenda(id) {
    return $api(`/vendas/${id}`, {
      method: 'DELETE'
    });
  },

  // Paginação e filtro de vendas
  paginationVenda(size, cursor, prevCursor, quadra, lote, nome, lastPage, firstPage, isFilter) {
    const params = new URLSearchParams({ size, cursor, prevCursor, quadra, lote, nome, lastPage, firstPage, isFilter });
    return $api(`/venda/filter/pagination?${params.toString()}`, {
      method: 'GET',
      ContentType: 'application/json',
    });
  },

  // Exportar vendas para Excel
  exportVendasExcel(size, cursor, prevCursor, quadra, lote, lastPage, firstPage, isFilter) {
    const params = new URLSearchParams({ size, cursor, prevCursor, quadra, lote, lastPage, firstPage, isFilter });
    return $api(`/vendas/export/excel?${params.toString()}`, {
      method: 'GET',
      responseType: 'blob',
    });
  },

  // Obter informações para o gráfico de vendas
  getGraficoVendas(quadra, lote) {
    const params = new URLSearchParams({ quadra, lote });
    return $api(`/vendas/grafico?${params.toString()}`, {
      method: 'GET',
      ContentType: 'application/json',
    });
  },

  // Obter informações para o relatório de vendas
  getRelatorioVendas(quadra, lote, dataInicio, dataFim) {
    const params = new URLSearchParams({ quadra, lote, dataInicio, dataFim });
    return $api(`/vendas/relatorio?${params.toString()}`, {
      method: 'GET',
      ContentType: 'application/json',
    });
  },
};