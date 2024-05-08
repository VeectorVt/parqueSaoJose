const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lancamentoSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId },
  codigo_conta: String,
  codigo_despesas: String,
  credito: String,
  data_movimento: String,
  debito: String,
  historico: String,
  nr_chque: String
} , {
  timestamps: true,
  collection: 'lancamento',
});

const Lancamento = mongoose.model('Lancamento', lancamentoSchema);

module.exports = Lancamento;