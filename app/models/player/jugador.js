var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Jugador', {
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
    estadoCivil: { type: Schema.ObjectId, ref: "EstadoCivil" },
    nivelEducativo: { type: Schema.ObjectId, ref: "NivelEducativo" },
    tipoDocumento: { type: Schema.ObjectId, ref: "TipoDocumento" },
    documento: String,
    sexo: { type: Schema.ObjectId, ref: "Sexo" },
    direccionResidencia: {
        departamento: String,
        municipio: String,
        barrio: String,
        calle: String,
        manzana: String,
        numero: String
    },
    direccionLaboral: {
        departamento: String,
        municipio: String,
        barrio: String,
        calle: String,
        manzana: String,
        numero: String
    },
    contacto: {
        blog: String,
        correoElectronico: String,
        telefonoFijo: String,
        telefonoCelular: String,
        notaContacto1: String,
        notaContacto2: String,
        notaContacto3: String
    },
    datosLaborales: {
        empresa: { type: Schema.ObjectId, ref: "Empresa" },
        profesion: { type: Schema.ObjectId, ref: "Profesion" },
        cargo: { type: Schema.ObjectId, ref: "Cargo" }
    },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    fotoPrincipal: { data: Buffer, contentType: String },
    fotoBanner: { data: Buffer, contentType: String }
});