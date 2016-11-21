(function () {
    'use strict';

    angular.module('zwoppersApp')
        .config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/account/login/login.html',
            controller: 'LoginCtrl as LoginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/account/signup/signup.html',
            controller: 'SignupCtrl as SignupCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'app/account/settings/settings.html',
            controller: 'SettingsCtrl as SettingsCtrl',
            authenticate: true
        });
    });

})();