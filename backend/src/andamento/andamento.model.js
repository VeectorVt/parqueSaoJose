

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const andamentoSchema = new Schema({
    codigo_andamento: { type: String, maxlength: 50, required: true },
    andamento: { type: String, maxlength: 30, required: true },
}, {
    timestamps: true,
    collection: 'andamento',
});



const Andamento = mongoose.model('Andamento', andamentoSchema)

module.exports = Andamento
