'use strict';

angular
    .module('login.module')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'loginService', '$location', 'localStorageService', '$rootScope'];

function LoginCtrl($scope, loginService, $location, localStorageService, $rootScope) {

    var vm = this;
    init();

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

                    $location.path('/home');

                }

            },
            function (err) {
                vm.signInResult = err;
            });

    };

    vm.logout = function logout() {

        localStorageService.remove('accessToken');

    };

    function init(){
        $rootScope.isLoggedIn = localStorageService.get('accessToken');
    }

}
