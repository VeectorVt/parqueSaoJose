// TODO : AJUSTAR COLLECTION NO  BANCO CASO PRECISE (TABELA DESATUALIZADA) USAR LOTEAMENTO.MDB


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sequencialSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  andamento: { type: String },
  chave: { type: String },
  codigo_andamento: { type: String },
  estacao: { type: String },
  identificacao: { type: String },
  valor: { type: String },
  valor_anterior: { type: String }
}, {
  timestamps: true,
  collection: 'sequencial',
});

const Sequencial = mongoose.model('Sequencial', sequencialSchema);

module.exports = Sequencial;
