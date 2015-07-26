'use strict';

angular
    .module('demoApp.home')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', '$http', 'homeService', 'localStorageService', '$location', 'toaster','$rootScope'];

function HomeCtrl($scope, $http, homeService, localStorageService, $location, toaster,$rootScope) {
    /* jshint validthis: true */
    var vm = this;
    vm.currentUser = {};

    init();


    function init() {
        homeService.getCurrentUser().then(function (result) {

                if (result !== null && result !== undefined) {

                    if (!localStorageService.get('popup')) {

                        toaster.pop('success', 'Giris Basarili', 'Hosgeldin' + ' ' + result.name);
                    } else {

                    }
                    localStorageService.set('popup', 'visitedPopup');


                    vm.currentUser = result;
                }

            },
            function (err) {

                vm.currentUser = err;
            });
        $rootScope.isLoggedIn = localStorageService.get('accessToken');


        homeService.getAllUser().then(function (result) {

                if (result !== null && result !== undefined) {
                    vm.totalUser = result;
                }

            },
            function (err) {
                vm.totalUser = err;
            });

        homeService.apiStatus().then(function (result) {

            if (result !== null && result !== undefined) {
                vm.apiStatus = result;
            }

        });

        homeService.getUserCount().then(function (result) {

            if (result !== null && result !== undefined) {
                vm.totalUserCount = result;
            }

        });

        homeService.getCompanyCount().then(function (result) {

            if (result !== null && result !== undefined) {
                vm.totalCompanyCount = result;
            }

        });

        homeService.getAllCompany().then(function (result) {
            if (result !== null && result !== undefined) {
                vm.allCompanyList = result;
            }
        });

        homeService.getNormalUserCount().then(function (result) {
            if (result !== null && result !== undefined) {
                vm.normalUserCount = result;
            }
        });

        homeService.getLogEvent().then(function (result) {
            if (result !== null && result !== undefined) {
                vm.logEvent = result;
            }
        });
    }

    //vm.logout = function () {
    //    localStorageService.remove("accessToken");
    //
    //    toaster.pop('success', 'Basarili bir sekilde cikis yapildi', ' ');
    //    $location.path('/login');
    //
    //
    //}

}


