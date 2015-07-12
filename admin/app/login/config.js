'use strict';

angular
    .module('login.module')
    .config(function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                "main": {
                    controller: 'LoginCtrl',
                    templateUrl: 'app/login/index.tpl.html',
                    controllerAs: "vm",
                    authenticate:false
                }
            },
            data: {
                pageTitle: 'SignIn'
            }
        });
    });
