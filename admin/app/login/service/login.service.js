'use strict';

angular.module('login.module')
    .service('loginService', login);

login.$inject = ['$http', '$q', 'localStorageService'];

function login($http, $q, localStorageService) {

    var loginService = {

        signIn: signIn,
        getAccessToken: getAccessToken,
        getRefreshToken: getRefreshToken
    };

    return loginService;


    function signIn(data) {

        var deferred = $q.defer();


        $http.post('http://localhost:3000/api/v1/oauth/token', data)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;

    }


    function getAccessToken() {
        localStorageService.get('accessToken');
    }

    function getRefreshToken() {

        localStorageService.get('refreshToken');
    }


}