var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Foto', {
    nombre: String,
    descripcion: String,
    url: String,  
    visibleEnGaleria: Boolean,
    activo: Boolean,
    meGusta: Number,
    noMeGusta: Number,
    galeria: { type: Schema.ObjectId, ref: "Galeria" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() }
});