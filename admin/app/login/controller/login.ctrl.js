'use strict';

angular
    .module('login.module')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'loginService', '$location','localStorageService'];

function LoginCtrl($scope, loginService, $location,localStorageService) {

    var vm = this;

    vm.loginData = {

        'client_id': 'client',
        'client_secret': 'client',
        'grant_type': 'password',
        'username': '',
        'password': ''
    };


    vm.login = function login() {

        loginService.signIn(vm.loginData).then(function (result) {
                vm.signInResult = result;
                localStorageService.set('accessToken',result.access_token);

            },
            function (err) {
                vm.signInResult = err;
            });


    };

    vm.getToken = function getToken(){

        vm.token =localStorageService.get('accessToken');
        return  vm.token;
    }
}
