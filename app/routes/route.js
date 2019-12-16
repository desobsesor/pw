
var Servicio = require('../models/pageweb/servicio');
var ControllerUsuario = require('../controllers/login/controllerUsuario');
var Usuario = require('../models/login/usuario');
var ControllerServicio = require('../controllers/pageweb/controllerServicio');
var Contacto = require('../models/player/contacto');
var ControllerContacto = require('../controllers/player/controllerContacto');
var Faq = require('../models/pageweb/faq');
var ControllerFaq = require('../controllers/pageweb/controllerFaq');
var ControllerAliado = require('../controllers/company/controllerAliado');
var ControllerNivelEducativo = require('../controllers/player/controllerNivelEducativo');
var NivelEducativo = require('../models/player/personalInformation/nivelEducativo');
var ControllerContenido = require('../controllers/pageweb/controllerContenido');
var Contenido = require('../models/pageweb/contenido');
var ControllerNoticia = require('../controllers/pageweb/controllerNoticia');
var Noticia = require('../models/pageweb/noticia');
//var CategoriaNoticia = require('../models/pageweb/categoriaNoticia');
var ControllerCategoriaGaleria = require('../controllers/pageweb/controllerCategoriaGaleria');
var ControllerCategoriaNoticia = require('../controllers/pageweb/controllerCategoriaNoticia');
//var EstadoNoticia = require('../models/pageweb/estadoNoticia');
var ControllerEstadoNoticia = require('../controllers/pageweb/controllerEstadoNoticia');
var ControllerGaleria = require('../controllers/pageweb/controllerGaleria');
var EstadoGaleria = require('../models/pageweb/estadoGaleria');
var ControllerEstadoGaleria = require('../controllers/pageweb/controllerEstadoGaleria');
var ControllerFoto = require('../controllers/pageweb/controllerFoto');
var Persona = require('../models/player/personalInformation/persona');
var ControllerChat = require('../controllers/pageweb/controllerChat');
var Chat = require('../models/pageweb/chat');
var ControllerUsuarioRegistrado = require('../controllers/pageweb/controllerUsuarioRegistrado');
var UsuarioRegistrado = require('../models/pageweb/usuarioRegistrado');
var TipoDocumento = require('../models/player/personalInformation/tipoDocumento');
var ControllerTipoDocumento = require('../controllers/player/controllerTipoDocumento');
var Sexo = require('../models/player/personalInformation/sexo');
var ControllerSexo = require('../controllers/player/controllerSexo');


// mongoose para mongodb
var multer = require('multer');
var fs = require('fs');
var sesiones = require('../controllers/login/controllerSesiones');

var done = false;
var fileNameUpload = "";
var fileNamePath = "";

module.exports = function (app) {

    //#region INICIO DE SESIÓN
    app.post('/api/login', function (req, res, next) {
        var user = {
            usuario: req.body.usuario,
            passwordHash: req.body.passwordHash
        };
        Usuario.findOne(user, function (err, newUser) {
            if (err) {
                return res.status(500).json({
                    msg: 'Error login'
                });
            }
            if (!newUser) {
                return res.status(404).json({
                    msg: 'No existe'
                });
            } else {
                console.log(newUser);
                req.session.usuario = newUser;
                req.session.admin = true;
                console.log("req:::");
                console.log(req.session);
                console.log(req.session.usuario);
            }

            return res.status(200).json(newUser);

        }).populate("persona");
    });
    //#endregion
    //#region EVENTOS
    var auth = function (req, res, next) {
        //if (req.session && req.session.user === "jose" && req.session.admin)
        if (req.session /*&& req.session.usuario*/ && req.session.admin)
            return next();
        else
            return res.sendStatus(401);
    };

    app.get('/api/noticiasd', function (req, res) {
        console.log("En el router");

        Noticia.find(//{enPaginaPrincipal : true, activo: true},
            function (err, noticias) {
                if (err)
                    res.send(err);

                console.log(noticias);
                var data = '';
                for (var i = 0; i < noticias.length; i++) {
                    data = data + noticias[i].titulo + '\t' + noticias[i].resumen + '\t' + noticias[i].metatags + '\n';
                }
                fs.appendFile('uploads/Filename.xls', data, (err) => {
                    if (err) throw err;
                    console.log('File created');
                });

            }
        );


        //res.send("Todo bien");
        /*res.writeHead(200, {
            'Content-Disposition': 'attachment; filename="Filename.xlsx"',
            'Transfer-Encoding': 'chunked',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        var workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res });
        var worksheet = workbook.addWorksheet('some-worksheet');
        worksheet.addRow(['foo', 'bar']).commit();
        worksheet.commit();
        workbook.commit();*/
    });

    //Destruir la sesión completa.
    app.get('/api/logout', function (req, res) {
        req.session.destroy();
        res.send("Sessión Destruida.");
    });
    //Para llegar a la ruta content necesitamos tener permisos de administrador:

    app.get('/content', auth, function (req, res) {
        res.send("You can only see this after you've logged in.");
    });

    //#endregion

    //#region RUTAS APLICACIÓN
    app.delete('/api/chat/:chat_id', ControllerChat.removeChat);
    // devolver todos las fotos
    app.get('/api/foto', ControllerFoto.getFotosEnListaPaginada);
    app.get('/api/fotos/:galeria_id', ControllerFoto.getFoto);
    app.post('/api/foto', ControllerFoto.setFoto);
    app.put('/api/foto/:foto_id', ControllerFoto.updateFoto);
    app.delete('/api/foto/:foto_id', ControllerFoto.removeFoto);
    //app.put('/api/foto/:foto_id/activo/:foto_activo', ControllerFoto.updateEstadoFoto);
    //app.put('/api/fotoc/:foto_id/enpaginaprincipal/:foto_enpaginaprincipal', ControllerFoto.updateEnPaginaPrincipalFoto);
    //app.put('/api/fotoa/:foto_id/megusta/:foto_megusta', ControllerFoto.updateVotoFoto);
    //app.put('/api/fotob/:foto_id/nomegusta/:foto_nomegusta', ControllerFoto.updateVotoFoto);
    // devolver todos las noticias
    app.get('/api/galeria', ControllerGaleria.getGaleriasEnListaPaginada);
    app.get('/api/galerias', ControllerGaleria.getGalerias);
    app.post('/api/galeria', ControllerGaleria.setGaleria);
    app.put('/api/galeria/:galeria_id', ControllerGaleria.updateGaleria);
    app.delete('/api/galeria/:galeria_id', ControllerGaleria.removeGaleria);
    app.put('/api/galeria/:galeria_id/activo/:galeria_activo', ControllerGaleria.updateEstadoGaleria);
    app.put('/api/galeriac/:galeria_id/enpaginaprincipal/:galeria_enpaginaprincipal', ControllerGaleria.updateEnPaginaPrincipalGaleria);
    app.put('/api/galeriaa/:galeria_id/megusta/:galeria_megusta', ControllerGaleria.updateVotoGaleria);
    app.put('/api/galeriab/:galeria_id/nomegusta/:galeria_nomegusta', ControllerGaleria.updateVotoGaleria);
    // devolver todos las categorias de galerias
    app.get('/api/categoriaGaleria', ControllerCategoriaGaleria.getCategoriaGaleria);
    app.post('/api/categoriaGaleria', ControllerCategoriaGaleria.setCategoriaGaleria);
    app.put('/api/categoriaGaleria/:categoriaGaleria_id', ControllerCategoriaGaleria.updateCategoriaGaleria);
    app.delete('/api/categoriaGaleria/:categoriaGaleria_id', ControllerCategoriaGaleria.removeCategoriaGaleria);
    //app.put('/api/noticia/:noticia_id/imagen/:noticia_imagen', ControllerNoticia.updateImagenNoticia);
    // devolver todos las noticias
    app.get('/api/noticia/:page/:rows', ControllerNoticia.getNoticiasEnListaPaginada);
    app.get('/api/noticias', ControllerNoticia.getNoticias);
    app.post('/api/noticia', ControllerNoticia.setNoticia);
    app.put('/api/noticia/:noticia_id', ControllerNoticia.updateNoticia);
    app.delete('/api/noticia/:noticia_id', ControllerNoticia.removeNoticia);
    app.put('/api/noticia/:noticia_id/activo/:noticia_activo', ControllerNoticia.updateEstadoNoticia);
    app.put('/api/noticiac/:noticia_id/enpaginaprincipal/:noticia_enpaginaprincipal', ControllerNoticia.updateEnPaginaPrincipalNoticia);
    app.put('/api/noticiaa/:noticia_id/megusta/:noticia_megusta', ControllerNoticia.updateVotoNoticia);
    app.put('/api/noticiab/:noticia_id/nomegusta/:noticia_nomegusta', ControllerNoticia.updateVotoNoticia);
    // devolver todos las noticias
    app.get('/api/estadoNoticia', ControllerEstadoNoticia.getEstadoNoticia);
    app.post('/api/estadoNoticia', ControllerEstadoNoticia.setEstadoNoticia);
    app.put('/api/estadoNoticia/:estadoNoticia_id', ControllerEstadoNoticia.updateEstadoNoticia);
    app.delete('/api/estadoNoticia/:estadoNoticia_id', ControllerEstadoNoticia.removeEstadoNoticia);
    //app.put('/api/noticia/:noticia_id/imagen/:noticia_imagen', ControllerNoticia.updateImagenNoticia);
    // devolver todos las noticias
    app.get('/api/categoriaNoticia', ControllerCategoriaNoticia.getCategoriaNoticia);
    app.post('/api/categoriaNoticia', ControllerCategoriaNoticia.setCategoriaNoticia);
    app.put('/api/categoriaNoticia/:categoriaNoticia_id', ControllerCategoriaNoticia.updateCategoriaNoticia);
    app.delete('/api/categoriaNoticia/:categoriaNoticia_id', ControllerCategoriaNoticia.removeCategoriaNoticia);
    //app.put('/api/noticia/:noticia_id/imagen/:noticia_imagen', ControllerNoticia.updateImagenNoticia);
    // devolver todos los servicios
    app.get('/api/contenido', ControllerContenido.getContenido);
    app.post('/api/contenido', ControllerContenido.setContenido);
    app.put('/api/contenido/:contenido_id', ControllerContenido.updateContenido);
    app.delete('/api/contenido/:contenido_id', ControllerContenido.removeContenido);
    //app.put('/api/contenido/:contenido_id/imagen/:contenido_imagen', ControllerServicio.updateImagenServicio);

    // devolver todos los servicios
    app.get('/api/servicio', ControllerServicio.getServicio);
    app.post('/api/servicio', ControllerServicio.setServicio);
    app.put('/api/servicio/:servicio_id', ControllerServicio.updateServicio);
    app.delete('/api/servicio/:servicio_id', ControllerServicio.removeServicio);
    app.put('/api/servicio/:servicio_id/imagen/:servicio_imagen', ControllerServicio.updateImagenServicio);
    // devolver todos los contactos
    app.get('/api/contacto', auth, ControllerContacto.getContacto);
    app.post('/api/contacto', ControllerContacto.setContacto);
    app.post('/api/contactoboletin', ControllerContacto.setContactoBoletin);
    app.put('/api/contacto/:contacto_id', ControllerContacto.updateContacto);
    app.delete('/api/contacto/:contacto_id', ControllerContacto.removeContacto);
    //Sesiones
    app.get('/api/identificacion', sesiones.getIdentificacion);
    app.post('/api/identificacion', sesiones.postIdentificacion);
    app.get('/api/bienvenida', sesiones.bienvenida);
    app.get('/api/salir', sesiones.salir);
    // devolver todos los servicios
    app.get('/api/faq', ControllerFaq.getFaq);
    app.post('/api/faq', ControllerFaq.setFaq);
    app.put('/api/faq/:faq_id', ControllerFaq.updateFaq);
    app.delete('/api/faq/:faq_id', ControllerFaq.removeFaq);

    // devolver todos los aliados
    app.get('/api/aliado', ControllerAliado.getAliado);
    app.post('/api/aliado', auth, ControllerAliado.setAliado);
    app.put('/api/aliado/:aliado_id', ControllerAliado.updateAliado);
    app.delete('/api/aliado/:aliado_id', auth, ControllerAliado.removeAliado);
    // devolver todos los aliados
    app.get('/api/nivelEducativo', ControllerNivelEducativo.getNivelEducativo);
    app.post('/api/nivelEducativo', ControllerNivelEducativo.setNivelEducativo);
    app.put('/api/nivelEducativo/:nivelEducativo_id', ControllerNivelEducativo.updateNivelEducativo);
    app.delete('/api/nivelEducativo/:nivelEducativo_id', ControllerNivelEducativo.removeNivelEducativo);
    // usuario
    app.get('/api/usuario', ControllerUsuario.getUsuario);
    app.post('/api/usuario', ControllerUsuario.setUsuario);
    app.put('/api/usuario/:usuario_id', ControllerUsuario.updateUsuario);
    app.delete('/api/usuario/:usuario_id', ControllerUsuario.removeUsuario);
    //app.put('/api/usuario/:usuario_id/usuario/:usuario_imagen', ControllerUsuario.updateImagenUsuario);
    // usuario registrado a la comunidad
    app.get('/api/usuarioRegistrado/:page/:rows', ControllerUsuarioRegistrado.getUsuariosRegistradosEnListaPaginada);
    app.get('/api/usuarioRegistrado', ControllerUsuarioRegistrado.getUsuarioRegistrado);
    app.post('/api/usuarioRegistrado', ControllerUsuarioRegistrado.setUsuarioRegistrado);
    app.put('/api/usuarioRegistrado/:usuarioRegistrado_id', ControllerUsuarioRegistrado.updateUsuarioRegistrado);
    app.delete('/api/usuarioRegistrado/:usuarioRegistrado_id', ControllerUsuarioRegistrado.removeUsuarioRegistrado);
    //TipoDocumento
    app.get('/api/tipoDocumento', ControllerTipoDocumento.getTipoDocumento);
    app.post('/api/tipoDocumento', ControllerTipoDocumento.setTipoDocumento);
    app.put('/api/tipoDocumento/:tipoDocumento_id', ControllerTipoDocumento.updateTipoDocumento);
    app.delete('/api/tipoDocumento/:tipoDocumento_id', ControllerTipoDocumento.removeTipoDocumento);
    //sexo
    app.get('/api/sexo', ControllerSexo.getSexo);
    app.post('/api/sexo', ControllerSexo.setSexo);
    //#endregion

    app.get('*', function (req, res) {
        /*var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
         console.log(ip);*/
        //res.sendfile('./app/views/championship/panelCanchaTejo.html'); // Carga única de la vista
        res.sendfile('./public/index.html'); // Carga única de la vista
        //res.sendfile('./app/views/player/calendarioJuegos.html'); // Carga única de la vista
        //res.sendfile('./public/index.html', { root: VIEWS }); // Carga única de la vista
    });

    /*app.get('/login', function (req, res) {
        //var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        //console.log(ip);
        res.sendfile('./public/login.html'); // Carga única de la vista
        //res.sendfile('./public/index.html', { root: VIEWS }); // Carga única de la vista
    });*/

};
