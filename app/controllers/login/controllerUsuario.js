
var Usuario = require('../../models/login/usuario');

// validar usuario
exports.getUsuarios = function (req, res) {
    Usuario.find({ usuario: req.params.usuario, passwordHash: req.params.password },
        function (err, usuario) {
            if (err)
                res.send(err)
            res.json(usuario); // devuelve todas las Usuarios en JSON		
        }
    );
}

// Obtiene todos los objetos Usuario de la base de datos
exports.getUsuario = function (req, res) {
    Usuario.find(
        function (err, usuario) {
            if (err)
                res.send(err)
            res.json(usuario); // devuelve todas las Usuarios en JSON		
        }
    );
}

// Guarda un objeto Usuario en base de datos
exports.setUsuario = function (req, res) {
    //console.log(req.body.usuario);
    // Creo el objeto Usuario
    Usuario.create({
        usuario: req.body.usuario,
        nombreCompleto: req.body.nombreCompleto,
        documento: req.body.documento,
        passwordHash: req.body.passwordHash,
        passwordSalt: req.body.passwordSalt,
        correo: req.body.correo,
        nivelEducativo: req.body.nivelEducativo,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        rol: "5c5ef414a7ff6f3b60e515b4",
        activo: true,
        persona: "5bdf5f9bab2f133c2820a66e"
    },
        function (err, usuario) {
            if (err)
                res.send(err);

            //console.log("usuario");
            //console.log(usuario);

            res.send({msg:"EXITO EN LA OPERACIÓN"});
            //res.json(usuario);
            /*Usuario.find({ usuario: usuario.usuario },
                function (err, newUsuario) {
                    if (err)
                        return next(err);

                    res.json(newUsuario);

                })*//*.populate('persona')*/
                /*.populate('rol')*/
                /*.populate('nivelEducativo')*/;
        });
};

// Modificamos un objeto Usuario de la base de datos
exports.updateImagenUsuario = function (req, res) {
    Usuario.update({ _id: req.params.usuario_id },
        { $set: { imagen: req.params.usuario_imagen } },
        function (err, usuario) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las usuarios tras crear una de ellas
            Usuario.find(function (err, usuario) {
                if (err)
                    res.send(err)
                res.json(usuario);
            });
        });
}

// Modificamos un objeto Usuario de la base de datos
exports.updateUsuario = function (req, res) {
    Usuario.update({ _id: req.params.usuario_id },
        { $set: { usuario: req.body.usuario, passwordHash: req.body.passwordHash, nombre: req.body.nombre, apellidos: req.body.apellidos, documento: req.body.documento, sexo: req.body.sexo, email: req.body.email, telefono: req.body.telefono, direccion: req.body.direccion } },
        function (err, usuario) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las usuarios tras crear una de ellas
            Usuario.find(function (err, usuario) {
                if (err)
                    res.send(err)
                res.json(usuario);
            });
        });
}

// Elimino un objeto Usuario de la base de Datos
exports.removeUsuario = function (req, res) {
    Usuario.remove({ _id: req.params.usuario_id }, function (err, usuario) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las usuarios tras borrar una de ellas
        Usuario.find(function (err, usuario) {
            if (err)
                res.send(err)
            res.json(usuario);
        });
    });
}