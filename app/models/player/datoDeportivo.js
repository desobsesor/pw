var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('DatoDeportivo', {
    nombre: String,
    eslogan: String,
    descripcion: String,
    ranking: String,
    nivel: String,
    logos:{
        logo: { 
            data: Buffer, 
            contentType: String 
        },
        escudo: { 
            data: Buffer, 
            contentType: String 
        }
    },
    administrativos:{
        directorTecnico: { 
            type: Schema.ObjectId, 
            ref: "Persona" 
        },    
        entrenador: { 
            type: Schema.ObjectId, 
            ref: "Empresa" 
        }
    },   
    jugadores:{
        capitanI: { 
            type: Schema.ObjectId, 
            ref: "Persona" 
        },    
        capitanII: { 
            type: Schema.ObjectId, 
            ref: "Persona" 
        }
    },  
    patrocinador: { 
        type: Schema.ObjectId, 
        ref: "Empresa" 
    },

//#region CAMPOS ESENCIALES EN EL MODELO
    imagenPrincipal: { 
        data: Buffer, 
        contentType: String 
    },
    archivoPrincipal: { 
        data: Buffer, 
        contentType: String 
    },
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
//#endregion FIN CAMPOS ESENCIALES
});