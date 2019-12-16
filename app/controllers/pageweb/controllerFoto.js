var Foto = require('../../models/pageweb/foto');

// validar foto
exports.getFotos = function (req, res) {
    Foto.find({ foto: req.params.foto, passwordHash: req.params.password },
        function (err, foto) {
            if (err)
                res.send(err);
            res.json(foto); // devuelve todos las Fotos en JSON		
        }
    );
};

// buscar documento del foto
exports.getFotoPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    Foto.find({ _id: req.params._id },
        function (err, foto) {
            if (err)
                res.send(err);
            res.json(foto); // devuelve todas las Fotos en JSON		
        }
    );
};

// buscar documento del foto
exports.getFotosEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    Foto.find(
        function (err, foto) {
            if (err)
                res.send(err);
            res.json(foto); // devuelve todas las Fotos en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Foto de la base de datos
exports.getFoto = function (req, res) {
    console.log("req.params.galeria_id");
    console.log(req.params.galeria_id);
    Foto.find({ galeria: req.params.galeria_id },
        function (err, foto) {
            if (err)
                res.send(err);
            //console.log(foto);
            res.json(foto); // devuelve todas las Fotos en formato JSON	fitlradas por galeria	
        }
    );
};

// Guarda un objeto Foto en base de datos
exports.setFoto = function (req, res) {
    // Creo el objeto Foto
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    Foto.create(
        {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            url: req.body.url,
            visibleEnGaleria: req.body.visibleEnGaleria,
            activo: true,
            meGusta: 1,
            noMeGusta: 1,
            galeria:  req.body.galeria
        },
        function (err, foto) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando foto");
            console.log(foto);
            console.log("//creando foto");
            // Obtiene y devuelve todas los fotos tras crear uno de ellos
            Foto.find({ galeria: req.body.galeria._id },
                function (err, foto) {
                if (err)
                    res.send(err);

                res.json(foto);
            }).populate('galeria');
        });
};

// Modificamos un objeto Foto de la base de datos
exports.updateImagenFoto = function (req, res) {
    Foto.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, foto) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Foto.find(function (err, foto) {
                if (err)
                    res.send(err);
                res.json(foto);
            });
        });
};

// Modificamos un objeto Foto de la base de datos
exports.updateFoto = function (req, res) {
    Foto.update({ _id: req.params.jugador_id },
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
        function (err, foto) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            Foto.find(function (err, foto) {
                if (err)
                    res.send(err);
                res.json(foto);
            });
        });
};

// Elimino un objeto Foto de la base de Datos
exports.removeFoto = function (req, res) {
    Foto.remove({ _id: req.params.foto_id }, function (err, foto) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        Foto.find(function (err, foto) {
            if (err)
                res.send(err);
            res.json(foto);
        });
    });
};