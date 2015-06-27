'use strict';

angular
    .module('signUp.module')
    .config(function config($stateProvider) {
        $stateProvider.state('signup', {
            url: '/signup',
            views: {
                "main": {
                    controller: 'SignUpCtrl',
                    templateUrl: 'app/signup/index.tpl.html',
                    controllerAs: "vm"
                }
            },
            data: {
                pageTitle: 'SignUp'
            }
        });
    });
