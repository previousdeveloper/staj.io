'use strict';

angular.module('signUp.module')
    .factory('signUpService', signUpService);

signUpService.$inject = ['$http', '$q'];

function signUpService($http, $q) {

    var signUpService = {
        signUp: signUp
    };

    return signUpService;
    ///////////////

    function signUp(data) {

        var deferred = $q.defer();

        $http.post('http://localhost:3000/api/v1/signup', data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("Failed to sign Up");
            });

        return deferred.promise;
    }



}
