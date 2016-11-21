(function () {
	'use strict';

	angular
		.module('zwoppersApp')
	    .config(function ($stateProvider) {
		    $stateProvider.state('zwopzone', {
		        url: '/zwopzone',
		        templateUrl: 'app/main/zwopzone/zwopzone.html',
		        controller: 'MainCtrl as MainCtrl'
		    })
		    .state('zwopzone.zwoppables', {
		        url: '/zwoppables',
		        templateUrl: 'app/main/zwopzone/zwoppables/zwoppables.html',
		        controller: 'MainCtrl as MainCtrl'
		    });
		});

})();