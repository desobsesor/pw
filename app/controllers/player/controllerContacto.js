
var Contacto = require('../../models/player/contacto');

// Obtiene todos los objetos Contacto de la base de datos
exports.getContacto = function (req, res) {
    Contacto.find(
        function (err, contacto) {
            if (err)
                res.send(err);
            res.json(contacto); // devuelve todas las Contactos en JSON		
        }
    );
};
// Guarda un objeto Contacto en base de datos
exports.setContactoBoletin = function (req, res) {

    //var inputDate = Date().toISOString();
    // Creo el objeto Contacto
    Contacto.create(
        { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: true, contacto: 'Registro al Boletin', fecha: req.body.fecha },
        function (err, contacto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las contactos tras crear una de ellas
            Contacto.find(function (err, contacto) {
                if (err)
                    res.send(err);
                res.json(contacto);
            });
        });

};
// Guarda un objeto Contacto en base de datos
exports.setContacto = function (req, res) {

    //var inputDate = Date().toISOString();
    // Creo el objeto Contacto
    Contacto.create(
        { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: req.body.boletin, contacto: req.body.contacto, fecha: req.body.fecha },
        function (err, contacto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las contactos tras crear una de ellas
            Contacto.find(function (err, contacto) {
                if (err)
                    res.send(err);
                res.json(contacto);
            });
        });

};

// Modificamos un objeto Contacto de la base de datos
exports.updateContacto = function (req, res) {
    Contacto.updateOne({ _id: req.params.contacto_id },
        { $set: { nombre: req.body.nombre, apellidos: req.body.apellidos, email: req.body.email, boletin: req.body.boletin, contacto: req.body.contacto, fecha: req.body.fecha } },
        function (err, contacto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las contactos tras crear una de ellas
            Contacto.find(function (err, contacto) {
                if (err)
                    res.send(err);
                res.json(contacto);
            });
        });
};

// Elimino un objeto Contacto de la base de Datos
exports.removeContacto = function (req, res) {
    Contacto.remove({ _id: req.params.contacto_id }, function (err, contacto) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las contactos tras borrar una de ellas
        Contacto.find(function (err, contacto) {
            if (err)
                res.send(err);
            res.json(contacto);
        });
    });
};