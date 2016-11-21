(function () {
    'use strict';

    function FindersKeepersController($scope, $state, $stateParams, finderskeepersService) {
        var _ctrl = this;

        _ctrl.featuredItems = [];
        _ctrl.regularItems = [];

        finderskeepersService.getAll().then(function(res) {
            _ctrl.featuredItems = getItemsByType(res, "featured");
            _ctrl.regularItems = getItemsByType(res, "regular");
        });

        function getItemsByType(collection, type) {
            var result = [];

            collection.forEach(function(item) {
                if (item.type === type) {
                    result.push(item);
                }
            });

            return result;
        }
    }

    angular
        .module('finderskeepers', [])
        .controller('FindersKeepersController', FindersKeepersController);

})();   