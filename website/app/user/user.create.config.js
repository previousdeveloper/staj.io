'use strict';

angular
    .module('user.module')
    .config(function config($stateProvider) {
        $stateProvider.state('adduser', {
            url: '/adduser',
            views: {
                "main": {
                    controller: 'UserCreateCtrl',
                    templateUrl: 'app/user/views/user.create.tpl.html',
                    controllerAs: "vm",
                    authenticate: true
                }
            },
            data: {
                pageTitle: 'Kayit sayfasi'
            }
        });
    });
