appControllers.controller('HeaderController', ['$scope', '$rootScope', '$location', 'userService', function ($scope, $rootScope, $location, userService) {


    $rootScope.loginState = (userService.checkIfLoggedIn()) ? 'Logout' : 'Login';

    $scope.logout = function () {
        userService.logout();
        $rootScope.loginState = 'Login';
        $location.path('/login');
    }

    $scope.home = function () {
        $location.path('/');
    }
    $scope.allPosts = function () {
        $location.path('/allPosts');
    }
}]);