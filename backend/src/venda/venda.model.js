const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendaSchema = new Schema({
  lote: { type: mongoose.Schema.Types.ObjectId, ref: 'Lotes', required: true },
  bairro: String,
  baixa: String,
  cep: String,
  cidade: String,
  codigo_conta: String,
  codigo_situacao: String,
  condicao: String,
  cpf: String,
  data_venda: String,
  endereco: String,
  estado_civil: String,
  identidade: String,
  indexador: String,
  moeda: String,
  nacionalidade: String,
  nome: String,
  nr_documento: { type: String, required: true, unique: true },
  observacao1: String,
  observacao2: String,
  observacao3: String,
  observacao4: String,
  parcela: Number,
  quadra: String,
  sinal: String,
  telefone: String,
  uf: String,
  valor: String
}, {
  timestamps: true,
  collection: 'venda',
});

// Virtual populate for Baixas and Sequenciais
vendaSchema.virtual('baixas', {
  ref: 'Baixa',
  localField: '_id',
  foreignField: 'venda'
});

vendaSchema.virtual('sequenciais', {
  ref: 'Sequencial',
  localField: '_id',
  foreignField: 'venda'
});

vendaSchema.set('toObject', { virtuals: true });
vendaSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Venda', vendaSchema);