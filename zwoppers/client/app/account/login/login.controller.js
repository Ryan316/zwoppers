(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .controller('LoginCtrl', LoginCtrl);

     function LoginCtrl($scope, Auth, $location, $window, $rootScope) {
        var _ctrl = this;

        _ctrl.user = {};
        _ctrl.errors = {};

        _ctrl.login = function (form) {
            _ctrl.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: _ctrl.user.email,
                    password: _ctrl.user.password
                })
                .then(function () {
                    // Logged in, redirect to home
                    $location.path('/profile');
                })
                .catch (function (err) {
                    _ctrl.errors.other = err.message;
                });
            }
        };

        _ctrl.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    }

})();