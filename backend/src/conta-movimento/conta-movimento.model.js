

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contaMovimentoSchema = new Schema({
    codigo_conta: { type: String, required: true },
    data_movimento:{type:String , required:true},
    nr_chque:{type:String , required:true},
    historico:{type:String , required:true},
    debito:{type:String , required:true},
    credito: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'conta-movimento',
});



const ContaMovimento = mongoose.model('ContaMovimento', contaMovimentoSchema)

module.exports = ContaMovimento
