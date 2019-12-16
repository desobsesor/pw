var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('RolPersona', {
    rol: {
        type: Schema.ObjectId,
        ref: "Rol"
    },
    persona: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    activo: Boolean,
    personaRegistro: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now()
    },
    personaCambio: {
        type: Schema.ObjectId,
        ref: "Persona"
    },
    fechaCambio: {
        type: Date,
        default: Date.now()
    }
});

//db.rol.insert(
//    {
//        rol: "",
//        persona: ObjectId("5bae6d3756f173a36704da7f"),
//        activo: true,
//        personaRegistro: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaRegistro: Date.now(),
//        personaCambio: ObjectId("5bae6d3756f173a36704da7f"),
//        fechaCambio: Date.now()
//});