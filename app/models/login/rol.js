var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Rol', {
    rol: String,
    descripcion: String,
    activo: Boolean,
    personaRegistro: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    }
});
