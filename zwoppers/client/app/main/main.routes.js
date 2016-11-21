(function () {
	'use strict';

	angular
		.module('zwoppersApp')
	    .config(function ($stateProvider) {
		    $stateProvider.state('main', {
		        url: '/',
		        templateUrl: 'app/main/main.html',
		        controller: 'MainCtrl as MainCtrl'
		    });
		});

})();