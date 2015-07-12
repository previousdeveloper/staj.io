'use strict';

angular
    .module('company.module')
    .controller('CompanyDetails', CompanyDetails);

CompanyDetails.$inject = ['$scope', 'logger',
    'companyDetailsService', 'toaster', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

function CompanyDetails($scope, logger,
                        companyDetailsService, toaster, DTOptionsBuilder, DTColumnDefBuilder) {
    /* jshint validthis: true */
    var vm = this;


    init();


    function getAllCompany() {
        companyDetailsService.getAllCompany().then(function (result) {

                if (result !== null && result !== undefined) {
                    vm.allCompany = result;
                }

            },
            function (err) {
                vm.allCompany = err;
            });
    }


    vm.deleteCompany = function (id) {



        if (confirm("Sirketi Silmek istiyor musun ?") == true) {

            companyDetailsService.deleteCompany(id).then(function (result) {

                if (result !== null && result !== undefined) {
                    getAllCompany();
                }
            });

        } else {

        }

    };


    function init() {
        vm.dtInstance = {};
        vm.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers');

        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable()
        ];
        getAllCompany();
    }


}
