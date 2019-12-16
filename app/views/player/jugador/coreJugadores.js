var app = angular.module('MainAppJugadores', ["ui.bootstrap"]);

function mainControllerJugadores($scope, $http) {
    $scope.newJugador = {};
    //$scope.items = {};

    //#region ARREGLOS PARA COMBOS (ENTIDADES FORANEAS)

    $scope.personaRegistro = {};
    $scope.personaCambio = {};
    //#endregion

    //#region CARGANDO PROPIEDADES DE LA ENTIDAD
    $scope.selected = false;
    $scope.tab = 1;
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

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

    //#region FILTROS
    $scope.sortType = 'nombres.primerNombre'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    //#endregion

    //#region CARGANDO COMPONENTES GENERALES PARA OPERAR LA ENTIDAD
    

    // Función para registrar a un item de licor
    $scope.buscarJugadorPorDocumento = function () {
        console.log("req.params.documento:$"+$scope.newJugador.documento);
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

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.items = {};

   /* for (var i = 0; i < 50; i++) {
        $scope.items.push({ id: i, name: "name " + i, description: "description " + i });
    }*/

    // Obtenemos todos los datos de la base de datos para cargar la lista inicial
   /* $http.get('/api/jugador', { responseType: "arraybuffer" }).success(function (data) {
        $scope.items = data;
    }).error(function (data) {
        console.log('Error: ' + data);
    });*/

    $("#jugadores #checkall").click(function () {
        if ($("#jugadores #checkall").is(':checked')) {
            $("#jugadores input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#jugadores input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $("[data-toggle=tooltip]").tooltip();

    /*
    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        console.log($scope.items.length);
        return Math.ceil($scope.items.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };*/


    //#region PAGINACIÓN
    /*
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
    */

    //$scope.configPages();
    //#endregion

    //$scope.numPages = 50;
    //$scope.viewby = 5;
    //$scope.totalItems = $scope.items.length;
    //$scope.currentPage = 4;
    //$scope.itemsPerPage = $scope.viewby;
    //$scope.maxSize = 5; //Number of pager buttons to show

    //$scope.setPage = function (pageNo) {
    //    $scope.currentPage = pageNo;
    //};

    //$scope.pageChanged = function () {
    //    console.log('Page changed to: ' + $scope.currentPage);
    //};

    //$scope.setItemsPerPage = function (num) {
    //    $scope.itemsPerPage = num;
    //    $scope.currentPage = 1; //reset to first page
    //};

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectJugador = function (item) {
        /*$scope.concentraciones[0] = item.concentracion;
        $scope.formaFarmaceuticas[0] = item.formaFarmaceutica;
        $scope.tipoInventario[0] = item.tipoInventario;
        $scope.fabricante[0] = item.fabricante;
        $scope.categoria[0] = item.categoria;
        $scope.presentacion[0] = item.presentacion;*/

        // Obtenemos todos los datos de la base de datos para cargar la lista inicial
        /*$http.get('/api/jugadores/' + $scope.RegionPage + '/' + $scope.RegionRow).succes
            $scope.items = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });*/

        $scope.newJugador = item;
        $scope.selected = true;
        console.log($scope.newJugador, $scope.selected);
    };

    $scope.sinImagen = "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ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMTgtMTAtMjBUMTU6MDc6NTVaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+92BhgwAACZdJREFUeJztnVtsHFcZx//fGe/6Hq/t2I4vcew4F5xEuUEUCrKoS1GDUEEplKAIRNIKCFVeKIigIh4oiJcKcWkVUFQBEkIqQkpAikRaWghJRZpQxzE0Jcax3RTH1/i63uzas+d8PGxS1dlZe7y7s7vOOT9pX2Zm5/tmfjPnnJ095wwxMwz6ILKdgCGzGOGaYYRrhhGuGUa4ZhjhmmGEa4YRrhl5bje037nK9o23vcwlrZCwUNj2GCXz3RtTnTw9NwSskGdSJfmVWF++19WxuhYeufwaZk/9PPmsMgz5C5C3rpV9ja3Llt459Cd0j58Ds/IitbSzLrAb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";

    $scope.arrayBufferToBase64 = function (buffer) {
        try {
            console.log(buffer.data);
        } catch (e) {
            return $scope.sinImagen;
        }

        var binary = '';
        var bytes = new Uint8Array(buffer.data);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return window.btoa(binary);
    };

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




    $scope.RegionPage = 1;
    $scope.RegionRow = 15;
    $scope.RegionRows = [5, 10, 15, 20, 25, 30];

    $scope.GetAttributesByRegion = function (regionFrwdPageButtonClick, regionBckPageButtonClick) {
        if (regionFrwdPageButtonClick) {
            if (($scope.RegionPage + 1) <= $scope.RegionTotalPages) {
                $scope.RegionPage = $scope.RegionPage + 1;
            }
        }
        if (regionBckPageButtonClick) {
            if ($scope.RegionPage <= 0) {
                $scope.RegionPage = 1;
            } if ($scope.RegionPage > 1) {
                $scope.RegionPage = $scope.RegionPage - 1;
            }
        }

        $http.get('/api/jugadores/' + $scope.RegionPage + '/' + $scope.RegionRow).success(function (data) {
            $scope.Regions = data;
            console.log("$scope.Regions");
            console.log($scope.Regions);
            $scope.RegionTotalRecords = 0;
            if (data !== null && data !== '' && JSON.stringify(data) !== '[]') {
                console.log($scope.items.length);
                $scope.RegionTotalPages = parseInt(Math.ceil($scope.items.length / $scope.RegionRow));
                $scope.RegionPages = new Array();
                for (i = 1; i <= $scope.RegionTotalPages; i++) {
                    $scope.RegionPages[i] = i;
                }
                console.log($scope.RegionPages);
            } else {
                $scope.RegionTotalPages = 0;
                $scope.RegionPages = null;
            }
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };
}

//app.directive('rightClick', function ($parse) {
//    return function (scope, element, attrs) {
//        var fn = $parse(attrs.rightClick);
//        element.bind('contextmenu', function (event) {
//            scope.$apply(function () {
//                event.preventDefault();
//                fn(scope, { $event: event });
//            });
//        });
//    };
//});


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