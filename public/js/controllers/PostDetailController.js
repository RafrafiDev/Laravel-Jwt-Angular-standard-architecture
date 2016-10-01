appControllers.controller('PostDetailController', ['$scope', '$filter', '$location', '$routeParams', 'userService', 'httpService', 'httpService', function ($scope, $filter, $location, $routeParams, userService, httpService) {


    $scope.showComment = function (commentId) {
        var comment = $filter('filter')($scope.comments, {id: commentId}, true)[0];

        $scope.currentCommentText = comment.text;
        $scope.currentCommentId = commentId;
        $('#updateCommentModal').modal('toggle');
    }


    $scope.updateComment = function () {

        httpService.update('api/comment',
            $scope.currentCommentId,
            {
                text: $scope.currentCommentText
            },
            function (response) {

                $('#updateCommentModal').modal('toggle');
                //noinspection JSAnnotator
                $scope.comments[$scope.comments.getIndexOfObject("id",$scope.currentCommentId)] = response.comment;
                $scope.$apply();
                $scope.currentCommentReset();


            }, function (response) {
                alert('Some errors occurred while communicating with the service. Try again later.');
            }
        );

    }


    $scope.createComment = function () {
        httpService.create('api/comment', {
            text: $scope.currentCommentText,
            postId: $routeParams.postId
        }, function (response) {

            console.log("43 PostDetailController response.comment",response.comment);
            $('#addCommentModal').modal('toggle');
            $scope.currentCommentReset();
            $scope.refreshCommentList(response.comment);

        }, function () {

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }

    $scope.refreshCommentList = function (comment) {
            $scope.comments.push(comment);
    }


    $scope.load = function (postId) {

        httpService.getById('api/posts', postId, function (response) {

            $scope.currentPostId = response.id;
            $scope.currentPostTitle = response.title;
            $scope.currentPostSlug = response.slug;
            $scope.currentPostText = response.text;
            $scope.currentPostUser = response.user.name;
            $scope.currentCreatedAt = response.created_at;
            $scope.comments = response.comments;
            $scope.authUser = userService.getAuthUser().id;

        }, function () {

            alert('Some errors occurred while communicating with the service. Try again later.');

        });

    }


    $scope.currentPostReset = function () {
        $scope.currentPostTitle = '';
        $scope.currentPostSlug = '';
        $scope.currentPostText = '';
        $scope.currentPostId = '';
    }


    $scope.currentCommentReset = function () {
        $scope.currentCommentText = '';
        $scope.currentPostId = '';
    }


    $scope.currentPostReset();
    $scope.load($routeParams.postId);

}]);