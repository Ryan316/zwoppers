(function () {
    'use strict';

    function MainCtrl($scope, $http, socket, $window, snapRemote) {
        var _ctrl = this;

        _ctrl.awesomeThings = [];

        $http.get('/api/things').success(function (awesomeThings) {
            _ctrl.awesomeThings = awesomeThings;
            socket.syncUpdates('thing', _ctrl.awesomeThings);
        });

        _ctrl.addThing = function () {
            if (_ctrl.newThing === '') {
                return;
            }
            $http.post('/api/things', {
                name: _ctrl.newThing
            });
            _ctrl.newThing = '';
        };

        _ctrl.deleteThing = function (thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('thing');
        });

        $scope.$on('$stateChangeSuccess', function(next, current) { 
            if (current.url == '/') {
                $('.signup-button').addClass('activeLink');
            }
        });

        // snapRemote.getSnapper().then(function(snapper) {
        //    snapper.enable();
        //    // or
        //    snapper.disable();
        // });

        
    }

    angular
        .module('zwoppersApp')
        .controller('MainCtrl', MainCtrl);

})();