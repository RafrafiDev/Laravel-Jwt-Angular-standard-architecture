appServices.factory('httpService', ['Restangular', 'userService', function(Restangular, userService) {

    function getAll(url,onSuccess, onError){
        Restangular.all(url).getList().then(function(response){

            onSuccess(response);

        }, function(){

            onError(response);

        });
    }

    function getById(url, postId, onSuccess, onError){

        Restangular.one(url, postId).get().then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function create(url, data, onSuccess, onError){

        Restangular.all(url).post(data).then(function(response){

            onSuccess(response);

        }, function(response){

            onError(response);

        });

    }

    function update(url,postId, data, onSuccess, onError){

        Restangular.one(url).customPUT(data, postId).then(function(response) {

                onSuccess(response);

            }, function(response){

                onError(response);

            }
        );

    }

    function remove(url, postId, onSuccess, onError){
        Restangular.one(url, postId).remove().then(function(){

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