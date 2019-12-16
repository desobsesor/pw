var mongoose = require('mongoose');
/**
 * categoria deportiva ejemplo: [Sub 17, Mayores]. puede aplicarse a una disciplina deportiva directamente
 */
module.exports = mongoose.model('CategoriaDeportiva', {
    categoriaDeportiva: String,
    codigo: String,
    descripcion: String,        
    disciplinaDeportiva: { 
        type: Schema.ObjectId, 
        ref: "DisciplinaDeportiva" 
    }
});