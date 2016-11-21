(function () {
    'use strict';

    angular
        .module('zwoppersApp')
        .directive('sidebarToggle', sidebarToggle);

    function sidebarToggle() {
        
        return {
            restrict: 'A',
            scope: {
                show: '='
            },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function (scope, element, attrs) {
                $('[data-toggle=offcanvas]').click(function() {
                    $(this).toggleClass('visible-xs text-center');
                    $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
                    $('.row-offcanvas').toggleClass('active');
                    $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
                    $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
                    $('#btnShow').toggle();
                });
            }
        };
    }

})();
