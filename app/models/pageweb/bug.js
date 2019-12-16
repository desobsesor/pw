var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Bug', {
    titulo: String,
    descripcion: String,
    imagen: { data: Buffer, contentType: String },
    fecha: {type: Date, default: Date.now()},
    documentoRegistro: String,
    personaRegistro: { type: Schema.ObjectId, ref: "Persona"}
});