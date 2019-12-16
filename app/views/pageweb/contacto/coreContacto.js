angular.module('MainAppContacto', [])


function mainControllerContacto($scope, $http) {
    $scope.newContacto = {};
    $scope.contactos = {};
    $scope.selected = false;
    $scope.email = "";

    $('#tablaContactos').on('click', '.clickable-row', function (event) {
        $(this).addClass('row-selected').siblings().removeClass('row-selected');
    });
    
    // Obtenemos todos los datos de la base de datos
    $http.get('/api/contacto').success(function (data) {
        $scope.contactos = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    // Función para registrar a una contacto
    $scope.registrarContactoBoletin = function () {
        $http.post('/api/contactoboletin', $scope.newContacto)
                .success(function (data) {
                    $scope.newContacto = {};
                    $scope.contactos = data;
                    $scope.email="Gracias por registrarse al boletin";
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para registrar a una contacto
    $scope.registrarContacto = function () {
        $http.post('/api/contacto', $scope.newContacto)
                .success(function (data) {
                    $scope.newContacto = {}; // Borramos los datos del formulario
                    $scope.contactos = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para editar los datos de una contacto
    $scope.modificarContacto = function (newContacto) {
        $http.put('/api/contacto/' + $scope.newContacto._id, $scope.newContacto)
                .success(function (data) {
                    $scope.newContacto = {}; // Borramos los datos del formulario
                    $scope.contactos = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función que borra un objeto contacto conocido su id
    $scope.borrarContacto = function (newContacto) {
        $http.delete('/api/contacto/' + $scope.newContacto._id)
                .success(function (data) {
                    $scope.newContacto = {};
                    $scope.contactos = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectContact = function (contacto) {
        $scope.newContacto = contacto;
        $scope.selected = true;
        console.log($scope.newContacto, $scope.selected);
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