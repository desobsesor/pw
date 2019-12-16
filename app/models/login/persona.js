var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Persona', {
    nombres: {
        primerNombre: String,
        segundoNombre: String
    },
    apellidos: {
        primerApellido: String,
        segundoApellido: String
    },
    fechaNacimiento: { type: Date, default: Date.now() },
    tipoDocumento: { type: Schema.ObjectId, ref: "TipoDocumento" },
    documento: String,
    sexo: { type: Schema.ObjectId, ref: "Sexo" },
    direccionResidencia: {
        municipio: { type: Schema.ObjectId, ref: "Municipio" },
        barrio: { type: Schema.ObjectId, ref: "Barrio" },
        calle: String,
        manzana: String,
        numero: String
    },
    direccionLaboral: {
        municipio: { type: Schema.ObjectId, ref: "Municipio" },
        barrio: { type: Schema.ObjectId, ref: "Barrio" },
        calle: String,
        manzana: String,
        numero: String
    },
    contacto: {
        blog:String,
        correoElectronico: String,
        telefonoFijo: String,
        telefonoCelular: String,
        notaContacto1: String,
        notaContacto2: String,
        notaContacto3:String
    },
    imagen: String,
    fichaTecnica: String,
    empresa: { type: Schema.ObjectId, ref: "Empresa" },
    profesion: { type: Schema.ObjectId, ref: "Profesion" },
    cargo: { type: Schema.ObjectId, ref: "Cargo" },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() }
});
