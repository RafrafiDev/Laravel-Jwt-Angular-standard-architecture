var app = angular.module('app', [
    'ngRoute',
    'appControllers',
    'multipleSelect'
]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('app')
        .setStorageType('localStorage');
});

var appControllers = angular.module('appControllers', [
    'appServices'
]);

var appServices = angular.module('appServices', [
    'LocalStorageModule',
    'restangular'
]);
