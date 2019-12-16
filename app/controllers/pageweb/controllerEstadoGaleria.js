var EstadoGaleria = require('../../models/pageweb/estadoGaleria');

// validar estadoGaleria
exports.getEstadoGalerias = function (req, res) {
    EstadoGaleria.find({ estadoGaleria: req.params.estadoGaleria, passwordHash: req.params.password },
        function (err, estadoGaleria) {
            if (err)
                res.send(err);
            res.json(estadoGaleria); // devuelve todos las EstadoGalerias en JSON		
        }
    );
};

// buscar documento del estadoGaleria
exports.getEstadoGaleriaPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    EstadoGaleria.find({ _id: req.params._id },
        function (err, estadoGaleria) {
            if (err)
                res.send(err);
            res.json(estadoGaleria); // devuelve todas las EstadoGalerias en JSON		
        }
    );
};

// buscar documento del estadoGaleria
exports.getEstadoGaleriasEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    EstadoGaleria.find(
        function (err, estadoGaleria) {
            if (err)
                res.send(err);
            res.json(estadoGaleria); // devuelve todas las EstadoGalerias en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos EstadoGaleria de la base de datos
exports.getEstadoGaleria = function (req, res) {
    EstadoGaleria.find(
        function (err, estadoGaleria) {
            if (err)
                res.send(err);
            res.json(estadoGaleria); // devuelve todas las EstadoGalerias en JSON		
        }
    ).populate('persona');
};

// Guarda un objeto EstadoGaleria en base de datos
exports.setEstadoGaleria = function (req, res) {
    // Creo el objeto EstadoGaleria
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    EstadoGaleria.create(
        {
            url: req.body.url,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            html: req.body.html,
            metatags: req.body.metatags,
            visitas: req.body.visitas,
            activo: req.body.activo,
            voto: {
                excelente: req.body.voto.excelente,
                bueno: req.body.voto.bueno,
                regular: req.body.voto.regular,
                malo: req.body.voto.malo
            },
            personaRegistro: ObjectId("bdf5f9bab2f133c2820a66e"),
            fechaRegistro: Date.now(),
            personaCambio: ObjectId("bdf5f9bab2f133c2820a66e"),
            fechaCambio: Date.now(),
            imagenPrincipal: {
                data: fs.readFileSync(imgPath),
                contentType: 'image/png'
            },
            imagenBanner: {
                data: fs.readFileSync(imgPathBanner),
                contentType: 'image/png'
            }
        },
        function (err, estadoGaleria) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando estadoGaleria");
            console.log(estadoGaleria);
            console.log("//creando estadoGaleria");
            // Obtiene y devuelve todas los estadoGalerias tras crear uno de ellos
            EstadoGaleria.find(function (err, estadoGaleria) {
                if (err)
                    res.send(err);

                res.json(estadoGaleria);
            }).populate('persona');
        });
};

// Modificamos un objeto EstadoGaleria de la base de datos
exports.updateImagenEstadoGaleria = function (req, res) {
    EstadoGaleria.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, estadoGaleria) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            EstadoGaleria.find(function (err, estadoGaleria) {
                if (err)
                    res.send(err);
                res.json(estadoGaleria);
            });
        });
};

// Modificamos un objeto EstadoGaleria de la base de datos
exports.updateEstadoGaleria = function (req, res) {
    EstadoGaleria.update({ _id: req.params.jugador_id },
        {
            $set: {
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
                    ano: req.body.fechaNacimiento.ano
                },
                estadoCivil: req.body.estadoCivil,
                nivelEducativo: req.body.nivelEducativo,
                tipoDocumento: req.body.tipoDocumento,
                documento: req.body.documento,
                sexo: req.body.sexo,
                direccionResidencia: {
                    departamento: req.body.direccionResidencia.departamento,
                    municipio: req.body.direccionResidencia.municipio,
                    barrio: req.body.direccionResidencia.barrio,
                    calle: req.body.direccionResidencia.calle,
                    manzana: req.body.direccionResidencia.manzana,
                    numero: req.body.direccionResidencia.numero
                },
                direccionLaboral: {
                    departamento: req.body.direccionLaboral.departamento,
                    municipio: req.body.direccionLaboral.municipio,
                    barrio: req.body.direccionLaboral.barrio,
                    calle: req.body.direccionLaboral.calle,
                    manzana: req.body.direccionLaboral.manzana,
                    numero: req.body.direccionLaboral.numero
                },
                contacto: {
                    blog: req.body.contacto.blog,
                    correoElectronico: req.body.contacto.correoElectronico,
                    telefonoFijo: req.body.contacto.telefonoFijo,
                    telefonoCelular: req.body.contacto.telefonoCelular,
                    notaContacto1: req.body.contacto.notaContacto1,
                    notaContacto2: req.body.contacto.notaContacto2,
                    notaContacto3: req.body.contacto.notaContacto3
                },
                datosLaborales: {
                    empresa: req.body.datosLaborales.empresa,
                    profesion: req.body.datosLaborales.profesion,
                    cargo: req.body.datosLaborales.cargo
                },
                personaRegistro: req.body.personaRegistro,
                fechaRegistro: req.body.fechaRegistro,
                personaCambio: req.body.personaCambio,
                fechaCambio: req.body.fechaCambio
            }
        },
        function (err, estadoGaleria) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            EstadoGaleria.find(function (err, estadoGaleria) {
                if (err)
                    res.send(err);
                res.json(estadoGaleria);
            }).populate('persona');
        });
};

// Elimino un objeto EstadoGaleria de la base de Datos
exports.removeEstadoGaleria = function (req, res) {
    EstadoGaleria.remove({ _id: req.params.estadoGaleria_id }, function (err, estadoGaleria) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        EstadoGaleria.find(function (err, estadoGaleria) {
            if (err)
                res.send(err);
            res.json(estadoGaleria);
        }).populate('persona');
    });
};