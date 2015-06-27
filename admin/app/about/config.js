'use strict';

angular
    .module('demoApp.about')
    .config(function config($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutCtrl',
                    templateUrl: 'app/about/index.tpl.html',
                    controllerAs: "vm"
                }
            },
            data: {
                pageTitle: 'About :)'
            }
        });
    });
