(function() {
    'use strict';

    angular.module('zwoppersApp')
        .directive('itemCard', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'components/directives/itemCard/itemCard.html',
                scope: {
                    item: "="
                },
                link: function (scope, element, attrs) {
                    scope.bla = "heyu";
                }
            };
        });
})();