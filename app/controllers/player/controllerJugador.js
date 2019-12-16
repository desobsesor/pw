
var Jugador = require('../../models/player/jugador');

// validar jugador
exports.getJugadores = function (req, res) {
    Jugador.find({ jugador: req.params.jugador, passwordHash: req.params.password },
        function (err, jugador) {
            if (err)
                res.send(err);
            res.json(jugador); // devuelve todos las Jugadores en JSON		
        }
    ).populate('estadoCivil')
    .populate('tipoDocumento')
    .populate('nivelEducativo')
    .populate('sexo');
};

// buscar documento del jugador
exports.getJugadorPorDocumento = function (req, res) {
    console.log("req.params.documento:"+req.params.documento);
    Jugador.find({ documento: req.params.documento },
        function (err, jugador) {
            if (err)
                res.send(err);
            res.json(jugador); // devuelve todas las Jugadors en JSON		
        }
    ).populate('estadoCivil')
    .populate('tipoDocumento')
    .populate('nivelEducativo')
    .populate('sexo');
};

// buscar documento del jugador
exports.getJugadoresEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    Jugador.find(
        function (err, jugador) {
            if (err)
                res.send(err);
            res.json(jugador); // devuelve todas las Jugadors en JSON		
        }
    ).populate('estadoCivil')
    .populate('tipoDocumento')
    .populate('nivelEducativo')
    .populate('sexo')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Jugador de la base de datos
exports.getJugador = function (req, res) {
    Jugador.find(
        function (err, jugador) {
            if (err)
                res.send(err);
            res.json(jugador); // devuelve todas las Jugadors en JSON		
        }
    ).populate('estadoCivil')
        .populate('tipoDocumento')
        .populate('nivelEducativo')
        .populate('sexo');
};

// Guarda un objeto Jugador en base de datos
exports.setJugador = function (req, res) {
    // Creo el objeto Jugador
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    Jugador.create(
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
                ano: req.body.fechaNacimiento.ano
            },
            estadoCivil: req.body.estadoCivil,
            nivelEducativo: req.body.nivelEducativo,
            tipoDocumento: req.body.tipoDocumento,
            documento: req.body.documento,
            sexo: req.body.sexo,
            direccionResidencia: {
                departamento: req.body.direccionResidencia.departamento.departamento,
                municipio: req.body.direccionResidencia.municipio,
                barrio: req.body.direccionResidencia.barrio,
                calle: req.body.direccionResidencia.calle,
                manzana: req.body.direccionResidencia.manzana,
                numero: req.body.direccionResidencia.numero
            },
            direccionLaboral: {
                departamento: req.body.direccionLaboral.departamento.departamento,
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
            fotoPrincipal: {
                data: fs.readFileSync(imgPath),
                contentType: 'image/png'
            },
            fotoBanner: {
                data: fs.readFileSync(imgPathBanner),
                contentType: 'image/png'
            }
            /*a.save(function (err, a) {
                var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
                console.log(ip);
                if (err) throw err;
            });,
            personaRegistro: req.body.personaRegistro,
            fechaRegistro: req.body.fechaRegistro,
            personaCambio: req.body.personaCambio,
            fechaCambio: req.body.fechaCambio*/
        },
        function (err, jugador) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando jugador");
            console.log(jugador);
            console.log("//creando jugador");
            // Obtine y devuelve todas los jugadores tras crear uno de ellos
            Jugador.find(function (err, jugador) {
                if (err)
                    res.send(err);

                res.json(jugador);

            }).populate('estadoCivil')
                .populate('tipoDocumento')
                .populate('nivelEducativo')
                .populate('sexo');
        });
};

// Modificamos un objeto Jugador de la base de datos
exports.updateImagenJugador = function (req, res) {
    Jugador.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, jugador) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Jugador.find(function (err, jugador) {
                if (err)
                    res.send(err);
                res.json(jugador);
            });
        });
};

// Modificamos un objeto Jugador de la base de datos
exports.updateJugador = function (req, res) {
    Jugador.update({ _id: req.params.jugador_id },
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
        function (err, jugador) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Jugador.find(function (err, jugador) {
                if (err)
                    res.send(err);
                res.json(jugador);
            }).populate('estadoCivil')
            .populate('tipoDocumento')
            .populate('nivelEducativo')
            .populate('sexo');
        });
};

// Elimino un objeto Jugador de la base de Datos
exports.removeJugador = function (req, res) {
    Jugador.remove({ _id: req.params.jugador_id }, function (err, jugador) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        Jugador.find(function (err, jugador) {
            if (err)
                res.send(err);
            res.json(jugador);
        }).populate('estadoCivil')
        .populate('tipoDocumento')
        .populate('nivelEducativo')
        .populate('sexo');
    });
};