var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Jugada', {
    nombre: String,
    descripcion: String,
    tiempoDeJuego: String,
    personaRegistro: { 
        type: Schema.ObjectId, 
        ref: "Persona" },
    fechaRegistro: { 
        type: Date, 
        default: Date.now() },
    personaCambio: { 
        type: Schema.ObjectId,
        ref: "Persona" },
    fechaCambio: { 
        type: Date, 
        default: Date.now() },
    fotoPrincipal: { 
        data: Buffer, 
        contentType: String },
    fotoBanner: { 
        data: Buffer, 
        contentType: String }
});