var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('UsuarioRegistrado', {
    nombres: {
        primerNombre: String,
        segundoNombre: String
    },
    apellidos: {
        primerApellido: String,
        segundoApellido: String
    },
    fechaNacimiento: {
        dia: String,
        mes: String,
        ano: String
    },
    tipoDocumento: { type: Schema.ObjectId, ref: "TipoDocumento" },
    documento: String,
    sexo: { type: Schema.ObjectId, ref: "Sexo" },
    direccionResidencia: {
        departamento: String,//{ type: Schema.ObjectId, ref: "Departamento" },
        municipio: String,//{ type: Schema.ObjectId, ref: "Municipio" },
        barrio: String,//{ type: Schema.ObjectId, ref: "Barrio" },
        calle: String,
        manzana: String,
        numero: String
    },    
    contacto: {
        blog: String,
        correoElectronico: String,
        telefonoFijo: String,
        telefonoCelular: String
    },
    condicion: String,
    seAutoreconoceNARP: String,
    organizacion: String,
    descripcionPerfil: String,
    suscritoAlBoletin: Boolean,
    estado: Boolean,
    /*persona: { type: Schema.ObjectId, ref: "Persona" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },*/
    fechaRegistro: { type: Date, default: Date.now() },
    //personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() }
});