'use strict';

angular
    .module('company.module')
    .factory('companyDetailsService', companyDetailsService)
;

companyDetailsService.$inject = ['$http', '$q', 'logger'];

function companyDetailsService($http, $q, logger) {

    var service = {
        getAllCompany: getAllCompany,
        getFilteredCompany:getFilteredCompany
    };

    return service;


    function getAllCompany(page) {
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/companies?page='+page)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getFilteredCompany(page,city,sector){
        var deferred = $q.defer();

        $http.get('http://localhost:3000/api/v1/sectorAndCity?page='+page+'&city='+city+'&sector='+sector)
            .success(function (response, status, headers, config) {
                deferred.resolve(response);
            }).error(function (err, status, headers, config) {
                deferred.reject(err);
            });

        return deferred.promise;
    }


}
