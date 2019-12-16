var mongoose = require('mongoose');
/**
 * categoria deportiva ejemplo: [Sub 17, Mayores]
 */
module.exports = mongoose.model('Otrooooo', {
    categoriaDeportiva: String,
    codigo: String,
    descripcion: String,        
    disciplinaDeportiva: { 
        type: Schema.ObjectId, 
        ref: "DisciplinaDeportiva" 
    }
});