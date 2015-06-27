'use strict';

angular
    .module('demoApp.messages')
    .controller('MessagesCtrl', MessagesCtrl);

MessagesCtrl.$inject = ['$scope', 'logger', 'messagesService'];

function MessagesCtrl($scope, logger, messagesService) {
    /* jshint validthis: true */
    var vm = this;

    vm.messages = [];

    vm.loadMessages = loadMessages;


    init();

    function init() {
        return loadMessages().then(function () {
            logger.info('init Messages View');
        });

    }


    function loadMessages() {

        return messagesService.getAll().then(function (response) {
            vm.messages = response;

            return vm.messages;
        });

    };

}
