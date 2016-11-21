(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .controller('SettingsCtrl', SettingsCtrl);

    function SettingsCtrl($scope, User, Auth) {
        var _ctrl = this;

        _ctrl.errors = {};

        _ctrl.changePassword = function (form) {
            _ctrl.submitted = true;
            if (form.$valid) {
                Auth.changePassword(_ctrl.user.oldPassword, _ctrl.user.newPassword)
                    .then(function () {
                    _ctrl.message = 'Password successfully changed.';
                })
                    .
                catch (function () {
                    form.password.$setValidity('mongoose', false);
                    _ctrl.errors.other = 'Incorrect password';
                    _ctrl.message = '';
                });
            }
        };
    }

})();