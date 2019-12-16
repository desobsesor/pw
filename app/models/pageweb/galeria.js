var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Galeria', {
    nombre: String,
    descripcion: String,
    metatags: String,
    categoriaGaleria: { type: Schema.ObjectId, ref: "CategoriaGaleria" },
    visitas: Number,
    enPaginaPrincipal: Boolean,
    activo: Boolean,
    meGusta: Number,
    noMeGusta: Number,
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
    imagenPrincipal: String ,
    imagenBanner:  String ,
});