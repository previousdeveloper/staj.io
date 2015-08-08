'use strict';

angular
    .module('company.module')
    .controller('CompanyDetails', CompanyDetails);

CompanyDetails.$inject = ['$scope', 'logger',
    'companyDetailsService', 'toaster', 'loginService', 'localStorageService'];

function CompanyDetails($scope, logger,
                        companyDetailsService, toaster, loginService, localStorageService) {
    /* jshint validthis: true */
    var vm = this;
    vm.searchInput = null;
    vm.favoredResult = null;
    vm.allCompany = [];
    vm.search = {
        q: ''
    };

    init();


    vm.getCompanyPagination = function (pageNumber) {
        companyDetailsService.getAllCompany(pageNumber).then(function (result) {

                if (result !== null && result !== undefined) {
                    vm.allCompany = result.company;
                    vm.pageCount = result.pages;
                    vm.totalCompany = result.count;
                    vm.paginationFilter = 'allCompany';
                    if (vm.allButtonCount.length === 0) {

                        for (var i = 0; i < vm.pageCount; i++) {
                            vm.allButtonCount.push(i);
                        }
                    }
                }

                angular.forEach(vm.allCompany, function (data, key) {

                    angular.forEach(vm.favoredList, function (value, key) {
                        if (data._id === value._id) {
                            vm.favoredResult = true;
                        } else {
                            vm.favoredResult = false;
                        }
                    });


                });

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
                    vm.totalCompany = result.count;
                    vm.paginationFilter = 'filteredCompany';
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


    vm.getSearchedCompany = function (data, page) {
        companyDetailsService.getSearch(vm.search, page).then(function (result) {

                if (result !== null && result !== undefined) {


                    vm.allCompany = result.company;
                    vm.pageCountSearched = result.pages;
                    vm.totalCompany = result.count;
                    vm.paginationFilter = 'searchedCompany';
                    if (vm.allButtonCountSearched.length === 0) {

                        for (var i = 0; i < vm.pageCountSearched; i++) {
                            vm.allButtonCountSearched.push(i);
                        }
                    }
                }

            },
            function (err) {
                vm.allCompany = err;
            });
    };

    vm.deleteCompanyById = function (id) {

        if (confirm('Favorilerden cikarmak istedigine emin misin ?')) {
            companyDetailsService.deleteCompany(id).then(function (result) {

                vm.deleteResult = result;
                toaster.pop('success', "", result.message);

                getFavoredList();
            });
        } else {
            // Do nothing!
        }

    };




    function getFavoredList(){
        loginService.getFavoredList().then(function (data) {
            vm.favoredList = data;
        });
    }

    function init() {


        vm.isAuthed = function () {
            var token = localStorageService.get('accessToken');
            if (token) {

                return true;

            } else {

                return false;

            }
        };

        if(vm.isAuthed){

            vm.addSelectedCompany = function (id) {
                vm.companyAddData = {
                    companyId: id
                };
                loginService.addCompany(vm.companyAddData).then(function (result) {

                    if (result.type) {
                        toaster.pop('success', "", result.message);
                        getFavoredList();
                    } else {
                        toaster.pop('error', "", result.message);

                    }

                    vm.result = result;
                });
            };
        }

        if (vm.isAuthed()) {
            loginService.getCurrentUser().then(function (data) {

                vm.currentDataUser = data;
            });
        }

        if (vm.isAuthed()) {
            getFavoredList();
        }


        vm.allButtonCount = [];
        vm.allButtonCountFiltered = [];
        vm.allButtonCountSearched = [];
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
