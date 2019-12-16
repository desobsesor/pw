var mongoose = require('mongoose');

module.exports = mongoose.model('Cargo', {
    cargo: String,
    codigo: String,
    descripcion: String
});