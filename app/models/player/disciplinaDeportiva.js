var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DisciplinaDeportiva', {
    nombre: String,
    descripcion: String,
    tiempoDeJuego: Number, //en minutos
    periodosDeJuego: Number,
    valorTiempoDescanso: Number,
    numeroJugadoresPorEquipo: Number,
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    fotoPrincipal: { data: Buffer,  contentType: String },
    fotoBanner: { data: Buffer, contentType: String }
});