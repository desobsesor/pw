
var Servicio = require('../../models/pageweb/servicio');

// Obtiene todos los objetos Servicio de la base de datos
exports.getServicio = function (req, res) {
    Servicio.find(
        function (err, servicio) {
            if (err)
                res.send(err);
            res.json(servicio); // devuelve todas las Servicios en JSON		
        }
    );
};

// Guarda un objeto Servicio en base de datos
exports.setServicio = function (req, res) {
    // Creo el objeto Servicio
    Servicio.create(
        { servicio: req.body.servicio, descripcion: req.body.descripcion, activo: req.body.activo, es_domicilio: req.body.es_domicilio, valor: req.body.valor, imagen: req.body.imagen },
        function (err, servicio) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las servicios tras crear una de ellas
            Servicio.find(function (err, servicio) {
                if (err)
                    res.send(err);

                res.json(servicio);
            });
        });
};
// Modificamos un objeto Servicio de la base de datos
exports.updateImagenServicio = function (req, res) {
    Servicio.update({_id: req.params.servicio_id},
    {$set: {imagen: req.params.servicio_imagen}},
    function (err, servicio) {
        if (err){
            console.log(err);
            res.send(err);
        }

        // Obtine y devuelve todas las servicios tras crear una de ellas
        Servicio.find(function (err, servicio) {
            if (err)
                res.send(err)
            res.json(servicio);
        });
    });
}
// Modificamos un objeto Servicio de la base de datos
exports.updateServicio = function (req, res) {
    Servicio.update({_id: req.params.servicio_id},
    {$set: {servicio: req.body.servicio, descripcion: req.body.descripcion,  activo: req.body.activo, es_domicilio: req.body.es_domicilio, valor: req.body.valor, imagen: req.body.imagen}},
    function (err, servicio) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las servicios tras crear una de ellas
        Servicio.find(function (err, servicio) {
            if (err)
                res.send(err)
            res.json(servicio);
        });
    });
}

// Elimino un objeto Servicio de la base de Datos
exports.removeServicio = function (req, res) {
    Servicio.remove({_id: req.params.servicio_id}, function (err, servicio) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las servicios tras borrar una de ellas
        Servicio.find(function (err, servicio) {
            if (err)
                res.send(err)
            res.json(servicio);
        });
    });
}