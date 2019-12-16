var app = angular.module('MainAppServicio', []);


//navegacion por el sitio pasando por el faces del angular
app.factory('Navigation', function ($rootScope, $timeout) {
    return {
        location: '',
        cargarPresentacion: function (msg) {
            this.location = './public/presentacion.html';
        },
        cargarContenido: function (msg) {
            this.location = './app/views/pageweb/contenido/contenidos.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNuevoContenido: function (msg) {
            this.location = './app/views/pageweb/contenido/nuevoContenido.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarSubirImagen: function (msg) {
            this.location = './app/views/pageweb/noticia/index.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNoticia: function (msg) {
            this.location = './app/views/pageweb/noticia/noticias.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNoticiaOtra: function (msg) {
            this.location = './app/views/pageweb/noticia/noticias.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNuevaNoticia: function (msg) {
            $rootScope.item = {};
            this.location = './app/views/pageweb/noticia/nuevaNoticia.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarGaleria: function (msg) {
            this.location = './app/views/pageweb/galeria/galerias.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNuevaGaleria: function (msg) {
            this.location = './app/views/pageweb/galeria/nuevaGaleria.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarProducto: function (msg) {
            this.location = './public/producto.html';
        },
        cargarServicios: function (msg) {
            this.location = './app/views/pageweb/servicio/index.html';
        },
        cargarPacientes: function (msg) {
            this.location = './app/views/paciente/index.html';
        },
        cargarCategorias: function (msg) {
            this.location = './app/views/categoria/index.html';
        },
        cargarRazas: function (msg) {
            this.location = './app/views/raza/index.html';
        },
        cargarAcercaDe: function (msg) {
            this.location = './public/acercaDe.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarTienda: function (msg) {
            this.location = './public/tienda.html';
        },
        contactenos: function (msg) {
            this.location = './app/views/pageweb/contacto/index.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        player: function (item) {
            $rootScope.item = item;
            this.location = './app/views/player/panelMiCuenta.html';
        },
        cargarJuegosDiarios: function (msg) {
            this.location = './app/views/player/juegosDiarios.html';
        },
        faq: function (msg) {
            this.location = './public/faq.html';
        },
        portafolio: function (msg) {
            this.location = './public/portfolio.html';
        },
        registro: function (msg) {
            this.location = './public/registration.html';
        },
        cargarInicio: function (msg) {
            this.location = './public/carrusel.html';
            $timeout(function () {
                $('#frameVideo').prop('src', 'public/afrocaq/video/jornadaaseo.mp4');
                $timeout(function () {
                    $('#frameVideo').prop('src', 'public/afrocaq/video/COMPARSASABADO02JUNIO2018_2.mp4');
                    $timeout(function () {
                        $('#frameVideo').prop('src', 'public/afrocaq/video/INTEGRACIONCAMPUSUNIAMAZONIADOMINGO03JUNIO2018.mp4');
                        $timeout(function () {
                            $('#frameVideo').prop('src', 'public/afrocaq/video/COMPARSASABADO02JUNIO2018.mp4');
                        }, 10000);
                    }, 10000);
                }, 15000);
            }, 15000);
            //var intervalId = window.setInterval("$('#frameVideo').prop('src', 'public/afrocaq/video/COMPARSASABADO02JUNIO2018_2.mp4');",20000); 
        },
        cargarLogin: function (msg) {
            //this.location = './public/login.html';
            this.location = './public/iniciarSesion.html';
        },
        cargarUsuario: function (msg) {
            this.location = './app/views/usuario/index.html';
        },
        cargarAlianzas: function (msg) {
            this.location = './app/views/company/aliado/index.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarItem: function (msg) {
            this.location = './app/views/item/index.html';
        },
        cargarItemMedicamento: function (msg) {
            this.location = './app/views/itemMedicamento/index.html';
        },
        cargarItemLicor: function (msg) {
            this.location = './app/views/inventory/itemLicor/index.html';
        },
        cargarInventario: function (msg) {
            this.location = './app/views/inventario/index.html';
        },
        cargarTipoInventario: function (msg) {
            this.location = './app/views/tipoInventario/index.html';
        },
        cargarJugador: function (msg) {
            this.location = './app/views/player/jugador/index.html';
        },
        cargarNuevoJugador: function (msg) {
            this.location = './app/views/player/jugador/nuevoJugador.html';
        },
        cargarPersona: function (msg) {
            this.location = './app/views/player/persona/index.html';
        },
        cargarPlanesYPrecios: function (msg) {
            this.location = './public/planesyprecios.html';
        },
        cargarCalendarioJuegos: function (msg) {
            this.location = './app/views/player/calendarioJuegos.html';
        },
        cargarNoticias: function (msg) {
            this.location = './app/views/pageweb/noticia/noticias.html';
        },
        cargarVisualizarDatosNoticia: function (item) {
            $rootScope.item = item;
            this.location = './app/views/pageweb/noticia/nuevaNoticia.html';
        },
        cargarGalerias: function (msg) {
            this.location = './app/views/pageweb/galeria/galerias.html';
        },
        cargarVisualizarDatosGaleria: function (item) {
            $rootScope.item = item;
            this.location = './app/views/pageweb/galeria/nuevaGaleria.html';
        },
        cargarUsuariosRegistrados: function () {
            this.location = './app/views/pageweb/usuarioRegistrado/usuariosRegistrados.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarVisualizarDatosUsuarioRegistrado: function (item) {
            $rootScope.item = item;
            this.location = './app/views/pageweb/usuarioRegistrado/nuevoUsuarioRegistrado.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        cargarNuevoUsuarioRegistrado: function () {    
            $rootScope.item = {};
            this.location = './app/views/pageweb/usuarioRegistrado/nuevoUsuarioRegistrado.html';
            $('body,html').animate({ scrollTop: '0px' }, 300);
        },
        broadcastEvent: function (event, args) {
            $rootScope.$broadcast(event, args);
            console.log('Event published');
        }
    };
});

//permite incluir codigo javascript adentro de los includes usados en ng-include
app.directive('script', function () {
    return {
        restrict: 'E',
        scope: false,
        link: function (scope, elem, attr) {
            if (attr.type === 'text/javascript-lazy') {
                var code = elem.text();
                var f = new Function(code);
                f();
            }
        }
    };
});

function mainControllerServicio($scope, $http, $location, Navigation) {
    if(history.forward(1))
        location.replace(history.forward(1))

    $scope.mensajeActualizacionHaSidoVisto = false;
    $scope.newUsuario = {};
    $scope.newUsuario.correo = "correo@hotmail.com";
    $scope.usuarios = {};
    $scope.nivelEducativo = {};
    $scope.files = {};
    $scope.newServicio = {};
    $scope.user = {};
    $scope.usuarioRegistradoComunidad = {};
    $scope.nuevoUsuario=true;
    $scope.servicios = {};
    $scope.noticias = {};
    $scope.selected = false;
    $scope.sidebar = Navigation;
    $scope.recordarSession = false;

    $scope.tipoDocumento = {};
    $scope.sexos = {};   
    $scope.departamentos = [];
    $scope.ciudades = {};
    $scope.usuarioRegistradoComunidad.suscritoAlBoletin=false;

    if (localStorage) {
        var data = JSON.parse(localStorage.getItem("usuario"));
        console.log(data); 
        $scope.user = data;
        console.log("$scope.user"); 
        console.log($scope.user); 
    }

    //#region CARGA DE SELECT FORMULARIO NUEVO REGISTRO A LA COMUNIDAD
    $http.get('./app/plugins/colombia-json-master/colombia.json')
    .then(function (res) {
        $scope.departamentos = res.data;
    });

    $scope.selectChanged = function (departamento) {
        $scope.ciudades = departamento.ciudades;
        //console.log(departamento.ciudades);
    };

    $http.get('/api/tipoDocumento').success(function (data) {
        $scope.tipoDocumento = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    $http.get('/api/sexo').success(function (data) {
        $scope.sexos = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    var year = new Date().getFullYear() - 60;
    var range = [];
    range.push(year);
    for (var i = 1; i < 50; i++) {
        range.push(year+i);
    }
    $scope.years = range;
    //
    var dias = 31;
    var arrDias = [];
    for (var j = 1; j <= 31; j++) {
        arrDias.push(j);
    }
    $scope.dias = arrDias;
    //#endregion

    /*html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
    });*/

    //menu dinamico a paginas
    $scope.cargarEnlaceConDatos = function (page, item) {
        if (page === 'visualizarDatosNoticia') {
            Navigation.cargarVisualizarDatosNoticia(item);
        } else if (page === 'noticia') {
            Navigation.player(item);
        } if (page === 'visualizarDatosGaleria') {
            Navigation.cargarVisualizarDatosGaleria(item);
        } else if (page === 'galeria') {
            Navigation.player(item);
        } else if (page === 'alianzas') {
            Navigation.player(item);
        }
        var unlisten = $scope.$on('$includeContentLoaded', function (evtName, args) {
            Navigation.broadcastEvent("addLeg", "more data");
            unlisten(); // remove the listener
        });
    };
    //menu dinamico a paginas
    $scope.cargarEnlace = function (page) {
        if (page === 'subirImagenNoticia') {
            Navigation.cargarSubirImagen();
        } else if (page === 'alianzas') {
            Navigation.cargarAlianzas();
        } else if (page === 'servicios') {
            Navigation.cargarServicios();
        } else if (page === 'producto') {
            Navigation.cargarProducto();
        } else if (page === 'nuevoContenido') {
            Navigation.cargarNuevoContenido();
        } else if (page === 'contenido') {
            Navigation.cargarContenido();
        } else if (page === 'nuevoUsuarioRegistrado') {
            Navigation.cargarNuevoUsuarioRegistrado();
        } else if (page === 'usuariosRegistrados') {
            Navigation.cargarUsuariosRegistrados();
        } else if (page === 'nuevaNoticia') {
            Navigation.cargarNuevaNoticia();
        } else if (page === 'noticia') {
            Navigation.cargarNoticia();
        } else if (page === 'noticiaotra') {
            Navigation.cargarNoticiaOtra();
        } else if (page === 'nuevaGaleria') {
            Navigation.cargarNuevaGaleria();
        } else if (page === 'galeria') {
            Navigation.cargarGaleria();
        } else if (page === 'acercaDe') {
            Navigation.cargarAcercaDe();
        } else if (page === 'inicio') {
            Navigation.cargarInicio();
        } else if (page === 'contactenos') {
            Navigation.contactenos();
        } else if (page === 'faq') {
            Navigation.faq();
        } else if (page === 'portafolio') {
            Navigation.portafolio();
        } else if (page === 'registro') {
            Navigation.registro();
        } else if (page === 'paciente') {
            Navigation.cargarPacientes();
        } else if (page === 'raza') {
            Navigation.cargarRazas();
        } else if (page === 'categoria') {
            Navigation.cargarCategorias();
        } else if (page === 'login') {
            Navigation.cargarLogin();
        } else if (page === 'usuario') {
            Navigation.cargarUsuario();
        } else if (page === 'aliado') {
            Navigation.cargarAliado();
        } else if (page === 'item') {
            Navigation.cargarItem();
        } else if (page === 'itemMedicamento') {
            Navigation.cargarItemMedicamento();
        } else if (page === 'itemLicor') {
            Navigation.cargarItemLicor();
        } else if (page === 'jugador') {
            Navigation.cargarJugador();
        } else if (page === 'persona') {
            Navigation.cargarPersona();
        } else if (page === 'inventario') {
            Navigation.cargarInventario();
        } else if (page === 'tienda') {
            Navigation.cargarTienda();
        } else if (page === 'planesyprecios') {
            Navigation.cargarPlanesYPrecios();
        } else if (page === 'player') {
            Navigation.player();
        } else if (page === 'juegosDiarios') {
            Navigation.cargarJuegosDiarios();
        } else if (page === 'calendarioJuegos') {
            Navigation.cargarCalendarioJuegos();
        } else if (page === 'nuevoJugador') {
            Navigation.cargarNuevoJugador();
        } else if (page === 'jugadores') {
            Navigation.cargarJugadores();
        } else if (page === 'presentacion') {
            Navigation.cargarPresentacion();
        } else if (page === 'cerrarSesion') {
            Navigation.cerrarSession();
        }
        var unlisten = $scope.$on('$includeContentLoaded', function (evtName, args) {
            Navigation.broadcastEvent("addLeg", "more data");
            unlisten(); // remove the listener
        });
    };
    //ventana modal de mensaje
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 6000
    });

    $scope.cargarModalConImagen = function (urlImagen, title, text) {
        Swal.fire({
            title: title,
            text: text,
            imageUrl: urlImagen,
            width: 800,
            height: 800,
            imageWidth: 800,
            imageAlt: 'Custom image',
            animation: false,
            confirmButtonText:  'Salir',
        })
    }
    // #region CARGANDO COMBOS
    $http.get('/api/nivelEducativo').success(function (data) {
        $scope.nivelEducativo = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    // #endregion
    // #region CARGANDO LISTAS
    $http.get('api/noticias').success(function (dataO) {
        $scope.noticias = dataO;
    }).error(function (err) {
        console.log('Error: ' + err);
    });
    //#endregion

    // Función para editar los datos de un item
    $scope.votarPorNoticia = function (newNoticiaId, opcion) {
        if (opcion === "meGusta") {
            $http.put('/api/noticiaa/' + newNoticiaId + '/megusta/1')
                .success(function (data) {
                    console.log(data);
                    $http.get('api/noticias').success(function (dataO) {
                        $scope.noticias = dataO;
                    }).error(function (err) {
                        console.log('Error: ' + err);
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        } else if (opcion === "noMeGusta") {
            $http.put('/api/noticiab/' + newNoticiaId + '/nomegusta/1')
                .success(function (data) {
                    console.log(data);
                    $http.get('api/noticias').success(function (dataO) {
                        $scope.noticias = dataO;
                    }).error(function (err) {
                        console.log('Error: ' + err);
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }

    };
    // Función para registrar un usuario al sistema
    $scope.aplicarVoto = function (itemNoticiaId) {
        console.log(itemNoticiaId);

        toast({
            type: 'success',
            title: 'Signed in successfully: ' + itemNoticiaId
        });
    }
    // Función para registrar un usuario al sistema
    $scope.previsualizarNoticia = function (itemNoticia) {
        Swal({
            title: '<strong><u>' + itemNoticia.titulo + '</u></strong>',
            //type: 'info',
            html:
                '<img src="image/' + itemNoticia.imagenPrincipal + '" alt="" style="max-width:350px;"><br/>' +
                '<div style="text-align:justify !important;width:90%;">' + itemNoticia.resumen + '</div>' +
                '<hr/>' +
                '' + itemNoticia.descripcion + '',
            width: 800,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Me gusta! ',
            //confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> No me gusta! ',
            //cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {
            /*if (result.value) {
                $scope.aplicarVoto(itemNoticia._id);
            }*/
            console.log("result");
            console.log(result);

            if (result.value == true) {
                swal("Un Me Gusta!", "Gracias por calificar", "success");
                $scope.votarPorNoticia(itemNoticia._id, "meGusta");
            }

            if (result.dismiss == "cancel") {
                swal("Un No Me Gusta!", "Gracias por calificar", "info");
                $scope.votarPorNoticia(itemNoticia._id, "noMeGusta");
            }
        });


        /*$http.post('/api/usuario', $scope.newUsuario)
            .success(function (dataObject) {
                //console.log(data);
                $scope.newUsuario = {};
                //$scope.newUsuario = dataObject; 
                //$scope.newUsuario = data;
                $("#mensajeLogin").html("Usuario Registrado: " + dataObject.usuario);
            })
            .error(function (data) {
                console.log('Error:::: ');
            });*/
    };

    // #region USUARIOS DE LA PLATAFORMA
    // Función para registrar un usuario a la plataforma
    $scope.registrarUsuario = function () {
        $http.post('/api/usuario', $scope.newUsuario)
            .success(function (dataObject) {
                $scope.newUsuario = {};
                var $modale = $('#sem-reg');
                $modale.modal('hide'); 
                console.log(dataObject.msg)
                toast({
                    type: 'success',
                    title: '<span style="text-align:left;">El usuario se ha registrado exitosamente!<br>Pendiente de aprobación!</span>'
                });
                //$("#mensajeLogin").html("Usuario Registrado: " + dataObject.usuario);
            })
            .error(function (data) {
                toast({
                    type: 'warning',
                    title: '<span style="text-align:left;">Error: '+data+'!</span>'
                });
            });
    };
    // #endregion
    
    // #region USUARIOS DE LA COMUNIDAD
    
    // Función para registrar un usuario a la comunidad afrocaq
    $scope.setCondicion = function (condicion) {
        $scope.usuarioRegistradoComunidad.condicion=condicion;
        console.log("condicion:",condicion);
    } 

    $scope.setSeAutoreconoceNARP = function (seAutoreconoceNARP) {
        $scope.usuarioRegistradoComunidad.seAutoreconoceNARP=seAutoreconoceNARP; 
        console.log("seAutoreconoceNARP:",seAutoreconoceNARP);
    }

    $scope.registrarUsuarioALaComunidad = function () {
        console.log('/api/usuarioRegistrado', $scope.usuarioRegistradoComunidad);
        $http.post('/api/usuarioRegistrado', $scope.usuarioRegistradoComunidad)
            .success(function (dataObject) {
                $scope.enviarCorreo();
                $scope.nuevoUsuario=false;
                //var $modale = $('#sem-reg');
                //$modale.modal('hide'); 
                console.log(dataObject.msg);
                toast({
                    type: 'success',
                    title: '<span style="text-align:left;">El usuario se ha registrado exitosamente!<br>Pendiente de aprobación!</span>'
                });
                //$("#mensajeLogin").html("Usuario Registrado: " + dataObject.usuario);
            })
            .error(function (data) {
                toast({
                    type: 'warning',
                    title: '<span style="text-align:left;">Error: '+data+'!</span>'
                });
            });
    };
    // #endregion
    
    // #region SOCKETS
    var socket = io();
    socket.on('connect', function () {
        socket.emit('message', 'hola');
        //socket.emit('loginUser','maya');
    });
    socket.on('update', function (data) {
        document.getElementById("update").innerHTML = '' + data;
    });
    // #endregion
   
    // #region EVENTOS
    $('.ir-arriba').click(function () {
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.ir-arriba').slideDown(300);
        } else {
            $('.ir-arriba').slideUp(300);
        };
    });
    // Obtenemos todos los datos de la base de datos
    $http.get('/api/servicio').success(function (data) {
        $scope.servicios = data;
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });  
    // #endregion

    // #region SESIONES
    // Función para iniciar una sesion
    $scope.login = function () {
        console.log($scope.user);
        $http.post('/api/login', $scope.user)
            .success(function (data) {
                console.log("data");
                console.log(data);
                $scope.user = {};
                $scope.user = data;
                var $modal = $('#sem-login');
                $modal.modal('hide'); //start hiding
                Swal.fire({
                    type: 'info',
                    title: 'Bienvenid@ '+ $scope.user.usuario,
                    text: 'Su sessión se ha iniciado exitosamente!',
                    footer: '<a href="#" >Ahora eres un usuario validado en el sistema!</a>'
                });
                /*console.log(localStorage.getItem("usuario"));
                var data = JSON.parse(localStorage.getItem("usuario"));
                console.log(data);*/



                if($scope.recordarSession){
                    localStorage.setItem("usuario",  JSON.stringify($scope.user));
                }else{
                    if (localStorage) 
                        localStorage.removeItem("usuario");
                }

                /*console.log(localStorage.getItem("usuario"));
                var data = JSON.parse(localStorage.getItem("usuario"));
                console.log(data);*/
            })
            .error(function (data) {
                $scope.user.activo=false;
                toast({
                    type: 'warning',
                    title: '<span style="text-align:left;">Lo sentimos se ha presentado un error en la validación <br> por favor intentelo nuevamente!</span>'
                });
            });
    };
    // Función para cerrar una sessión
    $scope.cerrarSession = function () {
        console.log($scope.user);
        //enviamos el llamado al servidor donde se terminara la sessión
        $http.get('/api/logout').success(function (data) {
            $scope.user = {}; // Borramos los datos del usuario
            console.log(data);
            if (localStorage) 
                localStorage.removeItem("usuario");
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    };
    // #endregion

    // #region METODOS DEL SERVICIO
    // Función para registrar un servicio
    $scope.registrarServicio = function () {
        $http.post('/api/servicio', $scope.newServicio)
            .success(function (data) {
                $scope.newServicio = {}; // Borramos los datos del formulario
                $scope.servicios = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar la imagen de un servicio
    $scope.modificarImagenServicio = function (newServicio, imagen) {
        $http.put('/api/servicio/' + $scope.newServicio._id + '/imagen/' + imagen, $scope.newServicio)
            .success(function (data) {
                $scope.newServicio = {}; // Borramos los datos del formulario
                $scope.servicios = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de una servicio
    $scope.modificarServicio = function (newServicio) {
        $http.put('/api/servicio/' + $scope.newServicio._id, $scope.newServicio)
            .success(function (data) {
                $scope.newServicio = {}; // Borramos los datos del formulario
                $scope.servicios = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto servicio conocido su id
    $scope.borrarServicio = function (newServicio) {
        $http.delete('/api/servicio/' + $scope.newServicio._id)
            .success(function (data) {
                $scope.newServicio = {};
                $scope.servicios = data;
                $scope.selected = false;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectServicio = function (servicio) {
        $scope.newServicio = servicio;
        $scope.selected = true;
        console.log($scope.newServicio, $scope.selected);
    };

    //#endregion
  
    $scope.enviarCorreo = function () {
        //console.log("usuarioRegistradoComunidad", $scope.usuarioRegistradoComunidad);
        $http.post('/api/formulario', $scope.usuarioRegistradoComunidad)
            .success(function (data) {
                swal("Formulario de contacto", "Mensaje enviado correctamente", "success");
                $scope.usuarioRegistradoComunidad = {};
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $scope.usuarioRegistradoComunidad = {};
            });
    };
    $scope.guardarCambios = function () {
        var retVal = confirm("Desea aceptar los cambios?");
        if (retVal === true) {
            $http.put('url', myData).
                success(function (data, status, headers, config) {
                    alert('Exito en la transaccion');
                }).error(function (data, status, headers, config) {
                    alert('Error actualizando');
                });
            return true;
        } else {
            return false;
        }
    };  

    $scope.convertToDate = function (stringDate){
        var dateOut = new Date(stringDate);
        dateOut.setDate(dateOut.getDate() + 1);
        return dateOut.format("ddd mmm dd yyyy HH:MM:ss");;
    };

    // #region EVENTOS SOBRE SOCKETS
        //var socket = io();

        var element = function (id) {
            return document.getElementById(id);
        }

        // Get Elements
        var status = element('status');
        var messages = element('messages');
        var textarea = element('textarea');
        var username = element('username');
        var clearBtn = element('clear');

        // Set default status
        var statusDefault = status.textContent;

        var setStatus = function (s) {
            // Set status
            status.textContent = s;

            if (s !== statusDefault) {
                var delay = setTimeout(function () {
                    setStatus(statusDefault);
                }, 5005);
            }
        }

        // Check for connection
        if (socket !== undefined) {
            console.log('Connected to socket...');

            // Handle Output
            socket.on('output', function (data) {
                
                console.log("data",data);
                if (data.length) {
                    for (var x = 0; x < data.length; x++) {
                        // Build out message div
                        //var a = data[x].fechaRegistro;
                        //var dateString = a.format("ddd mmm dd yyyy HH:MM:ss");
                        //var a = Date.parse(data[x].fechaRegistro);
                        //var fecha=new Date(a);
                        var message = document.createElement('div');
                        var img = document.createElement('img');
                        

                        var br = document.createElement('br');
                        message.setAttribute('class', 'chat-message');
                        img.src = "./public/images/icontrash.png";
                        img.setAttribute('style', 'cursor:pointer;');
                        img.setAttribute('onclick', 'eliminarMensaje(\'' + data[x]._id + '\');');
                        
                        message.innerHTML = "<strong>"+data[x].nombre + "</strong>: " + data[x].mensaje;
                        console.log("data[x].fechaRegistro", data[x].fechaRegistro);
                        if(data[x].fechaRegistro!=undefined){
                            var a = $scope.convertToDate(data[x].fechaRegistro);
                            var span = document.createElement('span');
                            span.setAttribute('style', 'font-size:10px;color:gray; font-style:italic;');
                            span.textContent="      ["+a+"]";
                            message.appendChild(span);
                        }
                        message.appendChild(img);
                        message.appendChild(br);
                        messages.appendChild(message);
                        messages.insertBefore(message, messages.firstChild);
                    }
                }
            });

            // Get Status From Server
            socket.on('status', function (data) {
                // get message status
                setStatus((typeof data === 'object') ? data.mensaje : data);

                // If status is clear, clear text
                if (data.clear) {
                    textarea.value = '';
                }
            });

            // Handle Input
            textarea.addEventListener('keydown', function (event) {
                if (event.which === 13 && event.shiftKey == false) {
                    // Emit to server input
                    socket.emit('input', {
                        nombre: username.value,
                        mensaje: textarea.value
                    });

                    textarea.value = '';
                    event.preventDefault();
                }
            });

            // Handle Chat Clear
            clearBtn.addEventListener('click', function () {
                socket.emit('clear');
            });

            // Clear Message
            socket.on('cleared', function () {
                messages.textContent = '';
            });

        }

        eliminarMensaje = function (objectId) {
            console.log("objectId:",objectId);
            $.ajax({
                url: '/api/chat/' + objectId,
                method: 'DELETE',
                contentType: 'application/json',
                success: function (result) {
                    messages.textContent = '';
                    console.log("respuesta de la eliminacion ",result);
                    socket.emit('refresh');
                },
                error: function (request, msg, error) {
                    console.log(error);
                }
            });
        };
        // #endregion


    $.fn.feedback = function (success, fail) {
        self = $(this);
        self.find('.dropdown-menu-form').on('click', function (e) { e.stopPropagation() })

        self.find('.screenshot').on('click', function () {
            self.find('.cam').removeClass('fa-camera fa-check').addClass('fa-refresh fa-spin');
            html2canvas($(document.body), {
                onrendered: function (canvas) {
                    self.find('.screen-uri').val(canvas.toDataURL("image/png"));
                    self.find('.cam').removeClass('fa-refresh fa-spin').addClass('fa-check');
                }
            });
        });

        self.find('.do-close').on('click', function () {
            self.find('.dropdown-toggle').dropdown('toggle');
            self.find('.reported, .failed').hide();
            self.find('.report').show();
            self.find('.cam').removeClass('fa-check').addClass('fa-camera');
            self.find('.screen-uri').val('');
            self.find('textarea').val('');
        });

        failed = function () {
            self.find('.loading').hide();
            self.find('.failed').show();
            if (fail) fail();
        }

        self.find('form').on('submit', function () {
            self.find('.report').hide();
            self.find('.loading').show();
            $.post($(this).attr('action'), $(this).serialize(), null, 'json').done(function (res) {
                if (res.result == 'success') {
                    self.find('.loading').hide();
                    self.find('.reported').show();
                    if (success) success();
                } else failed();
            }).fail(function () {
                failed();
            });
            return false;
        });
    };

    $('.feedback').feedback();

}



