var mongoose = require('mongoose');

module.exports = mongoose.model('Contacto', {
    nombre: String,
    apellidos: String,
    email: String,
    contacto:String,
    boletin:Boolean, //contactado especificamente para envio de boletines
    fecha:  {type: Date, default: Date.now()}
});

/*exports.pre('save', function preSave(next){
  var something = this;
  something.updatedAt(Date.now());
  next();
});*/