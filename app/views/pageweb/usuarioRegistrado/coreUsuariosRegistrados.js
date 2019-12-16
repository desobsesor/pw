var app = angular.module('MainAppUsuariosRegistrados', ["ui.bootstrap"]);

function mainControllerUsuariosRegistrados($scope, $http) {
    console.log("entrando a la pagina");
    $scope.newUsuarioRegistrado = {};
    $scope.items = [];
    //#region ARREGLOS PARA COMBOS (ENTIDADES FORANEAS)
    $scope.totalUsuariosRegistrados = 0;
    $scope.personaRegistro = {};
    $scope.personaCambio = {};
    //#endregion

    //#region CARGANDO PROPIEDADES DE LA ENTIDAD
    $scope.selected = false;
    //$scope.tab = 1;


    $scope.Regions = [];

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

    //#region FILTROS
    $scope.sortType = 'nombres.primerNombre'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFishN = '';

    /*$("#busquedaGeneralUsuarioRegistrado").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#usuariosRegistrados tbody>tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });*/
    //#endregion

    //#region CARGANDO COMPONENTES GENERALES PARA OPERAR LA ENTIDAD
    /*$http.get('actions.php?action=get_user_list').then(function(response){
        $scope.users = response.data;
    });*/
    $scope.generarExelUsuariosRegistrados = function () {

        $http.get('/api/usuarioRegistrado').success(function (data) {
            //$scope.items = data;
            console.log("data");
            console.log(data);
            
            //$scope.Regions = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });

        console.log("entro");

    };
    // Función para registrar un usuario al sistema
    $scope.previsualizarUsuarioRegistrado = function (usuarioRegistrado) {
        console.log("Entro...");
        console.log(usuarioRegistrado);
        Swal({
            title: '<strong><u style="text-align:center;">' + usuarioRegistrado.nombreGenerico + ' - ' +
                usuarioRegistrado.formaFarmaceutica.formaFarmaceutica + ' ' +
                usuarioRegistrado.concentracion.concentracion + ' [' +
                usuarioRegistrado.laboratorio.laboratorio + '] -<span style="font-size:1rem;"> ' +
                usuarioRegistrado.categoria.categoria + '<span> </u></strong>',
            //type: 'info',
            html:
                '<img src="image/' + usuarioRegistrado.imagenPrincipal + '" alt="" style="max-width:350px;"><hr/>' +
                '<div style="width:90%; margin-top:10px !important;"><span> Precio Compra: <strong>' + usuarioRegistrado.precioCompraActual + '$</strong> Precio Venta: <strong>' + usuarioRegistrado.precioVentaActual + '$</strong> -- Cantidad en el inventario: <strong>' + usuarioRegistrado._id + ' Unidades.</strong> </span></div>' +

                '<div style="width:90%; margin-top:10px !important;"><span>' + usuarioRegistrado.nombreComercial + ' reg. Invima No:' + usuarioRegistrado.registroInvima.registroInvima + ' - ' + usuarioRegistrado.estadoItem.estadoItem + ' </span></div>' +
                '<hr/>' 
                //'' + usuarioRegistrado.descripcion + '',
                ,
            width: 800,
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-Ok"></i> Ok! ',
            //confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Salir! ',
            //cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {
            /*if (result.value) {
                $scope.aplicarVoto(usuarioRegistrado._id);
            }*/
            console.log("result");
            console.log(result);
        });

    };
    // Función para registrar a un item
    $scope.buscarUsuarioRegistradoPorNombre = function () {
        console.log("req.params.nombreGenerico:" + $scope.searchFishN);
        $http.get('/api/usuarioRegistrado/' + $scope.searchFishN)
            .success(function (data) {
                if (data.length > 0) {
                    $scope.Regions = data;
                    $scope.items = data;
                    $scope.RegionTotalRecords = 0;
                    if (data !== null && data !== '' && JSON.stringify(data) !== '[]') {
                        console.log("$scope.items.length");
                        console.log($scope.items.length);
                        $scope.totalUsuariosRegistrados = $scope.items.length;
                        $scope.RegionTotalPages = parseInt(Math.ceil($scope.items.length / $scope.RegionRow));
                        $scope.RegionPages = new Array();
                        for (i = 1; i < $scope.RegionTotalPages; i++) {
                            $scope.RegionPages[i] = i;
                        }
                    } else {
                        $scope.RegionTotalPages = 0;
                        $scope.RegionPages = null;
                    }

                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para registrar a un item
    $scope.registrarUsuarioRegistrado = function () {
        console.log("$scope.newUsuarioRegistrado");
        console.log($scope.newUsuarioRegistrado);
        console.log("//$scope.newUsuarioRegistrado");
        $http.post('/api/usuarioRegistrado', $scope.newUsuarioRegistrado)
            .success(function (data) {
                var $active = $('.wizard .nav-tabs li');
                $active.addClass('disabled');
                console.log("enviando al router");
                console.log(data);
                console.log("// Borramos los datos del formulario");/**/
                $scope.newUsuarioRegistrado = {}; // Borramos los datos del formulario
                $scope.items = data; //se asigna la lista que devueve el llamado al servidor
                $scope.Regions = data;
                //$scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de un item
    $scope.modificarUsuarioRegistrado = function (newUsuarioRegistrado) {
        $http.put('/api/usuarioRegistrado/' + $scope.newUsuarioRegistrado._id, $scope.newUsuarioRegistrado)
            .success(function (data) {
                $scope.newUsuarioRegistrado = {}; // Borramos los datos del formulario
                $scope.items = data;
                $scope.Regions = data;
                $scope.selected = false;
                //$scope.tab = 1;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // Función para editar los datos de un item
    $scope.publicarUsuarioRegistrado = function (newUsuarioRegistrado) {
        Swal({
            title: 'Esta seguro?',
            text: "Tranquilo, esta desición se puede revertir!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Publicar!'
        }).then((result) => {
            if (result.value) {
                $http.put('/api/usuarioRegistrado/' + newUsuarioRegistrado._id + '/activo/' + true)
                    .success(function (data) {
                        $scope.newUsuarioRegistrado = {}; // Borramos los datos del formulario
                        $scope.items = data;
                        $scope.Regions = data;
                        $scope.selected = true;
                        //$scope.tab = 1;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        })
    };

    // Función para editar los datos de un item
    $scope.activarEnPaginaPrincipal = function (newUsuarioRegistrado) {
        Swal({
            title: 'Esta seguro?',
            text: "Tranquilo, esta desición se puede revertir!",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Activar!'
        }).then((result) => {
            if (result.value) {
                $http.put('/api/usuarioRegistradoc/' + newUsuarioRegistrado._id + '/enpaginaprincipal/' + true)
                    .success(function (data) {
                        $scope.newUsuarioRegistrado = {}; // Borramos los datos del formulario
                        $scope.items = data;
                        $scope.Regions = data;
                        $scope.selected = true;
                        //$scope.tab = 1;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        })
    };


    //#region  RESOURCES           
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    //#endregion

    // Función que borra un objeto item conocido su id
    $scope.borrarUsuarioRegistrado = function (newUsuarioRegistrado) {

        Swal({
            title: 'Esta seguro?',
            text: "Esta desición no se puede revertir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, eliminar!'
        }).then((result) => {
            if (result.value) {


                $http.delete('/api/usuarioRegistrado/' + newUsuarioRegistrado._id)
                    .success(function (data) {
                        $scope.newUsuarioRegistrado = {};
                        $scope.items = data;
                        $scope.Regions = data;
                        $scope.selected = false;
                        //$scope.tab = 1;
                        Swal(
                            'Eliminacion Exitosa!',
                            'El registro ha sido eliminado.',
                            'success'
                        );
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        })


    };

    // Función que se activa al dar onchange en el select
    $scope.selectAction = function () {
        //console.log(objectSelect);
        console.log($scope.concentraciones);
    };
    // Función para coger el objeto seleccionado en la tabla
    $scope.selectUsuarioRegistrado = function (item) {
        /*$scope.concentraciones[0] = item.concentracion;
        $scope.formaFarmaceuticas[0] = item.formaFarmaceutica;
        $scope.tipoInventario[0] = item.tipoInventario;
        $scope.fabricante[0] = item.fabricante;
        $scope.categoria[0] = item.categoria;
        $scope.presentacion[0] = item.presentacion;*/
        $scope.newUsuarioRegistrado = item;
        $scope.selected = true;
        $scope.tab = 2;
        console.log($scope.newUsuarioRegistrado, $scope.selected);
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
    //$http.get('/api/usuarioRegistrado', { responseType: "arraybuffer" }).success(function (data) {



    $("#usuariosRegistrados #checkall").click(function () {
        if ($("#usuariosRegistrados #checkall").is(':checked')) {
            $("#usuariosRegistrados input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#usuariosRegistrados input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });

    $("[data-toggle=tooltip]").tooltip();

    console.log(" ::: ", $scope.RegionPagex==undefined?"1":$scope.RegionPagex);
    console.log(" ::: ", $scope.RegionRowx==undefined?"15":$scope.RegionRowx);
    $scope.RegionPage = $scope.RegionPagex;
    $scope.RegionRow = $scope.RegionRowx;


    $scope.RegionPage = $scope.RegionPagex==undefined? 1 :$scope.RegionPagex;
    $scope.RegionRow = $scope.RegionRowx==undefined?15:$scope.RegionRowx;
    $scope.RegionRows = [5, 10, 15, 20, 25, 30];

    $scope.GetAttributesByRegion = function (regionFrwdPageButtonClick, regionBckPageButtonClick) {

        console.log("entro al metodo de paginación con :regionFrwdPageButtonClick=" + regionFrwdPageButtonClick + " y regionBckPageButtonClick=" + regionBckPageButtonClick);
        if (!regionFrwdPageButtonClick && !regionBckPageButtonClick) {
            $http.get('/api/usuarioRegistrado').success(function (data) {
                $scope.items = data;
                $scope.RegionTotalRecords = 0;
                if (data !== null && data !== '' && JSON.stringify(data) !== '[]') {
                    console.log("$scope.items.length");
                    console.log($scope.items.length);
                    $scope.totalUsuariosRegistrados = $scope.items.length;
                    $scope.RegionTotalPages = parseInt(Math.ceil($scope.items.length / $scope.RegionRow));
                    $scope.RegionPages = new Array();
                    for (i = 0; i < $scope.RegionTotalPages; i++) {
                        $scope.RegionPages[i] = i+1;
                    }
                    //console.log($scope.RegionPages);
                } else {
                    $scope.RegionTotalPages = 0;
                    $scope.RegionPages = null;
                }
                //console.log("data");
                //console.log(data);
                //$scope.Regions = data;
            }).error(function (data) {
                console.log('Error: ' + data);
            });
        }


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

        $http.get('/api/usuarioRegistrado/' + $scope.RegionPage + '/' + $scope.RegionRow).success(function (data) {
            $scope.Regions = data;
            //console.log("data");
            //console.log(data);
            $scope.RegionTotalRecords = 0;
            if (data !== null && data !== '' && JSON.stringify(data) !== '[]') {
                console.log("$scope.items.length");
                console.log($scope.items.length);
                $scope.RegionTotalPages = parseInt(Math.ceil($scope.items.length / $scope.RegionRow));
                $scope.RegionPages = new Array();
                for (i = 0; i < $scope.RegionTotalPages; i++) {
                    $scope.RegionPages[i] = i+1;
                }
                //console.log($scope.RegionPages);
            } else {
                $scope.RegionTotalPages = 0;
                $scope.RegionPages = null;
            }
        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };
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
    $scope.selectUsuarioRegistrado = function (item) {
        /*$scope.concentraciones[0] = item.concentracion;
        $scope.formaFarmaceuticas[0] = item.formaFarmaceutica;
        $scope.tipoInventario[0] = item.tipoInventario;
        $scope.fabricante[0] = item.fabricante;
        $scope.categoria[0] = item.categoria;
        $scope.presentacion[0] = item.presentacion;*/

        // Obtenemos todos los datos de la base de datos para cargar la lista inicial
        /*$http.get('/api/usuariosRegistrados/' + $scope.RegionPage + '/' + $scope.RegionRow).succes
            $scope.items = data;
        }).error(function (data) {
            console.log('Error: ' + data);
        });*/

        $scope.newUsuarioRegistrado = item;
        $scope.selected = true;
        console.log($scope.newUsuarioRegistrado, $scope.selected);
    };


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