var mongoose = require('mongoose');

module.exports = mongoose.model('NivelEducativo', {
    nivelEducativo: String,
    codigo: String,
    descripcion: String
});