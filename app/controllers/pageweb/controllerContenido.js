var Contenido = require('../../models/pageweb/contenido');

// validar contenido
exports.getContenidos = function (req, res) {
    Contenido.find({ contenido: req.params.contenido, passwordHash: req.params.password },
        function (err, contenido) {
            if (err)
                res.send(err);
            res.json(contenido); // devuelve todos las Contenidos en JSON		
        }
    ).populate('persona');
};

// buscar documento del contenido
exports.getContenidoPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    Contenido.find({ _id: req.params._id },
        function (err, contenido) {
            if (err)
                res.send(err);
            res.json(contenido); // devuelve todas las Contenidos en JSON		
        }
    ).populate('persona');
};

// buscar documento del contenido
exports.getContenidosEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    Contenido.find(
        function (err, contenido) {
            if (err)
                res.send(err);
            res.json(contenido); // devuelve todas las Contenidos en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Contenido de la base de datos
exports.getContenido = function (req, res) {
    Contenido.find(
        function (err, contenido) {
            if (err)
                res.send(err);
            res.json(contenido); // devuelve todas las Contenidos en JSON		
        }
    ).populate('persona');
};

// Guarda un objeto Contenido en base de datos
exports.setContenido = function (req, res) {
    // Creo el objeto Contenido
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    Contenido.create(
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
        function (err, contenido) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando contenido");
            console.log(contenido);
            console.log("//creando contenido");
            // Obtiene y devuelve todas los contenidos tras crear uno de ellos
            Contenido.find(function (err, contenido) {
                if (err)
                    res.send(err);

                res.json(contenido);
            }).populate('persona');
        });
};

// Modificamos un objeto Contenido de la base de datos
exports.updateImagenContenido = function (req, res) {
    Contenido.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, contenido) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Contenido.find(function (err, contenido) {
                if (err)
                    res.send(err);
                res.json(contenido);
            });
        });
};

// Modificamos un objeto Contenido de la base de datos
exports.updateContenido = function (req, res) {
    Contenido.update({ _id: req.params.jugador_id },
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
        function (err, contenido) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Contenido.find(function (err, contenido) {
                if (err)
                    res.send(err);
                res.json(contenido);
            }).populate('persona');
        });
};

// Elimino un objeto Contenido de la base de Datos
exports.removeContenido = function (req, res) {
    Contenido.remove({ _id: req.params.contenido_id }, function (err, contenido) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        Contenido.find(function (err, contenido) {
            if (err)
                res.send(err);
            res.json(contenido);
        }).populate('persona');
    });
};