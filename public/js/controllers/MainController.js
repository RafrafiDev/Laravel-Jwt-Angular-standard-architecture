appControllers.controller('MainController', ['$scope', '$location', 'userService', function ($scope, $location, userService) {


    if(!userService.checkIfLoggedIn())
        $location.path('/login');


}]);