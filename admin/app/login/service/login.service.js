'use strict';

angular.module('login.module')
    .service('loginService', login);

login.$inject = ['$http', '$q'];

function login($http, $q) {

    var loginService = {

        signIn: signIn
    };

    return loginService;


    function signIn(data) {

        var deferred = $q.defer();


        $http.post('http://localhost:3000/api/v1/oauth/token',data)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err,status,headers,config) {
                deferred.reject(err);
            });

        return deferred.promise;

    }
}