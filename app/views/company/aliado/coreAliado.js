angular.module('MainAppAliado', [])


function mainControllerAliado($scope, $http) {
    $scope.newAliado = {};
    $scope.aliados = {};
    $scope.selected = false;
    $scope.tab = 1;

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/aliado').success(function (data) {
        $scope.aliados = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    // Función para registrar a una aliado
    $scope.registrarAliado = function () {
        $http.post('/api/aliado', $scope.newAliado)
                .success(function (data) {
                    $scope.newAliado = {}; // Borramos los datos del formulario
                    $scope.aliados = data;
                    $scope.tab = 1;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para editar los datos de una aliado
    $scope.modificarAliado = function (newAliado) {
        $http.put('/api/aliado/' + $scope.newAliado._id, $scope.newAliado)
                .success(function (data) {
                    $scope.newAliado = {}; // Borramos los datos del formulario
                    $scope.aliados = data;
                    $scope.selected = false;
                    $scope.tab = 1;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función que borra un objeto aliado conocido su id
    $scope.borrarAliado = function (newAliado) {
        $http.delete('/api/aliado/' + $scope.newAliado._id)
                .success(function (data) {
                    $scope.newAliado = {};
                    $scope.aliados = data;
                    $scope.selected = false;
                    $scope.tab = 1;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectAliado = function (aliado) {
        $scope.newAliado = aliado;
        $scope.selected = true;
        $scope.tab = 2;
        console.log($scope.newAliado, $scope.selected);
    };

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
}