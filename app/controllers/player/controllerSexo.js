
var Sexo = require('../../models/player/personalInformation/sexo');


// Obtiene todos los objetos Sexo de la base de datos
exports.getSexo = function (req, res) {
    Sexo.find(
            function (err, sexo) {
                if (err)
                    res.send(err);
                res.json(sexo); // devuelve todas las Sexos en JSON		
            }
    );
};

// Guarda un objeto Sexo en base de datos
exports.setSexo = function (req, res) {
   // var inputDate = Date().toISOString();
    // Creo el objeto Sexo
    Sexo.create(
            {sexo: req.body.sexo},
    function (err, sexo) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las sexos tras crear una de ellas
        Sexo.find(function (err, sexo) {
            if (err)
                res.send(err)
            res.json(sexo);
        });
    });
}

// Modificamos un objeto Sexo de la base de datos
exports.updateSexo = function (req, res) {
    Sexo.update({_id: req.params.sexo_id},
    {$set: {sexo: req.body.sexo}},
    function (err, sexo) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las sexos tras crear una de ellas
        Sexo.find(function (err, sexo) {
            if (err)
                res.send(err)
            res.json(sexo);
        });
    });
}

// Elimino un objeto Sexo de la base de Datos
exports.removeSexo = function (req, res) {
    Sexo.remove({_id: req.params.sexo_id}, function (err, sexo) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las sexos tras borrar una de ellas
        Sexo.find(function (err, sexo) {
            if (err)
                res.send(err)
            res.json(sexo);
        });
    });
}