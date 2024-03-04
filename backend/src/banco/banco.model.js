

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bancoSchema = new Schema({
    codigo_banco: { type: String, required: true },
    conta: { type: String, required: true },
    saldo:{type:String , required:true},
    data_atualizacao:{type:String , required:true},
}, {
    timestamps: true,
    collection: 'banco',
});



const Banco = mongoose.model('Banco', bancoSchema)

module.exports = Banco
