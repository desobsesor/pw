
var Noticia = require('../../models/pageweb/noticia');

// validar noticia
exports.getNoticias = function (req, res) {
    Noticia.find({enPaginaPrincipal : true, activo: true},
        function (err, noticias) {
            if (err)
                res.send(err);
            res.json(noticias); // devuelve todos las Noticias en JSON		
        }
    );
};

// buscar documento del noticia
exports.getNoticiaPorDocumento = function (req, res) {
    console.log("req.params.page:" + req.params.page);
    Noticia.find({ titulo: req.params.titulo },
        function (err, noticia) {
            if (err)
                res.send(err);
            res.json(noticia); // devuelve todas las Noticias en JSON		
        }
    ).populate('estadoNoticia')
        .populate('categoriaNoticia');
};

// buscar documento del noticia
exports.getNoticiasEnListaPaginada = function (req, res) {
    console.log("req.params.page:::" + req.params);
    Noticia.find(
        function (err, noticia) {
            if (err)
                res.send(err);
            res.json(noticia); // devuelve todas las Noticias en JSON		
        }
    )/*.populate('estadoNoticia')
    .populate('categoriaNoticia')*/
        .skip(parseInt(req.params.page) - 1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Noticia de la base de datos
exports.getNoticia = function (req, res) {
    Noticia.find({enPaginaPrincipal : true},
        function (err, noticia) {
            if (err)
                res.send(err);
            res.json(noticia); // devuelve todas las Noticias en JSON		
        }
    ).populate('estadoNoticia')
        .populate('categoriaNoticia');
};

// Guarda un objeto Noticia en base de datos
exports.setNoticia = function (req, res) {
    try {
        // Creo el objeto Noticia
        console.log("ini//req.body");
        console.log(req.body);
        console.log("fin//req.body");
    } catch (error) {
        console.log(error.code + "_:_" + error.message)
    }

    //var imgPath = './public/images/bg5.png';
    //var imgPathBanner = './public/images/info.png';
    //
    console.log("req.body.imagenPrincipal");
    console.log(req.body.imagenPrincipal);
    //var bindata = new require('mongodb').Binary(req.body.imagenPrincipal);
    //var dataBuffer = new Buffer(req.body.imagenPrincipal, 'base64'); 
    //console.log(req.file.srcData.src);
    Noticia.create(
        {
            titulo: req.body.titulo,
            resumen: req.body.resumen,
            descripcion: req.body.descripcion,
            metatags: req.body.metatags,
            //estadoNoticia: req.body.estadoNoticia,
            categoriaNoticia: req.body.categoriaNoticia,
            //orden: req.body.orden,
            url: req.body.url,
            //visitas: req.body.visitas,
            activo: req.body.activo,
            /*voto: {
                excelente: req.body.voto.excelente,
                bueno: req.body.voto.bueno,
                regular: req.body.voto.regular,
                malo: req.body.voto.malo,
            },*/
            fechaPublicacion: {
                dia: req.body.fechaPublicacion.dia,
                mes: req.body.fechaPublicacion.mes,
                ano: req.body.fechaPublicacion.ano
            },
            imagenPrincipal: req.body.imagenPrincipal,
            meGusta: 1,
            noMeGusta: 1
            /*imagenPrincipal: { 
                data: fs.readFileSync(req.file.srcData.src),
                contentType: 'image/png'
            },
            imagenBanner: {
                data: fs.readFileSync(imgPathBanner),
                contentType: 'image/png'
            }*/
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
        function (err, noticia) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando noticia");
            console.log(noticia);
            console.log("//creando noticia");
            // Obtine y devuelve todas los noticiaes tras crear uno de ellos
            Noticia.find(function (err, noticia) {
                if (err)
                    res.send(err);

                res.json(noticia);

            }).populate('estadoNoticia')
                .populate('categoriaNoticia');
        });
};

// Modificamos un objeto Noticia de la base de datos
exports.updateImagenNoticia = function (req, res) {
    Noticia.update({ _id: req.params.noticia_id },
        { $set: { imagen: req.params.noticia_imagen } },
        function (err, noticia) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las noticias tras crear una de ellas
            Noticia.find(function (err, noticia) {
                if (err)
                    res.send(err);
                res.json(noticia);
            });
        });
};
// Modificamos un objeto Noticia de la base de datos
exports.updateEstadoNoticia = function (req, res) {
    console.log(req.params);
    Noticia.update({ _id: req.params.noticia_id },
        { $set: { activo: req.params.noticia_activo } },
        function (err, noticia) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las noticias tras crear una de ellas
            Noticia.find(function (err, noticia) {
                if (err)
                    res.send(err);
                res.json(noticia);
            });
        });
};
// Modificamos un objeto Noticia de la base de datos
exports.updateEnPaginaPrincipalNoticia = function (req, res) {
    //console.log(req.params);
    Noticia.update({ _id: req.params.noticia_id },
        { $set: { enPaginaPrincipal: req.params.noticia_enpaginaprincipal } },
        function (err, noticia) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las noticias tras crear una de ellas
            Noticia.find(function (err, noticias) {
                if (err)
                    res.send(err);
                res.json(noticias);
            });
        });
};
// Modificamos un objeto Noticia de la base de datos
exports.updateVotoNoticia = function (req, res) {
    console.log(req.params);

    Noticia.findOne({ _id: req.params.noticia_id },
        function (err, noticiaA) {
            if (err)
                res.send(err);

            console.log(noticiaA.meGusta);
            //Tenemos a noticiaA como entidad recuperada  
            if (req.params.noticia_megusta == "1") {
                
                console.log("noticia_megusta");
                Noticia.update({ _id: req.params.noticia_id },
                    {
                        $set: { meGusta: parseInt(req.params.noticia_megusta) + parseInt(noticiaA.meGusta) }
                    },
                    function (err, noticia) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las noticias tras crear una de ellas
                        Noticia.find(function (err, noticia) {
                            if (err)
                                res.send(err);
                            res.json(noticia);
                        });
                    });
            } else if (req.params.noticia_nomegusta == "1")  {
                
                console.log("noticia_nomegusta");
                Noticia.update({ _id: req.params.noticia_id },
                    {
                        $set: { noMeGusta: parseInt(req.params.noticia_nomegusta) + parseInt(noticiaA.noMeGusta) }
                    },
                    function (err, noticia) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las noticias tras crear una de ellas
                        Noticia.find(function (err, noticia) {
                            if (err)
                                res.send(err);
                            res.json(noticia);
                        });
                    });
            }
            //res.json(noticia); // devuelve todas las Noticias en JSON		
        }
    )
};
// Modificamos un objeto Noticia de la base de datos
exports.updateNoticia = function (req, res) {
    Noticia.update({ _id: req.params.noticia_id },
        {
            $set: {
                titulo: req.body.titulo,
                resumen: req.body.resumen,
                descripcion: req.body.descripcion,
                metatags: req.body.metatags,
                //estadoNoticia: req.body.estadoNoticia,
                categoriaNoticia: req.body.categoriaNoticia,
                //orden: req.body.orden,
                url: req.body.url,
                //visitas: req.body.visitas,
                activo: req.body.activo,
                /*voto: {
                    excelente: req.body.voto.excelente,
                    bueno: req.body.voto.bueno,
                    regular: req.body.voto.regular,
                    malo: req.body.voto.malo,
                },*/
                fechaPublicacion: {
                    dia: req.body.fechaPublicacion.dia,
                    mes: req.body.fechaPublicacion.mes,
                    ano: req.body.fechaPublicacion.ano
                },
                imagenPrincipal: req.body.imagenPrincipal
            }
        },
        function (err, noticia) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las noticias tras crear una de ellas
            Noticia.find(function (err, noticia) {
                if (err)
                    res.send(err);
                res.json(noticia);
            }).populate('estadoNoticia')
                .populate('categoriaNoticia');
        });
};

// Elimino un objeto Noticia de la base de Datos
exports.removeNoticia = function (req, res) {
    console.log("req.params");
    console.log(req.params);
    Noticia.deleteOne({ _id: req.params.noticia_id }, function (err, noticia) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las noticias tras borrar una de ellas
        Noticia.find(function (err, noticia) {
            if (err)
                res.send(err);
            res.json(noticia);

        }).populate('estadoNoticia')
            .populate('categoriaNoticia');
    });
};