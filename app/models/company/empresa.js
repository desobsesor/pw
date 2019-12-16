var mongoose = require('mongoose');

module.exports = mongoose.model('Empresa', {
    empresa: String,
    nit: String,
    codigo: String,
    descripcion: String
});