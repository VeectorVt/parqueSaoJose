// TODO : AJUSTAR COLLECTION NO  BANCO CASO PRECISE (TABELA DESATUALIZADA) USAR LOTEAMENTO.MDB


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sequencialSchema = new Schema({
  venda: { type: mongoose.Schema.Types.ObjectId, ref: 'Venda' },
  andamento: String,
  chave: String,
  codigo_andamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Andamento' },
  estacao: String,
  identificacao: String,
  valor: String,
  valor_anterior: String
}, {
  timestamps: true,
  collection: 'sequencial',
});

module.exports = mongoose.model('Sequencial', sequencialSchema);
