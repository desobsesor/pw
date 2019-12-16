var mongoose = require('mongoose');

module.exports = mongoose.model('Sexo', {
    sexo: String
});

//db.sexo.insert({
//        sexo: "MASCULINO"
//});