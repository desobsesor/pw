var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Contenido', {
    url: String,
    titulo: String,
    descripcion: String,
    html: String,
    metatags: String,
    visitas: Number,
    activo: Boolean,
    voto: {
        excelente: Boolean,
        bueno: Boolean,
        regular: Boolean,
        malo: Boolean
    },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    imagenPrincipal: { data: Buffer, contentType: String },
    imagenBanner: { data: Buffer, contentType: String }
});