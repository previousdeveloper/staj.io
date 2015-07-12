'use strict';

angular
  .module('company.module')
  .config(function config($stateProvider) {
    $stateProvider.state('addcompany', {
      url: '/addcompany',
      views: {
        "main": {
          controller: 'CreateCompanyCtrl',
          templateUrl: 'app/company/view/company.create.tpl.html',
          controllerAs: 'vm',
          authenticate: true
        }
      },
      data: {
        pageTitle: 'Sirket Ekleme Sayfasi'
      }
    })

  });
