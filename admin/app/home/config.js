'use strict';

angular
  .module('demoApp.home')
  .config(config);

function config($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'app/home/index.tpl.html',
        controllerAs: 'vm',
        resolve: {
          dummyListService: dummyListService
        }
      }
    },
    data: {
      pageTitle: 'Home'
    }
  });
}

//dummyListService.$inject = [''];
function dummyListService() {
  return {
    dummyList: [
      "The first choice!",
      "And another choice for you.",
      "but wait! A third!"
    ]
  };
}
