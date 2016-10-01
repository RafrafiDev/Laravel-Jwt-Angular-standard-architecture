appControllers.controller('AllPostsController', ['$scope', '$location', 'userService', 'httpService', function ($scope, $location, userService, httpService) {


    $scope.view = function(postId){
        $location.path('/postDetail').search({postId: postId});
    }

    $scope.remove = function(postId){

        if(confirm('Are you sure to remove this post from your wishlist?')){
            httpService.remove('api/posts',postId, function(){

                alert('Post removed successfully.');
                $scope.refresh();

            }, function(){

                alert('Some errors occurred while communicating with the service. Try again later.');

            });
        }

    }


    $scope.refresh = function(){

        httpService.getAll('api/allPosts',function(response){

            $scope.posts = response;

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.posts = [];

    $scope.refresh();

}]);