var TipoDocumento = require('../../models/player/personalInformation/tipoDocumento');

// validar tipoDocumento
exports.getTipoDocumentos = function (req, res) {
    TipoDocumento.find({ tipoDocumento: req.params.tipoDocumento, passwordHash: req.params.password },
        function (err, tipoDocumento) {
            if (err)
                res.send(err);
            res.json(tipoDocumento); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos TipoDocumento de la base de datos
exports.getTipoDocumento = function (req, res) {
    TipoDocumento.find(
        function (err, tipoDocumento) {
            if (err)
                res.send(err);
            res.json(tipoDocumento); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto TipoDocumento en base de datos
exports.setTipoDocumento = function (req, res) {

    // Creo el objeto TipoDocumento
    TipoDocumento.create(
        {
            tipoDocumento: req.body.tipoDocumento,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, tipoDocumento) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            TipoDocumento.find(function (err, tipoDocumento) {
                if (err)
                    res.send(err);
                res.json(tipoDocumento);
            });
        });
};

// Modificamos un objeto TipoDocumento de la base de datos
exports.updateImagenTipoDocumento = function (req, res) {
    TipoDocumento.update({ _id: req.params.tipoDocumento_id },
        { $set: { imagen: req.params.tipoDocumento_imagen } },
        function (err, tipoDocumento) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            TipoDocumento.find(function (err, tipoDocumento) {
                if (err)
                    res.send(err)
                res.json(tipoDocumento);
            });
        });
};

// Modificamos un objeto TipoDocumento de la base de datos
exports.updateTipoDocumento = function (req, res) {
    TipoDocumento.update({ _id: req.params.tipoDocumento_id },
        {
            $set: {
                tipoDocumento: req.body.tipoDocumento,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, tipoDocumento) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las tipoDocumentos tras crear una de ellas
            TipoDocumento.find(function (err, tipoDocumento) {
                if (err)
                    res.send(err);
                res.json(tipoDocumento);
            });
        });
};

// Elimino un objeto TipoDocumento de la base de Datos
exports.removeTipoDocumento = function (req, res) {
    TipoDocumento.remove({ _id: req.params.tipoDocumento_id }, function (err, tipoDocumento) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las tipoDocumentos tras borrar una de ellas
        TipoDocumento.find(function (err, tipoDocumento) {
            if (err)
                res.send(err);
            res.json(tipoDocumento);
        });
    });
};