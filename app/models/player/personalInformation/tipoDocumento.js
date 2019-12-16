var mongoose = require('mongoose');

module.exports = mongoose.model('TipoDocumento', {
    tipoDocumento: String,
    codigo: String,
    descripcion: String
});