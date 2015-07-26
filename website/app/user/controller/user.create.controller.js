'use strict';

angular
    .module('user.module')
    .controller('UserCreateCtrl', UserCreateCtrl);

UserCreateCtrl.$inject = ['$scope', 'userCreateService', '$location', 'toaster'];

function UserCreateCtrl($scope, userCreateService, $location, toaster) {

    var vm = this;
    init();
    vm.signUpData = {

        'username': '',
        'password': '',
        'name': '',
        'email': ''
    };


    vm.signUp = function () {

        userCreateService.signUp(vm.signUpData).then(function (result) {

                if (result !== null & result !== undefined) {
                        if (result.message === 'Kullanici mevcut') {
                        toaster.pop('error', "Kullanici Ekleme Basarisiz", result.message);
                    } else if (result.message.name === 'ValidationError') {
                        toaster.pop('error', "Sirket Ekleme Basarisiz", result.message)
                    } else if (result.message === 'Kullanici olusturuldu') {
                        toaster.pop('success', "Kullanici Ekleme Basarili", result.message)
                    }
                }

            },
            function (err) {
                toaster.pop('error', err, err);

            });

    }
    function init(){
        toaster.pop('success', "Kullanici Ekleme Basarili", result.message)

    }
}
