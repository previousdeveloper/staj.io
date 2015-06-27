'use strict';

angular
  .module('demoApp.messages')
  .factory('messagesService', ['$http', '$q', messagesService])

;


function messagesService($http, $q, logger) {

  var service = {
    getAll: getAll,
    getMessageById: getMessageById
  };

  return service;

  function getAll() {
    var deferred = $q.defer();

    $http.get('messages.json')
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status) {
        logger.error('XHR Failed for MessagesService::getAll.' + data);
        deferred.reject(data);
      });

    return deferred.promise;
  };

  function getMessageById(id) {
    var deferred = $q.defer();

    $http.get('messages.json/' + id)
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status) {
        logger.error('XHR Failed for MessagesService::getMessageById.' + data);
        deferred.reject(data);
      });

    return deferred.promise;
  };
}
