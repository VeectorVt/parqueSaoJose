import $api from './api.services';

export default {
  // Buscar todos os lotes
  getLotes() {
    return $api('/lotes' , {
        method: 'GET',
        ContentType: 'application/json',
    });
  },


  // Buscar lote por ID
  getLoteById(id) {
    return $api(`/lotes/${id}`);
  },

  // Criar um novo lote
  createLote(payload) {
    return $api('/lotes', {
      method: 'POST',
      body: payload
    });
  },

  // Atualizar um lote existente
  updateLote(id, payload) {
    return $api(`/lotes/${id}`, {
      method: 'PUT',
      body: payload
    });
  },

  // Deletar um lote
  deleteLote(id) {
    return $api(`/lotes/${id}`, {
      method: 'DELETE'
    });
  }
};
