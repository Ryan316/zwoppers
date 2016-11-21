(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .controller('SignupCtrl', SignupCtrl);

    function SignupCtrl($scope, Auth, $location, $window) {
        var _ctrl = this;

        _ctrl.user = {};
        _ctrl.errors = {};

        _ctrl.register = function (form) {
            _ctrl.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: _ctrl.user.name,
                    email: _ctrl.user.email,
                    password: _ctrl.user.password
                })
                    .then(function () {
                    // Account created, redirect to home
                    $location.path('/');
                })
                    .
                catch (function (err) {
                    err = err.data;
                    _ctrl.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        _ctrl.errors[field] = error.message;
                    });
                });
            }
        };

        _ctrl.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    }
    
})();