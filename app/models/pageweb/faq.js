var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Faq', {
    titulo: String,
    descripcion: String,
    observacion: String,
    fecha: {type: Date, default: Date.now()},
    autor: { type: Schema.ObjectId, ref: "Usuario"}
});