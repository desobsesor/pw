var NivelEducativo = require('../../models/player/personalInformation/nivelEducativo');

// validar nivelEducativo
exports.getEstadosCiviles = function (req, res) {
    NivelEducativo.find({ nivelEducativo: req.params.nivelEducativo, passwordHash: req.params.password },
        function (err, nivelEducativo) {
            if (err)
                res.send(err);
            res.json(nivelEducativo); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos NivelEducativo de la base de datos
exports.getNivelEducativo = function (req, res) {
    NivelEducativo.find(
        function (err, nivelEducativo) {
            if (err)
                res.send(err);
            res.json(nivelEducativo); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto NivelEducativo en base de datos
exports.setNivelEducativo = function (req, res) {

    // Creo el objeto NivelEducativo
    NivelEducativo.create(
        {
            nivelEducativo: req.body.nivelEducativo,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, nivelEducativo) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            NivelEducativo.find(function (err, nivelEducativo) {
                if (err)
                    res.send(err);
                res.json(nivelEducativo);
            });
        });
};

// Modificamos un objeto NivelEducativo de la base de datos
exports.updateImagenNivelEducativo = function (req, res) {
    NivelEducativo.update({ _id: req.params.tipoDocumento_id },
        { $set: { imagen: req.params.tipoDocumento_imagen } },
        function (err, nivelEducativo) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            NivelEducativo.find(function (err, nivelEducativo) {
                if (err)
                    res.send(err)
                res.json(nivelEducativo);
            });
        });
};

// Modificamos un objeto NivelEducativo de la base de datos
exports.updateNivelEducativo = function (req, res) {
    NivelEducativo.update({ _id: req.params.tipoDocumento_id },
        {
            $set: {
                nivelEducativo: req.body.nivelEducativo,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, nivelEducativo) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            NivelEducativo.find(function (err, nivelEducativo) {
                if (err)
                    res.send(err);
                res.json(nivelEducativo);
            });
        });
};

// Elimino un objeto NivelEducativo de la base de Datos
exports.removeNivelEducativo = function (req, res) {
    NivelEducativo.remove({ _id: req.params.tipoDocumento_id }, function (err, nivelEducativo) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las tipoDocumentos tras borrar una de ellas
        NivelEducativo.find(function (err, nivelEducativo) {
            if (err)
                res.send(err);
            res.json(nivelEducativo);
        });
    });
};