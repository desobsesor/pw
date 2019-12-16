var mongoose = require('mongoose');

module.exports = mongoose.model('EstadoCivil', {
    estadoCivil: String,
    descripcion: String
});