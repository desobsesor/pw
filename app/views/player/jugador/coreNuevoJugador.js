var app = angular.module('MainAppNuevoJugador', ["ui.bootstrap"]);

function mainControllerNuevoJugador($scope, $http, $timeout) {
    $scope.newJugador = {};
    $scope.items = {};
    $scope.selected = false;
    $scope.tab = 1;

    //#region CARGANDO ARREGLOS  PARA COMBOS (ENTIDADES FORANEAS)
    $scope.departamentos = [];
    $scope.estadoCivil = {};
    $scope.nivelEducativo = {};
    $scope.ciudades = {};
    $scope.tipoDocumento = {};
    $scope.sexos = {};
    $scope.profesiones = {};
    $scope.cargos = {};
    $scope.empresas = {};
    ///$scope.municipios = {};

    $scope.personaRegistro = {};
    $scope.personaCambio = {};
    //#endregion

    //#region CARGA DE SELECT
    $http.get('./app/plugins/colombia-json-master/colombia.json')
        .then(function (res) {
            $scope.departamentos = res.data;
        });

    $scope.selectChanged = function (departamento) {
        $scope.ciudades = departamento.ciudades;
        //console.log(departamento.ciudades);
    };

    var year = new Date().getFullYear() - 60;
    var range = [];
    range.push(year);
    for (var i = 1; i < 50; i++) {
        range.push(year + i);
    }
    $scope.years = range;
    //
    var dias = 31;
    var arrDias = [];
    //arrDias.push(dias);
    for (var j = 1; j <= 31; j++) {
        arrDias.push(j);
    }
    $scope.dias = arrDias;
    //#endregion

    //#region  WIZARD
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
        console.log("...>>");

        if ($('#primerNombre').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su nombre por favor!</div>");
            return;
        }
        if ($('#primerApellido').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su apellido por favor!</div>");
            return;
        }
        if ($('#documento').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Digite su documento por favor!</div>");
            return;
        }
        if ($('#sexo').val() === '') {
            $(".error-message").html("<div class='container orange' style='padding:8px; font-size:1.6rem;'><i class='glyphicon glyphicon-info-sign' ></i> Seleccione la opcion de sexo por favor!</div>");
            return;
        }

        $(".error-message").html("");
        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });

    $(".prev-step").click(function (e) {
        console.log("<<...");
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

    function nextTab(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }
    //Add Inactive Class To All Accordion Headers
    $('.accordion-header').toggleClass('inactive-header');

    //Set The Accordion Content Width
    var contentwidth = $('.accordion-header').width();
    $('.accordion-content').css({});

    //Open The First Accordion Section When Page Loads
    $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
    $('.accordion-content').first().slideDown().toggleClass('open-content');

    // The Accordion Effect
    $('.accordion-header').click(function () {
        if ($(this).is('.inactive-header')) {
            $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }

        else {
            $(this).toggleClass('active-header').toggleClass('inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }
    });
    //#endregion

    //#region  RESOURCES
    //#endregion

    //#region CARGANDO COMPONENTES
    $http.get('/api/estadoCivil').success(function (data) {
        $scope.estadoCivil = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/nivelEducativo').success(function (data) {
        $scope.nivelEducativo = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
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
    $http.get('/api/profesion').success(function (data) {
        $scope.profesiones = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/cargo').success(function (data) {
        $scope.cargos = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/empresa').success(function (data) {
        $scope.empresas = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    //#endregion

    //#region CARGANDO COMPONENTES GENERALES PARA OPERAR LA ENTIDAD
    $http.get('/api/jugador').success(function (data) {    // Obtenemos todos los datos de la base de datos para cargar la lista inicial
        $scope.items = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });


    //#region CARGANDO PARAMETROS CUANDO VIENE DE LA LISTA
    $scope.jugador = $scope.item;
    if ($scope.jugador === undefined) {
        console.log('...');
    } else {
        $scope.newJugador = $scope.jugador;
        $scope.selected = true;

        $timeout(function () {
            $scope.sexos[0] = $scope.newJugador.sexo;
            $scope.tipoDocumento[0] = $scope.newJugador.tipoDocumento;
            $scope.estadoCivil[0] = $scope.newJugador.estadoCivil;
            $scope.nivelEducativo[0] = $scope.newJugador.nivelEducativo;
            $scope.empresas[0] = $scope.newJugador.datosLaborales.empresa;
            $scope.profesiones[0] = $scope.newJugador.datosLaborales.profesion;
            $scope.cargos[0] = $scope.newJugador.datosLaborales.cargo;
            $('#etiquetaDepartamento').html($scope.newJugador.direccionResidencia.departamento);
            $('#etiquetaMunicipio').html($scope.newJugador.direccionResidencia.municipio);
            //$scope.ciudades[0] = $scope.newJugador.direccionResidencia.municipio;
        }, 200);
        //console.log("..." + $scope.newJugador.sexo);
        //console.log($scope.newJugador);
        //console.log("...");
    }
    //#endregion

    // Función para registrar a un item de licor
    $scope.buscarJugadorPorDocumento = function () {
        console.log("req.params.documento:$" + $scope.newJugador.documento);

        if ($scope.newJugador.documento.length > 5)
            $http.get('/api/jugador/' + $scope.newJugador.documento, $scope.newJugador)
                .success(function (data) {
                    if (data.length > 0) {
                        //console.log("recibiendo del router");

                        //console.log("data[0]");
                        //console.log(data[0]);

                        //console.log("$scope.newJugador antes");
                        //console.log($scope.newJugador);
                        $scope.newJugador = data[0];


                        //console.log("$scope.newJugador despues");
                        //console.log($scope.newJugador);
                        $scope.sexos[0] = $scope.newJugador.sexo;
                        $scope.tipoDocumento[0] = $scope.newJugador.tipoDocumento;
                        $scope.estadoCivil[0] = $scope.newJugador.estadoCivil;
                        $scope.nivelEducativo[0] = $scope.newJugador.nivelEducativo;
                    }
                    //$scope.newJugador = {}; 
                    //$scope.newJugador = data; // Borramos los datos del formulario
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para registrar a un item de licor
    $scope.registrarJugador = function () {
        console.log("$scope.newJugador");
        console.log($scope.newJugador);
        console.log("//$scope.newJugador");
        $http.post('/api/jugador', $scope.newJugador)
            .success(function (data) {
                var $active = $('.wizard .nav-tabs li');
                $active.addClass('disabled');
                console.log("enviando al router");
                console.log(data);
                console.log("// Borramos los datos del formulario");/**/
                $scope.newJugador = {}; // Borramos los datos del formulario
                $scope.items = data;
                $scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de un item
    $scope.modificarJugador = function (newJugador) {
        $http.put('/api/jugador/' + $scope.newJugador._id, $scope.newJugador)
            .success(function (data) {
                $scope.newJugador = {}; // Borramos los datos del formulario
                $scope.items = data;
                $scope.selected = false;
                $scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que borra un objeto item conocido su id
    $scope.borrarJugador = function (newJugador) {
        $http.delete('/api/jugador/' + $scope.newJugador._id)
            .success(function (data) {
                $scope.newJugador = {};
                $scope.items = data;
                $scope.selected = false;
                $scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función que se activa al dar onchange en el select
    $scope.selectAction = function () {
        //console.log(objectSelect);
        console.log($scope.concentraciones);
    };
    // Función para coger el objeto seleccionado en la tabla
    $scope.selectJugador = function (item) {
        /*$scope.concentraciones[0] = item.concentracion;
        $scope.formaFarmaceuticas[0] = item.formaFarmaceutica;
        $scope.tipoInventario[0] = item.tipoInventario;
        $scope.fabricante[0] = item.fabricante;
        $scope.categoria[0] = item.categoria;
        $scope.presentacion[0] = item.presentacion;*/
        $scope.newJugador = item;
        $scope.selected = true;
        $scope.tab = 2;
        console.log($scope.newJugador, $scope.selected);
    };
    //#endregion



    function SampleRightClickController($scope, $rootScope, $timeout) {
        $scope.gridOptions = { data: $scope.items };
        $scope.rightClick = function (event) {
            var scope = angular.element(event.toElement).scope();
            console.log('Click en la fila: ', scope.rowRenderIndex);
        };
    }

    //#region FILTROS
    $scope.sortType = 'nombreGenerico'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    //#endregion


    //#region PAGINACIÓN

    $scope.currentPage = 0;//Pagina actual
    $scope.pageSize = 10; // cantidad de registros que deseamos mostrar por página
    $scope.pages = []; //paginas

    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.items.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.items.length / $scope.pageSize);

            console.log("....." + $scope.currentPage);
        } else {
            if (ini >= Math.ceil($scope.items.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.items.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.items.length / $scope.pageSize);
            }
            console.log("..." + $scope.currentPage);
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {

            console.log("..i:" + i);
            $scope.pages.push({ no: i });
        }
        if ($scope.currentPage >= $scope.pages.length) {
            $scope.currentPage = $scope.pages.length - 1;

            console.log("...." + $scope.currentPage);
        }

    };

    $scope.setPage = function (page) {
        console.log(page);
        $scope.currentPage = page - 1;
        var pagedData = $scope.items.slice(
            (page - 1) * $scope.pageSize,
            page * $scope.pageSize
        );
        $scope.items = pagedData;
        $scope.configPages();
    };

    $scope.$watch("currentPage", function () {
        $scope.configPages();
        //$scope.setPage($scope.currentPage);
    });
    //$scope.configPages();
    //#endregion

    //#region CARGANDO COMPONENTES PARA COMPONENTES VISUALES
    $scope.ajustarTabla = function (componenteTable, heightMax) {
        var totalHeight = 0;
        $("#" + componenteTable + " tr").each(function (i) {
            elemento = $(this);
            totalHeight += elemento.height();
        });
        if (totalHeight < heightMax) {
            $("#" + componenteTable + " thead tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " thead tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " thead tr").css("width", "calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "calc(100%)");
        } else {
            $("#" + componenteTable + " thead tr").css("width", "-webkit-calc(100%-16px)");
            $("#" + componenteTable + " thead tr").css("width", "-moz-calc(100%-16px)");
            $("#" + componenteTable + " thead tr").css("width", "calc(100%-16px)");
            $("#" + componenteTable + " tbody tr").css("width", "-webkit-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "-moz-calc(100%)");
            $("#" + componenteTable + " tbody tr").css("width", "calc(100%)");
        }
    };
    //#endregion

}
app.directive('rightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.rightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});


//app.directive('contextMenu', [function () {
//    return {
//        restrict: 'A',
//        require: 'mdMenu',
//        link: function (scope, element, attrs, menu) {

//            var prev = { x: 0, y: 0 };
//            scope.$mdOpenContextMenu = function (event) {

//                menu.offsets = function () {
//                    var mouse = {
//                        x: event.clientX,
//                        y: event.clientY
//                    };
//                    var offsets = {
//                        left: mouse.x - prev.x,
//                        top: mouse.y - prev.y
//                    };
//                    prev = mouse;

//                    return offsets;
//                };

//                menu.open(event);
//            };
//        }
//    };
//}]);
//app.filter('startFromGrid', function () {
//    return function (input, start) {
//        start = +start;
//        return input.slice(start);
//    };
//});