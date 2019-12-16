var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Aliado', {
    nombre: String, //nombre completo de la persona o de la empresa
    descripcion:String,
    es_empresa:Boolean,
    es_persona:Boolean,
    documento: String, //documento, o nit en el caso de ser empresa
    direccion: String,
    pagina_web: String, //paginaweb 
    email: String,
    telefono:String,
    activo:Boolean,
    logo:String,
    propietario: String, //propietario de la empresa o servicio aliado
    fecha:  {type: Date, default: Date.now()} //fecha de registro al sistema
});
