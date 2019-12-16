
var Galeria = require('../../models/pageweb/galeria');

// validar galeria
exports.getGalerias = function (req, res) {
    Galeria.find({enPaginaPrincipal : true, activo: true},
        function (err, galerias) {
            if (err)
                res.send(err);
            res.json(galerias); // devuelve todos las Galerias en JSON		
        }
    ).populate('estadoGaleria')
    .populate('categoriaGaleria');
};

// buscar documento del galeria
exports.getGaleriaPorDocumento = function (req, res) {
    console.log("req.params.page:" + req.params.page);
    Galeria.find({ titulo: req.params.titulo },
        function (err, galeria) {
            if (err)
                res.send(err);
            res.json(galeria); // devuelve todas las Galerias en JSON		
        }
    ).populate('estadoGaleria')
        .populate('categoriaGaleria');
};

// buscar documento del galeria
exports.getGaleriasEnListaPaginada = function (req, res) {
    console.log("req.params.page:::" + req.params.page);
    Galeria.find(
        function (err, galeria) {
            if (err)
                res.send(err);
            res.json(galeria); // devuelve todas las Galerias en JSON		
        }
    ).populate('estadoGaleria')
    .populate('categoriaGaleria')
        .skip(parseInt(req.params.page) - 1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Galeria de la base de datos
exports.getGaleria = function (req, res) {
    Galeria.find({enPaginaPrincipal : true},
        function (err, galeria) {
            if (err)
                res.send(err);
            res.json(galeria); // devuelve todas las Galerias en JSON		
        }
    ).populate('estadoGaleria')
        .populate('categoriaGaleria');
};

// Guarda un objeto Galeria en base de datos
exports.setGaleria = function (req, res) {
    try {
        // Creo el objeto Galeria
        console.log("ini//req.body");
        console.log(req.body);
        console.log("fin//req.body");
    } catch (error) {
        console.log(error.code + "_:_" + error.message)
    }

    Galeria.create(
        {
            nombre: req.body.nombre,
            metatags: req.body.metatags,
            descripcion: req.body.descripcion,
            categoriaGaleria: req.body.categoriaGaleria,
            visitas: 1,
            enPaginaPrincipal: false,
            activo: req.body.activo=="1"?true:false,
            meGusta: 1,
            noMeGusta: 1,
            imagenPrincipal: req.body.imagenPrincipal
        },
        function (err, galeria) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando galeria");
            console.log(galeria);
            console.log("//creando galeria");
            // Obtine y devuelve todas los galeriaes tras crear uno de ellos
            Galeria.find(function (err, galeria) {
                if (err)
                    res.send(err);
                res.json(galeria);
            }).populate('estadoGaleria')
                .populate('categoriaGaleria');
        });
};

// Modificamos un objeto Galeria de la base de datos
exports.updateImagenGaleria = function (req, res) {
    Galeria.update({ _id: req.params.galeria_id },
        { $set: { imagen: req.params.galeria_imagen } },
        function (err, galeria) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las galerias tras crear una de ellas
            Galeria.find(function (err, galeria) {
                if (err)
                    res.send(err);
                res.json(galeria);
            });
        });
};
// Modificamos un objeto Galeria de la base de datos
exports.updateEstadoGaleria = function (req, res) {
    console.log(req.params);
    Galeria.update({ _id: req.params.galeria_id },
        { $set: { activo: req.params.galeria_activo } },
        function (err, galeria) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las galerias tras crear una de ellas
            Galeria.find(function (err, galeria) {
                if (err)
                    res.send(err);
                res.json(galeria);
            });
        });
};
// Modificamos un objeto Galeria de la base de datos
exports.updateEnPaginaPrincipalGaleria = function (req, res) {
    //console.log(req.params);
    Galeria.update({ _id: req.params.galeria_id },
        { $set: { enPaginaPrincipal: req.params.galeria_enpaginaprincipal } },
        function (err, galeria) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las galerias tras crear una de ellas
            Galeria.find(function (err, galerias) {
                if (err)
                    res.send(err);
                res.json(galerias);
            });
        });
};
// Modificamos un objeto Galeria de la base de datos
exports.updateVotoGaleria = function (req, res) {
    console.log(req.params);

    Galeria.findOne({ _id: req.params.galeria_id },
        function (err, galeriaA) {
            if (err)
                res.send(err);

            console.log(galeriaA.meGusta);
            //Tenemos a galeriaA como entidad recuperada  
            if (req.params.galeria_megusta == "1") {
                
                console.log("galeria_megusta");
                Galeria.update({ _id: req.params.galeria_id },
                    {
                        $set: { meGusta: parseInt(req.params.galeria_megusta) + parseInt(galeriaA.meGusta) }
                    },
                    function (err, galeria) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las galerias tras crear una de ellas
                        Galeria.find(function (err, galeria) {
                            if (err)
                                res.send(err);
                            res.json(galeria);
                        });
                    });
            } else if (req.params.galeria_nomegusta == "1")  {
                
                console.log("galeria_nomegusta");
                Galeria.update({ _id: req.params.galeria_id },
                    {
                        $set: { noMeGusta: parseInt(req.params.galeria_nomegusta) + parseInt(galeriaA.noMeGusta) }
                    },
                    function (err, galeria) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las galerias tras crear una de ellas
                        Galeria.find(function (err, galeria) {
                            if (err)
                                res.send(err);
                            res.json(galeria);
                        });
                    });
            }
            //res.json(galeria); // devuelve todas las Galerias en JSON		
        }
    )
};
// Modificamos un objeto Galeria de la base de datos
exports.updateGaleria = function (req, res) {
    Galeria.update({ _id: req.params.galeria_id },
        {
            $set: {
                nombre: req.body.nombre,
            metatags: req.body.metatags,
            descripcion: req.body.descripcion,
            categoriaGaleria: req.body.categoriaGaleria,
            visitas: 1,
            enPaginaPrincipal: false,
            activo: req.body.activo=="1"?true:false,
            meGusta: 1,
            noMeGusta: 1,
            imagenPrincipal: req.body.imagenPrincipal
            }
        },
        function (err, galeria) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las galerias tras crear una de ellas
            Galeria.find(function (err, galeria) {
                if (err)
                    res.send(err);
                res.json(galeria);
            }).populate('estadoGaleria')
                .populate('categoriaGaleria');
        });
};

// Elimino un objeto Galeria de la base de Datos
exports.removeGaleria = function (req, res) {
    console.log("req.params");
    console.log(req.params);
    Galeria.deleteOne({ _id: req.params.galeria_id }, function (err, galeria) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las galerias tras borrar una de ellas
        Galeria.find(function (err, galeria) {
            if (err)
                res.send(err);
            res.json(galeria);

        }).populate('estadoGaleria')
            .populate('categoriaGaleria');
    });
};