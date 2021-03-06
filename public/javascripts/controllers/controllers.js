var gisControllers = angular.module('gisControllers', ['angular-loading-bar']);

gisControllers.controller('ButtonController', function($scope) {

    $scope.buttons = [{
        'name': 'Add Layer'
    }, {
        'name': 'buffer'
    }, {
        'name': 'intersection'
    }];
});

gisControllers.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
}]);

gisControllers.controller('tutorialController', ['$anchorScroll', '$location', '$scope',
    function($anchorScroll, $location, $scope) {
        $scope.gotoAnchor = function(x) {
            var newHash = 'anchor' + x;
            if ($location.hash() !== newHash) {
                $location.hash('anchor' + x);
            } else {
                $anchorScroll();
            }
        };
    }
]);

gisControllers.controller("mapController", ["$scope", "$http", function($scope, $http) {
    main.map.init();
}]);

gisControllers.controller("projectsController", ["$scope", "$location", function($scope, $location) {
    project.getProjectsForUserFromDB();
}]);

angular.module('gisApp').controller('loginController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {
        $scope.login = function() {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            // call login from service
            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
                // handle success
                .then(function() {
                    //$location.path('/mainPage');
                    $location.path('/projects');
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

        };

    }
]);

angular.module('gisApp').controller('logoutController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });
        };
    }
]);

angular.module('gisApp').controller('registerController', ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {
        $scope.register = function() {
            // initial values
            $scope.error = false;
            $scope.disabled = true;

            if (!($scope.registerForm.password === $scope.registerForm.repeatedPassword)) {
                $scope.error = true;
                $scope.errorMessage = "Passwords do not match";
            }
            // call register from service
            AuthService.register($scope.registerForm.username, $scope.registerForm.password)
                // handle success
                .then(function() {
                    //$location.path('/mainPage');
                    $location.path('/projects');
                    $scope.disabled = false;
                    $scope.registerForm = {};
                })
                // handle error
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registerForm = {};
                });
        };
    }
]);
