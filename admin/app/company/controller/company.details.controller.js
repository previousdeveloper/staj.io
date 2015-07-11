'use strict';

angular
    .module('company.module')
    .controller('DetailsCompanyCtrl', DetailsCompanyCtrl);

DetailsCompanyCtrl.$inject = ['$scope', 'logger', 'companyCreateService', 'toaster'];

function DetailsCompanyCtrl($scope, logger, companyCreateService, toaster) {
    /* jshint validthis: true */
    var vm = this;


    vm.companyDataModel = {
        name: '',
        email: '',
        address: '',
        websiteUrl: '',
        city: '',
        sector: '',
        information: '',
        imgurl: ''
    };


    vm.createCompany = function () {

        companyCreateService.createCompany(vm.companyDataModel).then(function (result) {

                if (result.name === 'ValidationError') {
                    toaster.pop('error', "Sirket Ekleme Basarisiz", result.message);

                } else {
                    toaster.pop('success', "Sirket Ekleme Basarili", result.message);
                    vm.companyDataModel = {};
                }
            },
            function (err) {
                toaster.pop('error', "Sirket Ekleme Basarisiz", result.message);
                vm.result = result
            });

    }


}
