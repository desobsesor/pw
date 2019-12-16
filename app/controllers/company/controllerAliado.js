
var Aliado = require('../../models/company/aliado');


// Obtiene todos los objetos Aliado de la base de datos
exports.getAliado = function (req, res) {
    Aliado.find(
            function (err, aliado) {
                if (err)
                    res.send(err)
                res.json(aliado); // devuelve todas las Aliados en JSON		
            }
    );
}

// Guarda un objeto Aliado en base de datos
exports.setAliado = function (req, res) {

//var inputDate = Date().toISOString();
    // Creo el objeto Aliado
    Aliado.create(
            {nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                es_empresa: req.body.es_empresa,
                es_persona: req.body.es_persona,
                documento: req.body.documento,
                direccion: req.body.direccion,
                pagina_web: req.body.pagina_web,
                email: req.body.email,
                telefono: req.body.telefono,
                activo: req.body.activo,
            propietario: req.body.propietario},
    function (err, aliado) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las aliados tras crear una de ellas
        Aliado.find(function (err, aliado) {
            if (err)
                res.send(err)
            res.json(aliado);
        });
    });

}

// Modificamos un objeto Aliado de la base de datos
exports.updateAliado = function (req, res) {
    Aliado.updateOne({_id: req.params.aliado_id},
    {$set: {nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            es_empresa: req.body.es_empresa,
            es_persona: req.body.es_persona,
            documento: req.body.documento,
            direccion: req.body.direccion,
            pagina_web: req.body.pagina_web,
            email: req.body.email,
            telefono: req.body.telefono,
            activo: req.body.activo,
            propietario: req.body.propietario}},
    function (err, aliado) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las aliados tras crear una de ellas
        Aliado.find(function (err, aliado) {
            if (err)
                res.send(err)
            res.json(aliado);
        });
    });
}

// Elimino un objeto Aliado de la base de Datos
exports.removeAliado = function (req, res) {
    Aliado.remove({_id: req.params.aliado_id}, function (err, aliado) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las aliados tras borrar una de ellas
        Aliado.find(function (err, aliado) {
            if (err)
                res.send(err)
            res.json(aliado);
        });
    });
}