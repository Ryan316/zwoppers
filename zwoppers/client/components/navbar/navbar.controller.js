(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .controller('NavbarCtrl', NavbarCtrl);

    function NavbarCtrl($scope, $location, Auth) {
        // var _ctrl = this;

        // _ctrl.menu = [{
        //     'title': 'Home',
        //         'link': '/'
        // }];

        // _ctrl.isCollapsed = true;
        // _ctrl.isLoggedIn = Auth.isLoggedIn;
        // _ctrl.isAdmin = Auth.isAdmin;
        // _ctrl.getCurrentUser = Auth.getCurrentUser;

        // _ctrl.logout = function () {
        //     Auth.logout();
        //     $location.path('/login');
        // };

        // _ctrl.isActive = function (route) {
        //     return route === $location.path();
        // };
    }

})();