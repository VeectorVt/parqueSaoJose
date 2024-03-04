

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const baixaSchema = new Schema({
    nr_documento: { type: String, maxlength: 50, required: true },
    parcela: { type: Number, required: true },
    codigo_conta:{type:String , required:true}, //Colocar id do schema cógigo conta
    data:{type:String},
    vr_recebido:{type:String},
    cheque:{type:String},
    parcela_1:{type:String},
    historico:{type:String},
    nome:{type:String , required:true}
}, {
    timestamps: true,
    collection: 'baixa',
});



const Baixa = mongoose.model('Baixa', baixaSchema)

module.exports = Baixa
