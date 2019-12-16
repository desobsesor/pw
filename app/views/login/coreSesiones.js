angular.module('MainAppContacto', [])
        .config(function ($routeProvider)
        {
            $routeProvider.when("/login", {
                templateUrl: "views/login.html",
                controller: "loginController"
            })
                    .otherwise({redirectTo: "/"});
        })

        .controller('loginController', function ($scope, loginService)
        {
            $scope.login = function (user)
            {
                loginService.login(user).then(function (result)
                {
                    console.log(JSON.stringify(result));
                });
            }
        })

        .service('loginService', function ($http)
        {
            console.log("...");
            var loginSvc = {};
            loginSvc.login = function (user)
            {
                return $http.post('/login', user).then(function (login)
                {
                    return login.data;
                });
            }
            return loginSvc;
        });
