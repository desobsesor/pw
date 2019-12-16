var mongoose = require('mongoose');

module.exports = mongoose.model('Servicio', {
    servicio: String,
    descripcion: String,
    activo: Boolean,
    es_domicilio: Boolean,
    valor:String, 
    imagen:String
});
