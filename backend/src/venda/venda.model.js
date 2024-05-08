const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendaSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  bairro: { type: String },
  baixa: { type: String },
  cep: { type: String },
  cidade: { type: String },
  codigo_conta: { type: String },
  codigo_situacao: { type: String },
  condicao: { type: String },
  cpf: { type: String },
  data_venda: { type: String },
  endereco: { type: String },
  estado_civil: { type: String },
  identidade: { type: String },
  indexador: { type: String },
  lote: { type: String },
  moeda: { type: String },
  nacionalidade: { type: String },
  nome: { type: String },
  nr_documento: { type: String },
  observacao1: { type: String },
  observacao2: { type: String },
  observacao3: { type: String },
  observacao4: { type: String },
  parcela: { type: Number },
  quadra: { type: String },
  sinal: { type: String },
  telefone: { type: String },
  uf: { type: String },
  valor: { type: String }
}, {
  timestamps: true,
  collection: 'venda'
});

const Venda = mongoose.model('Venda', vendaSchema);

module.exports = Venda;
