angular.module('MainAppFaq', [])


function mainControllerFaq($scope, $http) {
    $scope.newFaq = {};
    $scope.faqs = {};
    $scope.selected = false;

    // Obtenemos todos los datos de la base de datos
    $http.get('/api/faq').success(function (data) {
        $scope.faqs = data;
    })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    // Función para registrar a una faq
    $scope.registrarFaq = function () {
        $http.post('/api/faq', $scope.newFaq)
                .success(function (data) {
                    $scope.newFaq = {}; // Borramos los datos del formulario
                    $scope.faqs = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para editar los datos de una faq
    $scope.modificarFaq = function (newFaq) {
        $http.put('/api/faq/' + $scope.newFaq._id, $scope.newFaq)
                .success(function (data) {
                    $scope.newFaq = {}; // Borramos los datos del formulario
                    $scope.faqs = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función que borra un objeto faq conocido su id
    $scope.borrarFaq = function (newFaq) {
        $http.delete('/api/faq/' + $scope.newFaq._id)
                .success(function (data) {
                    $scope.newFaq = {};
                    $scope.faqs = data;
                    $scope.selected = false;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    };

    // Función para coger el objeto seleccionado en la tabla
    $scope.selectFaq = function (faq) {
        $scope.newFaq = faq;
        $scope.selected = true;
        console.log($scope.newFaq, $scope.selected);
    };

}