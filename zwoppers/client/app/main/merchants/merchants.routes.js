(function () {
	'use strict';

	angular
		.module('zwoppersApp')
	    .config(function ($stateProvider) {
		    $stateProvider.state('merchants', {
		        url: '/merchants',
		        templateUrl: 'app/main/merchants/merchants.html',
		        controller: 'MainCtrl as MainCtrl'
		    });
		});

})();