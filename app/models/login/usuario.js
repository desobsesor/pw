var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Usuario', {
    usuario: String,
    nombreCompleto: String,
    documento: String,
    passwordHash: String,
    passwordSalt: String,
    persona: { type: Schema.ObjectId, ref: "Persona" },
    activo: Boolean,
    correo: String,
    nivelEducativo: { type: Schema.ObjectId, ref: "NivelEducativo" },
    telefono: String,
    direccion: String,
    imagen: String,
    rol: { type: Schema.ObjectId, ref: "Rol" }
});