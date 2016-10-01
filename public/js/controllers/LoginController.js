appControllers.controller('LoginController', ['$scope','$rootScope', '$location', 'userService', function ($scope,$rootScope, $location, userService) {

    $scope.login = function() {
        userService.login(
            $scope.email, $scope.password,
            function(response){
                $rootScope.loginState = 'Logout';
                $location.path('/');
            },
            function(response){
                alert('Something went wrong with the login process. Try again later!');
            }
        );
    }

    if(userService.checkIfLoggedIn())
        $location.path('/');

}]);