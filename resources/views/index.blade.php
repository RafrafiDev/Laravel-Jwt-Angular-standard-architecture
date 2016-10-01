<!DOCTYPE html>
<html lang="en" ng-app="app">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Blog</title>

        <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="bower_components/angular-multiple-select/build/multiple-select.min.css" rel="stylesheet">

        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/lodash/lodash.js"></script>
        <script src="bower_components/angular-route/angular-route.min.js"></script>
        <script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
        <script src="bower_components/restangular/dist/restangular.min.js"></script>
        <script src="bower_components/angular-multiple-select/build/multiple-select.min.js"></script>

        <script src="js/config.js"></script>
        <script src="js/app.js"></script>
        <script src="js/router.js"></script>
        <script src="js/controllers/MainController.js"></script>
        <script src="js/controllers/HeaderController.js"></script>
        <script src="js/controllers/PostController.js"></script>
        <script src="js/controllers/AllPostsController.js"></script>
        <script src="js/controllers/LoginController.js"></script>
        <script src="js/controllers/SignupController.js"></script>
        <script src="js/controllers/PostDetailController.js"></script>
        <script src="js/services/HttpService.js"></script>
        <script src="js/services/UserService.js"></script>
        <script src="js/directives/appMultBox.js"></script>

        <style>

            li {
                padding-bottom: 8px;
            }

        </style>
    </head>

    <body>


        <ng-include src="'partials/header.html'"></ng-include>

        <div ng-controller = "MainController">
            <div class="container">
                <div ng-view></div>
            </div>
        </div>
        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    </body>
</html>