'use strict';

angular.module('login.module')
    .service('loginService', login);

login.$inject = ['$http', '$q', 'localStorageService', '$rootScope'];

function login($http, $q, localStorageService, $rootScope) {

    var loginService = {

        signIn: signIn,
        getAccessToken: getAccessToken,
        getRefreshToken: getRefreshToken,
        getCurrentUser: getCurrentUser,
        isAuthenticated:isAuthenticated
    };

    return loginService;


    function signIn(data) {

        var deferred = $q.defer();


        $http.post('http://localhost:3000/api/v1/oauth/token', data)
            .success(function (response, status, headers, config) {
                $rootScope.currentToken = response.access_token;

                deferred.resolve(response);

            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });
        getCurrentUser();

        return deferred.promise;

    }


    function getCurrentUser() {


        $http.get('http://localhost:3000/api/v1/user')
            .then(function (result) {

                localStorageService.set('roles',result.data.role);

            });

        return localStorageService.get('roles');

    }

    function isAuthenticated() {
        return  $rootScope.currentUser ;
    }


    function getAccessToken() {
        localStorageService.get('accessToken');
    }

    function getRefreshToken() {

        localStorageService.get('refreshToken');
    }


}