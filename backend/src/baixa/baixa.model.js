const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baixaSchema = new Schema({
  venda: { type: mongoose.Schema.Types.ObjectId, ref: 'Venda', required: true },
  parcela: { type: Number, required: true },
  codigo_conta: { type: String, required: true },
  data: String,
  vr_recebido: String,
  cheque: String,
  parcela_1: String,
  historico: String,
  nome: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'baixa',
});

module.exports = mongoose.model('Baixa', baixaSchema);
