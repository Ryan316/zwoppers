(function () {
	'use strict';

	angular
		.module('zwoppersApp')
	    .config(function ($stateProvider) {
		    $stateProvider.state('finderskeepers', {
		        url: '/finderskeepers',
		        templateUrl: 'app/main/finderskeepers/finderskeepers.html',
		        controller: 'FindersKeepersController as FindersKeepersController'
		    });
		});

})();