'use strict';

angular.module('demoApp.home')
    .service('homeService', home);

home.$inject = ['$http', '$q'];

function home($http, $q) {

    var homeService = {

        getCurrentUser: getCurrentUser,
        getAllUser: getAllUser,
        apiStatus: apiStatus,
        getUserCount: getUserCount,
        getCompanyCount:getCompanyCount,
        getAllCompany:getAllCompany,
        getNormalUserCount:getNormalUserCount,
        getLogEvent:getLogEvent
    };

    return homeService;


    function getCurrentUser() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/user')
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getNormalUserCount() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/normalusercount')
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getLogEvent() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/log')
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }



    function getAllUser() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/user')
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getAllCompany() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/company')
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function apiStatus() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1')
            .success(function (response, status, header, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getUserCount() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/totalUser')
            .success(function (response, status, header, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getCompanyCount() {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/backend/totalCompany')
            .success(function (response, status, header, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });
        return deferred.promise;
    }
}