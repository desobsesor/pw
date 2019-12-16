var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Noticia', {
    titulo: String,
    resumen: String,
    descripcion: String,
    metatags: String,
    estadoNoticia: { type: Schema.ObjectId, ref: "EstadoNoticia" },
    categoriaNoticia: { type: Schema.ObjectId, ref: "CategoriaNoticia" },
    orden: String,
    url: String,
    visitas: Number,
    activo: Boolean,
    meGusta: Number,
    noMeGusta: Number,
    enPaginaPrincipal: Boolean,
    voto: {
        excelente: Boolean,
        bueno: Boolean,
        regular: Boolean,
        malo: Boolean
    },
    fechaPublicacion: {
        dia: String,
        mes: String,
        ano: String
    },
    personaRegistro: { type: Schema.ObjectId, ref: "Persona" },
    fechaRegistro: { type: Date, default: Date.now() },
    personaCambio: { type: Schema.ObjectId, ref: "Persona" },
    fechaCambio: { type: Date, default: Date.now() },
    imagenPrincipal:  String,
    imagenBanner: String 
});