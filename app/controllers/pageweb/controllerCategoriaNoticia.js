var CategoriaNoticia = require('../../models/pageweb/categoriaNoticia');

// validar categoriaNoticia
exports.getCategoriaNoticias = function (req, res) {
    CategoriaNoticia.find({ categoriaNoticia: req.params.categoriaNoticia, passwordHash: req.params.password },
        function (err, categoriaNoticia) {
            if (err)
                res.send(err);
            res.json(categoriaNoticia); // devuelve todos las CategoriaNoticias en JSON		
        }
    );
};

// buscar documento del categoriaNoticia
exports.getCategoriaNoticiaPorId = function (req, res) {
    console.log("req.params._id:"+req.params._id);
    CategoriaNoticia.find({ _id: req.params._id },
        function (err, categoriaNoticia) {
            if (err)
                res.send(err);
            res.json(categoriaNoticia); // devuelve todas las CategoriaNoticias en JSON		
        }
    );
};

// buscar documento del categoriaNoticia
exports.getCategoriaNoticiasEnListaPaginada = function (req, res) {
    //console.log("req.params.documento:" + req.params.page);
    CategoriaNoticia.find(
        function (err, categoriaNoticia) {
            if (err)
                res.send(err);
            res.json(categoriaNoticia); // devuelve todas las CategoriaNoticias en JSON		
        }
    ).populate('persona')
        .skip(parseInt(req.params.page)-1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos CategoriaNoticia de la base de datos
exports.getCategoriaNoticia = function (req, res) {
    CategoriaNoticia.find(
        function (err, categoriaNoticia) {
            if (err)
                res.send(err);
            res.json(categoriaNoticia); // devuelve todas las CategoriaNoticias en JSON		
        }
    );
};

// Guarda un objeto CategoriaNoticia en base de datos
exports.setCategoriaNoticia = function (req, res) {
    // Creo el objeto CategoriaNoticia
    console.log("ini//req.body");
    console.log(req.body);
    console.log("fin//req.body");

    var imgPath = './public/images/bg5.png';
    var imgPathBanner = './public/images/quierojugar.png';

    CategoriaNoticia.create(
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
        function (err, categoriaNoticia) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando categoriaNoticia");
            console.log(categoriaNoticia);
            console.log("//creando categoriaNoticia");
            // Obtiene y devuelve todas los categoriaNoticias tras crear uno de ellos
            CategoriaNoticia.find(function (err, categoriaNoticia) {
                if (err)
                    res.send(err);

                res.json(categoriaNoticia);
            }).populate('persona');
        });
};

// Modificamos un objeto CategoriaNoticia de la base de datos
exports.updateImagenCategoriaNoticia = function (req, res) {
    CategoriaNoticia.update({ _id: req.params.jugador_id },
        { $set: { imagen: req.params.jugador_imagen } },
        function (err, categoriaNoticia) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            CategoriaNoticia.find(function (err, categoriaNoticia) {
                if (err)
                    res.send(err);
                res.json(categoriaNoticia);
            });
        });
};

// Modificamos un objeto CategoriaNoticia de la base de datos
exports.updateCategoriaNoticia = function (req, res) {
    CategoriaNoticia.update({ _id: req.params.jugador_id },
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
        function (err, categoriaNoticia) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las jugadors tras crear una de ellas
            CategoriaNoticia.find(function (err, categoriaNoticia) {
                if (err)
                    res.send(err);
                res.json(categoriaNoticia);
            });
        });
};

// Elimino un objeto CategoriaNoticia de la base de Datos
exports.removeCategoriaNoticia = function (req, res) {
    CategoriaNoticia.remove({ _id: req.params.categoriaNoticia_id }, function (err, categoriaNoticia) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las jugadors tras borrar una de ellas
        CategoriaNoticia.find(function (err, categoriaNoticia) {
            if (err)
                res.send(err);
            res.json(categoriaNoticia);
        });
    });
};