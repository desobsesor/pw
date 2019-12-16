var mongoose = require('mongoose');

module.exports = mongoose.model('Profesion', {
    profesion: String,
    codigo: String,
    descripcion: String
});