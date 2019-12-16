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
        departamento: String,//{ type: Schema.ObjectId, ref: "Departamento" },
        municipio: String,//{ type: Schema.ObjectId, ref: "Municipio" },
        barrio: String,//{ type: Schema.ObjectId, ref: "Barrio" },
        calle: String,
        manzana: String,
        numero: String
    },
    direccionLaboral: {
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
    fechaCambio: { type: Date, default: Date.now() }
});

//db.persona.insert({
//    nombres: "Yovany",
//    apellidos: "Suárez Silva",
//    documento: "6803296",
//    sexo: "Masculino",
//    fecha_nacimiento: new Date(1983, 3, 9)
//});