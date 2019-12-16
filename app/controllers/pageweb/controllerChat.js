
var Chat = require('../../models/pageweb/chat');

// validar chat
exports.getChats = function (req, res) {
    Chat.find({enPaginaPrincipal : true, activo: true},
        function (err, chats) {
            if (err)
                res.send(err);
            res.json(chats); // devuelve todos las Chats en JSON		
        }
    );
};

// buscar documento del chat
exports.getChatPorDocumento = function (req, res) {
    console.log("req.params.page:" + req.params.page);
    Chat.find({ titulo: req.params.titulo },
        function (err, chat) {
            if (err)
                res.send(err);
            res.json(chat); // devuelve todas las Chats en JSON		
        }
    ).populate('estadoChat')
        .populate('categoriaChat');
};

// buscar documento del chat
exports.getChatsEnListaPaginada = function (req, res) {
    console.log("req.params.page:::" + req.params);
    Chat.find(
        function (err, chat) {
            if (err)
                res.send(err);
            res.json(chat); // devuelve todas las Chats en JSON		
        }
    )/*.populate('estadoChat')
    .populate('categoriaChat')*/
        .skip(parseInt(req.params.page) - 1).limit(parseInt(req.params.rows));
};

// Obtiene todos los objetos Chat de la base de datos
exports.getChat = function (req, res) {
    Chat.find({enPaginaPrincipal : true},
        function (err, chat) {
            if (err)
                res.send(err);
            res.json(chat); // devuelve todas las Chats en JSON		
        }
    ).populate('estadoChat')
        .populate('categoriaChat');
};

// Guarda un objeto Chat en base de datos
exports.setChat = function (req, res) {
    try {
        // Creo el objeto Chat
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
    Chat.create(
        {
            titulo: req.body.titulo,
            resumen: req.body.resumen,
            descripcion: req.body.descripcion,
            metatags: req.body.metatags,
            //estadoChat: req.body.estadoChat,
            categoriaChat: req.body.categoriaChat,
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
        function (err, chat) {
            if (err) {
                console.log("error");
                console.log(err);
                res.send(err);
            }
            console.log("creando chat");
            console.log(chat);
            console.log("//creando chat");
            // Obtine y devuelve todas los chates tras crear uno de ellos
            Chat.find(function (err, chat) {
                if (err)
                    res.send(err);

                res.json(chat);

            }).populate('estadoChat')
                .populate('categoriaChat');
        });
};

// Modificamos un objeto Chat de la base de datos
exports.updateImagenChat = function (req, res) {
    Chat.update({ _id: req.params.chat_id },
        { $set: { imagen: req.params.chat_imagen } },
        function (err, chat) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las chats tras crear una de ellas
            Chat.find(function (err, chat) {
                if (err)
                    res.send(err);
                res.json(chat);
            });
        });
};
// Modificamos un objeto Chat de la base de datos
exports.updateEstadoChat = function (req, res) {
    console.log(req.params);
    Chat.update({ _id: req.params.chat_id },
        { $set: { activo: req.params.chat_activo } },
        function (err, chat) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las chats tras crear una de ellas
            Chat.find(function (err, chat) {
                if (err)
                    res.send(err);
                res.json(chat);
            });
        });
};
// Modificamos un objeto Chat de la base de datos
exports.updateEnPaginaPrincipalChat = function (req, res) {
    //console.log(req.params);
    Chat.update({ _id: req.params.chat_id },
        { $set: { enPaginaPrincipal: req.params.chat_enpaginaprincipal } },
        function (err, chat) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtiene y devuelve todas las chats tras crear una de ellas
            Chat.find(function (err, chats) {
                if (err)
                    res.send(err);
                res.json(chats);
            });
        });
};
// Modificamos un objeto Chat de la base de datos
exports.updateVotoChat = function (req, res) {
    console.log(req.params);

    Chat.findOne({ _id: req.params.chat_id },
        function (err, chatA) {
            if (err)
                res.send(err);

            console.log(chatA.meGusta);
            //Tenemos a chatA como entidad recuperada  
            if (req.params.chat_megusta == "1") {
                
                console.log("chat_megusta");
                Chat.update({ _id: req.params.chat_id },
                    {
                        $set: { meGusta: parseInt(req.params.chat_megusta) + parseInt(chatA.meGusta) }
                    },
                    function (err, chat) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las chats tras crear una de ellas
                        Chat.find(function (err, chat) {
                            if (err)
                                res.send(err);
                            res.json(chat);
                        });
                    });
            } else if (req.params.chat_nomegusta == "1")  {
                
                console.log("chat_nomegusta");
                Chat.update({ _id: req.params.chat_id },
                    {
                        $set: { noMeGusta: parseInt(req.params.chat_nomegusta) + parseInt(chatA.noMeGusta) }
                    },
                    function (err, chat) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }

                        // Obtiene y devuelve todas las chats tras crear una de ellas
                        Chat.find(function (err, chat) {
                            if (err)
                                res.send(err);
                            res.json(chat);
                        });
                    });
            }
            //res.json(chat); // devuelve todas las Chats en JSON		
        }
    )
};
// Modificamos un objeto Chat de la base de datos
exports.updateChat = function (req, res) {
    Chat.update({ _id: req.params.chat_id },
        {
            $set: {
                titulo: req.body.titulo,
                resumen: req.body.resumen,
                descripcion: req.body.descripcion,
                metatags: req.body.metatags,
                //estadoChat: req.body.estadoChat,
                categoriaChat: req.body.categoriaChat,
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
        function (err, chat) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las chats tras crear una de ellas
            Chat.find(function (err, chat) {
                if (err)
                    res.send(err);
                res.json(chat);
            }).populate('estadoChat')
                .populate('categoriaChat');
        });
};

// Elimino un objeto Chat de la base de Datos
exports.removeChat = function (req, res) {
    console.log("req.params");
    console.log(req.params);
    Chat.deleteOne({ _id: req.params.chat_id }, function (err, chat) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las chats tras borrar una de ellas
        Chat.find(function (err, chat) {
            if (err)
                res.send(err);

            res.json(chat);
        });
    });
};