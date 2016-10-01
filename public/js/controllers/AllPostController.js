appControllers.controller('PostController', ['$scope', '$location', 'userService', 'httpService', function ($scope, $location, userService, httpService) {

    $scope.logout = function(){
        userService.logout();
        $location.path('/login');
    }

    $scope.view = function(postId){
        $location.path('/postDetail').search({postId: postId});
    }

    $scope.remove = function(postId){

        if(confirm('Are you sure to remove this post from your wishlist?')){
            httpService.remove(postId, function(){

                alert('Post removed successfully.');
                $scope.refresh();

            }, function(){

                alert('Some errors occurred while communicating with the service. Try again later.');

            });
        }

    }

    $scope.load = function(postId){

        httpService.getById(postId, function(response){

            $scope.currentPostId = response.id;
            $scope.currentPostTitle = response.title;
            $scope.currentPostSlug = response.slug;
            $scope.currentPostText = response.text;

            $('#updatePostModal').modal('toggle');

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.create = function(){
        httpService.create({
            title: $scope.currentPostTitle,
            text: $scope.currentPostText,
            slug: $scope.currentPostSlug
        }, function(){

            $('#addPostModal').modal('toggle');
            $scope.currentPostReset();
            $scope.refresh();

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.update = function(){

        httpService.update(
            $scope.currentPostId,
            {
                title: $scope.currentPostTitle,
                text: $scope.currentPostText,
                slug: $scope.currentPostSlug
            },
            function(response){

                $('#updatePostModal').modal('toggle');
                $scope.currentPostReset();
                $scope.refresh();

            }, function(response){
                alert('Some errors occurred while communicating with the service. Try again later.');
            }
        );

    }

    $scope.refresh = function(){

        httpService.getAll('api/posts',function(response){

            $scope.posts = response;

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.currentPostReset = function(){
        $scope.currentPostTitle = '';
        $scope.currentPostSlug = '';
        $scope.currentPostText = '';
        $scope.currentPostId = '';
    }

    if(!userService.checkIfLoggedIn())
        $location.path('/login');

    $scope.posts = [];

    $scope.currentPostReset();
    $scope.refresh();

}]);