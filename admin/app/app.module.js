'use strict';

angular.module('demoApp', [
  'demoApp.home',
  'demoApp.about',
  'demoApp.messages',
  'signUp.module',
  'login.module',
  'blocks.logging',
  'blocks.exception',
  'ui.router'
])

.config(configure)

.run(run)

.controller('AppCtrl', function AppCtrl($scope, $location) {
  /* jshint validthis: true */
  var vm = this;

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (angular.isDefined(toState.data.pageTitle)) {
      vm.pageTitle = toState.data.pageTitle + ' | One Admin Demo App';
    }
  });
})

;

function run() {}

configure.$inject = ['$stateProvider', '$urlRouterProvider']; //toastr

function configure($stateProvider, $urlRouterProvider) {

  // toastr.options.timeOut = 4000;
  //toastr.options.positionClass = 'toast-bottom-right';
  $urlRouterProvider.otherwise('/home');

}
