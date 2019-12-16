var app = angular.module('MainAppUsuario', []);


app.factory('ServicioSexos', function ($http, $q) {
    return {
        get: function getUser(id) {
            // We create our own promise to return
            var deferred = $q.defer();

            $http.get('api/usuario/' + id).then(function (usuario) {
                $http.get('api/sexo/' + usuario.id).then(function (sexo) {

                    // Add the account info however you want
                    usuario.sexo = sexo;

                    // resolve the promise
                    deferred.resolve(usuario);

                }, function getAcctError() {
                    deferred.reject();
                });
            }, function getUserError() {
                deferred.reject();
            });

            return deferred.promise;
        }
    };
});

function mainControllerUsuario($scope, $http, $q) {
    $scope.newUsuario = {};
    $scope.usuarios = {};
    $scope.sexos = {};
    $scope.selected = false;
    // Obtenemos todos los datos de la base de datos
    $http.get('/api/sexo').success(function (data) {
        $scope.sexos = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/usuario').success(function (data) {
        $scope.usuarios = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    // Función para registrar a una usuario
    $scope.registrarUsuario = function () {
        $http.post('/api/usuario', $scope.newUsuario)
                .success(function (data) {
                    $scope.newUsuario = {}; // Borramos los datos del formulario
                    $scope.usuarios = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para editar la imagen de un usuario
    $scope.modificarImagenUsuario = function (newUsuario, imagen) {
        $http.put('/api/usuario/' + $scope.newUsuario._id + '/imagen/' + imagen, $scope.newUsuario)
                .success(function (data) {
                    $scope.newUsuario = {}; // Borramos los datos del formulario
                    $scope.usuarios = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };
    // Función para editar los datos de una usuario
    $scope.modificarUsuario = function (newUsuario) {
        $http.put('/api/usuario/' + $scope.newUsuario._id, $scope.newUsuario)
                .success(function (data) {
                    $scope.newUsuario = {}; // Borramos los datos del formulario
                    $scope.usuarios = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función que borra un objeto usuario conocido su id
    $scope.borrarUsuario = function (newUsuario) {
        $http.delete('/api/usuario/' + $scope.newUsuario._id)
                .success(function (data) {
                    $scope.newUsuario = {};
                    $scope.usuarios = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectUsuario = function (usuario) {
        $scope.newUsuario = usuario;
        $scope.selected = true;
        console.log($scope.newUsuario, $scope.selected);
    };
}