appServices.factory('postService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(url,onSuccess, onError){
        Restangular.all(url).getList().then(function(response){

            onSuccess(response);

        }, function(){

            onError(response);

        });
    }

    function getById(postId, onSuccess, onError){

        Restangular.one('api/posts', postId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(data, onSuccess, onError){

        Restangular.all('api/posts').post(data).then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function update(postId, data, onSuccess, onError){

        Restangular.one("api/posts").customPUT(data, postId).then(function(response) {

                onSuccess(response);

            }, function(response){

                onError(response);

            }
        );

    }

    function remove(postId, onSuccess, onError){
        Restangular.one('api/posts/', postId).remove().then(function(){

            onSuccess();

        }, function(response){

            onError(response);

        });
    }

    Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + userService.getCurrentToken() });

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        remove: remove
    }

}]);