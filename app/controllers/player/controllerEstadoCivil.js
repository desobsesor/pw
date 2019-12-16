var EstadoCivil = require('../../models/player/personalInformation/estadoCivil');

// validar estadoCivil
exports.getEstadosCiviles = function (req, res) {
    EstadoCivil.find({ estadoCivil: req.params.estadoCivil, passwordHash: req.params.password },
        function (err, estadoCivil) {
            if (err)
                res.send(err);
            res.json(estadoCivil); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos EstadoCivil de la base de datos
exports.getEstadoCivil = function (req, res) {
    EstadoCivil.find(
        function (err, estadoCivil) {
            if (err)
                res.send(err);
            res.json(estadoCivil); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto EstadoCivil en base de datos
exports.setEstadoCivil = function (req, res) {

    // Creo el objeto EstadoCivil
    EstadoCivil.create(
        {
            estadoCivil: req.body.estadoCivil,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, estadoCivil) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            EstadoCivil.find(function (err, estadoCivil) {
                if (err)
                    res.send(err);
                res.json(estadoCivil);
            });
        });
};

// Modificamos un objeto EstadoCivil de la base de datos
exports.updateImagenEstadoCivil = function (req, res) {
    EstadoCivil.update({ _id: req.params.tipoDocumento_id },
        { $set: { imagen: req.params.tipoDocumento_imagen } },
        function (err, estadoCivil) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            EstadoCivil.find(function (err, estadoCivil) {
                if (err)
                    res.send(err)
                res.json(estadoCivil);
            });
        });
};

// Modificamos un objeto EstadoCivil de la base de datos
exports.updateEstadoCivil = function (req, res) {
    EstadoCivil.update({ _id: req.params.tipoDocumento_id },
        {
            $set: {
                estadoCivil: req.body.estadoCivil,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, estadoCivil) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            EstadoCivil.find(function (err, estadoCivil) {
                if (err)
                    res.send(err);
                res.json(estadoCivil);
            });
        });
};

// Elimino un objeto EstadoCivil de la base de Datos
exports.removeEstadoCivil = function (req, res) {
    EstadoCivil.remove({ _id: req.params.tipoDocumento_id }, function (err, estadoCivil) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las tipoDocumentos tras borrar una de ellas
        EstadoCivil.find(function (err, estadoCivil) {
            if (err)
                res.send(err);
            res.json(estadoCivil);
        });
    });
};