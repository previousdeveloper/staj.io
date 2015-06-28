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


        $http.post('https://staj-io-goldenilkay92-1.c9.io/api/v1/oauth/token', data,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function () {
                deferred.reject("Failed to login");
            });

        return deferred.promise;

    }
}