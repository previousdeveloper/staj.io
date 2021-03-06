'use strict';

angular.module('user.module')
    .factory('userCreateService', userCreateService);

userCreateService.$inject = ['$http', '$q'];

function userCreateService($http, $q) {

    var signUpService = {
        signUp: signUp
    };

    return signUpService;

    ///////////////

    function signUp(data) {

        var deferred = $q.defer();

        var url = 'http://localhost:3000';
        $http.post(url + '/api/v1/signup', data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("Failed to sign Up");
            });

        return deferred.promise;
    }



}
