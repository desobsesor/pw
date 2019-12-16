var Profesion = require('../../models/player/personalInformation/profesion');

// validar profesion
exports.getProfesions = function (req, res) {
    Profesion.find({ profesion: req.params.profesion, passwordHash: req.params.password },
        function (err, profesion) {
            if (err)
                res.send(err);
            res.json(profesion); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos Profesion de la base de datos
exports.getProfesion = function (req, res) {
    Profesion.find(
        function (err, profesion) {
            if (err)
                res.send(err);
            res.json(profesion); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto Profesion en base de datos
exports.setProfesion = function (req, res) {

    // Creo el objeto Profesion
    Profesion.create(
        {
            profesion: req.body.profesion,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, profesion) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las profesions tras crear una de ellas
            Profesion.find(function (err, profesion) {
                if (err)
                    res.send(err);
                res.json(profesion);
            });
        });
};

// Modificamos un objeto Profesion de la base de datos
exports.updateImagenProfesion = function (req, res) {
    Profesion.update({ _id: req.params.profesion_id },
        { $set: { imagen: req.params.profesion_imagen } },
        function (err, profesion) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las profesions tras crear una de ellas
            Profesion.find(function (err, profesion) {
                if (err)
                    res.send(err)
                res.json(profesion);
            });
        });
};

// Modificamos un objeto Profesion de la base de datos
exports.updateProfesion = function (req, res) {
    Profesion.update({ _id: req.params.profesion_id },
        {
            $set: {
                profesion: req.body.profesion,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, profesion) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las profesions tras crear una de ellas
            Profesion.find(function (err, profesion) {
                if (err)
                    res.send(err);
                res.json(profesion);
            });
        });
};

// Elimino un objeto Profesion de la base de Datos
exports.removeProfesion = function (req, res) {
    Profesion.remove({ _id: req.params.profesion_id }, function (err, profesion) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las profesions tras borrar una de ellas
        Profesion.find(function (err, profesion) {
            if (err)
                res.send(err);
            res.json(profesion);
        });
    });
};