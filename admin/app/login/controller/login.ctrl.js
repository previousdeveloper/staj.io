'use strict';

angular
    .module('login.module')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'loginService', '$location'];

function LoginCtrl($scope, loginService, $location) {

    var vm = this;

    vm.loginData = {

        'client_id': 'client',
        'client_secret': 'client',
        'grant_type': 'password',
        'username': 'deneme2',
        'password': 'deneme2'
    };


    vm.login = function login() {

        loginService.signIn(vm.loginData).then(function (result) {
                vm.signUpResult = result;

            },
            function (data) {

            });


    }
}
