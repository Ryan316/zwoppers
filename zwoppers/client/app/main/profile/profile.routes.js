(function () {
	'use strict';

	angular
		.module('profile')
	    .config(function ($stateProvider) {
		    $stateProvider.state('profile', {
		        url: '/profile',
		        templateUrl: 'app/main/profile/profile.html',
		        controller: 'ProfileController as ProfileController'
		    })
		    .state('profile.trades', {
		        url: '/trades',
		        templateUrl: 'app/main/profile/trades/trades.html',
		        controller: 'ProfileController as ProfileController'
		    })
		    .state('profile.listings', {
		        url: '/listings',
		        templateUrl: 'app/main/profile/listings/listings.html',
		        controller: 'ProfileController as ProfileController'
		    })
		});

})();