

const mongoose = require('mongoose')


const Schema = mongoose.Schema

const lotesSchema = new Schema({
    quadra: { type: String, required: [true, "O campo quadra é obrigatório"] },
    lote: { type: String, required: [true, "O campo lote é obrigatório"]  },
    area_total: { type: String },
    frente: { type: String },
    area_fr: { type: String },
    fundo: { type: String },
    area_fu: { type: String },
    direito: { type: String },
    area_ld: { type: String },
    esquerdo: { type: String },
    area_le: { type: String },
    medidas: { type: String },
    vr_metro_quadrado: { type: String },
    vr_lote: { type: String },
    codigo_situacao: { type: String },
    iptu: { type: String },
    iptu_desdobramento: { type: String },
    inscricao_municipal: { type: String },
    status_lote: { type: String }
}, {
    timestamps: true,
    collection: 'lotes',
});



const Lotes = mongoose.model('Lotes', lotesSchema)

module.exports = Lotes
