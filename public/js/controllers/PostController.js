appControllers.controller('PostController', ['$scope', '$location', 'userService', 'httpService','$timeout', function ($scope, $location, userService, httpService,$timeout) {
    $scope.config={
        tag :{
            showField: 'text'
        }
    };
    $scope.data= {

    };

    $scope.tagSelected = {};



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

    $scope.load = function(postId){

        httpService.getById('api/posts',postId, function(response){

            $scope.currentPostId = response.id;
            $scope.currentPostTitle = response.title;
            $scope.currentPostSlug = response.slug;
            $scope.currentPostText = response.text;

            $scope.data['tag'] = response.tags;

            $('#updatePostModal').modal('toggle');

        }, function(){

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.create = function(){
        httpService.create('api/posts',{
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

        httpService.update('api/posts',
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


    $scope.posts = [];

    $scope.currentPostReset();
    $scope.refresh();

}]);