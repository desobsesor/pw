var EstadoNoticia = require('../../models/pageweb/estadoNoticia');

// validar estadoNoticia
exports.getEstadoNoticias = function (req, res) {
    EstadoNoticia.find({ estadoNoticia: req.params.estadoNoticia, passwordHash: req.params.password },
        function (err, estadoNoticia) {
            if (err)
                res.send(err);
            res.json(estadoNoticia); // devuelve todos las EstadoNoticias en JSON		
        }
    );
};

// buscar documento del estadoNoticia
exports.getEstadoNoticiaPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    EstadoNoticia.find({ _id: req.params._id },
        function (err, estadoNoticia) {
            if (err)
                res.send(err);
            res.json(estadoNoticia); // devuelve todas las EstadoNoticias en JSON		
        }
    );
};

// buscar documento del estadoNoticia
exports.getEstadoNoticiasEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    EstadoNoticia.find(
        function (err, estadoNoticia) {
            if (err)
                res.send(err);
            res.json(estadoNoticia); // devuelve todas las EstadoNoticias en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos EstadoNoticia de la base de datos
exports.getEstadoNoticia = function (req, res) {
    EstadoNoticia.find(
        function (err, estadoNoticia) {
            if (err)
                res.send(err);
            res.json(estadoNoticia); // devuelve todas las EstadoNoticias en JSON		
        }
    ).populate('persona');
};

// Guarda un objeto EstadoNoticia en base de datos
exports.setEstadoNoticia = function (req, res) {
    // Creo el objeto EstadoNoticia
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    EstadoNoticia.create(
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
        function (err, estadoNoticia) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando estadoNoticia");
            console.log(estadoNoticia);
            console.log("//creando estadoNoticia");
            // Obtiene y devuelve todas los estadoNoticias tras crear uno de ellos
            EstadoNoticia.find(function (err, estadoNoticia) {
                if (err)
                    res.send(err);

                res.json(estadoNoticia);
            }).populate('persona');
        });
};

// Modificamos un objeto EstadoNoticia de la base de datos
exports.updateImagenEstadoNoticia = function (req, res) {
    EstadoNoticia.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, estadoNoticia) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            EstadoNoticia.find(function (err, estadoNoticia) {
                if (err)
                    res.send(err);
                res.json(estadoNoticia);
            });
        });
};

// Modificamos un objeto EstadoNoticia de la base de datos
exports.updateEstadoNoticia = function (req, res) {
    EstadoNoticia.update({ _id: req.params.jugador_id },
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
        function (err, estadoNoticia) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            EstadoNoticia.find(function (err, estadoNoticia) {
                if (err)
                    res.send(err);
                res.json(estadoNoticia);
            }).populate('persona');
        });
};

// Elimino un objeto EstadoNoticia de la base de Datos
exports.removeEstadoNoticia = function (req, res) {
    EstadoNoticia.remove({ _id: req.params.estadoNoticia_id }, function (err, estadoNoticia) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        EstadoNoticia.find(function (err, estadoNoticia) {
            if (err)
                res.send(err);
            res.json(estadoNoticia);
        }).populate('persona');
    });
};