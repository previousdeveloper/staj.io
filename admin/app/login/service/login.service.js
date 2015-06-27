'use strict';

angular.module('login.module')
    .factory('loginService', login);

login.$inject = ['$http', '$q'];

function login($http, $q) {

    var loginService = {

        signIn: signIn
    };

    return loginService;


    function signIn(data) {

        var deferred = $q.defer();

        $http.post('http://localhost:3000/api/v1/oauth/token', data,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("Failed to get albums");
            });

        return deferred.promise;

    }
}