const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const situacaoSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  codigo_situacao: { type: String },
  situacao: { type: String }
}, {
  timestamps: true,
  collection: 'situacao'
});

const Situacao = mongoose.model('Situacao', situacaoSchema);

module.exports = Situacao;
