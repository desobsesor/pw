var app = angular.module('MainAppSexo', []);

function mainControllerSexo($scope, $http, $q) {
    $scope.newSexo = {};
    $scope.sexos = {};
    $scope.selected = false;
    //$scope.sexo = UserService;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/sexo').success(function (data) {
        $scope.sexos = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    // Función para registrar a una sexo
    $scope.registrarSexo = function () {
        $http.post('/api/sexo', $scope.newSexo)
                .success(function (data) {
                    $scope.newSexo = {}; // Borramos los datos del formulario
                    $scope.sexos = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para editar los datos de una sexo
    $scope.modificarSexo = function (newSexo) {
        $http.put('/api/sexo/' + $scope.newSexo._id, $scope.newSexo)
                .success(function (data) {
                    $scope.newSexo = {}; // Borramos los datos del formulario
                    $scope.sexos = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función que borra un objeto sexo conocido su id
    $scope.borrarSexo = function (newSexo) {
        $http.delete('/api/sexo/' + $scope.newSexo._id)
                .success(function (data) {
                    $scope.newSexo = {};
                    $scope.sexos = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectSexo = function (sexo) {
        $scope.newSexo = sexo;
        $scope.selected = true;
        console.log($scope.newSexo, $scope.selected);
    };

}