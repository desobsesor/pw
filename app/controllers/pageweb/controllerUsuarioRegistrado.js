
var UsuarioRegistrado = require('../../models/pageweb/usuarioRegistrado');

exports.getUsuariosRegistradosEnListaPaginada = function (req, res) {
    console.log("req.params.page:::" + req.params.page);
    console.log("req.params.rows:::" + req.params.rows);
    UsuarioRegistrado.find(
        function (err, usuarioRegistrado) {
            if (err)
                res.send(err);
                
            console.log(usuarioRegistrado);
            res.json(usuarioRegistrado); // devuelve todas las Noticias en JSON		
        }
    ).populate('sexo')
        .populate('tipoDocumento')
        .skip(req.params.rows*(parseInt(req.params.page) - 1)).limit(parseInt(req.params.rows));
};

// validar usuarioRegistrado
exports.getUsuarioRegistrados = function (req, res) {
    UsuarioRegistrado.find({ usuarioRegistrado: req.params.usuarioRegistrado, passwordHash: req.params.password },
        function (err, usuarioRegistrado) {
            if (err)
                res.send(err);
            res.json(usuarioRegistrado); // devuelve todas las UsuarioRegistrados en JSON		
        }
    );
};

// Obtiene todos los objetos UsuarioRegistrado de la base de datos
exports.getUsuarioRegistrado = function (req, res) {
    UsuarioRegistrado.find(
        function (err, usuarioRegistrado) {
            if (err)
                res.send(err);
            res.json(usuarioRegistrado); // devuelve todas los Usuarios Registrados en JSON		
        }
    );
};

// Guarda un objeto UsuarioRegistrado en base de datos
exports.setUsuarioRegistrado = function (req, res) {
    // Creo el objeto UsuarioRegistrado
    /*console.log("documento.",req.body.documento);
    console.log("departamento.",req.body.direccionResidencia.departamento);
    console.log("municipio.", req.body.direccionResidencia.municipio);
    console.log("seAutoreconoceNARP.",req.body.seAutoreconoceNARP);
    console.log("descripcionPerfil.", req.body.descripcionPerfil);*/
    //console.log("req.body.fechaNacimiento.ano.", req.body.fechaNacimiento.ano);
    UsuarioRegistrado.create(
        {
            nombres: {
                primerNombre: req.body.nombres.primerNombre,
                segundoNombre: req.body.nombres.segundoNombre
            },
            apellidos: {
                primerApellido: req.body.apellidos.primerApellido,
                segundoApellido: req.body.apellidos.segundoApellido
            },
            fechaNacimiento: {
                dia: req.body.fechaNacimiento.dia,
                mes: req.body.fechaNacimiento.mes,
                ano: req.body.fechaNacimiento.ano,
            },
            tipoDocumento: req.body.tipoDocumento,
            documento: req.body.documento,
            sexo: req.body.sexo,
            direccionResidencia: {
                //departamento: req.body.direccionResidencia.departamento,
                municipio: req.body.direccionResidencia.municipio,
                barrio: req.body.direccionResidencia.barrio,
                calle: req.body.direccionResidencia.calle,
                manzana: req.body.direccionResidencia.manzana,
                numero: req.body.direccionResidencia.numero
            },
            contacto: {
                //blog: req.body.blog,
                correoElectronico: req.body.contacto.correoElectronico,
                //telefonoFijo: req.body.contacto.telefonoFijo,
                //telefonoCelular: req.body.contacto.telefonoCelular
            }, 
            condicion: req.body.condicion,
            seAutoreconoceNARP: req.body.seAutoreconoceNARP,
            organizacion: req.body.organizacion,
            descripcionPerfil: req.body.descripcionPerfil,
            suscritoAlBoletin: req.body.suscritoAlBoletin,
            estado: true,
            //personaRegistro: req.body.personaRegistro,
            fechaRegistro: Date.now(),
        },
        function (err, usuarioRegistrado) {
            if (err)
                res.send(err);

            res.send({msg:"EXITO EN LA OPERACIÓN"});
            // Obtiene y devuelve todas las personas tras crear una de ellas
            /*UsuarioRegistrado.find({ _id: usuarioRegistrado._id},
                function (err, usuarioRegistrados) {
                if (err)
                    res.send(err);
                res.json(usuarioRegistrados);
            });*/
        }
    );
};

// Modificamos un objeto UsuarioRegistrado de la base de datos
exports.updateImagenUsuarioRegistrado = function (req, res) {
    UsuarioRegistrado.update({ _id: req.params.persona_id },
        { $set: { imagen: req.params.persona_imagen } },
        function (err, usuarioRegistrado) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las personas tras crear una de ellas
            UsuarioRegistrado.find(function (err, usuarioRegistrado) {
                if (err)
                    res.send(err)
                res.json(usuarioRegistrado);
            });
        });
};

// Modificamos un objeto UsuarioRegistrado de la base de datos
exports.updateUsuarioRegistrado = function (req, res) {
    UsuarioRegistrado.update({ _id: req.params.persona_id },
        {
            $set: {
                nombres: {
                    primerNombre: req.body.nombres.primerNombre,
                    segundoNombre: req.body.apellidos.segundoNombre
                },
                apellidos: {
                    primerApellido: req.body.nombres.primerApellido,
                    segundoApellido: req.body.apellidos.segundoApellido
                },
                fechaNacimiento: {
                    dia: req.body.fechaNacimiento.dia,
                    mes: req.body.fechaNacimiento.mes,
                    ano: req.body.fechaNacimiento.ano,
                },
                tipoDocumento: req.body.tipoDocumento,
                documento: req.body.documento,
                sexo: req.body.sexo,
                direccionResidencia: {
                    //departamento: req.body.direccionResidencia.departamento,
                    municipio: req.body.direccionResidencia.municipio,
                    barrio: req.body.direccionResidencia.barrio,
                    calle: req.body.direccionResidencia.calle,
                    manzana: req.body.direccionResidencia.manzana,
                    numero: req.body.direccionResidencia.numero
                },
                contacto: {
                    //blog: req.body.blog,
                    correoElectronico: req.body.contacto.correoElectronico,
                    //telefonoFijo: req.body.contacto.telefonoFijo,
                    //telefonoCelular: req.body.contacto.telefonoCelular
                }, 
                condicion: req.body.condicion,
                seAutoreconoceNARP: req.body.seAutoreconoceNARP,
                organizacion: req.body.organizacion,
                descripcionPerfil: req.body.descripcionPerfil,
                suscritoAlBoletin: req.body.suscritoAlBoletin,
                //personaRegistro: req.body.personaRegistro,
                //fechaRegistro: Date.now(),
                personaCambio: req.body.personaCambio,
                fechaCambio: Date.now()
            }
        },
        function (err, usuarioRegistrado) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las personas tras crear una de ellas
            UsuarioRegistrado.find(function (err, usuarioRegistrado) {
                if (err)
                    res.send(err);
                res.json(usuarioRegistrado);
            });
        });
};

// Elimino un objeto UsuarioRegistrado de la base de Datos
exports.removeUsuarioRegistrado = function (req, res) {
    UsuarioRegistrado.remove({ _id: req.params.persona_id }, function (err, usuarioRegistrado) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las personas tras borrar una de ellas
        UsuarioRegistrado.find(function (err, usuarioRegistrado) {
            if (err)
                res.send(err);
            res.json(usuarioRegistrado);
        });
    });
};