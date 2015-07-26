'use strict';

angular
    .module('company.module')
    .controller('CompanyDetails', CompanyDetails);

CompanyDetails.$inject = ['$scope', 'logger',
    'companyDetailsService', 'toaster', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$rootScope'];

function CompanyDetails($scope, logger,
                        companyDetailsService, toaster, DTOptionsBuilder, DTColumnDefBuilder, $rootScope) {
    /* jshint validthis: true */
    var vm = this;


    init();


    vm.getCompanyPagination = function (pageNumber) {
        companyDetailsService.getAllCompany(pageNumber).then(function (result) {

                if (result !== null && result !== undefined) {
                    vm.allCompany = result.company;
                    vm.pageCount = result.pages;
                    vm.paginationFilter =false;
                    if (vm.allButtonCount.length === 0) {

                        for (var i = 0; i < vm.pageCount; i++) {
                            vm.allButtonCount.push(i);
                        }
                    }
                }

            },
            function (err) {
                vm.allCompany = err;
            });
    };

    vm.getFilteredCompany = function (pageNumber, city, sector) {
        companyDetailsService.getFilteredCompany(pageNumber, city, sector).then(function (result) {

                if (result !== null && result !== undefined) {
                    vm.allCompany = result.company;
                    vm.pageCountFiltered = result.pages;
                    vm.paginationFilter= true;
                    if (vm.allButtonCountFiltered.length === 0) {

                        for (var i = 0; i < vm.pageCountFiltered; i++) {
                            vm.allButtonCountFiltered.push(i);
                        }
                    }
                }

            },
            function (err) {
                vm.allCompany = err;
            });
    };


    function init() {

        vm.allButtonCount = [];
        vm.allButtonCountFiltered = [];
        vm.selectedItemCityList = null;
        vm.selectedItemSectorList = null;
        vm.paginationFilter = null;

        vm.cityList = [
            {id: 1, name: 'Istanbul'},
            {id: 2, name: 'Izmir'},
            {id: 3, name: 'Ankara'}
        ];

        vm.sectorList = [
            {id: 1, name: 'Bilisim'},
            {id: 2, name: 'Saglik'},
            {id: 3, name: 'Makina'},
            {id: 4, name: 'Endustri'},
            {id: 5, name: 'Kimya'}
        ];

    }


}
