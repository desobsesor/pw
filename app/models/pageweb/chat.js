var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Chat', {
    nombre: String,
    mensaje: String,
    anulado: String,
    descripcion: String,
    orden: String,
    url: String,
    visitas: Number,
    activo: Boolean,
    meGusta: Number,
    noMeGusta: Number,
    enPaginaPrincipal: Boolean,
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    imagenPrincipal:  String
});