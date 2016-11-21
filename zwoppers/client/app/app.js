(function () {
    'use strict';

    var bowerComponents = [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'ui.bootstrap',
        'ngDragDrop',
        'ngFileUpload',
        'infinite-scroll',
        'ngTouch',
        'ngTable',
        'snap'
    ], 
    zwoppersModules = [
        'home',
        'profile', 
        'finderskeepers',
        'zwopzone'
    ],
    completeModules = bowerComponents.concat(zwoppersModules);

    angular.module('zwoppersApp', completeModules)

        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            $urlRouterProvider.otherwise('/');

            // $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('authInterceptor');

            $urlRouterProvider.rule(function ($injector, $location) {
                // what this function returns will be set as the $location.url
                var path = $location.path(), normalized = path.toLowerCase();
                    if (path != normalized) {
                    // instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
                    $location.replace().path(normalized);
                }
                // because we've returned nothing, no state change occurs
            });
        })

        .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });
 
})();