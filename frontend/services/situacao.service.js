import $api from './api.services';

export default {
  // Buscar todas as situações
  getSituacoes() {
    return $api('/situacao', {
      method: 'GET',
      ContentType: 'application/json',
    });
  },

  // Buscar situação por ID
  getSituacaoById(id) {
    return $api(`/situacao/${id}`);
  },

  // Criar uma nova situação
  createSituacao(payload) {
    return $api('/situacao', {
      method: 'POST',
      body: payload
    });
  },

  // Atualizar uma situação existente
  updateSituacao(id, payload) {
    return $api(`/situacao/${id}`, {
      method: 'PUT',
      body: payload
    });
  },

  // Deletar uma situação
  deleteSituacao(id) {
    return $api(`/situacao/${id}`, {
      method: 'DELETE'
    });
  }
};