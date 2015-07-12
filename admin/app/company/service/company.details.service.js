'use strict';

angular
    .module('company.module')
    .factory('companyDetailsService', companyDetailsService)
;

companyDetailsService.$inject = ['$http', '$q', 'logger'];

function companyDetailsService($http, $q, logger) {

    var service = {
        getAllCompany: getAllCompany,
        deleteCompany:deleteCompany
    };

    return service;


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

    function deleteCompany(companyId){

        var deferred = $q.defer();

        $http.delete('http://localhost:3000/api/v1/backend/company/'+companyId)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function updateCompany(companyId){

        var deferred = $q.defer();

        $http.delete('http://localhost:3000/api/v1/backend/company/'+companyId)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

}
