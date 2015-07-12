'use strict';

angular
    .module('login.module')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'loginService', '$location', 'localStorageService'];

function LoginCtrl($scope, loginService, $location, localStorageService) {

    var vm = this;

    vm.isLoggedIn = null;
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

                if (result.access_token !== null & result.access_token !== undefined) {
                    localStorageService.set('accessToken', result.access_token);
                    localStorageService.set('refreshToken', result.refresh_token);
                    vm.isLoggedIn = true;


                    $location.path('/home');
                }

            },
            function (err) {
                vm.isLoggedIn = false;
                vm.signInResult = err;
            });

    };


}
