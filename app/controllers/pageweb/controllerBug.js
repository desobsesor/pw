var Bug = require('../../models/pageweb/bug');

// Obtiene todos los objetos Bug de la base de datos
exports.getBug = function (req, res) {
    Bug.find(
        function (err, bug) {
            if (err)
                res.send(err)
            res.json(bug); // devuelve todos los Bugs en JSON		
        }
    );
}

// Guarda un objeto Bug en base de datos
exports.setBug = function (req, res) {
    // var inputDate = Date().toISOString();
    // Creo el objeto Bug
    Bug.create(
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
            fecha: req.body.fecha,
            documentoRegistro: req.body.documentoRegistro,
            personaRegistro: req.body.personaRegistro
        },
        function (err, bug) {
            if (err)
                res.send(err);

            // Obtiene y devuelve todas los bugs tras crear uno de ellas
            Bug.find(function (err, bug) {
                if (err)
                    res.send(err)
                res.json(bug);
            });
        });

}

// Modificamos un objeto Bug de la base de datos
exports.updateBug = function (req, res) {
    Bug.update({ _id: req.params.bug_id },
        {
            $set: {
                titulo: req.body.titulo, 
                descripcion: req.body.descripcion, 
                imagen: req.body.imagen, 
                fecha: req.body.fecha, 
                documentoRegistro: req.body.documentoRegistro,
                personaRegistro: req.body.personaRegistro
            }
        },
        function (err, bug) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las bugs tras crear una de ellas
            Bug.find(function (err, bug) {
                if (err)
                    res.send(err)
                res.json(bug);
            });
        });
}

// Elimino un objeto Bug de la base de Datos
exports.removeBug = function (req, res) {
    Bug.remove({ _id: req.params.bug_id }, function (err, bug) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las bugs tras borrar una de ellas
        Bug.find(function (err, bug) {
            if (err)
                res.send(err)
            res.json(bug);
        });
    });
}