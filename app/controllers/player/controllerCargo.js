var Cargo = require('../../models/player/personalInformation/cargo');

// validar cargo
exports.getCargos = function (req, res) {
    Cargo.find({ cargo: req.params.cargo, passwordHash: req.params.password },
        function (err, cargo) {
            if (err)
                res.send(err);
            res.json(cargo); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos Cargo de la base de datos
exports.getCargo = function (req, res) {
    Cargo.find(
        function (err, cargo) {
            if (err)
                res.send(err);
            res.json(cargo); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto Cargo en base de datos
exports.setCargo = function (req, res) {

    // Creo el objeto Cargo
    Cargo.create(
        {
            cargo: req.body.cargo,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, cargo) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las cargos tras crear una de ellas
            Cargo.find(function (err, cargo) {
                if (err)
                    res.send(err);
                res.json(cargo);
            });
        });
};

// Modificamos un objeto Cargo de la base de datos
exports.updateImagenCargo = function (req, res) {
    Cargo.update({ _id: req.params.cargo_id },
        { $set: { imagen: req.params.cargo_imagen } },
        function (err, cargo) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las cargos tras crear una de ellas
            Cargo.find(function (err, cargo) {
                if (err)
                    res.send(err)
                res.json(cargo);
            });
        });
};

// Modificamos un objeto Cargo de la base de datos
exports.updateCargo = function (req, res) {
    Cargo.update({ _id: req.params.cargo_id },
        {
            $set: {
                cargo: req.body.cargo,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, cargo) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las cargos tras crear una de ellas
            Cargo.find(function (err, cargo) {
                if (err)
                    res.send(err);
                res.json(cargo);
            });
        });
};

// Elimino un objeto Cargo de la base de Datos
exports.removeCargo = function (req, res) {
    Cargo.remove({ _id: req.params.cargo_id }, function (err, cargo) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las cargos tras borrar una de ellas
        Cargo.find(function (err, cargo) {
            if (err)
                res.send(err);
            res.json(cargo);
        });
    });
};