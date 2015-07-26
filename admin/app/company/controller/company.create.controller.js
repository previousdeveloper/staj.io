'use strict';

angular
    .module('company.module')
    .controller('CreateCompanyCtrl', CreateCompanyCtrl);

CreateCompanyCtrl.$inject = ['$scope', 'logger', 'companyCreateService', 'toaster'];

function CreateCompanyCtrl($scope, logger, companyCreateService, toaster) {
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

                if (result.message === 'ValidationError') {
                    toaster.pop('error', "Sirket Ekleme Basarisiz", result.message);

                } else if(result.message === 'Company is created before.'){
                    toaster.pop('error', "Sirket Ekleme Basarisiz", result.message);
                    vm.companyDataModel = {};
                }else{
                    toaster.pop('success', "Sirket Ekleme Basarili", result.message);

                }
            },
            function (err) {
                toaster.pop('error', "Sirket Ekleme Basarisiz", result.message);
                vm.result = result
            });

    }


}
