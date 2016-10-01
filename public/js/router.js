/**
 * Created by benext-tpl on 29.09.16.
 */
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    }).
    when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupController'
    }).
    when('/postDetail', {
        templateUrl: 'partials/postDetail.html',
        controller: 'PostDetailController'
    }).
    when('/allPosts', {
        templateUrl: 'partials/allPosts.html',
        controller: 'AllPostsController'
    }).
    when('/', {
        templateUrl: 'partials/posts.html',
        controller: 'PostController'
    }).
    otherwise({
        redirectTo: '/'
    });

}]);
