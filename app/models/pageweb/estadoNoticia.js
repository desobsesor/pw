var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('EstadoNoticia', {
    estado: String,
    descripcion: String,
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
    },
    imagenPrincipal: { 
        data: Buffer, 
        contentType: String 
    }
});