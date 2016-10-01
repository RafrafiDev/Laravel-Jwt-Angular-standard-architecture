appServices.factory('userService', ['$http', 'Restangular', 'localStorageService', function ($http, Restangular, localStorageService) {

    function checkIfLoggedIn() {
        return localStorageService.get('token');
    }

    function initLocalSession(data) {
        localStorageService.set('token', data.data.tokenData.token);
        localStorageService.set('authUser', data.data.tokenData.user);
    }

    function signup(name, email, password, onSuccess, onError) {

        $http.post('/api/auth/signup',
            {
                name: name,
                email: email,
                password: password
            }).then(function (response) {

                initLocalSession(response);

            onSuccess(response);

        }, function (response) {

            onError(response);

        });

    }


    function login(email, password, onSuccess, onError) {

        $http.post('/api/auth/login',
            {
                email: email,
                password: password
            }).then(function (response) {

            initLocalSession(response);
            onSuccess(response);

        }, function (response) {

            onError(response);

        });

    }

    function logout() {
        localStorageService.remove('token');
        localStorageService.remove('authUser');
        window.location.reload();

    }

    function getCurrentToken() {
        return localStorageService.get('token');
    }

    function getAuthUser() {
        return localStorageService.get('authUser');
    }

    return {
        checkIfLoggedIn: checkIfLoggedIn,
        signup: signup,
        login: login,
        logout: logout,
        getCurrentToken: getCurrentToken,
        getAuthUser: getAuthUser
    }

}]);
