
var Faq = require('../../models/pageweb/faq');


// Obtiene todos los objetos Faq de la base de datos
exports.getFaq = function (req, res) {
    Faq.find(
            function (err, faq) {
                if (err)
                    res.send(err)
                res.json(faq); // devuelve todas las Faqs en JSON		
            }
    );
}

// Guarda un objeto Faq en base de datos
exports.setFaq = function (req, res) {
   // var inputDate = Date().toISOString();
    // Creo el objeto Faq
    Faq.create(
            {titulo: req.body.titulo, descripcion: req.body.descripcion, observacion: req.body.observacion, fecha: req.body.fecha, autor: req.body.autor},
    function (err, faq) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las faqs tras crear una de ellas
        Faq.find(function (err, faq) {
            if (err)
                res.send(err)
            res.json(faq);
        });
    });

}

// Modificamos un objeto Faq de la base de datos
exports.updateFaq = function (req, res) {
    Faq.update({_id: req.params.faq_id},
    {$set: {titulo: req.body.titulo, descripcion: req.body.descripcion, observacion: req.body.observacion, fecha: req.body.fecha, autor: req.body.autor}},
    function (err, faq) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las faqs tras crear una de ellas
        Faq.find(function (err, faq) {
            if (err)
                res.send(err)
            res.json(faq);
        });
    });
}

// Elimino un objeto Faq de la base de Datos
exports.removeFaq = function (req, res) {
    Faq.remove({_id: req.params.faq_id}, function (err, faq) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las faqs tras borrar una de ellas
        Faq.find(function (err, faq) {
            if (err)
                res.send(err)
            res.json(faq);
        });
    });
}