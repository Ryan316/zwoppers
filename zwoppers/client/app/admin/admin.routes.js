(function () {
	'use strict';

	angular.module('zwoppersApp')
	    .config(function ($stateProvider) {
	    $stateProvider.state('admin', {
	        url: '/admin',
	        templateUrl: 'app/admin/admin.html',
	        controller: 'AdminCtrl as AdminCtrl'
	    });
	});

})();
