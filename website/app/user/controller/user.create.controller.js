'use strict';

angular
    .module('user.module')
    .controller('UserCreateCtrl', UserCreateCtrl);

UserCreateCtrl.$inject = ['$scope', 'userCreateService', '$location', 'toaster'];

function UserCreateCtrl($scope, userCreateService, $location, toaster) {

    var vm = this;

    vm.signUpData = {

        'username': '',
        'password': '',
        'name': '',
        'email': ''
    };


    vm.signUp = function () {

        userCreateService.signUp(vm.signUpData).then(function (result) {

                if (result !== null & result !== undefined) {

                    toaster.pop('info', 'Kayit', result.message);
                    $location.path('/login');
                }

            },
            function (err) {
                toaster.pop('error', err, err);

            });

    }
}
