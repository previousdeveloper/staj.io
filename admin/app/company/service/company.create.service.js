'use strict';

angular
  .module('company.module')
  .factory('companyCreateService', companyCreateService)
;

companyCreateService.$inject = ['$http','$q','logger'];

function companyCreateService($http, $q, logger) {

  var service = {
      createCompany:createCompany
  };

  return service;


  function createCompany(data) {
      var deferred = $q.defer();

      $http.post('http://localhost:3000/api/v1/backend/company', data)
          .success(function (result, status, headers, config) {
              deferred.resolve(result);
          }).error(function (err) {
              deferred.reject(err);
          });

      return deferred.promise;
  }
}
