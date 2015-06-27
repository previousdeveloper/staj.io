'use strict';

angular
  .module('demoApp.messages')
  .config(function config($stateProvider) {
    $stateProvider.state('messages', {
      url: '/messages',
      views: {
        "main": {
          controller: 'MessagesCtrl',
          templateUrl: 'app/messages/index.tpl.html',
          controllerAs: 'vm'
        }
      },
      data: {
        pageTitle: 'Messages :)'
      }
    });
  });
