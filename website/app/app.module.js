'use strict';

angular.module('staj.io', [

    'company.module',
    'login.module',
    'user.module',
    'blocks.logging',
    'blocks.exception',
    'ui.router',
    'LocalStorageModule',
    'toaster',
    'ngAnimate',
    'components',
    'ngScrollTo',
    'ui.bootstrap'
])

    .config(configure)

    .run(run)

    .controller('AppCtrl', function AppCtrl($scope, $location) {
        /* jshint validthis: true */
        var vm = this;

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (angular.isDefined(toState.data.pageTitle)) {
                vm.pageTitle = toState.data.pageTitle;
            }
        });
    })

;
run.$inject = ['$http', '$rootScope', '$state', '$location', 'loginService'];
function run($http, $rootScope, $state, $location, loginService) {

    //$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    //    if (toState.views.main.authenticate && loginService.getCurrentUser() !== 'User') {
    //        // User isn’t authenticated
    //        $state.transitionTo("login");
    //        event.preventDefault();
    //    }
    //});

}

configure.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider']; //toastr

function configure($stateProvider, $urlRouterProvider, $httpProvider) {

    var token;
    $httpProvider.interceptors.push(function ($q, $location, localStorageService,toaster) {


        return {

            response: function (response) {
                // do something on success
                return response;
            },
            request: function (config) {
                token = localStorageService.get('accessToken');

                config.headers = config.headers || {};
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    toaster.pop('error', "Sirket Takip Durumu", 'Kullanici veya Paralo Yanlis.');
                    $location.url('/login');
                }

                if (response.status === 403) {
                    toaster.pop('error', "Giris", 'Kullanici veya Paralo Yanlis.');
                    $location.url('/login');
                }

                return $q.reject(response);
            }
        };

    });



    //if ($window.currentUser !== null || $window.currentUser !== undefined) {
    //    $urlRouterProvider.otherwise('/home');
    //} else {
    //    $urlRouterProvider.otherwise('/login');
    //}
    $urlRouterProvider.otherwise('/company');


}
