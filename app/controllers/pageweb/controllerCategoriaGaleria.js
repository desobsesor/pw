var CategoriaGaleria = require('../../models/pageweb/categoriaGaleria');

// validar categoriaGaleria
exports.getCategoriaGalerias = function (req, res) {
    CategoriaGaleria.find({ categoriaGaleria: req.params.categoriaGaleria, passwordHash: req.params.password },
        function (err, categoriaGaleria) {
            if (err)
                res.send(err);
            res.json(categoriaGaleria); // devuelve todos las CategoriaGalerias en JSON		
        }
    );
};

// buscar documento del categoriaGaleria
exports.getCategoriaGaleriaPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    CategoriaGaleria.find({ _id: req.params._id },
        function (err, categoriaGaleria) {
            if (err)
                res.send(err);
            res.json(categoriaGaleria); // devuelve todas las CategoriaGalerias en JSON		
        }
    );
};

// buscar documento del categoriaGaleria
exports.getCategoriaGaleriasEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    CategoriaGaleria.find(
        function (err, categoriaGaleria) {
            if (err)
                res.send(err);
            res.json(categoriaGaleria); // devuelve todas las CategoriaGalerias en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos CategoriaGaleria de la base de datos
exports.getCategoriaGaleria = function (req, res) {
    CategoriaGaleria.find(
        function (err, categoriaGaleria) {
            if (err)
                res.send(err);
            res.json(categoriaGaleria); // devuelve todas las CategoriaGalerias en JSON		
        }
    );
};

// Guarda un objeto CategoriaGaleria en base de datos
exports.setCategoriaGaleria = function (req, res) {
    // Creo el objeto CategoriaGaleria
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    CategoriaGaleria.create(
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
        function (err, categoriaGaleria) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando categoriaGaleria");
            console.log(categoriaGaleria);
            console.log("//creando categoriaGaleria");
            // Obtiene y devuelve todas los categoriaGalerias tras crear uno de ellos
            CategoriaGaleria.find(function (err, categoriaGaleria) {
                if (err)
                    res.send(err);

                res.json(categoriaGaleria);
            }).populate('persona');
        });
};

// Modificamos un objeto CategoriaGaleria de la base de datos
exports.updateImagenCategoriaGaleria = function (req, res) {
    CategoriaGaleria.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, categoriaGaleria) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            CategoriaGaleria.find(function (err, categoriaGaleria) {
                if (err)
                    res.send(err);
                res.json(categoriaGaleria);
            });
        });
};

// Modificamos un objeto CategoriaGaleria de la base de datos
exports.updateCategoriaGaleria = function (req, res) {
    CategoriaGaleria.update({ _id: req.params.jugador_id },
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
        function (err, categoriaGaleria) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            CategoriaGaleria.find(function (err, categoriaGaleria) {
                if (err)
                    res.send(err);
                res.json(categoriaGaleria);
            });
        });
};

// Elimino un objeto CategoriaGaleria de la base de Datos
exports.removeCategoriaGaleria = function (req, res) {
    CategoriaGaleria.remove({ _id: req.params.categoriaGaleria_id }, function (err, categoriaGaleria) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        CategoriaGaleria.find(function (err, categoriaGaleria) {
            if (err)
                res.send(err);
            res.json(categoriaGaleria);
        });
    });
};