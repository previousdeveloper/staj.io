'use strict';

angular.module('demoApp', [
    'demoApp.home',
    'company.module',
    'user.module',
    'login.module',
    'blocks.logging',
    'blocks.exception',
    'ui.router',
    'LocalStorageModule',
    'toaster',
    'ngAnimate'
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

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.views.main.authenticate && loginService.getCurrentUser() !== 'admin') {
            // User isn’t authenticated
            $state.transitionTo("login");
            event.preventDefault();
        }
    });

}

configure.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider']; //toastr

function configure($stateProvider, $urlRouterProvider, $httpProvider) {

    var token;
    $httpProvider.interceptors.push(function ($q, $location, localStorageService) {


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
                    $location.url('/login');
                }
                if (response.status == 0) {
                    window.location = "../admin/index.html#/signup";
                    return;
                }
                if (response.status === 403) {
                    $location.url('/login');
                }

                return $q.reject(response);
            }
        };

    });
    // toastr.options.timeOut = 4000;
    //toastr.options.positionClass = 'toast-bottom-right';


    //if ($window.currentUser !== null || $window.currentUser !== undefined) {
    //    $urlRouterProvider.otherwise('/home');
    //} else {
    //    $urlRouterProvider.otherwise('/login');
    //}
    $urlRouterProvider.otherwise('/login');


}
