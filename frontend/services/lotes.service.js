import $api from './api.services';

export default {
  // Buscar todos os lotes
  getLotes() {
    return $api('/lotes', {
      method: 'GET',
      ContentType: 'application/json',
    });
  },


  // Buscar lote por ID
  getLoteById(id) {
    return $api(`/lotes/${id}`);
  },

  buscarQuadraELote(quadra, lote) {
    const params = new URLSearchParams({ quadra, lote });
    return $api(`/lotes/filter?${params.toString()}`, {
      method: 'GET',
      ContentType: 'application/json',
    });
  },


  // Criar um novo lote
  createLote(payload) {
    return $api('/register/lotes', {
      method: 'POST',
      body: payload
    });
  },

  // Atualizar um lote existente
  updateLote(id, payload) {
    return $api(`/edit/lotes/${id}`, {
      method: 'PUT',
      body: payload
    });
  },

  // Deletar um lote
  deleteLote(id) {
    return $api(`/delete/lotes/${id}`, {
      method: 'DELETE'
    });
  },

  paginationLote(size,cursor , prevCursor , quadra , lote) {
    // const { size, cursor, prevCursor, quadra, lote } = searchFilterParam
  
    const params = new URLSearchParams({ size, cursor, prevCursor, quadra, lote });
    return $api(`/lotes/filter/pagination?${params.toString()}`, {
      method: 'GET',
      ContentType: 'application/json',
    });
  }

};
