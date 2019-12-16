var app = angular.module('MainAppJugador', ["ui.bootstrap"]);

/*app.controller('mainControllerJugador', ['$scope', function ($scope) {

}]);*/

function mainControllerJugador($scope, $http) {
    $scope.newJugador = {};
    $scope.items = {};

    //#region ARREGLOS PARA COMBOS (ENTIDADES FORANEAS)
    $scope.concentraciones = {};
    $scope.formaFarmaceuticas = {};
    $scope.tipoInventario = {};
    $scope.fabricante = {};
    $scope.estadoItem = {};
    $scope.unidadMedida = {};
    $scope.presentacion = {};
    $scope.categoria = {};
    $scope.personaRegistro = {};
    $scope.personaCambio = {};
    //#endregion

    //#region CARGANDO PROPIEDADES DE LA ENTIDAD
    $scope.selected = false;
    $scope.tab = 1;

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };
    //#endregion

    //#region  RESOURCES
    //var allCandidates =
    //    ["name1", "name2", "name3", "name4", "name5",
    //        "name6", "name7", "name8", "name9", "name10",
    //        "name11", "name12", "name13", "name14", "name15",
    //        "name16", "name17", "name18", "name19", "name20"
    //    ];
    //$scope.totalItems = allCandidates.length;
    //$scope.currentPage = 1;
    //$scope.itemsPerPage = 5;
    //$scope.pages = [];
    //$scope.pages.length = 0;

    //$scope.$watch("currentPage", function () {
    //    setPagingData($scope.currentPage);
    //});

    //function setPagingData(page) {
    //    var pagedData = allCandidates.slice(
    //        (page - 1) * $scope.itemsPerPage,
    //        page * $scope.itemsPerPage
    //    );
    //    $scope.aCandidates = pagedData;
    //}
    //#endregion

    //#region CARGANDO COMPONENTES
    /*$http.get('/api/concentracion').success(function (data) {
        $scope.concentraciones = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/formaFarmaceutica').success(function (data) {
        $scope.formaFarmaceuticas = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/tipoInventario').success(function (data) {
        $scope.tipoInventario = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/fabricante').success(function (data) {
        $scope.fabricante = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/estadoItem').success(function (data) {
        $scope.estadoItem = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/unidadMedida').success(function (data) {
        $scope.unidadMedida = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/categoria').success(function (data) {
        $scope.categoria = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/personaRegistro').success(function (data) {
        $scope.personaRegistro = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/personaCambio').success(function (data) {
        $scope.personaCambio = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/presentacion').success(function (data) {
        $scope.presentacion = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });
    $http.get('/api/jugador').success(function (data) {
        $scope.presentacion = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });*/
    //#endregion

    //#region CARGANDO COMPONENTES GENERALES PARA OPERAR LA ENTIDAD
    // Obtenemos todos los datos de la base de datos para cargar la lista inicial
    $http.get('/api/jugador').success(function (data) {
        $scope.items = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });

    // Función para registrar a un item de licor
    $scope.registrarJugador = function () {
        $http.post('/api/jugador', $scope.newJugador)
            .success(function (data) {
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