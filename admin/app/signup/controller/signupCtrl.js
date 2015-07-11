'use strict';

angular
    .module('signUp.module')
    .controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$scope', 'signUpService', '$location'];

function SignUpCtrl($scope, signUpService, $location) {

    var vm = this;

    vm.signUpData = {

        'username': '',
        'password': '',
        'name': '',
        'email': ''
    };


    vm.signUp = function() {

        signUpService.signUp(vm.signUpData).then(function (result) {
                vm.signUpResult = result;

                if (result !== null & result !== undefined) {
                    $location.path('/login');
                }

            },
            function (err) {

            });

    }
}
