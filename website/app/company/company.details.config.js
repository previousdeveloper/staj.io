'use strict';

angular
    .module('company.module')
    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'CompanyDetails',
                    templateUrl: 'app/home/index.tpl.html',
                    controllerAs: 'vm',
                    authenticate: true
                }
            },
            data: {
                pageTitle: 'Sirket Ekleme Sayfasi'
            }
        })

    });
