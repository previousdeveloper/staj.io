'use strict';

angular
    .module('login.module')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'loginService', '$location', 'localStorageService', '$rootScope', '$window', 'toaster'];

function LoginCtrl($scope, loginService, $location, localStorageService, $rootScope, $window, toaster) {

    var vm = this;
    vm.loginData = {

        'client_id': 'client',
        'client_secret': 'client',
        'grant_type': 'password',
        'username': '',
        'password': ''
    };

    init();


    vm.login = function login() {

        loginService.signIn(vm.loginData).then(function (result) {
                vm.signInResult = result;

                if (result.access_token !== null & result.access_token !== undefined) {
                    localStorageService.set('accessToken', result.access_token);
                    localStorageService.set('refreshToken', result.refresh_token);

                    loginService.getCurrentUser().then(function (data) {
                        localStorageService.set('username', data.username);
                        localStorageService.set('userId', data.userId);
                        localStorageService.set('name', data.name);
                        localStorageService.set('email', data.email);
                        localStorageService.set('company', data.company);
                    });
                    toaster.pop('success', "", 'Giris Basarili');

                    $location.path('/home');

                }

            },
            function (err) {
                vm.signInResult = err;
            });

    };

    vm.logout = function logout() {
        toaster.pop('success', "", 'Cikis Basarili');
        localStorageService.remove('accessToken');

    };

    vm.refresh = function () {
        $location.path('http://localhost:8081/#/company');

    };

    function init() {
        vm.isAuthed = function () {
            var token = localStorageService.get('accessToken');
            if (token) {

                return true;


            } else {
                return false;

            }
        };

        if (vm.isAuthed()) {
            vm.username = localStorageService.get('username');
        }

    }


}
