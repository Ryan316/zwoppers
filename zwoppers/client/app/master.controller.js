(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .controller('MasterController', MasterController);

    function MasterController($scope, $location, $document, $window, snapRemote, Auth) {
        var _ctrl = this;

        _ctrl.isCollapsed = false;
        _ctrl.isLoggedIn = Auth.isLoggedIn;
        _ctrl.isAdmin = Auth.isAdmin;
        _ctrl.getCurrentUser = Auth.getCurrentUser;

        _ctrl.pageTitle = 'Zwoppers - Sign up';

        // $document[0].title = _ctrl.pageTitle;

        _ctrl.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        _ctrl.isActive = function (route) {
            return route === $location.path();
        };

        var _snapper;

        snapRemote.getSnapper().then(function(snapper) {
            _snapper = snapper;
            $scope.$watch(function(){
                return $window.innerWidth;
            }, function(value) {
                if (value < 768) {
                    // snapper.open('left');
                } else {
                    snapper.close('left');
                }
            });
        });

        // $(window).resize(function() {
        //     var value = $window.innerWidth;
        //     if (value <= 767) {
        //         $('.drawer').hide();
        //     }
        //     if (value > 767) {
        //         $('.drawer').show();
        //     }
        //     if (value < 768) {
        //         _snapper.open('left');
        //     } else {
        //         _snapper.close('left');
        //     }
        //     snapRemote.toggle();
        // });
    }

})();