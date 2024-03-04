

const mongoose = require('mongoose')


const Schema = mongoose.Schema

const lotesSchema = new Schema({
    Quadra: { type: String, maxlength: 50, required: true },
    Lote: { type: String, maxlength: 30, required: true },
    // id_User:User.db.id
}, {
    timestamps: true,
    collection: 'lotes',
});



const Lotes = mongoose.model('Lotes', lotesSchema)

module.exports = Lotes
