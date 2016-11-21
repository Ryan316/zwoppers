(function () {
    'use strict';

    function AdminCtrl($scope, $http, Auth, User) {
        // Use the User $resource to fetch all users
        var _ctrl = this;

        _ctrl.users = User.query();

        _ctrl.delete = function (user) {
            User.remove({
                id: user._id
            });
            angular.forEach(_ctrl.users, function (u, i) {
                if (u === user) {
                    _ctrl.users.splice(i, 1);
                }
            });
        };
    }

    angular
        .module('zwoppersApp')
        .controller('AdminCtrl', AdminCtrl);

})();