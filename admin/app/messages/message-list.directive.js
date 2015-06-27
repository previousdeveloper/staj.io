'use strict';

angular
  .module('demoApp.messages')
  .directive('demoMessageList', demoMessageList);

function demoMessageList() {
  var directive = {
    /*link:linkFunc,*/
    templateUrl: 'app/messages/message-list.directive.html',
    restrict: 'EA',
    scope: {
      messages: '=messages'
    },
    controller: messageListCtrl,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;

  /*function linkFunc(scope, el, attr, vm) {
      scope.$watch('msgs', function(messages) {
        vmx.msgs = messages;
      });
  }*/


}

messageListCtrl.$inject = ['$scope'];

function messageListCtrl($scope) {
  var vm = this;

  vm.title = "Message List";
  vm.messages = [];

  $scope.$watch('messages', function(messages) {
    vm.title = 'Craig`s  (Message) List :)';
    vm.messages = messages;
  });
}
