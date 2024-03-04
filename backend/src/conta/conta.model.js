

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contaSchema = new Schema({
    codigo_conta: { type: String, required: true },
    titulo: { type: String, required: true },
    saldo_anterior:{type:String , required:true},
    vr_debito:{type:String , required:true},
    vr_credito:{type:String , required:true},
    saldo_atual:{type:String , required:true},
    data_atualizacao:{type:String , required:true},
}, {
    timestamps: true,
    collection: 'conta',
});



const Conta = mongoose.model('Conta', contaSchema)

module.exports = Conta
